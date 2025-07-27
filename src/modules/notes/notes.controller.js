import { Router } from "express"
import { isAuthenticated } from "../../middlewares/authenticated.middlewares.js"
import { isAuthorized } from "../../middlewares/authorizated.middlewares.js"
import { roles } from "../../utils/endpoints/endpoit.js"
import * as noteValidation from "./note.validation.js"
import {validation} from "../../middlewares/validation.middlewares.js"
import * as noteService from "./notes.service.js"
import {AsyncHandler} from "../../utils/errorhandler/asyncHandler.js"

const router=Router()

router.post("/",isAuthenticated,isAuthorized([roles.user]),validation(noteValidation.createNote),AsyncHandler(noteService.createNote))
router.delete("/:id",isAuthenticated,isAuthorized([roles.user]),validation(noteValidation.deleteNote),AsyncHandler(noteService.deleteNote))
export default router