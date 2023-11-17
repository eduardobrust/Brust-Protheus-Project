import { Buffer } from 'buffer';
export const environment = {
  production: true,
  api_baseUrl: 'http://10.10.0.39:8061/html-protheus/rest',
  token: `Basic ${Buffer.from('admin:', 'utf8').toString('base64')}`
};
