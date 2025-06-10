import { Request, Response } from 'express';
import * as DiaryService from '../services/diary.service';
import { AuthenticatedRequest } from '../middlewares/middleware.auth';

export const writeDiary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const { title, content, emotionId, img, status } = req.body;
    const userId = req.user?.userId;

    console.log('📝 [writeDiary] user:', userId, 'query:', req.query, 'body:', req.body);

    if (!date || !userId) {
      console.warn('⚠️ [writeDiary] Missing date or user');
      res.status(400).json({ message: 'date가 필요합니다.' });
      return;
    }

    const { created } = await DiaryService.upsertDiary(
      userId,
      String(date),
      { title, content, emotionId, img, status }
    );

    console.log('✅ [writeDiary] Diary', created ? 'created' : 'updated');
    res.status(created ? 201 : 200).json({
      message: '작성' + (created ? '' : '(수정)') + '이 완료되었습니다.'
    });
  } catch (err) {
    console.error('❌ [writeDiary] Error:', err);
    res.status(500).json({ message: '작성 실패', error: err });
  }
};

export const getAllDiaries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user?.userId;

    console.log('📚 [getAllDiaries] user:', userId, 'query:', req.query);

    if (!startDate || !endDate || !userId) {
      res.status(400).json({ message: 'startDate, endDate가 필요합니다.' });
      return;
    }

    const diaries = await DiaryService.getByDateRange(
      userId,
      String(startDate),
      String(endDate)
    );

    const result = diaries.map(diary => ({
      date: diary.date,
      title: diary.title,
      img: diary.img,
      emotion: diary.emotion.id
    }));

    console.log('✅ [getAllDiaries] Found diaries:', result.length);
    res.json(result);
  } catch (err) {
    console.error('❌ [getAllDiaries] Error:', err);
    res.status(500).json({ message: '일기 조회 실패', error: err });
  }
};

export const getDiaryByDate = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const userId = req.user?.userId;

    console.log('📅 [getDiaryByDate] user:', userId, 'date:', date);

    if (!userId || !date) {
      res.status(400).json({ message: 'date가 필요합니다.' });
      return;
    }

    const diary = await DiaryService.getByDate(userId, String(date));

    if (!diary) {
      console.warn('⚠️ [getDiaryByDate] Diary not found');
      res.status(404).json({ message: 'Diary not found' });
      return;
    }

    console.log('✅ [getDiaryByDate] Diary found');
    res.json({
      date: diary.date,
      title: diary.title,
      content: diary.content,
      img: diary.img,
      emotion: diary.emotion.emotion
    });
  } catch (err) {
    console.error('❌ [getDiaryByDate] Error:', err);
    res.status(500).json({ message: '일기 조회 실패', error: err });
  }
};

export const deleteDiaryByDate = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const userId = req.user?.userId;

    console.log('🗑️ [deleteDiaryByDate] user:', userId, 'date:', date);

    if (!date || !userId) {
      res.status(400).json({ message: 'date가 필요합니다.' });
      return;
    }

    const deleted = await DiaryService.deleteByDate(userId, String(date));

    if (!deleted) {
      console.warn('⚠️ [deleteDiaryByDate] Diary not found');
      res.status(404).json({ message: 'Diary not found' });
      return;
    }

    console.log('✅ [deleteDiaryByDate] Diary deleted');
    res.status(200).json({ message: '삭제가 완료되었습니다.' });
  } catch (err) {
    console.error('❌ [deleteDiaryByDate] Error:', err);
    res.status(500).json({ message: '삭제 실패', error: err });
  }
};
