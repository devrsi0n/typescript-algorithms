import Queue from './index';

test('Queue test', () => {
  const numbers = new Queue<number>();
  numbers.enqueue(1);
  numbers.enqueue(2);
  numbers.enqueue(3);
  numbers.enqueue(4);
  let sum = 0;
  for (const item of numbers) {
    sum += item;
  }
  expect(sum / numbers.size()).toEqual(2.5);
  expect(numbers.isEmpty()).toBe(false);
  expect(numbers.toString().startsWith('Queue'));
});
