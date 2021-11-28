const yup = require('./yup');

const editarUsuarioSchema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string(),
    nome: yup.string().required(),
    cpf: yup.string(),
    tel: yup.string()
});

module.exports = editarUsuarioSchema;