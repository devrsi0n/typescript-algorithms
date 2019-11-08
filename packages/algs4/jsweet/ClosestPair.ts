import { Point2D } from './Point2D';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Computes the closest pair of points in the specified array of points.
 *
 * @param   points the array of points
 * @throws IllegalArgumentException if {@code points} is {@code null} or if any
 * entry in {@code points[]} is {@code null}
 * @class
 * @author Robert Sedgewick
 */
export class ClosestPair {
  private best1: Point2D;

  private best2: Point2D;

  private bestDistance: number =
    Number.POSITIVE_INFINITY;

  public constructor(points: Point2D[]) {
    if (this.best1 === undefined) this.best1 = null;
    if (this.best2 === undefined) this.best2 = null;
    if (points == null) throw new Error('constructor argument is null');
    for (let i = 0; i < points.length; i++) {
      {
        if (points[i] == null) throw new Error(`array element ${i} is null`);
      }
    }
    const n: number = points.length;
    if (n <= 1) return;
    const pointsByX: Point2D[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      pointsByX[i] = points[i];
    }
    Arrays.sort<any>(pointsByX, <any>Point2D.X_ORDER_$LI$());
    for (let i = 0; i < n - 1; i++) {
      {
        if (pointsByX[i].equals(pointsByX[i + 1])) {
          this.bestDistance = 0.0;
          this.best1 = pointsByX[i];
          this.best2 = pointsByX[i + 1];
          return;
        }
      }
    }
    const pointsByY: Point2D[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      pointsByY[i] = pointsByX[i];
    }
    const aux: Point2D[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    this.closest(pointsByX, pointsByY, aux, 0, n - 1);
  }

  private closest(
    pointsByX: Point2D[],
    pointsByY: Point2D[],
    aux: Point2D[],
    lo: number,
    hi: number
  ): number {
    if (hi <= lo) return Number.POSITIVE_INFINITY;
    const mid: number = lo + (((hi - lo) / 2) | 0);
    const median: Point2D = pointsByX[mid];
    const delta1: number = this.closest(pointsByX, pointsByY, aux, lo, mid);
    const delta2: number = this.closest(pointsByX, pointsByY, aux, mid + 1, hi);
    let delta: number = Math.min(delta1, delta2);
    ClosestPair.merge(pointsByY, aux, lo, mid, hi);
    let m = 0;
    for (let i: number = lo; i <= hi; i++) {
      {
        if (Math.abs(pointsByY[i].x() - median.x()) < delta)
          aux[m++] = pointsByY[i];
      }
    }
    for (let i = 0; i < m; i++) {
      {
        for (
          let j: number = i + 1;
          j < m && aux[j].y() - aux[i].y() < delta;
          j++
        ) {
          {
            const distance: number = aux[i].distanceTo(aux[j]);
            if (distance < delta) {
              delta = distance;
              if (distance < this.bestDistance) {
                this.bestDistance = delta;
                this.best1 = aux[i];
                this.best2 = aux[j];
              }
            }
          }
        }
      }
    }
    return delta;
  }

  /**
   * Returns one of the points in the closest pair of points.
   *
   * @return {Point2D} one of the two points in the closest pair of points;
   * {@code null} if no such point (because there are fewer than 2 points)
   */
  public either(): Point2D {
    return this.best1;
  }

  /**
   * Returns the other point in the closest pair of points.
   *
   * @return {Point2D} the other point in the closest pair of points
   * {@code null} if no such point (because there are fewer than 2 points)
   */
  public other(): Point2D {
    return this.best2;
  }

  /**
   * Returns the Eucliden distance between the closest pair of points.
   *
   * @return  the Euclidean distance between the closest pair of points
   * {@code Double.POSITIVE_INFINITY} if no such pair of points
   * exist (because there are fewer than 2 points)
   */
  public distance(): number {
    return this.bestDistance;
  }

  private static less(
    v: java.lang.Comparable<any>,
    w: java.lang.Comparable<any>
  ): boolean {
    return v.compareTo(w) < 0;
  }

  private static merge(
    a: java.lang.Comparable<any>[],
    aux: java.lang.Comparable<any>[],
    lo: number,
    mid: number,
    hi: number
  ) {
    for (let k: number = lo; k <= hi; k++) {
      {
        aux[k] = a[k];
      }
    }
    let i: number = lo;
    let j: number = mid + 1;
    for (let k: number = lo; k <= hi; k++) {
      {
        if (i > mid) a[k] = aux[j++];
        else if (j > hi) a[k] = aux[i++];
        else if (ClosestPair.less(aux[j], aux[i])) a[k] = aux[j++];
        else a[k] = aux[i++];
      }
    }
  }

  /**
   * Unit tests the {@code ClosestPair} data type.
   * Reads in an integer {@code n} and {@code n} points (specified by
   * their <em>x</em>- and <em>y</em>-coordinates) from standard input;
   * computes a closest pair of points; and prints the pair to standard
   * output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = StdIn.readInt();
    const points: Point2D[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        const x: number = StdIn.readDouble();
        const y: number = StdIn.readDouble();
        points[i] = new Point2D(x, y);
      }
    }
    const closest: ClosestPair = new ClosestPair(points);
    StdOut.println$java_lang_Object(
      `${closest.distance()} from ${closest.either()} to ${closest.other()}`
    );
  }
}
ClosestPair.__class = 'edu.princeton.cs.algs4.ClosestPair';

ClosestPair.main(null);
