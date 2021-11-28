const yup = require('./yup');

const cadastroUsuarioSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    senha: yup
        .string()
        .min(5)
        .max(10)
        .required(),
    nome: yup
        .string()
        .min(3)
        .max(10)
        .required()
});

module.exports = cadastroUsuarioSchema;