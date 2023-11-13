import { Buffer } from '@types/node';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8003/rest',
  token: `Basic ${Buffer.from('admin:admin', 'utf8').toString('base64')}`
};
