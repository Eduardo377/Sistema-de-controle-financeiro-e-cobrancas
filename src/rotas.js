const express = require('express');
const usuarios = require('./controladores/usuarios/usuarios');
const login = require('./controladores/login/login');
const verificaLogin = require('./filtros/verificaLogin');

const clientes = require('./controladores/clientes/clientes');

const rotas = express();

rotas.post('/email', usuarios.verificarEmail);
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.get('/usuario', usuarios.obterUsuario);
rotas.put('/usuarios', usuarios.atualizarUsuario);

rotas.get('/clientes', clientes.detalharClientes)
rotas.post('/clientes', clientes.cadastrarClientes);

module.exports = rotas;