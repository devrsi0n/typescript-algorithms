import { StdOut } from './StdOut';

/**
 * Initializes a directed edge from vertex {@code v} to vertex {@code w} with
 * the given {@code weight}.
 * @param {number} v the tail vertex
 * @param {number} w the head vertex
 * @param {number} weight the weight of the directed edge
 * @throws IllegalArgumentException if either {@code v} or {@code w}
 * is a negative integer
 * @throws IllegalArgumentException if {@code weight} is {@code NaN}
 * @class
 * @author Robert Sedgewick
 */
export class DirectedEdge {
  private v: number;

  private w: number;

  private __weight: number;

  public constructor(v: number, w: number, weight: number) {
    if (this.v === undefined) this.v = 0;
    if (this.w === undefined) this.w = 0;
    if (this.__weight === undefined) this.__weight = 0;
    if (v < 0) throw new Error('Vertex names must be nonnegative integers');
    if (w < 0) throw new Error('Vertex names must be nonnegative integers');
    if (/* isNaN */ isNaN(weight)) throw new Error('Weight is NaN');
    this.v = v;
    this.w = w;
    this.__weight = weight;
  }

  /**
   * Returns the tail vertex of the directed edge.
   * @return  the tail vertex of the directed edge
   */
  public from(): number {
    return this.v;
  }

  /**
   * Returns the head vertex of the directed edge.
   * @return  the head vertex of the directed edge
   */
  public to(): number {
    return this.w;
  }

  /**
   * Returns the weight of the directed edge.
   * @return  the weight of the directed edge
   */
  public weight(): number {
    return this.__weight;
  }

  /**
   * Returns a string representation of the directed edge.
   * @return  a string representation of the directed edge
   */
  public toString(): string {
    return `${this.v}->${this.w} ${printf(
      '%5.2f',
      this.__weight
    )}`;
  }

  /**
   * Unit tests the {@code DirectedEdge} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const e: DirectedEdge = new DirectedEdge(12, 34, 5.67);
    StdOut.println$java_lang_Object(e);
  }
}
DirectedEdge.__class = 'edu.princeton.cs.algs4.DirectedEdge';

DirectedEdge.main(null);
