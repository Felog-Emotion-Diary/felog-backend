import express, { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', async (req: Request, res: Response) => {
  await userController.register(req, res);
});

export default router;
