import EmptyState from './EmptyState';

/**
 * columns: [{ key, header, align?: 'right', mono?: boolean, render?: (row) => node }]
 * On screens under 640px each row becomes a labelled stack, so nothing scrolls sideways.
 * Pass `dense` for the staff portal.
 */
export default function DataTable({ columns, rows, rowKey = 'id', dense = false, caption, onRowClick, empty }) {
  if (!rows.length) {
    return empty ?? <EmptyState title="Nothing to show yet">Rows will appear here as soon as there is activity.</EmptyState>;
  }
  const cellClass = (c) => [c.align === 'right' ? 'num' : '', c.mono ? 'mono' : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div className="table-wrap">
      <table className={`table table--stack${dense ? ' table--dense' : ''}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.align === 'right' ? 'num' : undefined}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter') onRowClick(row); } : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} data-label={c.header} className={cellClass(c)}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
