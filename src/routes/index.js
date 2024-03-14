import { Router } from "express";

import formsRouter from "./forms.routes.js";

const routes = Router()

routes.use('/formulario', formsRouter)

export default routes