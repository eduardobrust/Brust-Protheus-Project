import { Buffer } from 'buffer'
export const environment = {
    production: false,
    api_baseUrl: 'http://localhost:8003/rest',
    token: `Basic ${Buffer.from('admin:admin', 'utf8').toString('base64')}`
};
