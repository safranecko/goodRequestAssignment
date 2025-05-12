import {models} from '../db'

const { UserExerciseProgress, User, Exercise } = models

export const createProgressEntry = async ({
                                              userID,
                                              exerciseID,
                                              duration,
                                              completedAt = new Date()
                                          }: {
    userID: number
    exerciseID: number
    duration: number
    completedAt?: Date
}) => {
    const user = await User.findByPk(userID)
    const exercise = await Exercise.findByPk(exerciseID)

    if (!user || !exercise) {
        throw new Error('User or Exercise not found')
    }

    return UserExerciseProgress.create({
        userID,
        exerciseID,
        duration,
        completedAt
    });
}

export const deleteExerciseUserProgressById = async (id: number, userID: number) => {
    const userExerciseProgress = await models.UserExerciseProgress.findByPk(id)

    if (!userExerciseProgress) {
        throw new Error('Exercise not found')
    }

    if (userExerciseProgress.userID !== userID) {
        throw new Error('Exercise progress does not belong to user')
    }

    await userExerciseProgress.destroy()

    return {message: 'Exercise progress deleted successfully'}
}

export const getUserProgress = async (userID: number) => {
    return UserExerciseProgress.findAll({
        where: { userID },
        include: [{
            model: Exercise,
            attributes: ['id', 'name', 'difficulty']
        }]
    })
}
