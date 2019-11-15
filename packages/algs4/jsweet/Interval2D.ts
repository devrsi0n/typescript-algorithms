import { Interval1D } from './Interval1D';
import { Point2D } from './Point2D';
import { StdDraw } from './StdDraw';
import { Counter } from './Counter';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Initializes a two-dimensional interval.
 * @param {Interval1D} x the one-dimensional interval of x-coordinates
 * @param {Interval1D} y the one-dimensional interval of y-coordinates
 * @class
 * @author Robert Sedgewick
 */
export class Interval2D {
  private x: Interval1D;

  private y: Interval1D;

  public constructor(x: Interval1D, y: Interval1D) {
    if (this.x === undefined) this.x = null;
    if (this.y === undefined) this.y = null;
    this.x = x;
    this.y = y;
  }

  /**
   * Does this two-dimensional interval intersect that two-dimensional interval?
   * @param {Interval2D} that the other two-dimensional interval
   * @return  true if this two-dimensional interval intersects
   * that two-dimensional interval; false otherwise
   */
  public intersects(that: Interval2D): boolean {
    if (!this.x.intersects(that.x)) return false;
    if (!this.y.intersects(that.y)) return false;
    return true;
  }

  /**
   * Does this two-dimensional interval contain the point p?
   * @param {Point2D} p the two-dimensional point
   * @return  true if this two-dimensional interval contains the point p; false otherwise
   */
  public contains(p: Point2D): boolean {
    return this.x.contains(p.x()) && this.y.contains(p.y());
  }

  /**
   * Returns the area of this two-dimensional interval.
   * @return  the area of this two-dimensional interval
   */
  public area(): number {
    return this.x.length() * this.y.length();
  }

  /**
   * Returns a string representation of this two-dimensional interval.
   * @return  a string representation of this two-dimensional interval
   * in the form [xmin, xmax] x [ymin, ymax]
   */
  public toString(): string {
    return `${this.x} x ${this.y}`;
  }

  /**
   * Does this interval equal the other interval?
   * @param  other the other interval
   * @return  true if this interval equals the other interval; false otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Interval2D = <Interval2D>other;
    return this.x.equals(that.x) && this.y.equals(that.y);
  }

  /**
   * Returns an integer hash code for this interval.
   * @return  an integer hash code for this interval
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
    })(this.x);
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
    })(this.y);
    return 31 * hash1 + hash2;
  }

  /**
   * Draws this two-dimensional interval to standard draw.
   */
  public draw() {
    const xc: number = (this.x.min() + this.x.max()) / 2.0;
    const yc: number = (this.y.min() + this.y.max()) / 2.0;
    StdDraw.rectangle(xc, yc, this.x.length() / 2.0, this.y.length() / 2.0);
  }

  /**
   * Unit tests the `Interval2D` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const xmin: number = Number.parseFloat(args[0]);
    const xmax: number = Number.parseFloat(args[1]);
    const ymin: number = Number.parseFloat(args[2]);
    const ymax: number = Number.parseFloat(args[3]);
    const trials: number = parseInt(args[4]);
    const xInterval: Interval1D = new Interval1D(xmin, xmax);
    const yInterval: Interval1D = new Interval1D(ymin, ymax);
    const box: Interval2D = new Interval2D(xInterval, yInterval);
    box.draw();
    const counter: Counter = new Counter('hits');
    for (let t = 0; t < trials; t++) {
      {
        const x: number = StdRandom.uniform$double$double(0.0, 1.0);
        const y: number = StdRandom.uniform$double$double(0.0, 1.0);
        const point: Point2D = new Point2D(x, y);
        if (box.contains(point)) counter.increment();
        else point.draw();
      }
    }
    StdOut.println$java_lang_Object(counter);
    StdOut.printf('box area = %.2f\n', box.area());
  }
}
Interval2D.__class = 'edu.princeton.cs.algs4.Interval2D';

Interval2D.main(null);
