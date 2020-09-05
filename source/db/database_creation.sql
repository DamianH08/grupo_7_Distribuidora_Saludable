use test;
-- Esta query la deben ejecutar para tener la base de datos y la tabla de 
-- usuarios en sus computadoras dist_saludable;
CREATE DATABASE dist_saludable;
use dist_saludable;
CREATE TABLE users (
    id int(11) auto_increment NOT NULL PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) not NULL
);