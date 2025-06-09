import { Request, Response } from 'express';
import * as DiaryService from '../services/diary.service';

export const writeDiary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const { title, content, emotionId, img, status, email } = req.body;

    if (!date || !email) {
      res.status(400).json({ message: 'date and email are required' });
      return;
    }

    const { created } = await DiaryService.upsertDiary(
      String(email),
      String(date),
      { title, content, emotionId, img, status }
    );

    res.status(created ? 201 : 200).json({
      message: '작성' + (created ? '' : '(수정)') + '이 완료되었습니다.'
    });
  } catch (err) {
    res.status(500).json({ message: '작성 실패', error: err });
  }
};


export const getAllDiaries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, email } = req.query;

    if (!startDate || !endDate || !email) {
      res.status(400).json({ message: 'startDate, endDate, and email are required' });
      return;
    }

    const diaries = await DiaryService.getByDateRange(
      String(email),
      String(startDate),
      String(endDate)
    );

    const result = diaries.map(diary => ({
      date: diary.date,
      title: diary.title,
      img: diary.img,
      emotion: diary.emotion.emotion
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch diaries', error: err });
  }
};

export const getDiaryByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.params;
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ message: 'email is required' });
      return;
    }

    const diary = await DiaryService.getByDate(String(email), date);

    if (!diary) {
      res.status(404).json({ message: 'Diary not found' });
      return;
    }

    res.json({
      date: diary.date,
      title: diary.title,
      content: diary.content,
      img: diary.img,
      emotion: diary.emotion.emotion
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch diary', error: err });
  }
};

export const deleteDiaryByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, email } = req.query;

    if (!date || !email) {
      res.status(400).json({ message: 'date and email are required' });
      return;
    }

    const deleted = await DiaryService.deleteByDate(String(email), String(date));

    if (!deleted) {
      res.status(404).json({ message: 'Diary not found' });
      return;
    }

    res.status(200).json({ message: '삭제가 완료되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: '삭제 실패', error: err });
  }
};

