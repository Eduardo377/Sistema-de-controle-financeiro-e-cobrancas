const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();
rotas.get('/usuario', usuarios.verificarEmail)
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.put('/usuario/:id', usuarios.atualizarUsuario);


module.exports = rotas;