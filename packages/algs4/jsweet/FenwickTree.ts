import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Created by ricardodpsx@gmail.com on 4/01/15.
 * <p>
 * In `Fenwick Tree` structure We arrange the array in an smart way to perform efficient <em>range queries and updates</em>.
 * The key point is this: In a fenwick array, each position "responsible" for storing cumulative data of N previous positions (N could be 1)
 * For example:
 * array[40] stores: array[40] + array[39] ... + array[32] (8 positions)
 * array[32] stores: array[32] + array[31] ... + array[1]  (32 positions)
 * <p>
 * <strong>But, how do you know how much positions a given index is "responsible" for?</strong>
 * <p>
 * To know the number of items that a given array position 'ind' is responsible for
 * We should extract from 'ind' the portion up to the first significant one of the binary representation of 'ind'
 * for example, given ind == 40 (101000 in binary), according to Fenwick algorithm
 * what We want is to extract 1000(8 in decimal).
 * <p>
 * This means that array[40] has cumulative information of 8 array items.
 * But We still need to know the cumulative data bellow array[40 - 8 = 32]
 * 32 is  100000 in binnary, and the portion up to the least significant one is 32 itself!
 * So array[32] has information of 32 items, and We are done!
 * <p>
 * So cummulative data of array[1...40] = array[40] + array[32]
 * Because 40 has information of items from 40 to 32, and 32 has information of items from 32 to  1
 * <p>
 * Memory usage:  O(n)
 *
 * @author Ricardo Pacheco
 * @param  size
 * @class
 */
export class FenwickTree {
  array: number[];

  public constructor(size: number) {
    if (this.array === undefined) this.array = null;
    this.array = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(size + 1);
  }

  public rsq$int(ind: number): number {
    let sum = 0;
    while (ind > 0) {
      {
        sum += this.array[ind];
        ind -= ind & -ind;
      }
    }
    return sum;
  }

  public rsq$int$int(a: number, b: number): number {
    return this.rsq$int(b) - this.rsq$int(a - 1);
  }

  /**
   * Range Sum Query from a to b.
   * Search for the sum from array index from a to b
   * a and b are 1-indexed
   * <p>
   * Time-Complexity:    O(log(n))
   *
   * @param   a left index
   * @param   b right index
   * @return  sum
   */
  public rsq(a?: any, b?: any): any {
    if (
      (typeof a === 'number' || a === null) &&
      (typeof b === 'number' || b === null)
    ) {
      return <any>this.rsq$int$int(a, b);
    }
    if ((typeof a === 'number' || a === null) && b === undefined) {
      return <any>this.rsq$int(a);
    }
    throw new Error('invalid overload');
  }

  /**
   * Update the array at ind and all the affected regions above ind.
   * ind is 1-indexed
   * <p>
   * Time-Complexity:    O(log(n))
   *
   * @param   ind   index
   * @param   value value
   */
  public update(ind: number, value: number) {
    while (ind < this.array.length) {
      {
        this.array[ind] += value;
        ind += ind & -ind;
      }
    }
  }

  public size(): number {
    return this.array.length - 1;
  }

  /**
   * Read the following commands:
   * init n     Initializes the array of size n all zeroes
   * set a b c    Initializes the array  with [a, b, c ...]
   * rsq a b      Range Sum Query for the range [a,b]
   * up  i v      Update the i position of the array with value v.
   * exit
   * <p>
   * The array is 1-indexed
   * Example:
   * set 1 2 3 4 5 6
   * rsq 1 3
   * Sum from 1 to 3 = 6
   * rmq 1 3
   * Min from 1 to 3 = 1
   * input up 1 3
   * [3,2,3,4,5,6]
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    let ft: FenwickTree = null;
    const cmd = 'cmp';
    while (true) {
      {
        const line: string[] = StdIn.readLine().split(' ');
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'exit')) break;
        let arg1 = 0;
        let arg2 = 0;
        if (line.length > 1) {
          arg1 = parseInt(line[1]);
        }
        if (line.length > 2) {
          arg2 = parseInt(line[2]);
        }
        if (!/* equals */ (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'set')) && !/* equals */ (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'init')) && ft == null) {
          StdOut.println$java_lang_Object('FenwickTree not initialized');
          continue;
        }
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'init')) {
          ft = new FenwickTree(arg1);
          for (let i = 1; i <= ft.size(); i++) {
            {
              StdOut.print$java_lang_Object(`${ft.rsq$int$int(i, i)} `);
            }
          }
          StdOut.println();
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'set')) {
          ft = new FenwickTree(line.length - 1);
          for (let i = 1; i <= line.length - 1; i++) {
            {
              ft.update(i, parseInt(line[i]));
            }
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'up')) {
          ft.update(arg1, arg2);
          for (let i = 1; i <= ft.size(); i++) {
            {
              StdOut.print$java_lang_Object(`${ft.rsq$int$int(i, i)} `);
            }
          }
          StdOut.println();
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'rsq')) {
          StdOut.printf(
            'Sum from %d to %d = %d%n',
            arg1,
            arg2,
            ft.rsq$int$int(arg1, arg2)
          );
        } else {
          StdOut.println$java_lang_Object('Invalid command');
        }
      }
    }
  }
}
FenwickTree.__class = 'edu.princeton.cs.algs4.FenwickTree';

FenwickTree.main(null);
