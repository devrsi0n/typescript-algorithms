import UF from './index';

test('UF connected', () => {
  const uf = new UF(4);
  uf.union(1, 2);
  uf.union(2, 3);
  expect(uf.connected(1, 1)).toBe(true);
  expect(uf.connected(2, 1)).toBe(true);
  expect(uf.connected(1, 3)).toBe(true);
  expect(uf.connected(1, 0)).toBe(false);
});
