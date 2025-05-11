import {models} from "../db";
const {
    Exercise
} = models

export const getAllExercises = async () => {
    return Exercise.findAll()
}