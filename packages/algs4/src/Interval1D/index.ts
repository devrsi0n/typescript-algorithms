import { assertSafeNumber } from '../utils/assert';

/**
 *  The {@code Interval1D} class represents a one-dimensional interval.
 *  The interval is <em>closed</em>—it contains both endpoints.
 *  Intervals are immutable: their values cannot be changed after they are created.
 *  The class {@code Interval1D} includes methods for checking whether
 *  an interval contains a point and determining whether two intervals intersect.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Interval1D {
  private readonly _min: number;
  private readonly _max: number;

  constructor(min: number, max: number) {
    assertSafeNumber([min, max]);
    if (max < min) {
      throw new Error('max must greater than min');
    }
    this._min = min;
    this._max = max;
  }

  /**
   * Returns the length of this interval.
   *
   * @return the length of this interval (max - min)
   */
  length() {
    return this._max - this._min;
  }

  /**
   * Returns true if this interval contains the specified value.
   *
   * @param x the value
   * @return true if this interval contains the value x;
   *         false otherwise
   */
  contains(x: number) {
    return this._min <= x && x <= this._max;
  }

  /**
   * Returns true if this interval intersects the specified interval.
   *
   * @param  that the other interval
   * @return true if this interval intersects the argument interval;
   *         false otherwise
   */
  intersects(that: Interval1D) {
    if (this._max < that._min) return false;
    if (that._max < this._min) return false;
    return true;
  }

  min() {
    return this._min;
  }

  max() {
    return this._max;
  }

  draw() {}
}
