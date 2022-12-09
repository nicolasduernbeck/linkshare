import jwt from 'jsonwebtoken';

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

const sendCookie = async (res, payload, user) => {
  const token = await signToken(payload);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    httpOnly: true,
    secure: false
  });
  res.status(200).json({ status: 'success', token, data: { name: user.name, slug: user.slug } });
};

export const loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Invalid request body', 400));

  const user = await User.findOne({ email: req.body.email })
    .select('+password')
    .select('+slug');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('User not found or password is incorrect!', 400));

  sendCookie(res, { id: user.id }, user);
});

export const protect = catchError(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in', 401));

  const payload = await verifyToken(token);
  const user = await User.findOne({ _id: payload.id });

  if (!user) return next(new AppError('You are not logged in!', 401));

  req.user = user;
  next();
});
