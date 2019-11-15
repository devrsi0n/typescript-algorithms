import { StdDraw } from './StdDraw';
import { StdRandom } from './StdRandom';

/**
 * Initializes a new point (x, y).
 * @param  x the x-coordinate
 * @param  y the y-coordinate
 * @throws IllegalArgumentException if either `x` or `y`
 * is `Double.NaN`, `Double.POSITIVE_INFINITY` or
 * `Double.NEGATIVE_INFINITY`
 * @class
 * @author Robert Sedgewick
 */
export class Point2D implements java.lang.Comparable<Point2D> {
  /**
   * Compares two points by x-coordinate.
   */
  public static X_ORDER: Comparator<Point2D>;
  public static X_ORDER_$LI$(): Comparator<Point2D> {
    if (Point2D.X_ORDER == null)
      Point2D.X_ORDER = (arg0, arg1) => {
        return new Point2D.XOrder().compare(arg0, arg1);
      };
    return Point2D.X_ORDER;
  }

  /**
   * Compares two points by y-coordinate.
   */
  public static Y_ORDER: Comparator<Point2D>;
  public static Y_ORDER_$LI$(): Comparator<Point2D> {
    if (Point2D.Y_ORDER == null)
      Point2D.Y_ORDER = (arg0, arg1) => {
        return new Point2D.YOrder().compare(arg0, arg1);
      };
    return Point2D.Y_ORDER;
  }

  /**
   * Compares two points by polar radius.
   */
  public static R_ORDER: Comparator<Point2D>;
  public static R_ORDER_$LI$(): Comparator<Point2D> {
    if (Point2D.R_ORDER == null)
      Point2D.R_ORDER = (arg0, arg1) => {
        return new Point2D.ROrder().compare(arg0, arg1);
      };
    return Point2D.R_ORDER;
  }

  private __x: number;

  private __y: number;

  public constructor(x: number, y: number) {
    if (this.__x === undefined) this.__x = 0;
    if (this.__y === undefined) this.__y = 0;
    if (
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(x) ||
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(y)
    )
      throw new Error('Coordinates must be finite');
    if (/* isNaN */ isNaN(x) || /* isNaN */ isNaN(y))
      throw new Error('Coordinates cannot be NaN');
    if (x === 0.0) this.__x = 0.0;
    else this.__x = x;
    if (y === 0.0) this.__y = 0.0;
    else this.__y = y;
  }

  /**
   * Returns the x-coordinate.
   * @return  the x-coordinate
   */
  public x(): number {
    return this.__x;
  }

  /**
   * Returns the y-coordinate.
   * @return  the y-coordinate
   */
  public y(): number {
    return this.__y;
  }

  /**
   * Returns the polar radius of this point.
   * @return  the polar radius of this point in polar coordiantes: sqrt(x*x + y*y)
   */
  public r(): number {
    return Math.sqrt(this.__x * this.__x + this.__y * this.__y);
  }

  /**
   * Returns the angle of this point in polar coordinates.
   * @return  the angle (in radians) of this point in polar coordiantes (between �C&pi; and &pi;)
   */
  public theta(): number {
    return Math.atan2(this.__y, this.__x);
  }

  /**
   * Returns the angle between this point and that point.
   * @return  the angle in radians (between �C&pi; and &pi;) between this point and that point (0 if equal)
   * @param {Point2D} that
   * @private
   */
  angleTo(that: Point2D): number {
    const dx: number = that.__x - this.__x;
    const dy: number = that.__y - this.__y;
    return Math.atan2(dy, dx);
  }

  /**
   * Returns true if a��b��c is a counterclockwise turn.
   * @param {Point2D} a first point
   * @param {Point2D} b second point
   * @param {Point2D} c third point
   * @return  { -1, 0, +1 } if a��b��c is a { clockwise, collinear; counterclocwise } turn.
   */
  public static ccw(a: Point2D, b: Point2D, c: Point2D): number {
    const area2: number =
      (b.__x - a.__x) * (c.__y - a.__y) - (b.__y - a.__y) * (c.__x - a.__x);
    if (area2 < 0) return -1;
    if (area2 > 0) return +1;
    return 0;
  }

  /**
   * Returns twice the signed area of the triangle a-b-c.
   * @param {Point2D} a first point
   * @param {Point2D} b second point
   * @param {Point2D} c third point
   * @return  twice the signed area of the triangle a-b-c
   */
  public static area2(a: Point2D, b: Point2D, c: Point2D): number {
    return (
      (b.__x - a.__x) * (c.__y - a.__y) - (b.__y - a.__y) * (c.__x - a.__x)
    );
  }

  /**
   * Returns the Euclidean distance between this point and that point.
   * @param {Point2D} that the other point
   * @return  the Euclidean distance between this point and that point
   */
  public distanceTo(that: Point2D): number {
    const dx: number = this.__x - that.__x;
    const dy: number = this.__y - that.__y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Returns the square of the Euclidean distance between this point and that point.
   * @param {Point2D} that the other point
   * @return  the square of the Euclidean distance between this point and that point
   */
  public distanceSquaredTo(that: Point2D): number {
    const dx: number = this.__x - that.__x;
    const dy: number = this.__y - that.__y;
    return dx * dx + dy * dy;
  }

  /**
   * Compares two points by y-coordinate, breaking ties by x-coordinate.
   * Formally, the invoking point (x0, y0) is less than the argument point (x1, y1)
   * if and only if either `y0 < y1` or if `y0 == y1` and `x0 < x1`.
   *
   * @param  {Point2D} that the other point
   * @return  the value `0` if this string is equal to the argument
   * string (precisely when `equals()` returns `true`);
   * a negative integer if this point is less than the argument
   * point; and a positive integer if this point is greater than the
   * argument point
   */
  public compareTo(that: Point2D): number {
    if (this.__y < that.__y) return -1;
    if (this.__y > that.__y) return +1;
    if (this.__x < that.__x) return -1;
    if (this.__x > that.__x) return +1;
    return 0;
  }

  /**
   * Compares two points by polar angle (between 0 and 2&pi;) with respect to this point.
   *
   * @return  the comparator
   */
  public polarOrder(): Comparator<Point2D> {
    return (arg0, arg1) => {
      return new Point2D.PolarOrder().compare(arg0, arg1);
    };
  }

  /**
   * Compares two points by atan2() angle (between �C&pi; and &pi;) with respect to this point.
   *
   * @return  the comparator
   */
  public atan2Order(): Comparator<Point2D> {
    return (arg0, arg1) => {
      return new Point2D.Atan2Order().compare(arg0, arg1);
    };
  }

  /**
   * Compares two points by distance to this point.
   *
   * @return  the comparator
   */
  public distanceToOrder(): Comparator<Point2D> {
    return (arg0, arg1) => {
      return new Point2D.DistanceToOrder().compare(arg0, arg1);
    };
  }

  /**
   *
   * Compares this point to the specified point.
   *
   * @param   other the other point
   * @return  `true` if this point equals `other`;
   * `false` otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Point2D = <Point2D>other;
    return this.__x === that.__x && this.__y === that.__y;
  }

  /**
   * Return a string representation of this point.
   * @return  a string representation of this point in the format (x, y)
   */
  public toString(): string {
    return `(${this.__x}, ${this.__y})`;
  }

  /**
   * Returns an integer hash code for this point.
   * @return  an integer hash code for this point
   */
  public hashCode(): number {
    const hashX: number = /* hashCode */ <any>((o: any) => {
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
    })(<number>this.__x);
    const hashY: number = /* hashCode */ <any>((o: any) => {
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
    })(<number>this.__y);
    return 31 * hashX + hashY;
  }

  /**
   * Plot this point using standard draw.
   */
  public draw() {
    StdDraw.point(this.__x, this.__y);
  }

  /**
   * Plot a line from this point to that point using standard draw.
   * @param {Point2D} that the other point
   */
  public drawTo(that: Point2D) {
    StdDraw.line(this.__x, this.__y, that.__x, that.__y);
  }

  /**
   * Unit tests the point data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const x0: number = parseInt(args[0]);
    const y0: number = parseInt(args[1]);
    const n: number = parseInt(args[2]);
    StdDraw.setCanvasSize$int$int(800, 800);
    StdDraw.setXscale$double$double(0, 100);
    StdDraw.setYscale$double$double(0, 100);
    StdDraw.setPenRadius$double(0.005);
    StdDraw.enableDoubleBuffering();
    const points: Point2D[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        const x: number = StdRandom.uniform$int(100);
        const y: number = StdRandom.uniform$int(100);
        points[i] = new Point2D(x, y);
        points[i].draw();
      }
    }
    const p: Point2D = new Point2D(x0, y0);
    StdDraw.setPenColor$java_awt_Color(StdDraw.RED_$LI$());
    StdDraw.setPenRadius$double(0.02);
    p.draw();
    StdDraw.setPenRadius();
    StdDraw.setPenColor$java_awt_Color(StdDraw.BLUE_$LI$());
    Arrays.sort<any>(points, <any>p.polarOrder());
    for (let i = 0; i < n; i++) {
      {
        p.drawTo(points[i]);
        StdDraw.show();
        StdDraw.pause(100);
      }
    }
  }
}
Point2D.__class = 'edu.princeton.cs.algs4.Point2D';
Point2D.__interfaces = ['java.lang.Comparable'];

export namespace Point2D {
  export class XOrder {
    public compare(p: Point2D, q: Point2D): number {
      if (p.__x < q.__x) return -1;
      if (p.__x > q.__x) return +1;
      return 0;
    }
  }
  XOrder.__class = 'edu.princeton.cs.algs4.Point2D.XOrder';
  XOrder.__interfaces = ['java.util.Comparator'];

  export class YOrder {
    public compare(p: Point2D, q: Point2D): number {
      if (p.__y < q.__y) return -1;
      if (p.__y > q.__y) return +1;
      return 0;
    }
  }
  YOrder.__class = 'edu.princeton.cs.algs4.Point2D.YOrder';
  YOrder.__interfaces = ['java.util.Comparator'];

  export class ROrder {
    public compare(p: Point2D, q: Point2D): number {
      const delta: number =
        p.__x * p.__x + p.__y * p.__y - (q.__x * q.__x + q.__y * q.__y);
      if (delta < 0) return -1;
      if (delta > 0) return +1;
      return 0;
    }
  }
  ROrder.__class = 'edu.princeton.cs.algs4.Point2D.ROrder';
  ROrder.__interfaces = ['java.util.Comparator'];

  export class Atan2Order {
    public __parent: any;
    public compare(q1: Point2D, q2: Point2D): number {
      const angle1: number = this.__parent.angleTo(q1);
      const angle2: number = this.__parent.angleTo(q2);
      if (angle1 < angle2) return -1;
      if (angle1 > angle2) return +1;
      return 0;
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  Atan2Order.__class = 'edu.princeton.cs.algs4.Point2D.Atan2Order';
  Atan2Order.__interfaces = ['java.util.Comparator'];

  export class PolarOrder {
    public __parent: any;
    public compare(q1: Point2D, q2: Point2D): number {
      const dx1: number = q1.__x - this.__parent.__x;
      const dy1: number = q1.__y - this.__parent.__y;
      const dx2: number = q2.__x - this.__parent.__x;
      const dy2: number = q2.__y - this.__parent.__y;
      if (dy1 >= 0 && dy2 < 0) return -1;
      if (dy2 >= 0 && dy1 < 0) return +1;
      if (dy1 === 0 && dy2 === 0) {
        if (dx1 >= 0 && dx2 < 0) return -1;
        if (dx2 >= 0 && dx1 < 0) return +1;
        return 0;
      }
      return -Point2D.ccw(this.__parent, q1, q2);
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  PolarOrder.__class = 'edu.princeton.cs.algs4.Point2D.PolarOrder';
  PolarOrder.__interfaces = ['java.util.Comparator'];

  export class DistanceToOrder {
    public __parent: any;
    public compare(p: Point2D, q: Point2D): number {
      const dist1: number = this.__parent.distanceSquaredTo(p);
      const dist2: number = this.__parent.distanceSquaredTo(q);
      if (dist1 < dist2) return -1;
      if (dist1 > dist2) return +1;
      return 0;
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  DistanceToOrder.__class = 'edu.princeton.cs.algs4.Point2D.DistanceToOrder';
  DistanceToOrder.__interfaces = ['java.util.Comparator'];
}

Point2D.R_ORDER_$LI$();

Point2D.Y_ORDER_$LI$();

Point2D.X_ORDER_$LI$();

Point2D.main(null);
