import {Router} from 'express'
import {handleGetAllPrograms} from "../controllers/programController";


const router: Router = Router()

router.get('/', handleGetAllPrograms)

export default router
