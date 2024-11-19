import express from 'express'

import { clerkWebhooks } from '../controllers/UserController.js';  // if in routes folder

const userRouter  = express.Router()

userRouter.post('/webhooks',clerkWebhooks)

export default userRouter