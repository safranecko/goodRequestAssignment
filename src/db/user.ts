import {
    Sequelize,
    DataTypes
} from 'sequelize'
import { DatabaseModel } from '../types/db'
import { USER_ROLE } from '../utils/enums'

export class UserModel extends DatabaseModel {
    id: number
    name: string
    surname: string
    nickName: string
    email: string
    age: number
    role: USER_ROLE
}

export default (sequelize: Sequelize) => {
    UserModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('ADMIN', 'USER'),
            allowNull: false
        }
    }, {
        paranoid: true,
        timestamps: true,
        sequelize,
        modelName: 'user'
    })

    return UserModel
}