const bcrypt = require('bcrypt');
const knex = require('../conexao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha ) {
        return res.status(404).json("Preencha os campos obrigatórios");
    }

    try {
        const encontrado = await knex('usuarios').where('email', email).first();

        if (encontrado) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada
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


module.exports = {
    cadastrarUsuario
}