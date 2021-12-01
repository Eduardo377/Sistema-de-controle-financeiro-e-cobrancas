const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../../senhaHash');
const loginSchema = require('../../validacoes/loginSchema');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);

        const usuario = await knex('usuarios').where('email', email).first();

        if (!usuario) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        };

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ message: "Email ou senha não conferem" });
        };

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, senhaHash, { expiresIn: '12h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { login };