import * as DiaryRepository from '../repositories/diary.repository';

// export const create = async (data: any) => {
//   return await DiaryRepository.createDiary(data);
// };
export const upsertDiary = async (
  email: string,
  date: string,
  data: {
    title: string;
    content: string;
    emotionId: number;
    img?: string;
    status: string;
  }
) => {
  const existing = await DiaryRepository.findByDate(email, date);

  if (existing) {
    await DiaryRepository.updateDiary(existing.id, data);
    return { created: false };
  } else {
    await DiaryRepository.createDiary({ email, date, ...data });
    return { created: true };
  }
};


export const getByDateRange = async (email: string, startDate: string, endDate: string) => {
  return await DiaryRepository.findByDateRange(email, startDate, endDate);
};

export const getByDate = async (email: string, date: string) => {
  return await DiaryRepository.findByDate(email, date);
};

export const deleteByDate = async (email: string, date: string) => {
  const diary = await DiaryRepository.findByDate(email, date);
  if (!diary) return false;

  await DiaryRepository.deleteDiary(diary.id);
  return true;
};

