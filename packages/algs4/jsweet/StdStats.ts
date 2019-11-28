import { StdDraw } from './StdDraw';
import { StdArrayIO } from './StdArrayIO';
import { StdOut } from './StdOut';

/**
 * The `StdStats` class provides static methods for computing
 * statistics such as min, max, mean, sample standard deviation, and
 * sample variance.
 * <p>
 * For additional documentation, see
 * <a href="https://introcs.cs.princeton.edu/22library">Section 2.2</a> of
 * <i>Computer Science: An Interdisciplinary Approach</i>
 * by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class StdStats {
  public static max$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let max: number = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < a.length; i++) {
      {
        if (/* isNaN */ isNaN(a[i])) return NaN;
        if (a[i] > max) max = a[i];
      }
    }
    return max;
  }

  public static max$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    let max: number = Number.NEGATIVE_INFINITY;
    for (let i: number = lo; i < hi; i++) {
      {
        if (/* isNaN */ isNaN(a[i])) return NaN;
        if (a[i] > max) max = a[i];
      }
    }
    return max;
  }

  /**
   * Returns the maximum value in the specified subarray.
   *
   * @param   a the array
   * @param   lo the left endpoint of the subarray (inclusive)
   * @param   hi the right endpoint of the subarray (exclusive)
   * @return  the maximum value in the subarray `a[lo..hi)`;
   * `Double.NEGATIVE_INFINITY` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static max(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.max$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.max$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.max$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static max$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let max: number = Number.MIN_VALUE;
    for (let i = 0; i < a.length; i++) {
      {
        if (a[i] > max) max = a[i];
      }
    }
    return max;
  }

  public static min$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let min: number = Number.POSITIVE_INFINITY;
    for (let i = 0; i < a.length; i++) {
      {
        if (/* isNaN */ isNaN(a[i])) return NaN;
        if (a[i] < min) min = a[i];
      }
    }
    return min;
  }

  public static min$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    let min: number = Number.POSITIVE_INFINITY;
    for (let i: number = lo; i < hi; i++) {
      {
        if (/* isNaN */ isNaN(a[i])) return NaN;
        if (a[i] < min) min = a[i];
      }
    }
    return min;
  }

  /**
   * Returns the minimum value in the specified subarray.
   *
   * @param   a the array
   * @param   lo the left endpoint of the subarray (inclusive)
   * @param   hi the right endpoint of the subarray (exclusive)
   * @return  the maximum value in the subarray `a[lo..hi)`;
   * `Double.POSITIVE_INFINITY` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static min(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.min$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.min$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.min$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static min$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let min: number = Number.MAX_VALUE;
    for (let i = 0; i < a.length; i++) {
      {
        if (a[i] < min) min = a[i];
      }
    }
    return min;
  }

  public static mean$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    if (a.length === 0) return NaN;
    const sum: number = StdStats.sum$double_A(a);
    return sum / a.length;
  }

  public static mean$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    const length: number = hi - lo;
    if (length === 0) return NaN;
    const sum: number = StdStats.sum$double_A$int$int(a, lo, hi);
    return sum / length;
  }

  /**
   * Returns the average value in the specified subarray.
   *
   * @param  a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the average value in the subarray `a[lo..hi)`;
   * `Double.NaN` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static mean(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.mean$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.mean$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.mean$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static mean$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    if (a.length === 0) return NaN;
    const sum: number = StdStats.sum$int_A(a);
    return (1.0 * sum) / a.length;
  }

  public static var$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    if (a.length === 0) return NaN;
    const avg: number = StdStats.mean$double_A(a);
    let sum = 0.0;
    for (let i = 0; i < a.length; i++) {
      {
        sum += (a[i] - avg) * (a[i] - avg);
      }
    }
    return sum / (a.length - 1);
  }

  public static var$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    const length: number = hi - lo;
    if (length === 0) return NaN;
    const avg: number = StdStats.mean$double_A$int$int(a, lo, hi);
    let sum = 0.0;
    for (let i: number = lo; i < hi; i++) {
      {
        sum += (a[i] - avg) * (a[i] - avg);
      }
    }
    return sum / (length - 1);
  }

  /**
   * Returns the sample variance in the specified subarray.
   *
   * @param   a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the sample variance in the subarray `a[lo..hi)`;
   * `Double.NaN` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static var(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.var$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.var$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.var$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static var$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    if (a.length === 0) return NaN;
    const avg: number = StdStats.mean$int_A(a);
    let sum = 0.0;
    for (let i = 0; i < a.length; i++) {
      {
        sum += (a[i] - avg) * (a[i] - avg);
      }
    }
    return sum / (a.length - 1);
  }

  public static varp$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    if (a.length === 0) return NaN;
    const avg: number = StdStats.mean$double_A(a);
    let sum = 0.0;
    for (let i = 0; i < a.length; i++) {
      {
        sum += (a[i] - avg) * (a[i] - avg);
      }
    }
    return sum / a.length;
  }

  public static varp$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    const length: number = hi - lo;
    if (length === 0) return NaN;
    const avg: number = StdStats.mean$double_A$int$int(a, lo, hi);
    let sum = 0.0;
    for (let i: number = lo; i < hi; i++) {
      {
        sum += (a[i] - avg) * (a[i] - avg);
      }
    }
    return sum / length;
  }

  /**
   * Returns the population variance in the specified subarray.
   *
   * @param   a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the population variance in the subarray `a[lo..hi)`;
   * `Double.NaN` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static varp(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.varp$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.varp$double_A(a);
    }
    throw new Error('invalid overload');
  }

  public static stddev$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    return Math.sqrt(StdStats.var$double_A(a));
  }

  public static stddev$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    return Math.sqrt(StdStats.var$int_A(a));
  }

  public static stddev$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    return Math.sqrt(StdStats.var$double_A$int$int(a, lo, hi));
  }

  /**
   * Returns the sample standard deviation in the specified subarray.
   *
   * @param   a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the sample standard deviation in the subarray `a[lo..hi)`;
   * `Double.NaN` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static stddev(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.stddev$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.stddev$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.stddev$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static stddevp$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    return Math.sqrt(StdStats.varp$double_A(a));
  }

  public static stddevp$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    return Math.sqrt(StdStats.varp$double_A$int$int(a, lo, hi));
  }

  /**
   * Returns the population standard deviation in the specified subarray.
   *
   * @param   a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the population standard deviation in the subarray `a[lo..hi)`;
   * `Double.NaN` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   */
  public static stddevp(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.stddevp$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.stddevp$double_A(a);
    }
    throw new Error('invalid overload');
  }

  private static sum$double_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let sum = 0.0;
    for (let i = 0; i < a.length; i++) {
      {
        sum += a[i];
      }
    }
    return sum;
  }

  public static sum$double_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    StdStats.validateNotNull(a);
    StdStats.validateSubarrayIndices(lo, hi, a.length);
    let sum = 0.0;
    for (let i: number = lo; i < hi; i++) {
      {
        sum += a[i];
      }
    }
    return sum;
  }

  /**
   * Returns the sum of all values in the specified subarray.
   *
   * @param   a the array
   * @param  lo the left endpoint of the subarray (inclusive)
   * @param  hi the right endpoint of the subarray (exclusive)
   * @return  the sum of all values in the subarray `a[lo..hi)`;
   * `0.0` if no such value
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   * @private
   */
  public static sum(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdStats.sum$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.sum$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdStats.sum$int_A(a);
    }
    throw new Error('invalid overload');
  }

  private static sum$int_A(a: number[]): number {
    StdStats.validateNotNull(a);
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      {
        sum += a[i];
      }
    }
    return sum;
  }

  /**
   * Plots the points (0, <em>a</em><sub>0</sub>), (1, <em>a</em><sub>1</sub>), ...,
   * (<em>n</em>-1, <em>a</em><sub><em>n</em>-1</sub>) to standard draw.
   *
   * @param  a the array of values
   */
  public static plotPoints(a: number[]) {
    StdStats.validateNotNull(a);
    const n: number = a.length;
    StdDraw.setXscale$double$double(-1, n);
    StdDraw.setPenRadius$double(1.0 / (3.0 * n));
    for (let i = 0; i < n; i++) {
      {
        StdDraw.point(i, a[i]);
      }
    }
  }

  /**
   * Plots the line segments connecting
   * (<em>i</em>, <em>a</em><sub><em>i</em></sub>) to
   * (<em>i</em>+1, <em>a</em><sub><em>i</em>+1</sub>) for
   * each <em>i</em> to standard draw.
   *
   * @param  a the array of values
   */
  public static plotLines(a: number[]) {
    StdStats.validateNotNull(a);
    const n: number = a.length;
    StdDraw.setXscale$double$double(-1, n);
    StdDraw.setPenRadius();
    for (let i = 1; i < n; i++) {
      {
        StdDraw.line(i - 1, a[i - 1], i, a[i]);
      }
    }
  }

  /**
   * Plots bars from (0, <em>a</em><sub><em>i</em></sub>) to
   * (<em>a</em><sub><em>i</em></sub>) for each <em>i</em>
   * to standard draw.
   *
   * @param  a the array of values
   */
  public static plotBars(a: number[]) {
    StdStats.validateNotNull(a);
    const n: number = a.length;
    StdDraw.setXscale$double$double(-1, n);
    for (let i = 0; i < n; i++) {
      {
        StdDraw.filledRectangle(i, a[i] / 2, 0.25, a[i] / 2);
      }
    }
  }

  private static validateNotNull(x: any) {
    if (x == null) throw new Error('argument is null');
  }

  private static validateSubarrayIndices(
    lo: number,
    hi: number,
    length: number
  ) {
    if (lo < 0 || hi > length || lo > hi)
      throw new Error(`subarray indices out of bounds: [${lo}, ${hi})`);
  }

  /**
   * Unit tests `StdStats`.
   * Convert command-line arguments to array of doubles and call various methods.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: number[] = StdArrayIO.readDouble1D();
    StdOut.printf('       min %10.3f\n', StdStats.min$double_A(a));
    StdOut.printf('      mean %10.3f\n', StdStats.mean$double_A(a));
    StdOut.printf('       max %10.3f\n', StdStats.max$double_A(a));
    StdOut.printf('    stddev %10.3f\n', StdStats.stddev$double_A(a));
    StdOut.printf('       var %10.3f\n', StdStats.var$double_A(a));
    StdOut.printf('   stddevp %10.3f\n', StdStats.stddevp$double_A(a));
    StdOut.printf('      varp %10.3f\n', StdStats.varp$double_A(a));
  }
}
StdStats.__class = 'edu.princeton.cs.algs4.StdStats';

StdStats.main(null);
