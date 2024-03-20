import { Router } from "express";
import addJustifyService from "../routesServices/Formulario/addJustify.js";
import addRegisterService from "../routesServices/Formulario/addRegister.js";
import avaiableOpitionsService from "../routesServices/Formulario/returnAvailableOptions.js";

const formsRouter = Router()

formsRouter.get('/', async (request, response) => {
    try {
        const email = request.query.email

        if(!email) return response.json({ message: 'E-mail não informado' }).status(400)

        const availableOptions = new avaiableOpitionsService()

        const options = await availableOptions.execute({ email })

        return response.json(options).status(200)

    } catch (err) {
        return response.json({message: err}).status(500)
    }
})

formsRouter.post('/adicionar-registro', async (request, response) => {
    try {

        const {email, descricao, contaContabil, valorEmConta} = request.body

        if(!email || !descricao || !contaContabil || !valorEmConta) return response.json({ message: 'Faltam parametros para adicionar novo registro.' }).status(400)

        const addRegister = new addRegisterService()

        const add = await addRegister.execute({ email, descricao, contaContabil, valorEmConta })

        return response.json(add).status(200)

    } catch (err) {
        return response.json({ message: err.message }).status(500)
    }
})

formsRouter.put('/justificativa', async (request, response) => {
    try{
        const { email, descricao, contaContabil, valorEmConta, valorAJustificar, mes, justificativa } = request.body
        
        if(!email || !descricao || !contaContabil || !valorEmConta || !valorAJustificar || !mes || !justificativa) return response.json({ message: 'Faltam parametros para registrar a justificativa.' }).status(400)

        const addJustify = new addJustifyService()

        const add = await addJustify.execute({ email, descricao, contaContabil, valorEmConta, valorAJustificar, mes, justificativa })

        return response.json(add).status(200)

    } catch (err) {
        return response.json({ message: err.message }).status(500)
    }
})


export default formsRouter