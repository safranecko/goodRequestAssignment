import {Router} from 'express'
import {handleCreateProgram, handleGetAllPrograms} from "../controllers/programController";
import passport from "passport";
import {requireRole} from "../middleware/requireRole";
import {USER_ROLE} from "../utils/enums";


const router: Router = Router()

router.get('/', handleGetAllPrograms)
router.post('/create', passport.authenticate('jwt', {session: false}), requireRole(USER_ROLE.ADMIN), handleCreateProgram)

export default router
