create database cobranca;

drop table if exists usuarios;

create table usuarios (
	id serial primary key not null,
  	nome text not null,
  	email text not null unique,
  	senha text not null,
	cpf text,
	tel text
);

drop table if exists cliente;

create table if not exists cliente (
	id serial primary key not null,
	usuario_id integer not null,
	nome text not null,
	cpf integer not null,
	telefone text not null,
	enderenço text,
	complemento text,
	CEP text,
	Bairro text,
	Cidade text not null,
	UF text not null,
	foreign key (usuario_id) references usuarios (id)
);