import StdRandom from './index';

test('random method return range [0, 1)', () => {
  expect(typeof StdRandom.random()).toBe('number');
  expect(StdRandom.random()).toBeGreaterThanOrEqual(0);
  expect(StdRandom.random()).toBeLessThan(1);
});

test('setSeed method', () => {
  StdRandom.setSeed(1);
  expect(StdRandom.random()).toBe(0.2694488477791326);
});

test('uniform method', () => {
  expect(typeof StdRandom.uniform()).toBe('number');

  expect(StdRandom.uniform()).toBeGreaterThanOrEqual(0);
  expect(StdRandom.uniform()).toBeLessThan(1);

  expect(StdRandom.uniform(10)).toBeGreaterThanOrEqual(0);
  expect(StdRandom.uniform(10)).toBeLessThan(10);

  expect(StdRandom.uniform(-1.5, 12)).toBeGreaterThanOrEqual(-1.5);
  expect(StdRandom.uniform(-1.5, 12)).toBeLessThan(12);
});

test('bernoulli method', () => {
  expect(typeof StdRandom.bernoulli(0.1)).toBe('boolean');
  expect(StdRandom.bernoulli(1)).toBe(true);
});

test('gaussian method', () => {
  expect(typeof StdRandom.gaussian()).toBe('number');
  expect(StdRandom.gaussian()).toBeGreaterThanOrEqual(0);
  expect(StdRandom.gaussian()).toBeLessThan(1);
});

test('discrete method', () => {
  expect(typeof StdRandom.discrete([0, 0.1, 0.9])).toBe('number');
  expect(() => StdRandom.discrete([-1])).toThrowError();
});

test('shuffle method', () => {
  const arr = [0, 1, 2, 3];
  StdRandom.shuffle(arr);
  expect(Array.isArray(arr)).toBe(true);
});
