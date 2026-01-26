import app from './app';
import { env } from './config/env';
import dotenv from 'dotenv';

dotenv.config();

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} (${env.nodeEnv})`)
});