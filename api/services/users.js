import { faker } from '@faker-js/faker'
import  boom  from '@hapi/boom'
import { v4 as uuidv4 } from 'uuid'
class UsersService {
    constructor(){
        this.users = [];
        this.generate()
    }
    generate(){
        const limit = 10
        for( let index = 0; index < limit; index++ ){
            this.users.push({
                id: uuidv4(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                number: faker.phone.number()
            })
        }
    }

    create(data){
        const newUser ={
            id: uuidv4(),
            first_name: data.first_name,
            last_name: data.last_name,
            number: data.number
        }
        this.users.push(newUser)
        return newUser
    }

    find(){
        return this.users;
    }

    findOne(id){
        const user = this.users.find( u => u.id === id)
        if (!user){
            throw boom.notFound('Product not found')
        }
        return user
    }

    update(id, changes){
        const index = this.users.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        
        const user = this.users[index]
        this.users[index] = {
            ...user,
            ...changes
        }
        return this.users[index]
    }

    delete(id){
        const index = this.users.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        } else {
            this.users.splice(index, 1)
            return { id }
        }
    }
}

export default UsersService