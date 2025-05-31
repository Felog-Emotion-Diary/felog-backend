import { User } from '@prisma/client';
import prisma from '../lib/prisma';


export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, hashedPassword: string, name: string): Promise<User> {
    return prisma.user.create({
      data: { email, password: hashedPassword, nickname: name },
    });
  }

}
