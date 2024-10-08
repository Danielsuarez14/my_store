import Joi from 'joi'
const id = Joi.string().uuid()
const first_name = Joi.string().min(2).max(20)
const last_name = Joi.string().min(2).max(20)
const number = Joi.number().integer().min(9)


export const createUserSchema = Joi.object({
    first_name: first_name.required(),
    last_name: last_name.required(),
    number: number.required()
})

export const updateUserSchema = Joi.object({
    first_name: first_name,
    last_name: last_name,
    number: number
})

export const getUserSchema = Joi.object({
    id: id.required()
})
