import express from "express"
import { PORT } from "./config/env.js"

import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import subscriptionRoutes from "./routes/subscription.routes.js"
import connectToDatabse from "./database/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser"
import arcjetMiddleware from "./middlewares/arcjet.middleware.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(arcjetMiddleware)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/subscriptions", subscriptionRoutes)

// Error middleware should be the last middleware
app.use(errorMiddleware)

app.listen(PORT, async () => {
	console.log(`Server running on ${PORT} PORT`)

	await connectToDatabse()
})

export default app
