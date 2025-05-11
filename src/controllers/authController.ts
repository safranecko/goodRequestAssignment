import { Request, Response } from 'express'
import {loginUser, registerUser} from '../services/authService'

export const handleRegister = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body)
        res.status(201).json({
            message: 'User registered successfully',
            ...result
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'User already exists') {
            res.status(400).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body)
        res.status(200).json({
            message: 'Logged in successfully',
            ...result
        })
    } catch (err: any) {
        console.error(err)
        if (err.message === 'Invalid email or password') {
            res.status(401).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
