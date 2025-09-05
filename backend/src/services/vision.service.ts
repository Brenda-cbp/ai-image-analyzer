import type { Tag } from '../types/tags';
import vision from '@google-cloud/vision';

export interface IVisionService {
  getTagsFromImage(buffer: Buffer): Promise<Tag[]>;
}

export class MockVisionService implements IVisionService {
  async getTagsFromImage(_buffer: Buffer): Promise<Tag[]> {
    return [
      { label: 'example', confidence: 0.95 },
      { label: 'mock', confidence: 0.88 }
    ];
  }
}

export class GoogleVisionService implements IVisionService {
  private client: vision.ImageAnnotatorClient;

  constructor() {
    // The client automatically reads GOOGLE_APPLICATION_CREDENTIALS
    this.client = new vision.ImageAnnotatorClient();
  }

  async getTagsFromImage(buffer: Buffer): Promise<Tag[]> {
    const [result] = await this.client.labelDetection({ image: { content: buffer } });
    const labels = result.labelAnnotations || [];
    return labels.map(l => ({
      label: l.description || 'Unknown',
      confidence: Number(l.score || 0)
    }));
  }
}
