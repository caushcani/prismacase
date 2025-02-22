# Prisma CASE Query Builder ⚡️

A **simple and lightweight CASE query builder** for Prisma, making raw SQL queries easier and more readable.

## 🚀 Features
✅ Fluent, chainable API  
✅ Type-safe column suggestions  
✅ Works seamlessly with Prisma  

## 📦 Installation
```sh
npm install prisma-case-builder
```

## 🛠️ Usage
```typescript
const result = await prisma.user
  .case("role")
  .when({ column: "age", operator: ">=", value: 18 }).then("Adult")
  .when({ column: "age", operator: "<", value: 18 }).then("Go home! :P")
  .else("Unknown")
  .toExec();
```

## 🔧 Setup
To integrate the CASE query builder with Prisma, extend your `PrismaClient`:

```typescript
import { PrismaClient } from "@prisma/client";
import { CaseBuilder } from "prisma-case-builder";

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      case<T>(this: T, field: string) {
        return new CaseBuilder(this, prisma).case(field);
      },
    },
  },
});
```

## 📜 License
MIT  

---  
Enjoy using Prisma CASE Query Builder? Give it a ⭐ on GitHub! 🚀

