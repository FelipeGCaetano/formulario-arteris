import mongoose from "../index.js";

const registrosSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    contaContabil: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    justificativa: {
        type: String
    }
})

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    registros: {
        type: Array,
        required: true
    }
}, {versionKey: false})

const dbUsuarios = mongoose.model('Usuarios', usersSchema)

export default dbUsuarios