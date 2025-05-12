import { Router } from 'express'
import {handleLogin, handleRegister} from '../controllers/authController'
import {validateRegisterInput} from "../middleware/validateRegistrationInput";

const router: Router = Router()

router.post('/register',validateRegisterInput, handleRegister)
router.post('/login', handleLogin)

export default router
