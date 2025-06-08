import * as DiaryRepository from '../repositories/diary.repository';

export const create = async (data: any) => {
  return await DiaryRepository.createDiary(data);
};

export const getAll = async () => {
  return await DiaryRepository.findAllDiaries();
};

export const getById = async (id: number) => {
  return await DiaryRepository.findDiaryById(id);
};

export const update = async (id: number, data: any) => {
  return await DiaryRepository.updateDiary(id, data);
};

export const remove = async (id: number) => {
  return await DiaryRepository.deleteDiary(id);
};
