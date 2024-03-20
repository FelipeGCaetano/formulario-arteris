import dbUsuarios from "../../database/models/usuarios.js"

class addJustifyService {
    async execute({ email, descricao, contaContabil, valorEmConta, valorAJustificar, mes, justificativa }){
        try{

            const user = await dbUsuarios.findOne({email})
            for(let registro of user.registros) {

                if(registro.descricao == descricao && registro.contaContabil == contaContabil && registro.valor.toFixed(2) == valorEmConta) {
                    registro.justificativa = justificativa
                    registro.valorAJustificar = valorAJustificar
                    registro.mes = mes
                }
            }

            const updateRegister = await dbUsuarios.updateOne(
                {email},
                {$set: {registros: user.registros}}
            )

            if(updateRegister.modifiedCount == 0) {
                return { success: false, message: 'Erro ao adicionar justificativa.' }
            } 

            return { success: true, message: 'Justificativa adicionada com sucesso' }

        } catch (err) {
            return { message: err.message }
        }
    }
}

export default addJustifyService