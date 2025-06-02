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
  // 이메일 입력 후 토큰 생성
  async requestPasswordReset(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('해당 이메일의 사용자가 없습니다.');

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30분 유효

    await this.userRepository.createPasswordResetToken(user.id, token, expiresAt);
    return token;
  }

  // 토큰 유효성 검사 후 비밀번호 재설정
  async resetPassword(token: string, newPassword: string) {
    const resetToken = await this.userRepository.findResetToken(token);
    if (!resetToken || resetToken.expiresAt < new Date() || resetToken.used) {
      return { success: false, message: '유효하지 않거나 만료된 토큰입니다.', status: 400 };
    }

    const hashed = await hashPassword(newPassword);
    await this.userRepository.updatePassword(resetToken.userId, hashed);
    await this.userRepository.markResetTokenUsed(token);

    return { success: true };
  }
}