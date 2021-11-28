create database cobranca;

drop table if exists usuarios;

create table if not exists usuarios (
	id serial primary key,
  	nome text not null,
  	email text unique not null,
  	senha text not null,
	cpf text unique,
	tel text
);

drop table if exists clientes;

create table if not exists clientes (
	id serial primary key,
	usuario_id integer not null,
	nome text not null,
	cpf integer,
	telefone text,
	endereco text,
	complemento text,
	CEP text,
	Bairro text,
	Cidade text,
	UF text,
	foreign key (usuario_id) references usuarios (id)
);