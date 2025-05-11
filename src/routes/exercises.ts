import {Router} from 'express'
import {handleGetAllExercises} from "../controllers/exerciseController";


const router: Router = Router()

router.get('/', handleGetAllExercises)

export default router
