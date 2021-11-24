const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const loginSchema = require('../validacoes/loginSchema');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);

        const usuarios = await knex('usuarios').where('email', email);

        if (usuarios === []) {
            return res.status(400).json("teste");
        }

        if (!usuarios) {
            return res.status(400).json("O usuario não foi encontrado");
        }

        const usuario = await knex('usuarios').where('email', email).first();

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json("Email ou senha não conferem");
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}