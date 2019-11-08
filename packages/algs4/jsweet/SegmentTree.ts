import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Time-Complexity:  O(n*log(n))
 *
 * @param  array the Initialization array
 * @class
 * @author Ricardo Pacheco
 */
export class SegmentTree {
  private heap: SegmentTree.Node[];

  private array: number[];

  private __size: number;

  public constructor(array: number[]) {
    if (this.heap === undefined) this.heap = null;
    if (this.array === undefined) this.array = null;
    if (this.__size === undefined) this.__size = 0;
    this.array = Arrays.copyOf(array, array.length);
    this.__size =
      (<number>(
        (2 *
          Math.pow(
            2.0,
            Math.floor(Math.log(<number>array.length) / Math.log(2.0) + 1)
          ))
      )) | 0;
    this.heap = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(this.__size);
    this.build(1, 0, array.length);
  }

  public size(): number {
    return this.array.length;
  }

  build(v: number, from: number, size: number) {
    this.heap[v] = new SegmentTree.Node();
    this.heap[v].from = from;
    this.heap[v].to = from + size - 1;
    if (size === 1) {
      this.heap[v].sum = this.array[from];
      this.heap[v].min = this.array[from];
    } else {
      this.build(2 * v, from, (size / 2) | 0);
      this.build(2 * v + 1, from + ((size / 2) | 0), size - ((size / 2) | 0));
      this.heap[v].sum = this.heap[2 * v].sum + this.heap[2 * v + 1].sum;
      this.heap[v].min = Math.min(
        this.heap[2 * v].min,
        this.heap[2 * v + 1].min
      );
    }
  }

  public rsq$int$int(from: number, to: number): number {
    return this.rsq$int$int$int(1, from, to);
  }

  public rsq$int$int$int(v: number, from: number, to: number): number {
    const n: SegmentTree.Node = this.heap[v];
    if (n.pendingVal != null && this.contains(n.from, n.to, from, to)) {
      return (to - from + 1) * n.pendingVal;
    }
    if (this.contains(from, to, n.from, n.to)) {
      return this.heap[v].sum;
    }
    if (this.intersects(from, to, n.from, n.to)) {
      this.propagate(v);
      const leftSum: number = this.rsq$int$int$int(2 * v, from, to);
      const rightSum: number = this.rsq$int$int$int(2 * v + 1, from, to);
      return leftSum + rightSum;
    }
    return 0;
  }

  public rsq(v?: any, from?: any, to?: any): any {
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      (typeof to === 'number' || to === null)
    ) {
      return <any>this.rsq$int$int$int(v, from, to);
    }
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      to === undefined
    ) {
      return <any>this.rsq$int$int(v, from);
    }
    throw new Error('invalid overload');
  }

  public rMinQ$int$int(from: number, to: number): number {
    return this.rMinQ$int$int$int(1, from, to);
  }

  public rMinQ$int$int$int(v: number, from: number, to: number): number {
    const n: SegmentTree.Node = this.heap[v];
    if (n.pendingVal != null && this.contains(n.from, n.to, from, to)) {
      return n.pendingVal;
    }
    if (this.contains(from, to, n.from, n.to)) {
      return this.heap[v].min;
    }
    if (this.intersects(from, to, n.from, n.to)) {
      this.propagate(v);
      const leftMin: number = this.rMinQ$int$int$int(2 * v, from, to);
      const rightMin: number = this.rMinQ$int$int$int(2 * v + 1, from, to);
      return Math.min(leftMin, rightMin);
    }
    return Number.MAX_VALUE;
  }

  public rMinQ(v?: any, from?: any, to?: any): any {
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      (typeof to === 'number' || to === null)
    ) {
      return <any>this.rMinQ$int$int$int(v, from, to);
    }
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      to === undefined
    ) {
      return <any>this.rMinQ$int$int(v, from);
    }
    throw new Error('invalid overload');
  }

  public update$int$int$int(from: number, to: number, value: number) {
    this.update$int$int$int$int(1, from, to, value);
  }

  public update$int$int$int$int(
    v: number,
    from: number,
    to: number,
    value: number
  ) {
    const n: SegmentTree.Node = this.heap[v];
    if (this.contains(from, to, n.from, n.to)) {
      this.change(n, value);
    }
    if (n.size() === 1) return;
    if (this.intersects(from, to, n.from, n.to)) {
      this.propagate(v);
      this.update$int$int$int$int(2 * v, from, to, value);
      this.update$int$int$int$int(2 * v + 1, from, to, value);
      n.sum = this.heap[2 * v].sum + this.heap[2 * v + 1].sum;
      n.min = Math.min(this.heap[2 * v].min, this.heap[2 * v + 1].min);
    }
  }

  public update(v?: any, from?: any, to?: any, value?: any): any {
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      (typeof to === 'number' || to === null) &&
      (typeof value === 'number' || value === null)
    ) {
      return <any>this.update$int$int$int$int(v, from, to, value);
    }
    if (
      (typeof v === 'number' || v === null) &&
      (typeof from === 'number' || from === null) &&
      (typeof to === 'number' || to === null) &&
      value === undefined
    ) {
      return <any>this.update$int$int$int(v, from, to);
    }
    throw new Error('invalid overload');
  }

  propagate(v: number) {
    const n: SegmentTree.Node = this.heap[v];
    if (n.pendingVal != null) {
      this.change(this.heap[2 * v], n.pendingVal);
      this.change(this.heap[2 * v + 1], n.pendingVal);
      n.pendingVal = null;
    }
  }

  change(n: SegmentTree.Node, value: number) {
    n.pendingVal = value;
    n.sum = n.size() * value;
    n.min = value;
    this.array[n.from] = value;
  }

  contains(from1: number, to1: number, from2: number, to2: number): boolean {
    return from2 >= from1 && to2 <= to1;
  }

  intersects(from1: number, to1: number, from2: number, to2: number): boolean {
    return (from1 <= from2 && to1 >= from2) || (from1 >= from2 && from1 <= to2);
  }

  /**
   * Read the following commands:
   * init n v     Initializes the array of size n with all v's
   * set a b c... Initializes the array  with [a, b, c ...]
   * rsq a b      Range Sum Query for the range [a, b]
   * rmq a b      Range Min Query for the range [a, b]
   * up  a b v    Update the [a,b] portion of the array with value v.
   * exit
   * <p>
   * Example:
   * init
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
  public static main(args: string[]) {
    let st: SegmentTree = null;
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
        let arg3 = 0;
        if (line.length > 1) {
          arg1 = parseInt(line[1]);
        }
        if (line.length > 2) {
          arg2 = parseInt(line[2]);
        }
        if (line.length > 3) {
          arg3 = parseInt(line[3]);
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
          })(line[0], 'init')) && st == null) {
          StdOut.println$java_lang_Object('Segment Tree not initialized');
          continue;
        }
        let array: number[];
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'set')) {
          array = (s => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(line.length - 1);
          for (let i = 0; i < line.length - 1; i++) {
            {
              array[i] = parseInt(line[i + 1]);
            }
          }
          st = new SegmentTree(array);
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'init')) {
          array = (s => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(arg1);
          Arrays.fill(array, arg2);
          st = new SegmentTree(array);
          for (let i = 0; i < st.size(); i++) {
            {
              StdOut.print$java_lang_Object(`${st.rsq$int$int(i, i)} `);
            }
          }
          StdOut.println();
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'up')) {
          st.update$int$int$int(arg1, arg2, arg3);
          for (let i = 0; i < st.size(); i++) {
            {
              StdOut.print$java_lang_Object(`${st.rsq$int$int(i, i)} `);
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
            st.rsq$int$int(arg1, arg2)
          );
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(line[0], 'rmq')) {
          StdOut.printf(
            'Min from %d to %d = %d%n',
            arg1,
            arg2,
            st.rMinQ$int$int(arg1, arg2)
          );
        } else {
          StdOut.println$java_lang_Object('Invalid command');
        }
      }
    }
  }
}
SegmentTree.__class = 'edu.princeton.cs.algs4.SegmentTree';

export namespace SegmentTree {
  export class Node {
    sum: number;

    min: number;

    pendingVal: number = null;

    from: number;

    to: number;

    size(): number {
      return this.to - this.from + 1;
    }

    constructor() {
      if (this.sum === undefined) this.sum = 0;
      if (this.min === undefined) this.min = 0;
      if (this.from === undefined) this.from = 0;
      if (this.to === undefined) this.to = 0;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.SegmentTree.Node';
}

SegmentTree.main(null);
