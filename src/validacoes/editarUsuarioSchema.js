const yup = require('./yup');

const editarUsuarioSchema = yup.object().shape({
    email: yup.string().email(),
    senha: yup.string().min(5).max(10),
    nome: yup.string().min(3).max(10),
    cpf: yup.string(),
    tel: yup.string()
});

module.exports = editarUsuarioSchema;