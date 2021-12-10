const verificarEmail = require("./controladores/usuarios/verificarEmail");

const cadastrarUsuario = require("./controladores/usuarios/cadastrar");
const editarUsuario = require("./controladores/usuarios/editar");
const obterUsuario = require("./controladores/usuarios/obter");

const cadastrarCliente = require("./controladores/clientes/cadastrar");
const listarClientes = require("./controladores/clientes/listar");
const detalharCliente = require("./controladores/clientes/detalhar");
const editarCliente = require("./controladores/clientes/editar");
const deletarCliente = require("./controladores/clientes/deletar");

const cadastrarCobrancas = require("./controladores/cobrancas/cadastrar");
const listarCobrancas = require("./controladores/cobrancas/listar");
const listarCobrancasCliente = require("./controladores/clientes/cobrancas/listar");
const detalharCobranca = require("./controladores/cobrancas/detalhar");

const verificaLogin = require("./filtros/verificaLogin");

const login = require("./controladores/usuarios/login");
const express = require("express");

const rotas = express();

rotas.post("/email", verificarEmail.verificarEmail);
rotas.post("/usuarios", cadastrarUsuario.cadastrarUsuario);
rotas.post("/login", login.login);

rotas.use(verificaLogin);

rotas.get("/usuarios", obterUsuario.obterUsuario);
rotas.put("/usuarios", editarUsuario.editarUsuario);

rotas.post("/clientes", cadastrarCliente.cadastrarClientes);
rotas.get("/clientes", listarClientes.listarClientes);
rotas.get("/clientes/:id", detalharCliente.detalharCliente);
rotas.put("/clientes/:id", editarCliente.editarCliente);
rotas.delete("/clientes/:id", deletarCliente.deletarCliente);

rotas.post("/cobrancas", cadastrarCobrancas.cadastrarCobrancas);
rotas.get("/cobrancas/:clienteid", listarCobrancasCliente);
rotas.get("/cobrancas", listarCobrancas.listarCobrancas);
rotas.get("/detalharCobranca/:id", detalharCobranca.detalharCobranca);

module.exports = rotas;
