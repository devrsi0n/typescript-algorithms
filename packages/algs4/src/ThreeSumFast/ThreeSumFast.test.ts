import ThreeSumFast from './index';

test('ThreeSumFast test basic', () => {
  const a = [1, -1, 0];
  expect(ThreeSumFast.count(a)).toEqual(1);

  const b = [1.23, -1.23, 0];
  expect(ThreeSumFast.count(b)).toEqual(1);

  const c = [1, -4, 3];
  expect(ThreeSumFast.count(c)).toEqual(1);
});

test('ThreeSumFast test sum', () => {
  const a = [1, -1, 2];
  expect(ThreeSumFast.count(a, 2)).toEqual(1);

  const b = [1.23, -1.23, 5];
  expect(ThreeSumFast.count(b, 5)).toEqual(1);

  const c = [1, -4, 12];
  expect(ThreeSumFast.count(c, 9)).toEqual(1);
});
