const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const cliente = require('./controladores/cliente');

const rotas = express();

rotas.get('/usuarios', usuarios.verificarEmail);

rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.put('/usuarios', usuarios.atualizarUsuario);

rotas.post('/cliente', cliente.cadastrarClientes);

rotas.get('/usuario', usuarios.obterUsuario);

module.exports = rotas;