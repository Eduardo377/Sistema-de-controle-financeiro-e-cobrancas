const express = require('express');
const usuarios = require('./controladores/usuarios');

const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.post('/usuarios', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.put('/usuario/:id', usuarios.atualizarUsuario);

rotas.use(verificaLogin);

module.exports = rotas;