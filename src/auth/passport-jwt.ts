import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { models } from '../db'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const { User } = models

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.')
}

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        try {
            const user = await User.findByPk(jwt_payload.id)
            if (user) return done(null, user)
            return done(null, false)
        } catch (err) {
            return done(err, false)
        }
    }
))

export default passport
