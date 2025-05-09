import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'

const router: Router = Router()

const {
    User
} = models

export default () => {
    router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
        const users = await User.findAll()
        return res.json({
            data: users,
            message: 'List of users'
        })
    })

    return router
}
