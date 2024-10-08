import { faker } from '@faker-js/faker'
import  boom  from '@hapi/boom'
import { v4 as uuidv4 } from 'uuid'


class ProductService {
    constructor() {
        this.products = [];
        this.generate();
    }
    generate() {
        const limit = 100
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: uuidv4(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    async create(data) {
        const minId = uuidv4()
        const newProduct = {
            id: minId,
            ...data
        }
        this.products.push(newProduct)
        return newProduct
    }

    async find() {
        return this.products;
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === parseInt(id))
        if (!product) {
            throw boom.notFound('Product not found')
        }
        if (product.isBlock) {
            throw boom.conflict('Product is block')
        }
        return product
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === parseInt(id))
        if (index === -1) {
            throw boom.notFound('Product not found')
        }

        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index]
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === parseInt(id))
        if (index === -1) {
            throw boom.notFound('Product not found')
        } else {
            this.products.splice(index, 1)
            return { id }
        }
    }
}

export default ProductService