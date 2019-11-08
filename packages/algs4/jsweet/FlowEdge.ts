import { StdOut } from './StdOut';

/**
 * Initializes an edge from vertex {@code v} to vertex {@code w} with
 * the given {@code capacity} and {@code flow}.
 * @param {number} v the tail vertex
 * @param {number} w the head vertex
 * @param {number} capacity the capacity of the edge
 * @param {number} flow the flow on the edge
 * @throws IllegalArgumentException if either {@code v} or {@code w}
 * is a negative integer
 * @throws IllegalArgumentException if {@code capacity} is negative
 * @throws IllegalArgumentException unless {@code flow} is between
 * {@code 0.0} and {@code capacity}.
 * @class
 * @author Robert Sedgewick
 */
export class FlowEdge {
  static FLOATING_POINT_EPSILON = 1.0e-10;

  private v: number;

  private w: number;

  private __capacity: number;

  private __flow: number;

  public constructor(v?: any, w?: any, capacity?: any, flow?: any) {
    if (
      (typeof v === 'number' || v === null) &&
      (typeof w === 'number' || w === null) &&
      (typeof capacity === 'number' || capacity === null) &&
      (typeof flow === 'number' || flow === null)
    ) {
      const __args = arguments;
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      (() => {
        if (v < 0)
          throw new Error('vertex index must be a non-negative integer');
        if (w < 0)
          throw new Error('vertex index must be a non-negative integer');
        if (!(capacity >= 0.0))
          throw new Error('edge capacity must be non-negative');
        if (!(flow <= capacity)) throw new Error('flow exceeds capacity');
        if (!(flow >= 0.0)) throw new Error('flow must be non-negative');
        this.v = v;
        this.w = w;
        this.__capacity = capacity;
        this.__flow = flow;
      })();
    } else if (
      (typeof v === 'number' || v === null) &&
      (typeof w === 'number' || w === null) &&
      (typeof capacity === 'number' || capacity === null) &&
      flow === undefined
    ) {
      const __args = arguments;
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      (() => {
        if (v < 0)
          throw new Error('vertex index must be a non-negative integer');
        if (w < 0)
          throw new Error('vertex index must be a non-negative integer');
        if (!(capacity >= 0.0))
          throw new Error('Edge capacity must be non-negative');
        this.v = v;
        this.w = w;
        this.__capacity = capacity;
        this.__flow = 0.0;
      })();
    } else if (
      ((v != null && v instanceof <any>FlowEdge) || v === null) &&
      w === undefined &&
      capacity === undefined &&
      flow === undefined
    ) {
      const __args = arguments;
      const e: any = __args[0];
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.__capacity === undefined) this.__capacity = 0;
      if (this.__flow === undefined) this.__flow = 0;
      (() => {
        this.v = e.v;
        this.w = e.w;
        this.__capacity = e.__capacity;
        this.__flow = e.__flow;
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the tail vertex of the edge.
   * @return  the tail vertex of the edge
   */
  public from(): number {
    return this.v;
  }

  /**
   * Returns the head vertex of the edge.
   * @return  the head vertex of the edge
   */
  public to(): number {
    return this.w;
  }

  /**
   * Returns the capacity of the edge.
   * @return  the capacity of the edge
   */
  public capacity(): number {
    return this.__capacity;
  }

  /**
   * Returns the flow on the edge.
   * @return  the flow on the edge
   */
  public flow(): number {
    return this.__flow;
  }

  /**
   * Returns the endpoint of the edge that is different from the given vertex
   * (unless the edge represents a self-loop in which case it returns the same vertex).
   * @param {number} vertex one endpoint of the edge
   * @return  the endpoint of the edge that is different from the given vertex
   * (unless the edge represents a self-loop in which case it returns the same vertex)
   * @throws IllegalArgumentException if {@code vertex} is not one of the endpoints
   * of the edge
   */
  public other(vertex: number): number {
    if (vertex === this.v) return this.w;
    if (vertex === this.w) return this.v;
    throw new Error('invalid endpoint');
  }

  /**
   * Returns the residual capacity of the edge in the direction
   * to the given {@code vertex}.
   * @param {number} vertex one endpoint of the edge
   * @return  the residual capacity of the edge in the direction to the given vertex
   * If {@code vertex} is the tail vertex, the residual capacity equals
   * {@code capacity() - flow()}; if {@code vertex} is the head vertex, the
   * residual capacity equals {@code flow()}.
   * @throws IllegalArgumentException if {@code vertex} is not one of the endpoints of the edge
   */
  public residualCapacityTo(vertex: number): number {
    if (vertex === this.v) return this.__flow;
    if (vertex === this.w) return this.__capacity - this.__flow;
    throw new Error('invalid endpoint');
  }

  /**
   * Increases the flow on the edge in the direction to the given vertex.
   * If {@code vertex} is the tail vertex, this increases the flow on the edge by {@code delta};
   * if {@code vertex} is the head vertex, this decreases the flow on the edge by {@code delta}.
   * @param {number} vertex one endpoint of the edge
   * @param {number} delta amount by which to increase flow
   * @throws IllegalArgumentException if {@code vertex} is not one of the endpoints
   * of the edge
   * @throws IllegalArgumentException if {@code delta} makes the flow on
   * on the edge either negative or larger than its capacity
   * @throws IllegalArgumentException if {@code delta} is {@code NaN}
   */
  public addResidualFlowTo(vertex: number, delta: number) {
    if (!(delta >= 0.0)) throw new Error('Delta must be nonnegative');
    if (vertex === this.v) this.__flow -= delta;
    else if (vertex === this.w) this.__flow += delta;
    else throw new Error('invalid endpoint');
    if (Math.abs(this.__flow) <= FlowEdge.FLOATING_POINT_EPSILON)
      this.__flow = 0;
    if (
      Math.abs(this.__flow - this.__capacity) <= FlowEdge.FLOATING_POINT_EPSILON
    )
      this.__flow = this.__capacity;
    if (!(this.__flow >= 0.0)) throw new Error('Flow is negative');
    if (!(this.__flow <= this.__capacity))
      throw new Error('Flow exceeds capacity');
  }

  /**
   * Returns a string representation of the edge.
   * @return  a string representation of the edge
   */
  public toString(): string {
    return `${this.v}->${this.w} ${this.__flow}/${this.__capacity}`;
  }

  /**
   * Unit tests the {@code FlowEdge} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const e: FlowEdge = new FlowEdge(12, 23, 4.56);
    StdOut.println$java_lang_Object(e);
  }
}
FlowEdge.__class = 'edu.princeton.cs.algs4.FlowEdge';

FlowEdge.main(null);
