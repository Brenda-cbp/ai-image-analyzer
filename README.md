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

## Frontend (React + Vite + TypeScript)

### 1. Environment setup
Copy the example env file and set your backend API URL:

```bash
cp frontend/.env.example frontend/.env
````

Edit `.env` and set:

```
VITE_API_URL=http://localhost:4000
```

(or your deployed backend URL)

---

### 2. Development

Run the frontend in dev mode:

```bash
cd frontend
npm install
npm run dev
```

The app will open at: [http://localhost:5173](http://localhost:5173)

---

### 3. Type checking

To run full TypeScript type checks (beyond what Vite/esbuild does):

```bash
npm run type-check
```

(Shortcut for `tsc --noEmit`)

---

### 4. Build for production

To generate an optimized build:

```bash
npm run build
```

Preview the built app:

```bash
npm run preview
```

This will serve the production build at [http://localhost:4173](http://localhost:4173)

### Postman
Import `postman/ai-image-analyzer.postman_collection.json` and set `baseUrl` to your backend (default: http://localhost:4000). Use the "success" request and attach an image file.
