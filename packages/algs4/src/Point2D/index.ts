import { assertSafeNumber } from '../utils/assert';
import StdDraw from '../StdDraw';

/**
 *  The Point class is an immutable data type to encapsulate a
 *  two-dimensional point with real-value coordinates.
 *  <p>
 *  Note: in order to deal with the difference behavior of double and
 *  Double with respect to -0.0 and +0.0, the Point2D constructor converts
 *  any coordinates that are -0.0 to +0.0.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 */
export default class Point2D {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    assertSafeNumber(x);
    assertSafeNumber(y);
    this._x = x;
    this._y = y;
  }

  x() {
    return this._x;
  }

  y() {
    return this._y;
  }

  /**
   * Returns the polar radius of this point.
   * @return the polar radius of this point in polar coordinates: sqrt(x*x + y*y)
   */
  r() {
    return Math.sqrt(this._x ** 2 + this._y ** 2);
  }

  /**
   * Returns the angle of this point in polar coordinates.
   * @return the angle (in radians) of this point in polar coordinates (between –&pi; and &pi;)
   */
  theta() {
    return Math.atan2(this._y, this._x);
  }

  /**
   * Returns the Euclidean distance between this point and that point.
   * @param that the other point
   * @return the Euclidean distance between this point and that point
   */
  distanceTo(that: Point2D) {
    const dx = this._x - that.x();
    const dy = this._y - that.y();
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  /**
   * Plot this point using standard draw.
   */
  draw() {
    StdDraw.point(this._x, this._y);
  }

  /**
   * Return a string representation of this point.
   * @return a string representation of this point in the format (x, y)
   */
  toString() {
    return `(${this._x}, ${this._y})`;
  }
}
