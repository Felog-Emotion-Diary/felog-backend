import { Diary } from '@prisma/client';
import prisma from '../lib/prisma';


export class StatisticsRepository {
  async findByDateRange(email: string, startDate: string, endDate: string){
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
        content: true,
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
}