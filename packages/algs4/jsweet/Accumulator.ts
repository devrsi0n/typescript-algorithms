import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an accumulator.
 * @class
 * @author Robert Sedgewick
 */
export class Accumulator {
  private n = 0;

  private sum = 0.0;

  private mu = 0.0;

  /**
   * Adds the specified data value to the accumulator.
   * @param   x the data value
   */
  public addDataValue(x: number) {
    this.n++;
    const delta: number = x - this.mu;
    this.mu += delta / this.n;
    this.sum += ((this.n - 1) / this.n) * delta * delta;
  }

  /**
   * Returns the mean of the data values.
   * @return  the mean of the data values
   */
  public mean(): number {
    return this.mu;
  }

  /**
   * Returns the sample variance of the data values.
   * @return  the sample variance of the data values
   */
  public var(): number {
    if (this.n <= 1) return NaN;
    return this.sum / (this.n - 1);
  }

  /**
   * Returns the sample standard deviation of the data values.
   * @return  the sample standard deviation of the data values
   */
  public stddev(): number {
    return Math.sqrt(this.var());
  }

  /**
   * Returns the number of data values.
   * @return  the number of data values
   */
  public count(): number {
    return this.n;
  }

  /**
   * Returns a string representation of this accumulator.
   * @return  a string representation of this accumulator
   */
  public toString(): string {
    return `n = ${this.n}, mean = ${this.mean()}, stddev = ${this.stddev()}`;
  }

  /**
   * Unit tests the `Accumulator` data type.
   * Reads in a stream of real number from standard input;
   * adds them to the accumulator; and prints the mean,
   * sample standard deviation, and sample variance to standard
   * output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const stats: Accumulator = new Accumulator();
    while (!StdIn.isEmpty()) {
      {
        const x: number = StdIn.readDouble();
        stats.addDataValue(x);
      }
    }
    StdOut.printf('n      = %d\n', stats.count());
    StdOut.printf('mean   = %.5f\n', stats.mean());
    StdOut.printf('stddev = %.5f\n', stats.stddev());
    StdOut.printf('var    = %.5f\n', stats.var());
    StdOut.println$java_lang_Object(stats);
  }
}
Accumulator.__class = 'edu.princeton.cs.algs4.Accumulator';

Accumulator.main(null);
