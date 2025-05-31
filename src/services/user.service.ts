import { hashPassword } from '../utils/bcrypt';
import { signToken } from '../utils/jwt'
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

interface RegisterInput {
  email: string;
  password: string;
  nickname: string;
}

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async registerUser(input: RegisterInput): Promise<{ user: User; token: string }> {
    const {email, password, nickname} = input

    const existingEmail = await this.userRepository.findByEmail(email)
    if (existingEmail) throw new Error('이미 존재하는 이메일입니다.')
    
    const hashed = await hashPassword(password);
    const user = await this.userRepository.createUser(email, hashed, nickname)
    const token = signToken({userId: user.id})

    return {user, token}
  }

  async changePassword(userId: string, newPassword: string) {
    
  }

  async validatePassword(email: string, password: string) {
    
  }
}