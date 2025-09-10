import { useRef, useState } from "react";
import { analyzeImage, type Tag } from "../lib/api";

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const accept = "image/png,image/jpeg,image/webp,image/jpg";

  const onFile = (f: File | null) => {
    setTags(null); setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFile(e.target.files?.[0] || null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0] || null;
    onFile(f);
  };

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true); setError(null); setTags(null);
    try {
      const res = await analyzeImage(file);
      setTags(res.tags);
    } catch (e: any) {
      setError(e?.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    onFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="vstack gap-3">
      <div
        className={`dropzone ${dragOver ? "drag" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="flex-grow-1">
            <p className="m-0 fw-semibold">Drag & drop an image here</p>
            <small className="text-secondary">or click to select a file</small>
          </div>
          <div>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={onInputChange}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-primary" onClick={onAnalyze} disabled={!file || loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={clearFile} disabled={!file && !preview}>
          Clear
        </button>
      </div>

      {error && <div className="alert alert-danger" role="alert" aria-live="assertive">{error}</div>}

      {preview && (
        <div className="row gy-3">
          <div className="col-12 col-md-6">
            <div className="border rounded p-2 bg-light">
              <img src={preview} alt="preview" className="img-fluid rounded" />
            </div>
          </div>
          {tags && (
            <div className="col-12 col-md-6">
              <h3 className="h6">Detected tags</h3>
              <div aria-label="Detected tags">
                {tags.map((t, i) => (
                  <span key={i} className="tag-chip">
                    {t.label}
                    <span className="badge text-bg-secondary ms-1">
                      {(t.confidence * 100).toFixed(1)}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
