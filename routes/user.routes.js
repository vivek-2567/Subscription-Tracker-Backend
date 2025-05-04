import { Router } from 'express';

import { authorize, isAdmin } from '../middlewares/auth.middleware.js'
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', isAdmin, getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.patch('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;