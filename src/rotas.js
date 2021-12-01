const verificarEmail = require('./controladores/usuarios/verificarEmail');
const cadastrarUsuario = require('./controladores/usuarios/cadastrar');
const cadastrarCliente = require('./controladores/clientes/cadastrar');
const detalharCliente = require('./controladores/clientes/detalhar');
const editarUsuario = require('./controladores/usuarios/editar');
const obterUsuario = require('./controladores/usuarios/obter');
const verificaLogin = require('./filtros/verificaLogin');
const login = require('./controladores/usuarios/logar');
const express = require('express');

const rotas = express();

rotas.post('/email', verificarEmail.verificarEmail);
rotas.post('/usuarios', cadastrarUsuario.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.get('/usuarios', obterUsuario.obterUsuario);
rotas.put('/usuarios', editarUsuario.editarUsuario);

rotas.get('/clientes', detalharCliente.detalharClientes);
rotas.post('/clientes', cadastrarCliente.cadastrarClientes);

module.exports = rotas;