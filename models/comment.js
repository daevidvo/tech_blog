const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection.js')

class Comment extends Model{
    createdOnDate(){
        const currentDate = new Date()
        const day = currentDate.getDate()
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        return `${month}/${day}/${year}`
    }
}

Comment.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id: {
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment