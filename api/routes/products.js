import ProductService from '../services/product.js'
import { Router } from 'express'
import { validatorHandler } from '../middlewares/validator_handler.js'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.js'
const router = Router()
const service = new ProductService()

router.get('/', async (req, res) => {
    const products = await service.find()
    res.json(products)
})


router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const product = await service.findOne(id)
            res.json(product)
        } catch (error) {
            next(error)
        }


    })

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body
        const newProduct = await service.create(body)
        res.status(201).json(newProduct)

    })

router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema
        , 'body'),
    async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const updateProduct = await service.update(id, body)
        res.json(updateProduct)
    } catch (error) {
        next(err)
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteProduct = await service.delete(id)
    res.json(deleteProduct)
})

export default router