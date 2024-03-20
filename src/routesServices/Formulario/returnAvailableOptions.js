import _ from "lodash"
import dbUsuarios from "../../database/models/usuarios.js"

class avaiableOpitionsService {
    async execute({ email }) {
        try{
            const options = await dbUsuarios.findOne({ email })
    
            const groupByDesc = _.groupBy(options.registros, 'descricao')
    
            const availableOptions = {}
            for (let desc in groupByDesc) {
                availableOptions[desc] = groupByDesc[desc].map(registro => {
                    return {
                        contaContabil: registro.contaContabil,
                        valor: registro.valor.toFixed(2)
                      }
                })
            }
    
            return availableOptions
        } catch (err) {
            return {message: err.message}
        }

    }
}

export default avaiableOpitionsService
