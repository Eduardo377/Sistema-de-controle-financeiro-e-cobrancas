const express = require('express');
const cadastrarUsuario = require('./controladores/usuarios/cadastrar');
const obterUsuario = require('./controladores/usuarios/obter');
const editarUsuario = require('./controladores/usuarios/editar');
const cadastrarCliente = require('./controladores/clientes/cadastrar');
const detalharCliente = require('./controladores/clientes/detalhar');
const verificarEmail = require('./controladores/usuarios/verificarEmail');
const login = require('./controladores/login/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.post('/email', verificarEmail.verificarEmail);
rotas.post('/usuarios', cadastrarUsuario.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.get('/usuario', obterUsuario.obterUsuario);
rotas.put('/usuarios', editarUsuario.editarUsuario);

rotas.get('/clientes', detalharCliente.detalharClientes);
rotas.post('/clientes', cadastrarCliente.cadastrarClientes);

module.exports = rotas;