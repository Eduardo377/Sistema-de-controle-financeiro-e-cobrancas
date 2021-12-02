const verificarEmail = require('./controladores/usuarios/verificarEmail');

const cadastrarUsuario = require('./controladores/usuarios/cadastrar');
const editarUsuario = require('./controladores/usuarios/editar');
const obterUsuario = require('./controladores/usuarios/obter');

const cadastrarCliente = require('./controladores/clientes/cadastrar');
const detalharCliente = require('./controladores/clientes/detalhar');
const detalharUmCliente = require('./controladores/clientes/detalharUmCliente')
    // const editarCliente = require('./controladores/clientes/editar');

const cadastrarCobrancas = require('./controladores/cobrancas/cadastrar');

const verificaLogin = require('./filtros/verificaLogin');

const login = require('./controladores/usuarios/login');
const express = require('express');

const rotas = express();

rotas.post('/email', verificarEmail.verificarEmail);
rotas.post('/usuarios', cadastrarUsuario.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.get('/usuarios', obterUsuario.obterUsuario);
rotas.put('/usuarios', editarUsuario.editarUsuario);

rotas.post('/clientes', cadastrarCliente.cadastrarClientes);
rotas.get('/clientes', detalharCliente.detalharClientes);
rotas.get('/clientes/:id', detalharUmCliente.detalharUmCliente);
// rotas.put('/clientes', editarCliente.editarCliente);

rotas.post('/cobrancas', cadastrarCobrancas.cadastrarCobrancas);

module.exports = rotas;