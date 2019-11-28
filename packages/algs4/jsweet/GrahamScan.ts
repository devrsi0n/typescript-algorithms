import { Stack } from './Stack';
import { Point2D } from './Point2D';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Computes the convex hull of the specified array of points.
 *
 * @param   points the array of points
 * @throws IllegalArgumentException if `points` is `null`
 * @throws IllegalArgumentException if any entry in `points[]` is `null`
 * @throws IllegalArgumentException if `points.length` is `0`
 * @class
 * @author Robert Sedgewick
 */
export class GrahamScan {
  private __hull: Stack<Point2D> = <any>new Stack<Point2D>();

  public constructor(points: Point2D[]) {
    if (points == null) throw new Error('argument is null');
    if (points.length === 0) throw new Error('array is of length 0');
    const n: number = points.length;
    const a: Point2D[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        if (points[i] == null) throw new Error(`points[${i}] is null`);
        a[i] = points[i];
      }
    }
    Arrays.sort(a);
    Arrays.sort<any>(a, 1, n, <any>a[0].polarOrder());
    this.__hull.push(a[0]);
    let k1: number;
    for (k1 = 1; k1 < n; k1++) {
      if (!a[0].equals(a[k1])) break;
    }
    if (k1 === n) return;
    let k2: number;
    for (k2 = k1 + 1; k2 < n; k2++) {
      if (Point2D.ccw(a[0], a[k1], a[k2]) !== 0) break;
    }
    this.__hull.push(a[k2 - 1]);
    for (let i: number = k2; i < n; i++) {
      {
        let top: Point2D = this.__hull.pop();
        while (Point2D.ccw(this.__hull.peek(), top, a[i]) <= 0) {
          {
            top = this.__hull.pop();
          }
        }
        this.__hull.push(top);
        this.__hull.push(a[i]);
      }
    }
  }

  /**
   * Returns the extreme points on the convex hull in counterclockwise order.
   *
   * @return  the extreme points on the convex hull in counterclockwise order
   */
  public hull(): Iterable<Point2D> {
    const s: Stack<Point2D> = <any>new Stack<Point2D>();
    for (let index278 = this.__hull.iterator(); index278.hasNext(); ) {
      const p = index278.next();
      s.push(p);
    }
    return s;
  }

  private isConvex(): boolean {
    const n: number = this.__hull.size();
    if (n <= 2) return true;
    const points: Point2D[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    let k = 0;
    for (let index279 = this.hull().iterator(); index279.hasNext(); ) {
      const p = index279.next();
      {
        points[k++] = p;
      }
    }
    for (let i = 0; i < n; i++) {
      {
        if (
          Point2D.ccw(points[i], points[(i + 1) % n], points[(i + 2) % n]) <= 0
        ) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Unit tests the `GrahamScan` data type.
   * Reads in an integer `n` and `n` points (specified by
   * their <em>x</em>- and <em>y</em>-coordinates) from standard input;
   * computes their convex hull; and prints out the points on the
   * convex hull to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const n: number = StdIn.readInt();
    const points: Point2D[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        const x: number = StdIn.readInt();
        const y: number = StdIn.readInt();
        points[i] = new Point2D(x, y);
      }
    }
    const graham: GrahamScan = new GrahamScan(points);
    for (let index280 = graham.hull().iterator(); index280.hasNext(); ) {
      const p = index280.next();
      StdOut.println$java_lang_Object(p);
    }
  }
}
GrahamScan.__class = 'edu.princeton.cs.algs4.GrahamScan';

GrahamScan.main(null);
