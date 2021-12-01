const senhaHash = require('../senhaHash');
const jwt = require('jsonwebtoken');
const knex = require('../conexao');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaHash);

        const usuarioExiste = await knex('usuarios').where('id', id).first();

        if (!usuarioExiste) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }

        const { senha, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = verificaLogin