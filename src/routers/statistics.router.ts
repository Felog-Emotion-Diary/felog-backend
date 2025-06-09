import express, { Request, Response, Router } from 'express';
import { StatisticsController } from '../controllers/statistics.controller';

const router = Router();
const statistisController = new StatisticsController();

router.get('/longTxt', async (req: Request, res: Response) => {
  await statistisController.longestDiary(req, res);
});

router.get('/emotionRatio', async (req: Request, res: Response) => {
  await statistisController.emotionRatio(req, res);
});

router.get('/counts', async (req: Request, res: Response) => {
  await statistisController.diaryCounts(req, res);
});

router.get('/emotionPerWeek', async (req: Request, res: Response) => {
  await statistisController.emotionPerWeek(req, res);
});

router.get('/diaryCountPerWeek', async (req: Request, res: Response) => {
  await statistisController.diaryCountPerWeek(req, res);
});

export default router;

