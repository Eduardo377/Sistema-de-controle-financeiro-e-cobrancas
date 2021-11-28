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
<<<<<<< HEAD
	cpf text,
	telefone text,
	email text not null unique,
	endereco text,
	complemento text,
	cep text,
	bairro text,
	cidade text,
	uf text,
=======
	cpf integer,
	email text,
	telefone text,
	endereco text,
	complemento text,
	CEP text,
	Bairro text,
	Cidade text,
	UF text,
>>>>>>> e07fedd654ad9f56329aa00b86bf7438388611b1
	foreign key (usuario_id) references usuarios (id)
);
