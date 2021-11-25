create database cobranca;

drop table if exists usuarios;

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null,
	cpf text,
	tel text
);

DROP TABLE IF EXISTS cliente;

CREATE TABLE IF NOT EXISTS cliente (
	id SERIAL PRIMARY KEY NOT NULL,
	usuario_id INTEGER NOT NULL,
	nome TEXT NOT NULL,
	cpf INTEGER NOT NULL,
	telefone TEXT NOT NULL,
	enderenço TEXT,
	complemento TEXT,
	CEP TEXT,
	Bairro TEXT,
	Cidade TEXT NOT NULL,
	UF TEXT NOT NULL,
	foreign key (usuario_id) references usuarios (id)
);