import env from "../../../../config/env";
import { createPool } from "mysql2/promise";
import { PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();

export const pool = createPool({
  host: env.db.HOST,
  port: env.db.PORT,
  user: env.db.USER,
  password: env.db.PASSWORD,
  database: env.db.DB,
});
