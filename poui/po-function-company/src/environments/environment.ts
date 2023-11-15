import { Buffer } from 'buffer'
export const environment = {
  production: true,
  api_baseUrl: 'http://localhost:8003/rest',
  token: `Basic ${Buffer.from('admin:', 'utf8').toString('base64')}`
};
