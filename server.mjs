import mongoose from 'mongoose';
import { config } from 'dotenv';

import app from './app.mjs';
import envCheck from './utils/envCheck.mjs';

config({ path: './config.env' });
envCheck();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Database connection successfully established'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

const port = process.env.port || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
