import { Diary } from '@prisma/client';
import prisma from '../lib/prisma';


export class StatisticsRepository {
  async findByDateRange(userId: string, startDate: string, endDate: string){

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
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
        content: true,
        emotionId: true
      },
      orderBy: {
        date: 'asc'
      }
    });
  };
}