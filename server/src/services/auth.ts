import { User, userModel } from '../models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';

const findUser = (username: string) => userModel.findOne({ username });

export const loginUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username);
    if (!user) {
      return res.status(400).json({ message: 'invalid username' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'incorrect password' });
    }

    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: '30d',
    });
    return res.status(200).json({
      token: token,
      user: { username: user.username, role: user.role },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
  const user = await findUser(decoded.username);
  if (!user) return false;
  if (decoded.password !== user.password) return false;
  return true;
};
