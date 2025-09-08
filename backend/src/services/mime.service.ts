export interface IMimeValidator {
    isAllowed(buffer: Buffer): Promise<boolean>;
  }
  
  /**
   * Implementación real con `file-type` (ESM-only).
   * Se mantiene el import dinámico para evitar problemas de resolución.
   */
  export class FileTypeMimeValidator implements IMimeValidator {
    private allowed = new Set(['image/png', 'image/jpeg', 'image/webp']);
  
    async isAllowed(buffer: Buffer): Promise<boolean> {
      const { fileTypeFromBuffer } = await import('file-type');
      const type = await fileTypeFromBuffer(buffer);
      return !!type && this.allowed.has(type.mime);
    }
  }
  
  /**
   * Implementación para tests: usa heurísticas de “magic numbers” (cabeceras).
   * - PNG: 89 50 4E 47 0D 0A 1A 0A
   * - JPEG: FF D8 FF (al inicio)
   * - WEBP: "RIFF" .... "WEBP" en bytes 0..3 y 8..11
   */
  export class HeuristicMimeValidator implements IMimeValidator {
    async isAllowed(buffer: Buffer): Promise<boolean> {
      if (!buffer || buffer.length < 8) return false;
  
      // PNG
      const png = [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A];
      const isPng = png.every((b, i) => buffer[i] === b);
      if (isPng) return true;
  
      // JPEG (FF D8 FF)
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
      if (isJpeg) return true;
  
      // WEBP: 'RIFF' .... 'WEBP'
      const riff = buffer.slice(0, 4).toString('ascii') === 'RIFF';
      const webp = buffer.length >= 12 && buffer.slice(8, 12).toString('ascii') === 'WEBP';
      if (riff && webp) return true;
  
      return false;
    }
  }
  