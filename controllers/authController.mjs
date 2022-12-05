import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import AppError from '../utils/appError.mjs';
import User from '../models/userModel.mjs';

import catchError from '../utils/catchError.mjs';

const signToken = payload => {
  return new Promise(resolve => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    resolve(token);
  });
};

const verifyToken = token => {
  return new Promise(resolve => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    resolve(payload);
  });
};

export const loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Invalid request body', 400));

  const user = await User.findOne({ email: req.body.email }).select('+password');
  const errMsg = 'Invalid user or password';
  if (!user) return next(new AppError(errMsg, 400));

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return next(new AppError(errMsg, 400));

  const token = await signToken({ userId: user.id });
  res.cookie('jwt', token);
  res.status(200).json({ status: 'success', token });
});

export const protect = catchError(async (req, res, next) => {
  let token;
  if (req.headers.authentication && req.headers.authentication.startsWith('Bearer')) {
    token = req.headers.authentication.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in', 401));

  const payload = await verifyToken(token);
  const user = await User.findOne({ _id: payload.userId });

  if (!user) return next(new AppError('You are not logged in!', 401));

  req.user = user;
  next();
});
