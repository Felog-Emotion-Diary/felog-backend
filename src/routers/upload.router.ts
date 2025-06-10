// import express from 'express';
// import { upload } from '../utils/s3';
// import { authMiddleware } from '../middlewares/middleware.auth';

// const router = express.Router();

// router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: '파일이 없습니다.' });

//   const fileUrl = (req.file as any).location;
//   res.json({ url: fileUrl });
// });

// export default router;