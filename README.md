## Google Vision (Real Mode)

By default the API uses a Mock Vision service (no external calls).  
To enable Google Vision:

1. Enable Vision API in your GCP project and create a Service Account with at least **Cloud Vision API User**.
2. Download the JSON key and place it under `./keys/gcp-sa.json` .
3. Set environment variables:
   - In `backend/.env`:
     ```
     USE_GOOGLE_VISION=true
     PORT=4000
     MAX_FILE_MB=10
     ```
   - Point Google SDK to your key:
     - **Windows (PowerShell)**:
       ```powershell
       setx GOOGLE_APPLICATION_CREDENTIALS "C:\abs\path\ai-image-analyzer\keys\gcp-sa.json"
       ```
       (Restart your terminal or set it for the current session:
       ` $env:GOOGLE_APPLICATION_CREDENTIALS="C:\abs\path\ai-image-analyzer\keys\gcp-sa.json" `)
4. Start the server: `npm run dev`.
5. The API contract remains the same: `POST /api/analyze` expects:
   ```json
   { "imageBase64": "<base64 of an image>" }
   ```
