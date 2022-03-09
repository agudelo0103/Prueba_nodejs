create database prueba_nodejs;
create table usuarios (
  user_id serial primary key not null,
  user_name varchar(45) unique not null,
  password varchar(50) not null
);