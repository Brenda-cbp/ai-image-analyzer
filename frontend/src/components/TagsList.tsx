import type { Tag } from '../lib/api';

export default function TagsList({ tags }: { tags: Tag[] }) {
  return (
    <ul aria-label="Detected tags">
      {tags.map((t, i) => (
        <li key={i}>
          <strong>{t.label}</strong> — {(t.confidence * 100).toFixed(1)}%
        </li>
      ))}
    </ul>
  );
}
