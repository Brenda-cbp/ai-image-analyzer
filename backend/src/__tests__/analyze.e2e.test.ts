import request from 'supertest';
import { createApp } from '../app';

describe('POST /api/analyze (multipart)', () => {
  const app = createApp();

  it('returns 400 when no file provided', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .set('Content-Type', 'multipart/form-data'); // sin archivo
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('No image provided');
  });

  it('returns 200 and tags when image file is provided (mock)', async () => {
    // un PNG mínimo: solo header (no importa para mock)
    const buf = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    const res = await request(app)
      .post('/api/analyze')
      .attach('image', buf, { filename: 'fake.png', contentType: 'image/png' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty('label');
    expect(res.body.tags[0]).toHaveProperty('confidence');
  });
});
