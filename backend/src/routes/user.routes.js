import { Router } from "express";
import {
    loginUser,
    registerUser,
    getAllUser
} from '../controllers/user.controller.js'
import protect from "../middlewares/auth.middleware.js";
const router =Router()
router.route('/').get(protect,getAllUser)
router.route('/login').post(loginUser)
router.route('/signup').post(registerUser)
export default router