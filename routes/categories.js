import { Router } from 'express'
const router = Router()
import CategoriesService from '../services/categories.js'
import { validatorHandler } from '../middlewares/validator_handler.js'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/categories.js'
const service = new CategoriesService()

router.get('/', (req, res)=>{
    const categories = service.find()
    console.log(categories)
    res.json(categories)
})

router.get('/:id',
    validatorHandler(getCategorySchema, 'params'),
    (req, res)=>{
    const{id} = req.params
    const category = service.findOne(id)
    console.log(category)
    res.json(category)
})

router.post('/',
    validatorHandler(updateCategorySchema, 'body'),
    (req, res) => {
    const body = req.body
    const category = service.create(body)
    res.status(201).json(category)

})

router.patch('/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    (req, res)=>{
    const {id} = req.params
    const body = req.body
    const category = service.update(id, body)
    res.json(category)
})

router.delete('/:id',
    validatorHandler(getCategorySchema, 'params'),
    (req, res)=>{
    const {id} = req.params
    const deleteCategory = service.delete(id)
    res.json(deleteCategory)
})
export default router