import { Prisma } from "@prisma/client";

export class CaseBuilder<T> {
    #subject: string | undefined;
    #whens: Array<{ query: string; binding?: any }> = [];
    #thens: string[] = [];
    #elseValue: string | undefined;
    #bindings: any[] = [];
    #model: any;
    #_prisma: any
    #whensCounter = 1;
  
    constructor(model: any, prisma: any) {
      this.#model = model;
      this.#_prisma = prisma;
    }
  
    case(subject: string) {
      this.#subject = subject;
      return this;
    }
  
    when<K extends keyof Prisma.Payload<T, "findMany">['scalars']>({ column, operator, value }: { column: K; operator: string; value: any }) {
      const operatorClause = operator ? `${String(column)} ${operator} ${'$'+`${this.#whensCounter}`}` : `${String(column)}`;
      this.#whens.push({ query: operatorClause });
      this.#bindings.push(value);
      this.#whensCounter++;
      return this;
    }
  
    then(value: string) {
      this.#thens.push(value);
      return this;
    }
  
    else(value: string) {
      this.#elseValue = value;
      return this;
    }
  
    toQuery(model: string) {
      if (!this.#subject) throw new Error('Subject is required for CASE expression');
      if (this.#whens.length !== this.#thens.length)
        throw new Error('Number of "when" conditions does not match the number of "then" values');
  
      const caseSql = `SELECT CASE ${this.#whens.map((when, i) => `WHEN ${when.query} THEN '${this.#thens[i]}'`).join(' ')} ELSE '${this.#elseValue}' END FROM "${model}"`;
  
      return {
        sql: caseSql,
        values: this.#bindings,
      };
    }

    get _model() {
        return this.#model;
      }
  
    async toExec() {
      const name = this._model.name;
      const { sql, values } = this.toQuery(name);
  
      const result = await this.#_prisma.$queryRawUnsafe(sql, ...values);
      
      return result;
    }
  }
  

