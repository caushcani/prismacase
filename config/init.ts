import { prisma } from "../config/db";

export const runCaseBuilder = async () => {
  const result = await prisma.user
    .case("role")
    .when({ column: "age", operator: ">=", value: 18 })
    .then("Adult")
    .when({ column: "age", operator: "<", value: 18 })
    .then("Go home! :P")
    .else("Not found")
    .toExec();
  

  console.log(result);
};
