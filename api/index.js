import express from 'express'
import routerApi from './controller/index.js'
import cors from 'cors'
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error_handler.js'
const app = express()
const PORT = 3001
app.use(express.json())

const whitelist = ['http://localhost:5500', 'http://myapp.co']
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Not permition'))
        }
    }
}
app.use(cors(options))
routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running in the port: ${PORT}`)
})