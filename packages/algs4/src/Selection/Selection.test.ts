import Selection from './index';

test('Selection test', () => {
  const a = [3, 1, -1, 2, 9];
  Selection.sortNumber(a);
  expect(a).toEqual([-1, 1, 2, 3, 9]);
});
