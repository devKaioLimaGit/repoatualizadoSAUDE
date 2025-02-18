import { Router } from "express"
import multer from "multer";

import UserController from "./controllers/user/UserController";

import uploadConfig from './config/multer'


const upload = multer(uploadConfig.upload("./tmp"));

const router = Router();


router.post("/send", upload.single("file"), UserController.handle);





export default router;