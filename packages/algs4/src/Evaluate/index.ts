import Stack from '../Stack';

export default class Evaluate {
  private inputArray: Array<string>;

  constructor(inp: string) {
    this.inputArray = inp.split(' ').filter((char) => !!char);
  }

  calculate() {
    const ops = new Stack<string>();
    const vals = new Stack<number>();
    for (const input of this.inputArray) {
      if (input === '(') {
        // Nothing
      } else if (['+', '-', '*', '/', 'sqrt'].includes(input)) {
        ops.push(input);
      } else if (input === ')') {
        const op = ops.pop();
        let v = vals.pop();
        if (op === '+') {
          v = vals.pop() + v;
        } else if (op === '-') {
          v = vals.pop() - v;
        } else if (op === '*') {
          /* eslint-disable operator-assignment */
          v = vals.pop() * v;
        } else if (op === '/') {
          v = vals.pop() / v;
        } else if (op === 'sqrt') {
          v = Math.sqrt(v);
        }
        vals.push(v);
      } else {
        vals.push(parseFloat(input));
      }
    }
    return vals.pop();
  }
}
