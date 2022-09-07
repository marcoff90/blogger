DROP DATABASE IF EXISTS postgres;
CREATE DATABASE postgres;
CREATE DATABASE user_service;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL DEFAULT false,
    avatar character varying(255) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    "confirmationToken" character varying(255) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    "confirmationTokenExpiration" double precision,
    "forgottenPasswordToken" character varying(255) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    "forgottenPasswordTokenExpiration" double precision,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT "users_confirmationTokenExpiration_key" UNIQUE ("confirmationTokenExpiration"),
    CONSTRAINT "users_confirmationToken_key" UNIQUE ("confirmationToken"),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT "users_forgottenPasswordToken_key" UNIQUE ("forgottenPasswordToken"),
    CONSTRAINT users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to ${RDS_USERNAME};

INSERT INTO public.users(
	username, email, password, active, avatar)
	VALUES ('JohnDoe99', 'johndoe99@example.com', 'Password123!', 1, '/avatar.jpg')
	       ,('JaneDoe99', 'janedoe99@example.com','Password123!', 1, '/avatar.jpg');
