import 'express'

declare global {
    namespace Express {
        interface Request {
            language?: 'en' | 'sk'
        }
    }
}
