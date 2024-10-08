import productsRouter from "../routes/products.js"
import usersRouter from '../routes/users.js'
import categoriesRouter from '../routes/categories.js'
import { Router } from "express"
const router = Router()

const routerApi = (app) => {
    app.use('/api/v1', router)
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
}

export default routerApi