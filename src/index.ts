import http from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'
import passport from './auth/passport-jwt'
import dotenv from 'dotenv'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import UserRouter from "./routes/users"
import AuthRouter from "./routes/auth"
import UserExerciseProgressRouter from "./routes/user-exercise-progress"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/programs', ProgramRouter)
app.use('/exercises', ExerciseRouter)
app.use('/users', UserRouter)
app.use('/auth', AuthRouter)
app.use('/user-exercise-progress', UserExerciseProgressRouter)
app.use(passport.initialize())

dotenv.config()


const httpServer = http.createServer(app)

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
