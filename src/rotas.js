const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.get('/usuarios', usuarios.verificarEmail);
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificaLogin);

<<<<<<< HEAD
rotas.put('/usuarios', usuarios.atualizarUsuario);
=======
rotas.put('/usuario/:id', usuarios.atualizarUsuario);
>>>>>>> back_daniel

module.exports = rotas;