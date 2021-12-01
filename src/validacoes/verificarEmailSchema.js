const yup = require('./yup');

const verificarEmailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
});

module.exports = verificarEmailSchema;