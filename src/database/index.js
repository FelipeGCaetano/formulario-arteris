import mongoose from "mongoose";
import { config } from 'dotenv';

config()

const mongoUser = process.env.MONGO_USERNAME
const mongoPass = process.env.MONGO_PASSWORD
const mongoHost = process.env.MONGO_HOST


mongoose.connect(`mongodb://${mongoHost}/database`, {
})


Promise = global.Promise

export default mongoose
