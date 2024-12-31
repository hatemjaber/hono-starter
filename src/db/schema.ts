import { bigint, mysqlTable, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const timestamps = {
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
};

export const users = mysqlTable("users", {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 65 }).notNull(),
    verification_token: varchar('verification_token', { length: 100 }),
    ...timestamps,
}, (t) => [
    unique('users_email_idx').on(t.email)
]);

export const UserSelectSchema = createSelectSchema(users).omit({ password: true });
export const UserInsertSchema = createInsertSchema(users);