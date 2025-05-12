import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../types/db'

export class UserExerciseProgressModel extends DatabaseModel {
    id: number
    userID: number
    exerciseID: number
    completedAt: Date
    duration: number
}

export default (sequelize: Sequelize) => {
    UserExerciseProgressModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userID: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        exerciseID: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'userExerciseProgress',
        timestamps: false
    })

    UserExerciseProgressModel.associate = (models) => {
        UserExerciseProgressModel.belongsTo(models.User, { foreignKey: 'userID' })
        UserExerciseProgressModel.belongsTo(models.Exercise, { foreignKey: 'exerciseID' })
    }

    return UserExerciseProgressModel
}
