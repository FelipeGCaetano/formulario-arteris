import express from "express";
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

import routes from "./routes/index.js";
app.use(routes)


app.listen(4000, async () => {
    console.log("API listen on port 4000")
})