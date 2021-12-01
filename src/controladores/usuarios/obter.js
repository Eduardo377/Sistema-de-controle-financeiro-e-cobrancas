const knex = require('../../conexao');

const obterUsuario = async (req, res) => {
    const { id } = req.usuario;

    const {senha, ...usuario} = await knex('usuarios').where({ id }).first();

    if (usuario) {
        return res.status(200).json(usuario);
    };
    return res.status(400).json({ message: 'Usuário não encontrado' });

};

module.exports = { obterUsuario };