import { Router } from "express";
import avaiableOpitionsService from "../routesServices/Formulario/returnAvailableOptions.js";

const formsRouter = Router()

formsRouter.get('/', async (request, response) => {
    try {
        const email = request.query.email
        console.log(email)

        const availableOptions = new avaiableOpitionsService()

        const options = await availableOptions.execute({ email })

        return response.json(options).status(200)

    } catch (err) {
        return response.json({message: err}).status(400)
    }
})

export default formsRouter