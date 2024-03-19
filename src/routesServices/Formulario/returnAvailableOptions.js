import dbUsuarios from "../../database/models/usuarios.js"

class avaiableOpitionsService {
    async execute({ email }) {

        const options = await dbUsuarios.findOne({ email })

        const description = []
        const accountingAccount = []

        for(let option of options.registros) {
            if(!description.includes(option.descricao)) {
                description.push(option.descricao)
            }
            accountingAccount.push(option.contaContabil)
        }

        return {description, accountingAccount}

    }
}

export default avaiableOpitionsService