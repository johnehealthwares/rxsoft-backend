import { PDF_MAX_ROWS, buildTableHtml, humanizeKey, prepareExportRows } from '../export';

describe('export helpers', () => {
  describe('humanizeKey', () => {
    it('formats camelCase, snake_case and id', () => {
      expect(humanizeKey('id')).toBe('ID');
      expect(humanizeKey('_id')).toBe('ID');
      expect(humanizeKey('quantityOnHand')).toBe('Quantity On Hand');
      expect(humanizeKey('unit_cost')).toBe('Unit Cost');
      expect(humanizeKey('name')).toBe('Name');
    });
  });

  describe('prepareExportRows', () => {
    it('flattens dates, objects and nulls into plain values', () => {
      const rows = prepareExportRows([
        {
          name: 'A',
          supplier: { id: 's1' },
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
          qty: 5,
          note: null,
        },
      ]);
      expect(rows[0]).toEqual({
        name: 'A',
        supplier: '{"id":"s1"}',
        createdAt: '2026-01-01T00:00:00.000Z',
        qty: 5,
        note: '',
      });
    });
  });

  describe('buildTableHtml', () => {
    it('renders a humanized header row, title and escaped cells', () => {
      const html = buildTableHtml(
        [{ quantityOnHand: 3, name: '<b>&"' }],
        'Stock Export',
      );
      expect(html).toContain('<title>Stock Export</title>');
      expect(html).toContain('<h1>Stock Export</h1>');
      expect(html).toContain('<th>Quantity On Hand</th>');
      expect(html).toContain('<td>3</td>');
      expect(html).toContain('&lt;b&gt;&amp;&quot;');
    });

    it('caps PDF rows at PDF_MAX_ROWS to keep Chrome printToPDF reliable', () => {
      const rows = Array.from({ length: PDF_MAX_ROWS + 5 }, (_, i) => ({ i }));
      const html = buildTableHtml(rows as Array<Record<string, unknown>>, 'Big');
      const count = (html.match(/<tr>/g) ?? []).length;
      // +1 for the header row
      expect(count).toBe(PDF_MAX_ROWS + 1);
    });
  });
});