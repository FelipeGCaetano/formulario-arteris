import dbUsuarios from "../../database/models/usuarios.js"

class avaiableOpitionsService {
    async execute({ email }) {
        const create = await dbUsuarios.create({
            email, 
            registros: [
                {
                    descricao: "AR11004 - SUP COMUNICAÇÃO E MARCA",
                    contaContabil: "5110101008 - Comissão e Gratificações-(DESP)"
                },
                {
                    descricao: "AR11004 - SUP COMUNICAÇÃO E MARCA",
                    contaContabil: "5110103001 - Seguro de Vida em Grupo-(DESP)"
                }
            ]
        })

        return create
    }
}

export default avaiableOpitionsService