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
	nome text not null,
	cpf text unique,
	telefone text,
	email text not null unique,
	endereco text,
	complemento text,
	cep text,
	bairro text,
	cidade text,
	uf text
);

drop table if exists cobrancas;

create table if not exists cobrancas (
	id serial primary key,
	cliente_id integer not null,
	descricao text not null,
	paga boolean not null,
  	valor text not null,
  	data_vencimento text not null,
  	foreign key (cliente_id) references clientes (id)
);

