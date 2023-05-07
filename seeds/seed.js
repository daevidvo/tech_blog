const faker = require("faker");
const sequelize = require("../config/connection.js");
const { User, Post, Comment } = require("../models");
const { createdOnDate } = require("../utils/helpers.js");

const seedDatabase = async () => {
  await sequelize.sync({force:true})

  let fakeUserData = [];
  let fakeComments = [];
  let fakePosts = [];

  for (let x = 0; x < 5; x += 1) {
    fakeUserData.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });
    fakeComments.push({
      text: faker.lorem.words(5),
      dateCreated: createdOnDate(),
      post_id: Math.floor(Math.random() * 2 + 1),
      user_id: Math.floor(Math.random() * 4 + 1),
    });
  }

  for (let x = 0; x < 3; x += 1) {
    fakePosts.push({
      title: faker.lorem.words(3),
      text: faker.lorem.words(10),
      dateCreated: createdOnDate(),
      user_id: Math.floor(Math.random() * 4 + 1),
    });
  }

  await User.bulkCreate(fakeUserData, {
    individualHooks: true,
  });

  await Post.bulkCreate(fakePosts);

  await Comment.bulkCreate(fakeComments);

  process.exit(0);
};

seedDatabase();
