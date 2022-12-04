export default () => {
  if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'production') {
    console.log('Invalid NODE_ENV! \n Please use: \n dev \n production');
    process.exit(1);
  }
};
