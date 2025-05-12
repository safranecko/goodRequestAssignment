import { Router } from 'express'
import passport from '../auth/passport-jwt'
import {
    handleCreateProgress,
    handleDeleteUserExerciseProgressById,
    handleGetUserProgress
} from '../controllers/userExerciseProgressController'

const router = Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    handleCreateProgress
)
router.get(
    '/:userID',
    passport.authenticate('jwt', { session: false }),
    handleGetUserProgress
)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    handleDeleteUserExerciseProgressById
)

export default router
