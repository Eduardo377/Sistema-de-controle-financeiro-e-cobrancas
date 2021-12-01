const editarUsuarioSchema = require('../../validacoes/editarUsuarioSchema');
const key = require('../../senhaHash');
const knex = require('../../conexao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const editarUsuario = async (req, res) => {
    const { authorization } = req.headers;
    const { nome, email, cpf, tel, senha } = req.body;

    if (!authorization) {
        return res.status(404).json({ message: 'Token não informado!' });
    };

    try {
        await editarUsuarioSchema.validate(req.body);

        const existeEmail = await knex('usuarios').where({ email }).first();

        const { id } = req.usuario;

        if (existeEmail && Number(existeEmail.id !== Number(id))) {
            return res.status(400).json({
                message: "O email já existe",
                field: "email"
            });
        };

        if (cpf) {
            const existeCpf = await knex('usuarios').where({ cpf }).first();

            if (existeCpf && Number(existeCpf.id !== Number(id))) {
                return res.status(400).json({
                    message: "O cpf já existe",
                    field: "email"
                });
            };
        };

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

module.exports = { editarUsuario };