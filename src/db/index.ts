import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../utils/env.js";
import * as schema from "./schema.js";

const connection = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    port: env.DB_PORT,
});

export const db = drizzle(connection, { schema, mode: "default", logger: true });