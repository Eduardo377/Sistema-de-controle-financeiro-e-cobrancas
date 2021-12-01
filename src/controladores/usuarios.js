const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const editarUsuarioSchema = require('../validacoes/editarUsuarioSchema');
const verificarEmailSchema = require('../validacoes/verificarEmailSchema');
const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const key = require('../senhaHash');

const verificarEmail = async (req, res) => {
    const { email } = req.body;

    try {
        await verificarEmailSchema.validate(req.body);

        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({
                message: "O email já existe",
                field: "email"
            });
        }

        return res.status(200).json({ message: "O email disponível" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await cadastroUsuarioSchema.validate(req.body);

        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({ 
                message: "O email já existe",
                field: "email"
            });
        }


        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada
        }

        const usuario = await knex('usuarios').insert(dados).returning('*');

        if (!usuario) {
            return res.status(400).json({ message: "O usuário não foi cadastrado." });
        }

        return res.status(200).json({ message: "Usuario Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const atualizarUsuario = async (req, res) => {
    const { authorization } = req.headers;
    const { nome, email, cpf, tel, senha } = req.body;

    if (!authorization) {
        return res.status(404).json({ message: 'Token não informado!' })
    }

    try {
        await editarUsuarioSchema.validate(req.body);

        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, key)

        const existeEmail = await knex('usuarios').where({ email }).first();

        if (existeEmail && Number(existeEmail.id !== Number(id))) {
            return res.status(400).json({ 
                message: "O email já existe",
                field: "email"
            });
        };

        const existeCpf = await knex('usuarios').where({ cpf }).first();

        if (existeCpf) {
            return res.status(400).json({
                message: "O cpf já está cadastrado!",
                field: "cpf"
            });
        }

        let hashNovaSenha = "";
        let dadosASerAtualizado = { nome: nome || null, email, cpf: cpf || null, tel: tel || null };

        if (senha) {
            hashNovaSenha = await bcrypt.hash(senha, 10);
            dadosASerAtualizado.senha = hashNovaSenha;
        };

        await knex("usuarios")
            .where({ id })
            .update(dadosASerAtualizado)
            .returning("*");

        return res.status(200).json({ message: 'Usuário Editado com Sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
};

const obterUsuario = (req, res) => {
    return res.status(200).json(req.usuario);
}

module.exports = {
    cadastrarUsuario,
    atualizarUsuario,
    verificarEmail,
    obterUsuario
};