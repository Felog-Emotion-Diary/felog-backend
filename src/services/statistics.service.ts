import { StatisticsRepository } from '../repositories/statistics.repository';

export class StatisticsService {
  constructor(private readonly diaryRepository = new StatisticsRepository()) {}

  // 1. 가장 긴 일기 조회
  async getLongestDiary(email:string, startDate: string, endDate: string): Promise<{ longText: number }> {
    const diaries = await this.diaryRepository.findByDateRange(email, startDate, endDate);
    if (diaries.length === 0) return { longText: 0 };

    const longest = diaries.reduce((prev, curr) =>
      curr.content.length > prev.content.length ? curr : prev
    );

    return { longText: longest.content.length };
  }

  // 2. 감정 비율 조회
  async getEmotionRatio(email:string, startDate: string, endDate: string): Promise<{
    mostIdx: number;
    emotionCounts: { emotion: string; count: number }[];
  }> {
    const diaries = await this.diaryRepository.findByDateRange(email,startDate, endDate);

    const emotionCounts: Record<number, number> = {};
    for (const diary of diaries) {
      const emotion = diary.emotionId;
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    }

    const emotionArray = Object.entries(emotionCounts).map(([emotion, count]) => ({ emotion, count }));
    emotionArray.sort((a, b) => b.count - a.count);

    return {
      mostIdx: emotionArray.length > 0 ? 0 : -1,
      emotionCounts: emotionArray,
    };
  }

  // 3. 총 작성 수 및 최대 연속 작성 수
  async getDiaryCounts(email:string, startDate: string, endDate: string): Promise<{
    totalCount: number;
    streakCount: number;
  }> {
    const diaries = await this.diaryRepository.findByDateRange(email,startDate, endDate);
    const totalCount = diaries.length;

    const dates = diaries.map(d => new Date(d.date)).sort((a, b) => a.getTime() - b.getTime());

    let maxStreak = 0;
    let streak = 0;

    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        streak = 1;
      } else {
        const diffDays = (dates[i].getTime() - dates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          streak++;
        } else if (diffDays > 1) {
          maxStreak = Math.max(maxStreak, streak);
          streak = 1;
        }
      }
    }
    maxStreak = Math.max(maxStreak, streak);

    return { totalCount, streakCount: maxStreak };
  }

  // 4. 요일별 주요 감정
  async getEmotionPerWeek(email:string, startDate: string, endDate: string): Promise<{
    [day: string]: { emotion: number; count: number };
  }> {
    const diaries = await this.diaryRepository.findByDateRange(email,startDate, endDate);
    const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const weekData: Record<string, Record<number, number>> = {
      sun: {}, mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}
    };

    for (const diary of diaries) {
      const day = dayMap[new Date(diary.date).getDay()];
      const emotion = diary.emotionId
      weekData[day][emotion] = (weekData[day][emotion] || 0) + 1;
    }

    const result: Record<string, { emotion: number; count: number }> = {};
    for (const day of dayMap) {
      const emotionEntries = Object.entries(weekData[day]);
      if (emotionEntries.length === 0) {
        result[day] = { emotion: 0, count: 0 };
      } else {
        const [emotion, count] = emotionEntries.sort((a, b) => b[1] - a[1])[0];
        result[day] = { emotion: parseInt(emotion), count };
      }
    }

    return result;
  }

  // 5. 요일별 일기 작성 횟수
  async getDiaryCountPerWeek(email:string, startDate: string, endDate: string): Promise<
    { day: string; count: number }[]
  > {
    const diaries = await this.diaryRepository.findByDateRange(email, startDate, endDate);
    const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const counts: Record<string, number> = {
      sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0
    };

    for (const diary of diaries) {
      const day = dayMap[new Date(diary.date).getDay()];
      counts[day]++;
    }

    return dayMap.map(day => ({ day, count: counts[day] }));
  }
}