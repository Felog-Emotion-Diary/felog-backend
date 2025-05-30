import prisma from '../lib/prisma';

export const createUser = async (data: {
  email: string;
  password: string;
  salt: string;
  nickname: string;
}) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};