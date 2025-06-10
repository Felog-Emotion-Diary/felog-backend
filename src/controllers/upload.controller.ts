import { Request, Response } from 'express';
import { handleImageUpload } from '../services/upload.service';

export const uploadImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: '파일이 없습니다.' });
      return;
    }

    const url = await handleImageUpload(req.file);
    res.status(200).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '이미지 업로드 실패' });
  }
};
