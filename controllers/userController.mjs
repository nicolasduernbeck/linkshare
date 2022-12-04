import User from '../models/userModel.mjs';

import catchError from '../utils/catchError.mjs';

export const createUser = catchError(async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  console.log('Finished');
});

export const getUser = (req, res, next) => {};
