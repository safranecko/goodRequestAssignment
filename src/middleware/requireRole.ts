import { Request, Response, NextFunction } from 'express'
import { USER_ROLE } from '../utils/enums'

export const requireRole = (requiredRole: USER_ROLE) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as { role: USER_ROLE } | undefined

        if (!user || user.role !== requiredRole) {
            return res.status(403).json({
                message: `Access denied: ${requiredRole} role required`
            })
        }

        next()
    }
}
