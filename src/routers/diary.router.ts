import { Router } from 'express';
import * as DiaryController from '../controllers/diary.controller';
import { authMiddleware } from '../middlewares/middleware.auth';

const router = Router();

router.put('/write', authMiddleware, DiaryController.writeDiary);
router.get('/', authMiddleware,DiaryController.getAllDiaries);
router.get('/', authMiddleware, DiaryController.getDiaryByDate);
router.delete('/delete', authMiddleware, DiaryController.deleteDiaryByDate);

export default router;
