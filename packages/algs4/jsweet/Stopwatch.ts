import { StdOut } from './StdOut';

/**
 * Initializes a new stopwatch.
 * @class
 * @author Robert Sedgewick
 */
export class Stopwatch {
  private start: number;

  public constructor() {
    if (this.start === undefined) this.start = 0;
    this.start = java.lang.System.currentTimeMillis();
  }

  /**
   * Returns the elapsed CPU time (in seconds) since the stopwatch was created.
   *
   * @return  elapsed CPU time (in seconds) since the stopwatch was created
   */
  public elapsedTime(): number {
    const now: number = java.lang.System.currentTimeMillis();
    return (now - this.start) / 1000.0;
  }

  /**
   * Unit tests the `Stopwatch` data type.
   * Takes a command-line argument `n` and computes the
   * sum of the square roots of the first `n` positive integers,
   * first using `Math.sqrt()}, then using `Math.pow()`.
   * It prints to standard output the sum and the amount of time to
   * compute the sum. Note that the discrete sum can be approximated by
   * an integral - the sum should be approximately 2/3 * (n^(3/2) - 1).
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const n: number = parseInt(args[0]);
    const timer1: Stopwatch = new Stopwatch();
    let sum1 = 0.0;
    for (let i = 1; i <= n; i++) {
      {
        sum1 += Math.sqrt(i);
      }
    }
    const time1: number = timer1.elapsedTime();
    StdOut.printf('%e (%.2f seconds)\n', sum1, time1);
    const timer2: Stopwatch = new Stopwatch();
    let sum2 = 0.0;
    for (let i = 1; i <= n; i++) {
      {
        sum2 += Math.pow(i, 0.5);
      }
    }
    const time2: number = timer2.elapsedTime();
    StdOut.printf('%e (%.2f seconds)\n', sum2, time2);
  }
}
Stopwatch.__class = 'edu.princeton.cs.algs4.Stopwatch';

Stopwatch.main(null);
