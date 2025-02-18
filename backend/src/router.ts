import { Router } from "express"
import multer from "multer";

import UserController from "./controllers/user/UserController";

import uploadConfig from './config/multer'

import RecaptchaController from "./controllers/recaptcha/recaptchaController"

const upload = multer(uploadConfig.upload("./tmp"));

const router = Router();


router.post("/send", upload.single("file"), UserController.handle);


router.post("/verify-recaptcha", RecaptchaController.handle)


export default router;