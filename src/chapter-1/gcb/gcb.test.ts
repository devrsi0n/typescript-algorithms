import gcb from './index';

test('unexpected param type', () => {
  const params =[[-1, 2], [1, -2], [-3, -5]];
  for (const [first, second] of params) {
    expect(() => {
      gcb(first, second);
    }).toThrow(/nonnegative integer/);
  }
});

test('should get gcb result', () => {
  expect(gcb(6, 3)).toBe(3);
  expect(gcb(81, 18)).toBe(9);
});
