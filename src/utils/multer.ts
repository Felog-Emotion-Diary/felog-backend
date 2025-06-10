import multer, { FileFilterCallback } from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (
    req,
    file,
    cb: FileFilterCallback
  ) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('지원되지 않는 파일 형식입니다.'));
    }
    cb(null, true);
  },
});
