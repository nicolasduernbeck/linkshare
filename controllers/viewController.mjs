import catchError from '../utils/catchError.mjs';
import User from '../models/userModel.mjs';
import AppError from '../utils/appError.mjs';

export const renderLinks = catchError(async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug });
  if (!user) return next(new AppError('Page not found', 404));
  res.status(200).render('links', { name: user.name, links: user.links });
});

export const renderLogin = catchError(async (req, res, next) => {
  res.render('login');
});

export const renderRegister = catchError(async (req, res, next) => {
  res.render('register');
});
