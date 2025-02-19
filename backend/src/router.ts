import { Router } from "express"
import multer from "multer";

import UserController from "./controllers/user/UserController";
import ReturnNameController from "./controllers/user/ReturnNameController";

import uploadConfig from './config/multer'


const upload = multer(uploadConfig.upload("./tmp"));

const router = Router();


router.post("/send", upload.single("file"), UserController.handle);

router.get("/return", ReturnNameController.handle);




export default router;