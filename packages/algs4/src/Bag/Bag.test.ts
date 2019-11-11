import Bag from './index';

test('Bag test', () => {
  const numbers = new Bag<number>();
  numbers.add(1);
  numbers.add(2);
  numbers.add(3);
  numbers.add(4);
  let sum = 0;
  for (const item of numbers) {
    sum += item;
  }
  expect(sum / numbers.size()).toEqual(2.5);
  expect(numbers.isEmpty()).toBe(false);
  expect(numbers.toString().startsWith('Bag'));
});

test('Bag exception', () => {
  const numbers = new Bag<number>();
  numbers.add(1);
  numbers.add(2);
  numbers.add(3);
  numbers.add(4);
  expect(() => {
    for (const item of numbers) {
      console.log(item);
      numbers.add(5);
    }
  }).toThrowError('ConcurrentModificationException');
});
