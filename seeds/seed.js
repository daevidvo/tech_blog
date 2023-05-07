const faker = require('faker')
const sequelize = require('../config/connection.js')
const { User, Post, Comment } = require('../models')

const seedDatabase = async () => {
    await sequelize.sync({force:true})

    let fakeUserData = []
    for(let x=0;x<5;x+=1){
        fakeUserData.push({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(10)
        }) 
    }

    let fakeComments = []
    for(let x=0;x<5;x+=1){
        fakeComments.push({
            text: faker.lorem.words(5),
            dateCreated: Comment.createdOnDate(),
            post_id: Math.floor(Math.random()*3),
            user_id: Math.floor(Math.random()*5)
        })
    }

    let fakePosts = []
    for(let x=0;x<3;x+=1){
        fakePosts.push({
            title: faker.lorem.words(3),
            text: faker.lorem.words(10),
            dateCreated: Post.createdOnDate(),
            user_id: Math.floor(Math.random()*5)
        })
    }
    
    await User.bulkCreate(fakeUserData, {
        individualHooks: true,
        returning: true
    })

    await Post.bulkCreate(fakePosts, {
        individualHooks
    })



    process.exit(0)
}

seedDatabase();