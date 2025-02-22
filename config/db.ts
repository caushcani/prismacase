import { PrismaClient, Prisma } from "@prisma/client";
import { CaseBuilder } from "./CaseBuilder";

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      case<T>(this:T, field: string) {
        return new CaseBuilder(this, prisma).case(field);
      },
    },
  },
});
