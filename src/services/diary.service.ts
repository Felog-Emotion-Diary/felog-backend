import * as DiaryRepository from '../repositories/diary.repository';

export const upsertDiary = async (
  userId: string,
  date: string,
  data: {
    title: string;
    content: string;
    emotionId: number;
    img?: string;
    status: string;
  }
) => {
  const existing = await DiaryRepository.findByDate(userId, date);

  if (existing) {
    await DiaryRepository.updateDiary(existing.id, data);
    return { created: false };
  } else {
    await DiaryRepository.createDiary({ ...data, date, userId });  // userId를 직접 넘기지 않으니 email 조회 필요
    return { created: true };
  }
};

export const getByDateRange = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  return await DiaryRepository.findByDateRange(userId, startDate, endDate);
};

export const getByDate = async (userId: string, date: string) => {
  return await DiaryRepository.findByDate(userId, date);
};

export const deleteByDate = async (userId: string, date: string) => {
  const diary = await DiaryRepository.findByDate(userId, date);
  if (!diary) return false;

  await DiaryRepository.deleteDiary(diary.id);
  return true;
};
