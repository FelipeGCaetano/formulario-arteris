import mongoose from "../index.js";

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