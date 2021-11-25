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
    await cadastroUsuarioSchema.validate(req.body);

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
            return res.status(400).json("O email já existe");
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
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("Usuario Cadastrado com Sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarUsuario = async(req, res) => {
    const { nome, email, cpf, tel, senha } = req.body;
    const { id } = req.params;
    if (!nome) {
        return;
    };
    if (!email) {
        return;
    };
    try {

        const usuario = await knex('usuarios').where({ id }).update({ nome, email, senha, cpf, tel }).returning('*');

        const dados = usuario.map((user) => {
            return {
                id: user.id,
                nome: user.nome,
                email: user.email,
                cpf: user.cpf,
                tel: user.tel
            }
        });

        return res.status(200).json(dados);

    } catch (error) {
        return res.status(500).json({ messagem: 'Erro inesperado - ' + error.message });
    };
};

module.exports = {
    cadastrarUsuario,
    atualizarUsuario,
    verificarEmail
};