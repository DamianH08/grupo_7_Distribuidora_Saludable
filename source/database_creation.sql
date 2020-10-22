CREATE DATABASE dist_saludable;
use dist_saludable;

CREATE TABLE users (
    id int(11) auto_increment NOT NULL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(80) not NULL,
    avatar VARCHAR(150) default '/tmp/myUploads/defaultAvatar.jpg',
    role VARCHAR(5) not NULL default 'user',
    constraint check(role in ('user','admin'))
);
CREATE TABLE session_tokens (
    user_id int(11) NOT NULL,
    token VARCHAR(100) NOT NULL PRIMARY KEY,
    foreign key (user_id) references users(id) on delete cascade
);
CREATE TABLE user_addresses (
    id int not null auto_increment PRIMARY KEY,
    user_id int(11) NOT NULL,
    calle VARCHAR (50),
    altura int(4),
    piso int(2),
    codigo_postal int(4),
    localidad VARCHAR(50),
    provincia VARCHAR(50),
    foreign key (user_id) references users(id) on delete cascade
);
CREATE TABLE orders (
    id int(11) not null auto_increment PRIMARY KEY,
    user_id int(11) not null,
    store_id int,
    address_id int,
    status VARCHAR(10),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    constraint check(status in ('in progress','finished','cancelled'))   
);
CREATE TABLE stores (
    id int NOT NULL auto_increment PRIMARY KEY,
    name varchar(50),
    address VARCHAR(100)
);
CREATE TABLE products(
    id int NOT NULL auto_increment PRIMARY KEY,
    name varchar(100) NOT NULL,
    description varchar(200),
    image VARCHAR(200) default '/images/products/defaultProduct.jpg',
    category_id int,
    section_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
CREATE TABLE variants(
    id int NOT NULL auto_increment PRIMARY KEY,
    product_id int not NULL,
    name varchar(50) not NULL,
    price int not NULL,
    stock int,
    updated_at timestamp default current_timestamp on update current_timestamp,
    constraint foreign key (product_id) references products(id) on delete cascade
);
CREATE TABLE categories(
    id int NOT NULL auto_increment PRIMARY KEY,
    name varchar(50)
);
CREATE TABLE sections(
    id int NOT NULL auto_increment PRIMARY KEY,
    name varchar(50) not null
);
CREATE TABLE offers(
    variant_id int NOT NULL,
    discount int(4),
    start_date date,
    finish_date date,
    stock int(7)
);
CREATE TABLE orders_products(
    order_id int NOT NULL,
    product_id int NOT NULL,
    quantity int NOT NULL,
    foreign key (order_id) references orders(id) on delete cascade,
    foreign key (product_id) references products(id)
);
create table variant_types(
    id int not null primary key auto_increment,
    name varchar(10) not null
);

alter table offers add constraint foreign key (variant_id) references variants(id);
alter table products add constraint foreign key (category_id) references categories(id);
alter table products add constraint foreign key (section_id) references sections(id);
alter table orders add constraint foreign key (user_id) references users(id);