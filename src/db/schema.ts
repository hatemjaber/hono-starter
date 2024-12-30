import { bigint, mysqlTable, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';

const timestamps = {
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
};

export const userSchema = mysqlTable("users", {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 65 }).notNull(),
    verification_token: varchar('verification_token', { length: 100 }),
    ...timestamps,
}, (t) => [
    unique('users_email_idx').on(t.email)
]);