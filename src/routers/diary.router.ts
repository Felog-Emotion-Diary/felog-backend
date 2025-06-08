import { Router } from 'express';
import * as DiaryController from '../controllers/diary.controller';

const router = Router();

router.post('/', DiaryController.createDiary);
router.get('/', DiaryController.getAllDiaries);
router.get('/:id', DiaryController.getDiaryById);
router.patch('/:id', DiaryController.updateDiary);
router.delete('/:id', DiaryController.deleteDiary);

export default router;
