import { Router } from "express"
import { isAdmin,authorize } from "../middlewares/auth.middleware.js"
import {
	createSubscription,
	getUserSubscription,
	getAllSubscriptions,
	updateSubscription,
	deleteSubscription,
	cancelSubscription,
	getUpcomingRenewals
} from "../controllers/subscription.controller.js"

const subscriptionRouter = Router()

subscriptionRouter.get("/", isAdmin, getAllSubscriptions)

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.patch("/:id", authorize, updateSubscription)

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getUserSubscription)

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription)

subscriptionRouter.get("/upcoming-renewals/:id", authorize, getUpcomingRenewals)

export default subscriptionRouter
