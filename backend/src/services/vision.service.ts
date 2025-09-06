import type { Tag } from '../types/tags';
import vision from '@google-cloud/vision';
import type { ImageAnnotatorClient } from '@google-cloud/vision'; // ← importa el TIPO

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
  private client: ImageAnnotatorClient; 

  constructor() {
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
