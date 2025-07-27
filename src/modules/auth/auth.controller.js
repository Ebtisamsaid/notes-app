import { Router } from "express";
import * as authService from "./auth.service.js"
import {validation} from "../../middlewares/validation.middlewares.js"
import { AsyncHandler } from "../../utils/errorhandler/asyncHandler.js";
import * as authValidation from "./auth.validation.js"
import { isAuthenticated } from "../../middlewares/authenticated.middlewares.js";
const router=Router()
router.post("/register",validation(authValidation.registervalidation), AsyncHandler(authService.register))
router.post("/otp-confirm",validation(authValidation.confirmOtp), AsyncHandler(authService.confirmOtp))
router.post("/login",validation(authValidation.login), AsyncHandler(authService.login))
router.post("/logout",isAuthenticated, AsyncHandler(authService.logout))
router.post("/forget-password",validation(authValidation.forgetPassword), AsyncHandler(authService.forgetPassword))
router.post("/reset-password",validation(authValidation.resetPassword), AsyncHandler(authService.resetPassword))
export default router