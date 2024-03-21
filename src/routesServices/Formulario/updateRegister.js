import dbUsuarios from "../../database/models/usuarios.js";

class updateRegisterService{
    async execute({email, valoresAntigos, valoresNovos}){
        try{
            const user = await dbUsuarios.findOne({email})

            for(let registro of user.registros) {
                if(registro.descricao == valoresAntigos.descricao && registro.contaContabil == valoresAntigos.contaContabil) {
                    registro.descricao = valoresNovos.descricao
                    registro.contaContabil = valoresNovos.contaContabil
                    registro.valorEmConta = valoresNovos.valorEmConta
                }
            }

            const updateRegister = await dbUsuarios.updateOne(
                {email},
                {$set: {registros: user.registros}}
            )

            if(updateRegister.modifiedCount == 0) {
                return { success: false, message: 'Erro ao atualizar registro.' }
            } 

            return { success: true, message: 'Registro atualizado com sucesso!' }

        } catch (err) {
            return { message: err.message }
        }
    }
}

export default updateRegisterService