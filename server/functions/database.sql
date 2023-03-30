CREATE DATABASE FSD_2023_ANQUI

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4(),
    os VARCHAR NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE histories (
    calc_id serial PRIMARY KEY,
    user_id VARCHAR ( 255 ) NOT NULL,
    calculation VARCHAR ( 255 ) NOT NULL,
    created_on TIMESTAMP NOT NULL
);