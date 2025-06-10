import { PrismaClient, DiaryStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const USERS = ['static@gmail.com'];
const EMOTIONS = [1, 2, 4, 8, 16, 32, 64];

function getDateStrings(start: string, end: string): string[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates: string[] = [];

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().slice(0, 10));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}

async function main() {
  // ✅ 1. 기존 일기 삭제
await prisma.diary.deleteMany({ where: { email: 'static@gmail.com' } });
  console.log('🗑️ 기존 일기를 모두 삭제했습니다.');

  // ✅ 2. 날짜별 일기 하나씩 생성
  const dateList = getDateStrings('2025-01-01', '2025-06-10');

  for (const date of dateList) {
    await prisma.diary.create({
      data: {
        title: faker.lorem.words({ min: 2, max: 6 }),
        content: faker.lorem.paragraphs({ min: 1, max: 3 }),
        date,
        createdAt: new Date(date),
        img: null,
        email: faker.helpers.arrayElement(USERS),
        emotionId: faker.helpers.arrayElement(EMOTIONS),
        status: Math.random() > 0.2 ? DiaryStatus.PUBLISHED : DiaryStatus.TEMP,
      },
    });
  }

  console.log(`✅ ${dateList.length}개의 일기를 새로 생성했습니다.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
