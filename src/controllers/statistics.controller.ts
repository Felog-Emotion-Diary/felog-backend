import { Request, Response } from 'express';
import { StatisticsService } from '../services/statistics.service';

const statisticsService = new StatisticsService();


export class StatisticsController {
  // 1. 가장 긴 일기
  async longestDiary(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: '인증 실패' });
      const longTxt = await statisticsService.getLongestDiary(userId as string, startDate as string, endDate as string);
      return res.status(200).json({ longTxt });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || '가장 긴 일기 조회 실패' });
    }
  }

  // 2. 특정 기간 감정 비율
  async emotionRatio(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: '인증 실패' });
      const data = await statisticsService.getEmotionRatio(userId as string, startDate as string, endDate as string);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || '감정 비율 조회 실패' });
    }
  }

  // 3. 총 작성 수 / 최대 연속 작성 수
  async diaryCounts(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: '인증 실패' });
      const counts = await statisticsService.getDiaryCounts(userId as string, startDate as string, endDate as string);
      return res.status(200).json(counts);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || '일기 수 통계 조회 실패' });
    }
  }

  // 4. 요일별 주요 감정
  async emotionPerWeek(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: '인증 실패' });
      const data = await statisticsService.getEmotionPerWeek(userId as string, startDate as string, endDate as string);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || '요일별 감정 조회 실패' });
    }
  }

  // 5. 요일별 일기 작성 횟수
  async diaryCountPerWeek(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ message: '인증 실패' });
      const data = await statisticsService.getDiaryCountPerWeek(userId as string, startDate as string, endDate as string);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || '요일별 일기 수 조회 실패' });
    }
  }
}
