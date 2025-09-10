# AI Image Analyzer

Upload an image and let our AI generate descriptive tags.  
Built with **Node.js/Express + TypeScript** (backend), **React + Vite + Bootstrap** (frontend), and integrates **Google Cloud Vision API**.

---

## Features
- **Backend**
  - REST API with Express + TypeScript.
  - Image analysis via Google Vision API (toggle with env flag).
  - Mock mode for testing without GCP.
  - Input validation (size, MIME type).
  - Rate limiting on `/api/analyze`.
  - Jest unit + E2E tests.
- **Frontend**
  - Responsive landing page (hero + uploader card).
  - Drag & drop uploader with preview.
  - Tag chips with confidence badges.
  - Simulated progress bar while analyzing.
  - Error messages.
- **Tooling**
  - ESLint + Prettier setup.
  - GitHub Actions (CI for backend tests, frontend lint/build).
  - Postman collection for API endpoints.
- **Docker**
  - Docker (frontend served by Nginx, proxying `/api` to backend).

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/Brenda-cbp/ai-image-analyzer
cd ai-image-analyzer
````

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Environment variables

Create `backend/.env` with:

```env
PORT=4000
MAX_FILE_MB=10
USE_GOOGLE_VISION=false   # set true to use GCP Vision
GOOGLE_APPLICATION_CREDENTIALS=./keys/gcp-sa.json
```

### 3. Run locally

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

* API: [http://localhost:4000/api/analyze](http://localhost:4000/api/analyze)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

## Testing

Backend tests:

```bash
cd backend
npm test
```

* Unit tests for Vision service (mock).
* E2E tests for `/api/analyze`.

Lint & format:

```bash
npm run lint
npm run format
```

---

## Postman Collection

Import `postman/ai-image-analyzer.postman_collection.json` and set:

* `baseUrl = http://localhost:4000`

Included requests:

* Analyze success (multipart with image).
* Analyze no file (400).
* Analyze invalid MIME (400).

---
## Docker 

Build & run:

```bash
docker compose up --build
```

* Frontend served at [http://localhost:8080](http://localhost:8080)
* Backend proxied under `/api`

Use GCP Vision:

1. Put your service account JSON in `./keys/gcp-sa.json`
2. Uncomment volume + env in `docker-compose.yml`
3. Run:

   ```bash
   USE_GOOGLE_VISION=true docker compose up --build
   ```

---

## 🛡️ CI / CD

GitHub Actions run on every push / PR:

* **Backend CI**: lint + tests.
* **Frontend CI**: lint + typecheck + build.

### Badges:

![Backend CI](https://github.com/Brenda-cbp/ai-image-analyzer/actions/workflows/backend.yml/badge.svg)

![Frontend CI](https://github.com/Brenda-cbp/ai-image-analyzer/actions/workflows/frontend.yml/badge.svg)
---

## 📂 Project Structure

```
.
├── backend/              # Express + TS API
│   ├── src/
│   ├── __tests__/        # Jest tests
│   └── ...
├── frontend/             # React + Vite app
│   ├── src/components/
│   ├── src/lib/api.ts    # API helper
│   └── ...
├── postman/              # Postman collection
├── docker-compose.yml
└── README.md
```

---
Enjoy :D