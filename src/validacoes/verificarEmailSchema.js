const yup = require('./yup');

const verificarEmailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    nome: yup
        .string()
        .required()
});

module.exports = verificarEmailSchema;