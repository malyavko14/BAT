DROP SCHEMA  IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "public"."Users" (
	"id" serial NOT NULL,
	"full_name" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"heahsed_password" VARCHAR(255) NOT NULL,
	"role" VARCHAR(255) NOT NULL CHECK ( "role" in ('admin', 'TMP', 'moder') ),
	"territory" VARCHAR(255) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Cashier" (
	"id" serial NOT NULL,
	"full_name" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(255) NOT NULL,
	"store_id" integer NOT NULL,
    "passport_series" VARCHAR(255) DEFAULT ' ',
	"passport_number" VARCHAR(255) DEFAULT ' ',
	"issue_date" VARCHAR(255) DEFAULT ' ',
	"who_issued" VARCHAR(255) DEFAULT ' ',
	CONSTRAINT "Cashier_pk" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Store" (
	"id" serial NOT NULL,
	"store_code" VARCHAR(255) NOT NULL UNIQUE,
	"store_name" VARCHAR(255) NOT NULL,
	"VC" INT CHECK ("VC" BETWEEN 1 and 9),
	"BU" VARCHAR(255) NOT NULL,
	"territory" VARCHAR(255) NOT NULL,
	CONSTRAINT "Store_pk" PRIMARY KEY ("id")
);

CREATE TABLE "public"."TMP_Territory"(
	"id" serial NOT NULL,
	"user_id" INT NOT NULL,
	"store_id" INT NOT NULL
);

CREATE TABLE "Activity" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	CONSTRAINT "Activity_pk" PRIMARY KEY ("id")
);

CREATE TABLE "ActivityStoreConnection" (
	"id" serial NOT NULL,
	"store_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	CONSTRAINT "ActivityStoreConnection_pk" PRIMARY KEY ("id")
);

CREATE TABLE "Reward" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	CONSTRAINT "Reward_pk" PRIMARY KEY ("id")
);

CREATE TABLE "CashierActivityConnection" (
	"id" serial NOT NULL,
	"cashier_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"reward_id" integer NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	"result" VARCHAR(255) NOT NULL,
	"total" FLOAT NOT NULL,
	"signature" bytea NOT NULL,
	CONSTRAINT "CashierActivityConnection_pk" PRIMARY KEY ("id")
);

ALTER TABLE "Cashier" ADD CONSTRAINT "Cashier_fk0" FOREIGN KEY ("store_id") REFERENCES "Store"("id");

ALTER TABLE "ActivityStoreConnection" ADD CONSTRAINT "ActivityStoreConnection_fk0" FOREIGN KEY ("store_id") REFERENCES "Store"("id");
ALTER TABLE "ActivityStoreConnection" ADD CONSTRAINT "ActivityStoreConnection_fk1" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id");

ALTER TABLE "CashierActivityConnection" ADD CONSTRAINT "CashierActivityConnection_fk0" FOREIGN KEY ("cashier_id") REFERENCES "Cashier"("id");
ALTER TABLE "CashierActivityConnection" ADD CONSTRAINT "CashierActivityConnection_fk1" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id");
ALTER TABLE "CashierActivityConnection" ADD CONSTRAINT "CashierActivityConnection_fk2" FOREIGN KEY ("reward_id") REFERENCES "Reward"("id");


insert into "public"."Users" (	"full_name", "password", "heahsed_password", "role", territory) VALUES
('admin', 'admin','$pbkdf2-sha512$25000$TKm19n4PIWTMmdPae28NQQ$Bxgm7yxo2dNiCiVYGr3QI0itIHxM15.YTSvIpixrom1tAw6jVyUiDM.BskMQ6Io6j8XSKBRdz3S.1cTmLyzarg', 'admin', '  '),
('user', 'kekw','asfldaskfdlaskdf', 'moder', 'evro1'),
('user1', 'kekw','asfldaskfdlaskdf', 'TMP', 'evro2');

