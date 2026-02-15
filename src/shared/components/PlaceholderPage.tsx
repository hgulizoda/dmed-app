'use client';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page active">
      <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{title}</p>
    </div>
  );
}
