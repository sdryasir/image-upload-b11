import express from "express";
import { registerUser, loginUser, logOutUser } from "../controllers/authController.js";

const router = express.Router();


router.route('/auth/register').post(registerUser);

router.route('/auth/login').post(loginUser);
router.route('/auth/logout').post(logOutUser);




export default router;
