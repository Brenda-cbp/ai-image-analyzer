import request from 'supertest';

describe('POST /api/analyze (multipart)', () => {
  let app: ReturnType<any>;

  beforeAll(async () => {
    // Se realiza los test con MOCK
    process.env.USE_GOOGLE_VISION = 'false';

    const mod = await import('../app');
    app = mod.createApp();
  });

  it('returns 400 when no file provided', async () => {
    const res = await request(app).post('/api/analyze').field('dummy', '1');
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('No image provided');
  });

  it('returns 200 and tags when image file is provided (mock)', async () => {
    const buf = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]); // PNG header
    const res = await request(app)
      .post('/api/analyze')
      .attach('image', buf, { filename: 'fake.png', contentType: 'image/png' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty('label');
    expect(res.body.tags[0]).toHaveProperty('confidence');
  });

  it('returns 400 when file is not a valid image', async () => {
    const buf = Buffer.from('not-an-image');
    const res = await request(app)
      .post('/api/analyze')
      .attach('image', buf, { filename: 'fake.png', contentType: 'image/png' });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('Only image files are allowed');
  });
});
