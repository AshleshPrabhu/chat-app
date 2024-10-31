import { Router } from "express";
import {
    loginUser,
    registerUser,
} from '../controllers/user.controller.js'
const router =Router()
router.route('/login').post(loginUser)
router.route('/signup').post(registerUser)
export default router