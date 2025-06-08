import { Request, Response } from 'express';
import * as DiaryService from '../services/diary.service';

export const createDiary = async (req: Request, res: Response): Promise<void> => {
  try {
    const diary = await DiaryService.create(req.body);
    res.status(201).json(diary);
  } catch (err) {
    res.status(500).json({ message: 'Create failed', error: err });
  }
};

export const getAllDiaries = async (req: Request, res: Response): Promise<void> => {
  try {
    const diaries = await DiaryService.getAll();
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err });
  }
};

export const getDiaryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid diary ID' });
      return;
    }

    const diary = await DiaryService.getById(id);
    if (!diary) {
      res.status(404).json({ message: 'Diary not found' });
      return;
    }

    res.json(diary);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err });
  }
};

export const updateDiary = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid diary ID' });
      return;
    }

    const updated = await DiaryService.update(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
};

export const deleteDiary = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid diary ID' });
      return;
    }

    await DiaryService.remove(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
};
