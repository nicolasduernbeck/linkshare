const sendErrDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message
  });
};

export default (err, req, res, next) => {
  const error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'fail';
  error.message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV === 'dev') {
    //App running in dev env
    sendErrDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    //Dev running in production env
  }
};
