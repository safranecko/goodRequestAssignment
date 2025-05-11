import {Router} from 'express'
import passport from "passport";

import {handleGetAllUsers} from "../controllers/userController";

const router: Router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), handleGetAllUsers)

export default router
