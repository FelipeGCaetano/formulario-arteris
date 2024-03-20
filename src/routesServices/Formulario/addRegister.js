import dbUsuarios from "../../database/models/usuarios.js";

class addRegisterService {
    async execute({ email, descricao, contaContabil, valorEmConta }) {
        try{

            const currentRegister = await dbUsuarios.findOne({ email })

            if(currentRegister == null) {
                const addRegister = await dbUsuarios.create({
                    email,
                    registros: {
                        descricao,
                        contaContabil,
                        valorEmConta
                    }
                })
                
                return { success: true, message: 'Novo registro adicionado com sucesso' }
            }

            const newRegister = {
                descricao,
                contaContabil,
                valorEmConta
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