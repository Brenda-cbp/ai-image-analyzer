import type { Tag } from '../types/tags';

export interface IVisionService {
  getTagsFromImage(buffer: Buffer): Promise<Tag[]>;
}

// Mock para tests y desarrollo inicial
export class MockVisionService implements IVisionService {
  async getTagsFromImage(_buffer: Buffer): Promise<Tag[]> {
    return [
      { label: 'example', confidence: 0.95 },
      { label: 'mock', confidence: 0.88 }
    ];
  }
}
