import dbUsuarios from "../../database/models/usuarios.js";

class addRegisterService {
    async execute({ email, descricao, contaContabil, valor }) {
        try{

            const currentRegister = await dbUsuarios.findOne({ email })

            const newRegister = {
                descricao,
                contaContabil,
                valor
            }

            currentRegister.registros.push(newRegister)

            const updateRegister = await dbUsuarios.updateOne(
                {email},
                {$set: { registros: currentRegister.registros }}
            )

            if(updateRegister.modifiedCount == 0) {
                return { success: false, message: 'Erro ao adicionar novo registro.' }
            } 

            return { success: true, message: 'Novo registro adicionado com sucesso' }

        } catch (err) {
            return {message: message.err}
        }
    }
}

export default addRegisterService