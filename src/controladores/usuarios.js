const bcrypt = require('bcrypt');
const knex = require('../conexao');
const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const editarUsuarioSchema = require('../validacoes/editarUsuarioSchema');

const cadastrarUsuario = async (req, res) => {
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
        
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editarUsuario = async (req, res) => {
    await editarUsuarioSchema.validate(req.body);
 
}


module.exports = {
    cadastrarUsuario,
    editarUsuario
}