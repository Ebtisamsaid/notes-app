import { Router } from "express";
import { AsyncHandler } from "../../utils/errorhandler/asyncHandler.js";
import { isAuthenticated } from "../../middlewares/authenticated.middlewares.js";
import { isAuthorized } from "../../middlewares/authorizated.middlewares.js";
import { roles } from "../../utils/endpoints/endpoit.js";
import { summaryAi } from "./summary.service.js";

const router =Router()

router.post("/:id/summarize",isAuthenticated,isAuthorized([roles.user]),AsyncHandler(summaryAi))
export default router