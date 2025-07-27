import express from 'express'
import { Bootstrap } from './app.controller.js'
import { config } from 'dotenv'
config()
const app = express()
const port = process.env.PORT
 await Bootstrap(app)
app.listen(port, () => console.log(`app is running at ${port}!`))