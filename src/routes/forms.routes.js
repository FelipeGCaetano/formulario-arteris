import { Router } from "express";
import avaiableOpitionsService from "../routesServices/Formulario/returnAvailableOptions.js";
import addRegisterService from "../routesServices/Formulario/addRegister.js";
const formsRouter = Router()

formsRouter.get('/', async (request, response) => {
    try {
        const email = request.query.email

        if(!email) return response.json({ message: 'E-mail não informado' }).status(400)

        const availableOptions = new avaiableOpitionsService()

        const options = await availableOptions.execute({ email })

        return response.json(options).status(200)

    } catch (err) {
        return response.json({message: err}).status(400)
    }
})

formsRouter.post('/adicionar-registro', async (request, response) => {
    try {

        const {email, descricao, contaContabil, valor} = request.body

        if(!email || !descricao || !contaContabil || !valor) return response.json({ message: 'Faltam parametros para adicioar novo registro.' }).status(400)

        const addRegister = new addRegisterService()

        const add = await addRegister.execute({ email, descricao, contaContabil, valor })

        return response.json(add).status(200)

    } catch (err) {
        return response.json({ message: err.message }).status(400)
    }
})

export default formsRouter