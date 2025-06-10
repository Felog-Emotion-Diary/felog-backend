import prisma from '../lib/prisma';

export const createDiary = async (data: any) => {
  const { userId, ...rest } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');

  return await prisma.diary.create({
    data: {
      ...rest,
      email: user.email,
    },
  });
};


export const findByDateRange = async (userId: string, startDate: string, endDate: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');

  return await prisma.diary.findMany({
    where: {
      email: user.email,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      date: true,
      title: true,
      img: true,
      emotion: {
        select: {
          id: true,
          emotion: true,
        },
      },
    },
    orderBy: { date: 'asc' },
  });
};

export const findByDate = async (userId: string, date: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');

  return await prisma.diary.findFirst({
    where: {
      email: user.email,
      date,
    },
    include: {
      emotion: {
        select: { 
          id: true,
          emotion: true },
      },
    },
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
