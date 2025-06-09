//import { Diary } from '@prisma/client';
import prisma from '../lib/prisma';


export class StatisticsRepository {
  async getDiariesBetween(startDate: string, endDate: string): Promise<Diary[]> {
    return await prisma.diary.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc', // 문자열 정렬이지만 날짜 포맷이면 문제 없음
      },
    });
  }
}