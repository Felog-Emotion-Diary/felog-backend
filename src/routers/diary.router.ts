import { Router } from 'express';
import * as DiaryController from '../controllers/diary.controller';

const router = Router();

router.put('/write', DiaryController.writeDiary);
router.get('/', DiaryController.getAllDiaries);
router.get('/:date', DiaryController.getDiaryByDate);
router.delete('/delete', DiaryController.deleteDiaryByDate);

export default router;
