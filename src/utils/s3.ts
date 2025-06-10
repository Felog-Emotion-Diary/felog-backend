// import AWS from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import dotenv from 'dotenv';

// dotenv.config();

// const s3 = new AWS.S3({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
//   region: process.env.AWS_REGION!,
// });

// export const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.AWS_S3_BUCKET!,
//     acl: 'public-read', // URL로 이미지 보기 허용
//     key: (req, file, cb) => {
//       const fileName = `images/${Date.now()}_${file.originalname}`;
//       cb(null, fileName);
//     },
//   }),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 최대 5MB
//   },
//   fileFilter: (req, file, cb) => {
//     const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error('지원되지 않는 파일 형식입니다.'));
//     }
//     cb(null, true);
//   },
// });

// export { upload };