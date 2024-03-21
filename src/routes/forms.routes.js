import { Router } from "express";
import addJustifyService from "../routesServices/Formulario/addJustify.js";
import addRegisterService from "../routesServices/Formulario/addRegister.js";
import avaiableOpitionsService from "../routesServices/Formulario/returnAvailableOptions.js";

const formsRouter = Router()

formsRouter.get('/', async (request, response) => {
    try {
        const email = request.query.email

        if(!email) return response.status(400).json({ message: 'E-mail não informado' })

        const availableOptions = new avaiableOpitionsService()

        const options = await availableOptions.execute({ email })

        if(options.message) return response.status(400).json({ message })

        return response.status(200).json(options)

    } catch (err) {
        return response.status(500).json({message: err})
    }
})

formsRouter.post('/adicionar-registro', async (request, response) => {
    try {

        const {email, descricao, contaContabil, valorEmConta} = request.body

        if(!email || !descricao || !contaContabil || !valorEmConta) return response.status(400).json({ message: 'Faltam parametros para adicionar novo registro.' })

        const addRegister = new addRegisterService()

        const add = await addRegister.execute({ email, descricao, contaContabil, valorEmConta })

        if(add.success == false) return response.status(400).json({ success: false, message: add.message })

        return response.status(201).json(add)

    } catch (err) {
        return response.status(500).json({ message: err.message })
    }
})

formsRouter.put('/justificativa', async (request, response) => {
    try{
        const { email, descricao, contaContabil, valorEmConta, valorAJustificar, mes, justificativa } = request.body
        
        if(!email || !descricao || !contaContabil || !valorEmConta || !valorAJustificar || !mes || !justificativa) return response.status(400).json({ message: 'Faltam parametros para registrar a justificativa.' })

        const addJustify = new addJustifyService()

        const add = await addJustify.execute({ email, descricao, contaContabil, valorEmConta, valorAJustificar, mes, justificativa })

        if(add.success == false) return response.status(400).json({ success: false, message: add.message })

        return response.status(201).json(add)

    } catch (err) {
        return response.status(500).json({ message: err.message })
    }
})


export default formsRouter