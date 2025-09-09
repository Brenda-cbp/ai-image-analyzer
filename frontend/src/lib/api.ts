export type Tag = { label: string; confidence: number };
export type AnalyzeResponse = { tags: Tag[] };

export async function analyzeImage(file: File): Promise<AnalyzeResponse> {
  const api = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`${api}/api/analyze`, { method: 'POST', body: fd });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.error?.message ?? msg;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // ignore JSON parse errors (non-JSON body)
    }
    throw new Error(msg);
  }
  return res.json();
}
