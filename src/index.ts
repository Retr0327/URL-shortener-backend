import { config } from 'dotenv';
import app from './api';

config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server] Listening on port ${PORT}`);
});

export default server;
