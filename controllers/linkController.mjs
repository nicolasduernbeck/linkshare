import catchError from '../utils/catchError.mjs';
import User from '../models/userModel.mjs';
import AppError from '../utils/appError.mjs';

export const addLink = catchError(async (req, res, next) => {
  const { title, link } = req.body;

  if (!title || !link) return next(new AppError('Invalid request body', 400));

  const user = await User.findById(req.user.id).select('+links');
  user.links.push({ title, link });
  console.log(user);

  await user.save({ validateBeforeSave: false });
  res.status(200).json({ status: 'success' });
});

export const removeLink = catchError(async (req, res, next) => {});
