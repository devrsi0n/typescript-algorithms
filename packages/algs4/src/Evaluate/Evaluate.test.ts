import Evaluate from './index';

test('Evaluate test', () => {
  let eva = new Evaluate('( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )');
  expect(eva.calculate()).toEqual(101.0);

  eva = new Evaluate('( ( 1 + sqrt ( 5.0 ) ) / 2.0 )');
  expect(eva.calculate()).toBeCloseTo(1.618);
});
