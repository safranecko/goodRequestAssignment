import {Router} from 'express'
import passport from "passport";

import {handleGetAllUsers, handleGetUserById, handleUpdateUser} from "../controllers/userController";
import {requireRole} from "../middleware/requireRole";
import {USER_ROLE} from "../utils/enums";

const router: Router = Router()

router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    handleGetAllUsers)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    requireRole(USER_ROLE.ADMIN),
    handleUpdateUser
)
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    requireRole(USER_ROLE.ADMIN),
    handleGetUserById
)

export default router
