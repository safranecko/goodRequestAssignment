import {Router} from 'express'
import {
    handleCreateExercise, handleDeleteExercise,
    handleGetAllExercises,
    handleGetExercisesByProgram, handleUpdateExercise
} from "../controllers/exerciseController";
import passport from "passport";
import {requireRole} from "../middleware/requireRole";
import {USER_ROLE} from "../utils/enums";


const router: Router = Router()

router.get('/', handleGetAllExercises)
router.get('/by-program/:programID', handleGetExercisesByProgram)
router.post(
    '/create',
    passport.authenticate('jwt', {session: false}),
    requireRole(USER_ROLE.ADMIN),
    handleCreateExercise)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    requireRole(USER_ROLE.ADMIN),
    handleDeleteExercise
)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    requireRole(USER_ROLE.ADMIN),
    handleUpdateExercise
)

export default router
