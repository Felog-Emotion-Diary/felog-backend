import express from 'express';
import { upload } from '../utils/multer';
import { authMiddleware } from '../middlewares/middleware.auth';
import { uploadImageController } from '../controllers/upload.controller';

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), uploadImageController);

export default router;