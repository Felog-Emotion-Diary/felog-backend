import express, { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', async (req: Request, res: Response) => {
  await userController.register(req, res);
});

router.post('/reset', async (req: Request, res: Response) => {
  await userController.requestPasswordReset(req, res);
});

router.post('/reset/:token', async (req: Request, res: Response) => {
  await userController.resetPassword(req, res);
});

export default router;
