import { defineConfig } from "drizzle-kit";

const config = defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.DB_HOST!,
        user: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
        port: Number(process.env.DB_PORT!),
    },
    migrations: {
        table: "__drizzle_migrations__"
    },
    verbose: true,
    strict: true,
});

export default config;