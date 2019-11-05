import BinarySearch from './index';

test('BinarySearch indexOf', () => {
  const input = [-10, -7, 0, 1, 5, 11, 24, 57, 99];
  expect(BinarySearch.indexOf(input, -7)).toEqual(1);
  expect(BinarySearch.indexOf(input, 0)).toEqual(2);
  expect(BinarySearch.indexOf(input, 24)).toEqual(6);
  expect(BinarySearch.indexOf(input, 99)).toEqual(8);
});
