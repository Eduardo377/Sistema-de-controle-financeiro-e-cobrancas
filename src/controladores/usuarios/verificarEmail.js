const verificarEmailSchema = require('../../validacoes/verificarEmailSchema');
const knex = require('../../conexao');

const verificarEmail = async (req, res) => {
    const { email } = req.body;

    try {
        await verificarEmailSchema.validate(req.body);

        const existeUsuario = await knex('usuarios').where({ email }).first();

        if (existeUsuario) {
            return res.status(400).json({
                message: "O email já existe",
                field: "email"
            });
        };

        return res.status(200).json({ message: "O email disponível" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    };
};

module.exports = { verificarEmail };