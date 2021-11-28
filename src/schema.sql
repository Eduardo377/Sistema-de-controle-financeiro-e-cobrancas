create database cobranca;

drop table if exists usuarios;

create table if not exists usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null,
	cpf text,
	tel text
);

drop table if exists clientes;

create table if not exists clientes (
	id serial primary key,
	usuario_id integer not null,
	nome text not null,
	cpf text,
	telefone text,
	email text not null unique,
	endereco text,
	complemento text,
	cep text,
	bairro text,
	cidade text,
	uf text,
	foreign key (usuario_id) references usuarios (id)
);
