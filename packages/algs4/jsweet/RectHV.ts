import { Point2D } from './Point2D';
import { StdDraw } from './StdDraw';

/**
 * Initializes a new rectangle [<em>xmin</em>, <em>xmax</em>]
 * x [<em>ymin</em>, <em>ymax</em>].
 *
 * @param  {number} xmin the <em>x</em>-coordinate of the lower-left endpoint
 * @param  {number} xmax the <em>x</em>-coordinate of the upper-right endpoint
 * @param  {number} ymin the <em>y</em>-coordinate of the lower-left endpoint
 * @param  {number} ymax the <em>y</em>-coordinate of the upper-right endpoint
 * @throws IllegalArgumentException if any of {@code xmin},
 * {@code xmax}, {@code ymin}, or {@code ymax}
 * is {@code Double.NaN}.
 * @throws IllegalArgumentException if {@code xmax < xmin} or {@code ymax < ymin}.
 * @class
 * @author Robert Sedgewick
 */
export class RectHV {
  private __xmin: number;

  private __ymin: number;

  private __xmax: number;

  private __ymax: number;

  public constructor(xmin: number, ymin: number, xmax: number, ymax: number) {
    if (this.__xmin === undefined) this.__xmin = 0;
    if (this.__ymin === undefined) this.__ymin = 0;
    if (this.__xmax === undefined) this.__xmax = 0;
    if (this.__ymax === undefined) this.__ymax = 0;
    this.__xmin = xmin;
    this.__ymin = ymin;
    this.__xmax = xmax;
    this.__ymax = ymax;
    if (/* isNaN */ isNaN(xmin) || /* isNaN */ isNaN(xmax)) {
      throw new Error(`x-coordinate is NaN: ${this.toString()}`);
    }
    if (/* isNaN */ isNaN(ymin) || /* isNaN */ isNaN(ymax)) {
      throw new Error(`y-coordinate is NaN: ${this.toString()}`);
    }
    if (xmax < xmin) {
      throw new Error(`xmax < xmin: ${this.toString()}`);
    }
    if (ymax < ymin) {
      throw new Error(`ymax < ymin: ${this.toString()}`);
    }
  }

  /**
   * Returns the minimum <em>x</em>-coordinate of any point in this rectangle.
   *
   * @return  the minimum <em>x</em>-coordinate of any point in this rectangle
   */
  public xmin(): number {
    return this.__xmin;
  }

  /**
   * Returns the maximum <em>x</em>-coordinate of any point in this rectangle.
   *
   * @return  the maximum <em>x</em>-coordinate of any point in this rectangle
   */
  public xmax(): number {
    return this.__xmax;
  }

  /**
   * Returns the minimum <em>y</em>-coordinate of any point in this rectangle.
   *
   * @return  the minimum <em>y</em>-coordinate of any point in this rectangle
   */
  public ymin(): number {
    return this.__ymin;
  }

  /**
   * Returns the maximum <em>y</em>-coordinate of any point in this rectangle.
   *
   * @return  the maximum <em>y</em>-coordinate of any point in this rectangle
   */
  public ymax(): number {
    return this.__ymax;
  }

  /**
   * Returns the width of this rectangle.
   *
   * @return  the width of this rectangle {@code xmax - xmin}
   */
  public width(): number {
    return this.__xmax - this.__xmin;
  }

  /**
   * Returns the height of this rectangle.
   *
   * @return  the height of this rectangle {@code ymax - ymin}
   */
  public height(): number {
    return this.__ymax - this.__ymin;
  }

  /**
   * Returns true if the two rectangles intersect. This includes
   * <em>improper intersections</em> (at points on the boundary
   * of each rectangle) and <em>nested intersctions</em>
   * (when one rectangle is contained inside the other)
   *
   * @param  {RectHV} that the other rectangle
   * @return  {@code true} if this rectangle intersect the argument
   * rectangle at one or more points
   */
  public intersects(that: RectHV): boolean {
    return (
      this.__xmax >= that.__xmin &&
      this.__ymax >= that.__ymin &&
      that.__xmax >= this.__xmin &&
      that.__ymax >= this.__ymin
    );
  }

  /**
   * Returns true if this rectangle contain the point.
   * @param  {Point2D} p the point
   * @return  {@code true} if this rectangle contain the point {@code p},
   * possibly at the boundary; {@code false} otherwise
   */
  public contains(p: Point2D): boolean {
    return (
      p.x() >= this.__xmin &&
      p.x() <= this.__xmax &&
      p.y() >= this.__ymin &&
      p.y() <= this.__ymax
    );
  }

  /**
   * Returns the Euclidean distance between this rectangle and the point {@code p}.
   *
   * @param  {Point2D} p the point
   * @return  the Euclidean distance between the point {@code p} and the closest point
   * on this rectangle; 0 if the point is contained in this rectangle
   */
  public distanceTo(p: Point2D): number {
    return Math.sqrt(this.distanceSquaredTo(p));
  }

  /**
   * Returns the square of the Euclidean distance between this rectangle and the point {@code p}.
   *
   * @param  {Point2D} p the point
   * @return  the square of the Euclidean distance between the point {@code p} and
   * the closest point on this rectangle; 0 if the point is contained
   * in this rectangle
   */
  public distanceSquaredTo(p: Point2D): number {
    let dx = 0.0;
    let dy = 0.0;
    if (p.x() < this.__xmin) dx = p.x() - this.__xmin;
    else if (p.x() > this.__xmax) dx = p.x() - this.__xmax;
    if (p.y() < this.__ymin) dy = p.y() - this.__ymin;
    else if (p.y() > this.__ymax) dy = p.y() - this.__ymax;
    return dx * dx + dy * dy;
  }

  /**
   * Compares this rectangle to the specified rectangle.
   *
   * @param  {*} other the other rectangle
   * @return  {@code true} if this rectangle equals {@code other};
   * {@code false} otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: RectHV = <RectHV>other;
    if (this.__xmin !== that.__xmin) return false;
    if (this.__ymin !== that.__ymin) return false;
    if (this.__xmax !== that.__xmax) return false;
    if (this.__ymax !== that.__ymax) return false;
    return true;
  }

  /**
   * Returns an integer hash code for this rectangle.
   * @return  an integer hash code for this rectangle
   */
  public hashCode(): number {
    const hash1: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__xmin);
    const hash2: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__ymin);
    const hash3: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__xmax);
    const hash4: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__ymax);
    return 31 * (31 * (31 * hash1 + hash2) + hash3) + hash4;
  }

  /**
   * Returns a string representation of this rectangle.
   *
   * @return  a string representation of this rectangle, using the format
   * {@code [xmin, xmax] x [ymin, ymax]}
   */
  public toString(): string {
    return `[${this.__xmin}, ${this.__xmax}] x [${this.__ymin}, ${this.__ymax}]`;
  }

  /**
   * Draws this rectangle to standard draw.
   */
  public draw() {
    StdDraw.line(this.__xmin, this.__ymin, this.__xmax, this.__ymin);
    StdDraw.line(this.__xmax, this.__ymin, this.__xmax, this.__ymax);
    StdDraw.line(this.__xmax, this.__ymax, this.__xmin, this.__ymax);
    StdDraw.line(this.__xmin, this.__ymax, this.__xmin, this.__ymin);
  }
}
RectHV.__class = 'edu.princeton.cs.algs4.RectHV';
