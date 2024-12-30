import { z } from "zod";

const schema = z.object({
    NODE_ENV: z.string(),
    HOST: z.string().default("0.0.0.0"),
    PORT: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 3000)),
    LOG_LEVEL: z.string(),
    JWT_SECRET_KEY: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 3306))
});

export const env = schema.parse(process.env);