import { StdOut } from './StdOut';

/**
 * Initializes a new stopwatch.
 * @class
 * @author Josh Hug
 */
export class StopwatchCPU {
  static NANOSECONDS_PER_SECOND = 1000000000;

  private threadTimer: ThreadMXBean;

  private start: number;

  public constructor() {
    if (this.threadTimer === undefined) this.threadTimer = null;
    if (this.start === undefined) this.start = 0;
    this.threadTimer = ManagementFactory.getThreadMXBean();
    this.start = this.threadTimer.getCurrentThreadCpuTime();
  }

  /**
   * Returns the elapsed CPU time (in seconds) since the stopwatch was created.
   *
   * @return  elapsed CPU time (in seconds) since the stopwatch was created
   */
  public elapsedTime(): number {
    const now: number = this.threadTimer.getCurrentThreadCpuTime();
    return (now - this.start) / StopwatchCPU.NANOSECONDS_PER_SECOND;
  }

  /**
   * Unit tests the {@code StopwatchCPU} data type.
   * Takes a command-line argument {@code n} and computes the
   * sum of the square roots of the first {@code n} positive integers,
   * first using {@code Math.sqrt()}, then using {@code Math.pow()}.
   * It prints to standard output the sum and the amount of time to
   * compute the sum. Note that the discrete sum can be approximated by
   * an integral - the sum should be approximately 2/3 * (n^(3/2) - 1).
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = parseInt(args[0]);
    const timer1: StopwatchCPU = new StopwatchCPU();
    let sum1 = 0.0;
    for (let i = 1; i <= n; i++) {
      {
        sum1 += Math.sqrt(i);
      }
    }
    const time1: number = timer1.elapsedTime();
    StdOut.printf('%e (%.2f seconds)\n', sum1, time1);
    const timer2: StopwatchCPU = new StopwatchCPU();
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
StopwatchCPU.__class = 'edu.princeton.cs.algs4.StopwatchCPU';

StopwatchCPU.main(null);
