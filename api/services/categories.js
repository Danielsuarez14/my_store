import  boom  from '@hapi/boom'
import { v4 as uuidv4 } from 'uuid'

class CategoriesService {
    constructor(){
        this.categories = []
        this.generate()
    }
    generate(){
        const namesCategories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Toys']
        for (let index = 0; index < namesCategories.length; index++){
            this.categories.push({ 
                id: uuidv4(),
                name: namesCategories[index]
            })
        }
        
    }

    create(data){
        const newCategory = {
            id: uuidv4(),
            name: data.name
        }
        this.categories.push(newCategory)
        return newCategory
    }

    find(){
        return this.categories;
    }

    findOne(id){
        const category = this.categories.find( category => category.id === id)
        if (!category) {
            throw boom.notFound('Product not found')
        }
        return category
    }

    update(id, changes){
        const index = this.categories.findIndex( index => index.id === id)
        if(index === -1) {
            throw boom.notFound('Product not found')
        }
        const category = this.categories[index]
        this.categories[index] = {
            ...category,
            ...changes
        }
        return this.categories[index]
    }

    delete(id){
        const index = this.categories.findIndex( index => index.id === id)
        if(index === -1) {
            throw boom.notFound('Product not found')
        }
        this.categories.splice(index, 1)
        return {id}
    }
}

export default CategoriesService