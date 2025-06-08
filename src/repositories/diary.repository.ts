import prisma from '../lib/prisma';

export const createDiary = async (data: any) => {
  return await prisma.diary.create({ data });
};

export const findAllDiaries = async () => {
  return await prisma.diary.findMany({
    orderBy: { createdAt: 'desc' },
    include: { emotion: true },
  });
};

export const findDiaryById = async (id: number) => {
  return await prisma.diary.findUnique({
    where: { id },
    include: { emotion: true },
  });
};

export const updateDiary = async (id: number, data: any) => {
  return await prisma.diary.update({
    where: { id },
    data,
  });
};

export const deleteDiary = async (id: number) => {
  return await prisma.diary.delete({
    where: { id },
  });
};
