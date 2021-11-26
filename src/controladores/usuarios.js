const bcrypt = require('bcrypt');
const knex = require('../conexao');
const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const editarUsuarioSchema = require('../validacoes/editarUsuarioSchema');

const verificarEmail = async(req, res, next) => {
    const { nome, email } = req.body;
    if (!nome) {
        return;
    };
    if (!email) {
        return;
    };

    const existeUsuario = await knex('usuarios').where({ email }).first();

    if (existeUsuario) {
        return res.status(400).json("O email já existe");
    }
    next();
}

const cadastrarUsuario = async(req, res) => {
    const { nome, email, senha, cpf, tel } = req.body;

    try {
        await cadastroUsuarioSchema.validate(req.body);

        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({ message: "O email já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada,
            cpf,
            tel
        }

        const usuario = await knex('usuarios').insert(dados).returning('*');

        if (!usuario) {
            return res.status(400).json({ message: "O usuário não foi cadastrado." });
        }

        return res.status(200).json({ message: "Usuario Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(400).json({ message: 'Erro inesperado - ' + error.message });
    }
}

const atualizarUsuario = async(req, res) => {
    const { authorization } = req.headers;
    const { nome, email, cpf, tel, senha } = req.body;

    if (!authorization) {
        return res.status(404).json({ message: 'Token não informado!' })
    }

    try {
        await editarUsuarioSchema.validate(req.body);

        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, key)

        const usuario = await knex('usuarios').where({ id }).update({ nome, email, senha, cpf, tel }).returning('*');

        return res.status(200).json({ message: 'Usuário Editado com Sucesso!' });

    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado - ' + error.message });
    };
};

module.exports = {
    cadastrarUsuario,
    atualizarUsuario,
    verificarEmail
};