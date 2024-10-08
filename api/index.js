import express from 'express'
import routerApi from './controller/index.js'
import cors from 'cors'
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error_handler.js'
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())

app.use(cors())
routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running in the port: ${PORT}`)
})