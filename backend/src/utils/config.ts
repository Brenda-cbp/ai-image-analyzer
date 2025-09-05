export const config = {
    port: Number(process.env.PORT || 4000),
    maxFileMb: Number(process.env.MAX_FILE_MB || 10),
    useGoogleVision: process.env.USE_GOOGLE_VISION === 'true',
  };
  