import prisma from '../lib/prisma';

export const createDiary = async (data: any) => {
  return await prisma.diary.create({ data });
};

export const findByDateRange = async (email: string, startDate: string, endDate: string) => {
  return await prisma.diary.findMany({
    where: {
      email: email,
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
          emotion: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  });
};

export const findByDate = async (email: string, date: string) => {
  return await prisma.diary.findFirst({
    where: {
      email,
      date
    },
    include: {
      emotion: {
        select: {
          emotion: true
        }
      }
    }
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
