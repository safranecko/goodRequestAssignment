import { Request, Response, NextFunction } from 'express'

export const languageMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const lang = req.header('language')

    // Accept only 'en' or 'sk', default to 'en'
    req.language = lang === 'sk' ? 'sk' : 'en'

    next()
}
