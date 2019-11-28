import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Initializes a new counter starting at 0, with the given id.
 *
 * @param  id the name of the counter
 * @class
 * @author Robert Sedgewick
 */
export class Counter implements java.lang.Comparable<Counter> {
  private name: string;

  private count = 0;

  public constructor(id: string) {
    if (this.name === undefined) this.name = null;
    this.name = id;
  }

  /**
   * Increments the counter by 1.
   */
  public increment() {
    this.count++;
  }

  /**
   * Returns the current value of this counter.
   *
   * @return  the current value of this counter
   */
  public tally(): number {
    return this.count;
  }

  /**
   * Returns a string representation of this counter.
   *
   * @return  a string representation of this counter
   */
  public toString(): string {
    return `${this.count} ${this.name}`;
  }

  /**
   * Compares this counter to the specified counter.
   *
   * @param  {Counter} that the other counter
   * @return  `0` if the value of this counter equals
   * the value of that counter; a negative integer if
   * the value of this counter is less than the value of
   * that counter; and a positive integer if the value
   * of this counter is greater than the value of that
   * counter
   */
  public compareTo(that: Counter): number {
    if (this.count < that.count) return -1;
    if (this.count > that.count) return +1;
    return 0;
  }

  /**
   * Reads two command-line integers n and trials; creates n counters;
   * increments trials counters at random; and prints results.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const n: number = parseInt(args[0]);
    const trials: number = parseInt(args[1]);
    const hits: Counter[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        hits[i] = new Counter(`counter${i}`);
      }
    }
    for (let t = 0; t < trials; t++) {
      {
        hits[StdRandom.uniform$int(n)].increment();
      }
    }
    for (let i = 0; i < n; i++) {
      {
        StdOut.println$java_lang_Object(hits[i]);
      }
    }
  }
}
Counter.__class = 'edu.princeton.cs.algs4.Counter';
Counter.__interfaces = ['java.lang.Comparable'];

Counter.main(null);
