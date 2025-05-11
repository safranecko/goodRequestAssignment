import { Router } from 'express'
import {handleLogin, handleRegister} from '../controllers/authController'

const router: Router = Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)

export default router
