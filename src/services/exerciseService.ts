import {models} from "../db";
import {EXERCISE_DIFFICULTY} from "../utils/enums";
import { Op } from 'sequelize'

const {Exercise, Program} = models

interface UpdateExerciseInput {
    id: number
    updates: {
        name?: string
        difficulty?: EXERCISE_DIFFICULTY
        programID?: number
    }
}

interface ExerciseFilterOptions {
    programID?: number
    search?: string
    page: number
    limit: number
}


export const getAllExercises = async () => {
    return Exercise.findAll()
}

export const createExercise = async ({
                                         name,
                                         difficulty,
                                         programID
                                     }: {
    name: string
    difficulty: EXERCISE_DIFFICULTY
    programID: number
}) => {
    if (!name || !difficulty || !programID) {
        throw new Error('Missing required fields')
    }

    if (!Object.values(EXERCISE_DIFFICULTY).includes(difficulty)) {
        throw new Error('Invalid difficulty level')
    }

    const program = await Program.findByPk(programID)
    if (!program) {
        throw new Error('Program does not exist')
    }

    return Exercise.create({
        name,
        difficulty,
        programID
    });
}

export const getExercisesByProgramId = async (programID: number) => {
    return models.Exercise.findAll({
        where: {programID},
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
        include: [{
            model: Program,
            as: 'program',
            attributes: ['id', 'name']
        }]
    });
}

export const deleteExerciseById = async (id: number) => {
    const exercise = await models.Exercise.findByPk(id)

    if (!exercise) {
        throw new Error('Exercise not found')
    }

    await exercise.destroy()

    return {message: 'Exercise deleted successfully'}
}

export const updateExerciseById = async ({ id, updates }: UpdateExerciseInput) => {
    const exercise = await Exercise.findByPk(id)

    if (!exercise) {
        throw new Error('Exercise not found')
    }

    if (
        updates.difficulty &&
        !Object.values(EXERCISE_DIFFICULTY).includes(updates.difficulty)
    ) {
        throw new Error('Invalid difficulty value')
    }

    if (updates.programID) {
        const programExists = await Program.findByPk(updates.programID)
        if (!programExists) {
            throw new Error('Program does not exist')
        }
    }

    await exercise.update(updates)

    return exercise
}

export const getExercisesFiltered = async ({
                                               programID,
                                               search,
                                               page,
                                               limit
                                           }: ExerciseFilterOptions) => {
    const whereClause: any = {}

    if (programID) {
        whereClause.programID = programID
    }

    if (search) {
        whereClause.name = {
            [Op.iLike]: `%${search}%`
        }
    }

    const offset = (page - 1) * limit

    return models.Exercise.findAll({
        where: whereClause,
        offset,
        limit,
        include: [{
            model: models.Program,
            as: 'program',
            attributes: ['id', 'name']
        }],
        order: [['id', 'ASC']]
    })
}