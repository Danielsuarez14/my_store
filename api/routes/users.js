import { Router } from 'express'
const router = Router()
import UsersService from '../services/users.js'
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/users.js'
import { validatorHandler } from '../middlewares/validator_handler.js'
const service = new UsersService

router.get('/',(req, res) => {
    const users = service.find()
    res.json(users)
})

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    (req, res) => {
    const {id} = req.params
    const users = service.findOne(id)
    res.json(users)
})

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    (req, res) => {
    const body = req.body
    const product = service.create(body)
    res.json(product)

})

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    (req, res) => {
    const { id } = req.params
    const body = req.body
    const updateUser = service.update(id, body)
    res.json(updateUser)
})

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    (req, res) => {
    const { id } = req.params
    const deleteUser = service.delete(id)
    res.json(deleteUser)
})

export default router