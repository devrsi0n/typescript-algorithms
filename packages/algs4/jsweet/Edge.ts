import { StdOut } from './StdOut';

/**
 * Initializes an edge between vertices `v` and `w` of
 * the given `weight`.
 *
 * @param   v one vertex
 * @param   w the other vertex
 * @param   weight the weight of this edge
 * @throws IllegalArgumentException if either `v` or `w`
 * is a negative integer
 * @throws IllegalArgumentException if `weight` is `NaN`
 * @class
 * @author Robert Sedgewick
 */
export class Edge implements java.lang.Comparable<Edge> {
  private v: number;

  private w: number;

  private __weight: number;

  public constructor(v: number, w: number, weight: number) {
    if (this.v === undefined) this.v = 0;
    if (this.w === undefined) this.w = 0;
    if (this.__weight === undefined) this.__weight = 0;
    if (v < 0) throw new Error('vertex index must be a nonnegative integer');
    if (w < 0) throw new Error('vertex index must be a nonnegative integer');
    if (/* isNaN */ isNaN(weight)) throw new Error('Weight is NaN');
    this.v = v;
    this.w = w;
    this.__weight = weight;
  }

  /**
   * Returns the weight of this edge.
   *
   * @return  the weight of this edge
   */
  public weight(): number {
    return this.__weight;
  }

  /**
   * Returns either endpoint of this edge.
   *
   * @return  either endpoint of this edge
   */
  public either(): number {
    return this.v;
  }

  /**
   * Returns the endpoint of this edge that is different from the given vertex.
   *
   * @param   vertex one endpoint of this edge
   * @return  the other endpoint of this edge
   * @throws IllegalArgumentException if the vertex is not one of the
   * endpoints of this edge
   */
  public other(vertex: number): number {
    if (vertex === this.v) return this.w;
    if (vertex === this.w) return this.v;
    throw new Error('Illegal endpoint');
  }

  /**
   * Compares two edges by weight.
   * Note that `compareTo()` is not consistent with `equals()`,
   * which uses the reference equality implementation inherited from `Object`.
   *
   * @param  {Edge} that the other edge
   * @return  a negative integer, zero, or positive integer depending on whether
   * the weight of this is less than, equal to, or greater than the
   * argument edge
   */
  public compareTo(that: Edge): number {
    return /* compare */ this.__weight - that.__weight;
  }

  /**
   * Returns a string representation of this edge.
   *
   * @return  a string representation of this edge
   */
  public toString(): string {
    return printf('%d-%d %.5f', this.v, this.w, this.__weight);
  }

  /**
   * Unit tests the `Edge` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const e: Edge = new Edge(12, 34, 5.67);
    StdOut.println$java_lang_Object(e);
  }
}
Edge.__class = 'edu.princeton.cs.algs4.Edge';
Edge.__interfaces = ['java.lang.Comparable'];

Edge.main(null);
