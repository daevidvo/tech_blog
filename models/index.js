const User = require('./user.js')
const Post = require('./post.js')

User.hasMany(Post)

Post.hasOne(User)

module.exports = { User, Post }