const faker = require('faker')
const sequelize = require('../config/connection.js')
const { User } = require('../models')

const seedDatabase = async () => {
    await sequelize.sync({force:true})

    let fakeUserData = []
    for(let x=0;x<100;x+=1){
        fakeUserData.push({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(10)
        }) 
    }
    
    await User.bulkCreate(fakeUserData, {
        individualHooks: true,
        returning: true
    })

    process.exit(0)
}

seedDatabase();