/**
 * Unit test for GoogleVisionService by mocking @google-cloud/vision client.
 */
import { GoogleVisionService } from '../services/vision.service';

// Jest hoisting: mock BEFORE importing the service in real scenarios.
// Simplificacón al hacer  inyección un mock en el prototipo.
jest.mock('@google-cloud/vision', () => {
  const mockFn = jest.fn().mockResolvedValue([
    {
      labelAnnotations: [
        { description: 'cat', score: 0.98 },
        { description: 'pet', score: 0.88 }
      ]
    }
  ]);
  return {
    __esModule: true,
    default: { ImageAnnotatorClient: jest.fn().mockImplementation(() => ({ labelDetection: mockFn })) }
  };
});

describe('GoogleVisionService', () => {
  it('maps Vision labels to Tag[]', async () => {
    const svc = new GoogleVisionService();
    const tags = await svc.getTagsFromImage(Buffer.from([0x00]));
    expect(tags).toEqual([
      { label: 'cat', confidence: 0.98 },
      { label: 'pet', confidence: 0.88 }
    ]);
  });
});
