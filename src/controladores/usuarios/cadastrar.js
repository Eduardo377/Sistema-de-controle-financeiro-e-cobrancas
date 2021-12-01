const cadastroUsuarioSchema = require('../../validacoes/cadastroUsuarioSchema');
const knex = require('../../conexao');
const bcrypt = require('bcrypt');

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
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada
        };

        const usuario = await knex('usuarios').insert(dados).returning('*');

        if (!usuario) {
            return res.status(400).json({ message: "O usuário não foi cadastrado." });
        }

        return res.status(200).json({ message: "Usuario Cadastrado com Sucesso!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports = { cadastrarUsuario };