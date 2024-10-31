import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroupChat } from "../controllers/chat.controller.js";

const router = Router()

router.route('/').post(protect,accessChat)
.get(protect,fetchChats)
router.route('/group').post(protect,createGroupChat)
router.route('/rename').put(protect,renameGroupChat)
router.route('/add').put(protect,addToGroup)
router.route('/remove').put(protect,removeFromGroup)


export default router