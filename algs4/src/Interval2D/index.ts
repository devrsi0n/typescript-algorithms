import Interval1D from '../Interval1D';
import Point2D from '../Point2D';
import StdDraw from '../StdDraw';

/**
 *  The {@code Interval2D} class represents a closed two-dimensional interval,
 *  which represents all points (x, y) with both {@code xmin <= x <= xmax} and
 *  {@code ymin <= y <= ymax}.
 *  Two-dimensional intervals are immutable: their values cannot be changed
 *  after they are created.
 *  The class {@code Interval2D} includes methods for checking whether
 *  a two-dimensional interval contains a point and determining whether
 *  two two-dimensional intervals intersect.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Interval2D {
  private readonly _x: Interval1D;
  private readonly _y: Interval1D;

  constructor(x: Interval1D, y: Interval1D) {
    this._x = x;
    this._y = y;
  }

  /**
   * Returns the area of this two-dimensional interval.
   * @return the area of this two-dimensional interval
   */
  area() {
    return this._x.length() * this._y.length();
  }

  /**
   * Does this two-dimensional interval contain the point p?
   * @param p the two-dimensional point
   * @return true if this two-dimensional interval contains the point p; false otherwise
   */
  contains(p: Point2D) {
    return this._x.contains(p.x()) && this._y.contains(p.y());
  }

  x() {
    return this._x;
  }

  y() {
    return this._y;
  }

  /**
   * Does this two-dimensional interval intersect that two-dimensional interval?
   * @param that the other two-dimensional interval
   * @return true if this two-dimensional interval intersects
   *    that two-dimensional interval; false otherwise
   */
  intersects(that: Interval2D) {
    if (!this._x.intersects(that.x())) return false;
    if (!this._y.intersects(that.y())) return false;
    return true;
  }

  /**
   * Draws this two-dimensional interval to standard draw.
   */
  draw() {
    const xc = (this._x.min() + this._x.max()) / 2.0;
    const yc = (this._y.min() + this._y.max()) / 2.0;
    StdDraw.rectangle(xc, yc, this._x.length() / 2.0, this._y.length() / 2.0);
  }
}
