// Shared CSV/PDF export helpers. CSV is handled by `toCsv` (src/shared/utils/csv.ts);
// PDFs are rendered server-side from the same exported rows via the print module.

// Chrome's Page.printToPDF fails on unbounded tables (very large datasets), so
// PDF exports cap the rendered rows at a size that reliably prints. CSV exports
// are unaffected (all rows).
export const PDF_MAX_ROWS = 5000;

export function humanizeKey(key: string): string {
  if (key === 'id' || key === '_id') return 'ID';
  const spaced = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  return spaced
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function escapeHtml(value: unknown): string {
  const raw =
    value == null
      ? ''
      : value instanceof Date
        ? value.toISOString()
        : typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Normalizes nested/date values into plain strings so CSV (`String`) and PDF
// (`JSON.stringify`) render consistently instead of `[object Object]`.
export function prepareExportRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  return rows.map((row) => {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      out[key] =
        value == null
          ? ''
          : value instanceof Date
            ? value.toISOString()
            : typeof value === 'object'
              ? JSON.stringify(value)
              : value;
    }
    return out;
  });
}

export function buildTableHtml(
  rows: Array<Record<string, unknown>>,
  title: string,
): string {
  const limited = rows.slice(0, PDF_MAX_ROWS);
  const keys: string[] = [];
  const seen = new Set<string>();
  for (const row of limited) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
  }

  const header = keys.map((k) => `<th>${escapeHtml(humanizeKey(k))}</th>`).join('');
  const body = limited
    .map(
      (row) =>
        `<tr>${keys.map((k) => `<td>${escapeHtml(row[k])}</td>`).join('')}</tr>`,
    )
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(
    title,
  )}</title><style>
    body{font-family:Helvetica,Arial,sans-serif;color:#0f172a;margin:0;padding:0;}
    h1{font-size:18px;margin:0 0 16px;color:#0d9488;}
    table{width:100%;border-collapse:collapse;font-size:11px;}
    th,td{border:1px solid #e2e8f0;padding:6px 8px;text-align:left;vertical-align:top;}
    th{background:#022c22;color:#fff;font-weight:600;}
    tr:nth-child(even){background:#f8fafc;}
  </style></head><body><h1>${escapeHtml(title)}</h1><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></body></html>`;
}