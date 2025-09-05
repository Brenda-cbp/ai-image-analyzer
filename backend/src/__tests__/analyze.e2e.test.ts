import request from 'supertest';
import { createApp } from '../app';

describe('POST /api/analyze', () => {
  const app = createApp();

  it('returns 400 when no image provided', async () => {
    const res = await request(app).post('/api/analyze').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('No image provided');
  });

  it('returns 200 and tags when base64 provided (mock)', async () => {
    // Mínimo válido: buffer cualquiera; el mock no valida contenido real
    const fakePngHeader = Buffer.from('89504E470D0A1A0A', 'hex'); // signature PNG
    const res = await request(app).post('/api/analyze').send({
      imageBase64: fakePngHeader.toString('base64')
    });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty('label');
    expect(res.body.tags[0]).toHaveProperty('confidence');
  });
});
