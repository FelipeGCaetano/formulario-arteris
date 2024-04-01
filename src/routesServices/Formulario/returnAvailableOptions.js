import _ from "lodash"
import dbUsuarios from "../../database/models/usuarios.js"

class avaiableOpitionsService {
    async execute({ email }) {
        try{
            const options = await dbUsuarios.findOne({ email })

            if(options == null) return { success: false, message: `Nenhnum registro encontrado para o email: ${email}`}

            //const groupByDesc = _.groupBy(options.registros, 'descricao')

            // const availableOptions = {}
            // for (let desc in groupByDesc) {
            //     availableOptions[desc] = groupByDesc[desc].map(registro => {
            //         return {
            //             contaContabil: registro.contaContabil,
            //             valorEmConta: Number(registro.valorEmConta.toFixed(2))
            //           }
            //     })
            // }
    
            // return availableOptions

            const resultado = {};

            options.registros.forEach(registro => {
                const { descricao, grupoDaConta, conta, valorEmConta } = registro;

                if (!resultado[descricao]) {
                resultado[descricao] = [];
                }

                let grupoEncontrado = resultado[descricao].find(item => item[grupoDaConta]);

                if (!grupoEncontrado) {
                grupoEncontrado = { [grupoDaConta]: [] };
                resultado[descricao].push(grupoEncontrado);
                }

                grupoEncontrado[grupoDaConta].push({ conta, valorEmConta: valorEmConta.toFixed(2) });
            });


            return(resultado);


        } catch (err) {
            return {message: err.message}
        }

    }
}

export default avaiableOpitionsService
