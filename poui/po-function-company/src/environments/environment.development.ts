import { Buffer } from 'buffer'
export const environment = {
    production: false,
    api_baseUrl: '/',
    token: `Basic ${Buffer.from('admin:', 'utf8').toString('base64')}`
};
