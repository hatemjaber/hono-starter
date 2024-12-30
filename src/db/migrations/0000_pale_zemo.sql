CREATE TABLE `users` (
	`id` bigint NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(65) NOT NULL,
	`verification_token` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_email_idx` UNIQUE(`email`)
);
