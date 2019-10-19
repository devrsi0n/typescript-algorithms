import Point2D from './index';

test('Point2D initialization', () => {
  const point = new Point2D(1, 2);
  expect(point.x()).toEqual(1);
  expect(point.y()).toEqual(2);
});

test('Point2D r', () => {
  const point = new Point2D(1, 2);
  expect(point.r()).toEqual(Math.sqrt(5));
});
