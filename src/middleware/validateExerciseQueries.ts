import { Request, Response, NextFunction } from 'express'

export const validateExerciseQuery = (req: Request, res: Response, next: NextFunction) => {
    const { programID, search, page, limit } = req.query

    if (programID && isNaN(Number(programID))) {
        return res.status(400).json({ message: 'Invalid programID: must be a number' })
    }

    if (page && (!/^\d+$/.test(page as string) || Number(page) <= 0)) {
        return res.status(400).json({ message: 'Invalid page: must be a positive integer' })
    }

    if (limit && (!/^\d+$/.test(limit as string) || Number(limit) <= 0)) {
        return res.status(400).json({ message: 'Invalid limit: must be a positive integer' })
    }

    if (search) {
        if (typeof search !== 'string') {
            return res.status(400).json({ message: 'Invalid search: must be a string' })
        }

        const searchValue = search.trim()

        const dangerousPattern = /[%;'"\\]|--|\/\*|\*|\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b/i

        if (dangerousPattern.test(searchValue)) {
            return res.status(400).json({ message: 'Search query contains forbidden characters or patterns' })
        }

        if (searchValue.length > 100) {
            return res.status(400).json({ message: 'Search query is too long' })
        }

        req.query.search = searchValue
    }


    next()
}
