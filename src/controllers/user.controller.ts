import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
        const { email, password, nickname } = req.body;

        if (!email || !password || !nickname) {
            return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }

        const user = await userService.registerUser({ email, password, nickname });

        return res.status(201).json({ message: '회원가입 성공', user });
    } catch (error: any) {
        if (error.message === '이미 존재하는 이메일입니다.') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message || '회원가입 실패' });
    }
  }
}
