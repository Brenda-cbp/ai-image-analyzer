import { useRef, useState } from 'react';
import Spinner from './Spinner';
import TagsList from './TagsList';
import { analyzeImage, type Tag } from '../lib/api';

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setTags(null);
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setTags(null);
    try {
      const res = await analyzeImage(file);
      setTags(res.tags);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setTags(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return (
    <div>
      <label htmlFor="image">Select an image</label>
      <input ref={inputRef} id="image" type="file" accept="image/*" onChange={onChange} />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={onAnalyze} disabled={!file || loading}>
          Analyze
        </button>
        <button onClick={clearFile} disabled={!file && !preview}>
          Clear
        </button>
      </div>

      {loading && <Spinner />}
      {error && (
        <p aria-live="assertive" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}
      {preview && (
        <figure style={{ margin: '1rem 0' }}>
          <img src={preview} alt="preview" style={{ maxWidth: 320, height: 'auto' }} />
          <figcaption style={{ fontSize: 12, opacity: 0.8 }}>Preview</figcaption>
        </figure>
      )}
      {tags && <TagsList tags={tags} />}
    </div>
  );
}
