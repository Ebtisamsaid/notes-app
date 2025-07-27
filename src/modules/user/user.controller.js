import { Router } from "express";
import { AsyncHandler } from "../../utils/errorhandler/asyncHandler.js";
import * as userService from "./user.service.js"
import { isAuthenticated } from "../../middlewares/authenticated.middlewares.js";
import { fileValidation, upload } from "../../utils/multer/upload.multer.js";


const router=Router()
router.post("/upload-Pic",isAuthenticated,upload(fileValidation.image,`uploads/users`).single("image"),AsyncHandler(userService.uploadPic))
export default router