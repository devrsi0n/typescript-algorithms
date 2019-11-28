import QuickFindUF from './QuickFindUF';

test('QuickFindUF connected', () => {
  const uf = new QuickFindUF(4);
  uf.union(1, 2);
  uf.union(2, 3);
  expect(uf.connected(1, 1)).toBe(true);
  expect(uf.connected(2, 1)).toBe(true);
  expect(uf.connected(1, 3)).toBe(true);
  expect(uf.connected(1, 0)).toBe(false);
});
