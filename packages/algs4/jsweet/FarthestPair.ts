import { Point2D } from './Point2D';
import { GrahamScan } from './GrahamScan';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Computes the farthest pair of points in the specified array of points.
 *
 * @param  {Array} points the array of points
 * @throws IllegalArgumentException if {@code points} is {@code null} or if any
 * entry in {@code points[]} is {@code null}
 * @class
 * @author Robert Sedgewick
 */
export class FarthestPair {
  private best1: Point2D;

  private best2: Point2D;

  private bestDistanceSquared: number =
    Number.NEGATIVE_INFINITY;

  public constructor(points: Point2D[]) {
    if (this.best1 === undefined) this.best1 = null;
    if (this.best2 === undefined) this.best2 = null;
    if (points == null) throw new Error('constructor argument is null');
    for (let i = 0; i < points.length; i++) {
      {
        if (points[i] == null) throw new Error(`array element ${i} is null`);
      }
    }
    const graham: GrahamScan = new GrahamScan(points);
    if (points.length <= 1) return;
    let m = 0;
    for (let index252 = graham.hull().iterator(); index252.hasNext(); ) {
      const p = index252.next();
      m++;
    }
    const hull: Point2D[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(m + 1);
    m = 1;
    for (let index253 = graham.hull().iterator(); index253.hasNext(); ) {
      const p = index253.next();
      {
        hull[m++] = p;
      }
    }
    m--;
    if (m === 1) return;
    if (m === 2) {
      this.best1 = hull[1];
      this.best2 = hull[2];
      this.bestDistanceSquared = this.best1.distanceSquaredTo(this.best2);
      return;
    }
    let k = 2;
    while (
      Point2D.area2(hull[m], hull[1], hull[k + 1]) >
      Point2D.area2(hull[m], hull[1], hull[k])
    ) {
      {
        k++;
      }
    }
    let j: number = k;
    for (let i = 1; i <= k && j <= m; i++) {
      {
        if (hull[i].distanceSquaredTo(hull[j]) > this.bestDistanceSquared) {
          this.best1 = hull[i];
          this.best2 = hull[j];
          this.bestDistanceSquared = hull[i].distanceSquaredTo(hull[j]);
        }
        while (
          j < m &&
          Point2D.area2(hull[i], hull[i + 1], hull[j + 1]) >
            Point2D.area2(hull[i], hull[i + 1], hull[j])
        ) {
          {
            j++;
            const distanceSquared: number = hull[i].distanceSquaredTo(hull[j]);
            if (distanceSquared > this.bestDistanceSquared) {
              this.best1 = hull[i];
              this.best2 = hull[j];
              this.bestDistanceSquared = hull[i].distanceSquaredTo(hull[j]);
            }
          }
        }
      }
    }
  }

  /**
   * Returns one of the points in the farthest pair of points.
   *
   * @return {Point2D} one of the two points in the farthest pair of points;
   * {@code null} if no such point (because there are fewer than 2 points)
   */
  public either(): Point2D {
    return this.best1;
  }

  /**
   * Returns the other point in the farthest pair of points.
   *
   * @return {Point2D} the other point in the farthest pair of points
   * {@code null} if no such point (because there are fewer than 2 points)
   */
  public other(): Point2D {
    return this.best2;
  }

  /**
   * Returns the Eucliden distance between the farthest pair of points.
   * This quantity is also known as the <em>diameter</em> of the set of points.
   *
   * @return  the Euclidean distance between the farthest pair of points
   * {@code Double.POSITIVE_INFINITY} if no such pair of points
   * exist (because there are fewer than 2 points)
   */
  public distance(): number {
    return Math.sqrt(this.bestDistanceSquared);
  }

  /**
   * Unit tests the {@code FarthestPair} data type.
   * Reads in an integer {@code n} and {@code n} points (specified by
   * their <em>x</em>- and <em>y</em>-coordinates) from standard input;
   * computes a farthest pair of points; and prints the pair to standard
   * output.
   *
   * @param {Array} args the command-line arguments
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
        const x: number = StdIn.readInt();
        const y: number = StdIn.readInt();
        points[i] = new Point2D(x, y);
      }
    }
    const farthest: FarthestPair = new FarthestPair(points);
    StdOut.println$java_lang_Object(
      `${farthest.distance()} from ${farthest.either()} to ${farthest.other()}`
    );
  }
}
FarthestPair.__class = 'edu.princeton.cs.algs4.FarthestPair';

FarthestPair.main(null);
