import {models} from "../db";

const {
    Program
} = models

export const getAllPrograms = async () => {
    return  Program.findAll()
}

export const createProgram = async (name: string) => {
    if (!name || name.trim() === '') {
        throw new Error('Program name is required')
    }

    return Program.create({
        name: name.trim()
    });
}