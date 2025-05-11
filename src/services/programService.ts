import {models} from "../db";
const {
    Program
} = models

export const getAllPrograms = async () => {
    return  Program.findAll()
}