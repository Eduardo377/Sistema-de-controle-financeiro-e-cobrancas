const yup = require('./yup');

const verificarEmailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    nome: yup
        .string()
        .required()
        .min(3)
        .max(10)
});

module.exports = verificarEmailSchema;