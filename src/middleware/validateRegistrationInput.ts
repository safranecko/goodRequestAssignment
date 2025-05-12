import { Request, Response, NextFunction } from 'express'

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid or missing email address' })
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }

    next()
}
