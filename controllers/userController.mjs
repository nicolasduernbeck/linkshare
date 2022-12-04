import User from '../models/userModel.mjs';

import catchError from '../utils/catchError.mjs';

export const createUser = catchError(async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  res.status(201).json({ status: 'success', message: 'Account got created' });
});

export const getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find().select('-__v');
  res.status(200).json({ status: 'success', results: users.length, users });
});

export const getUser = (req, res, next) => {};
