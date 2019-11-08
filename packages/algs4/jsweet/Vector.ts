import { StdOut } from './StdOut';

/**
 * Initializes a d-dimensional zero vector.
 *
 * @param {number} d the dimension of the vector
 * @class
 * @author Robert Sedgewick
 */
export class Vector {
  private d: number;

  private data: number[];

  public constructor(...a: any[]) {
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
      a === null
    ) {
      const __args = arguments;
      if (this.d === undefined) this.d = 0;
      if (this.data === undefined) this.data = null;
      if (this.d === undefined) this.d = 0;
      if (this.data === undefined) this.data = null;
      (() => {
        this.d = a.length;
        this.data = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.d);
        for (let i = 0; i < this.d; i++) {
          this.data[i] = a[i];
        }
      })();
    } else if (typeof a === 'number' || a === null) {
      const __args = arguments;
      const d: any = __args[0];
      if (this.d === undefined) this.d = 0;
      if (this.data === undefined) this.data = null;
      if (this.d === undefined) this.d = 0;
      if (this.data === undefined) this.data = null;
      (() => {
        this.d = d;
        this.data = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(d);
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the length of this vector.
   *
   * @return  the dimension of this vector
   * @deprecated Replaced by {@link #dimension()}.
   */
  public length(): number {
    return this.d;
  }

  /**
   * Returns the dimension of this vector.
   *
   * @return  the dimension of this vector
   */
  public dimension(): number {
    return this.d;
  }

  /**
   * Returns the dot product of this vector with the specified vector.
   *
   * @param  {Vector} that the other vector
   * @return  the dot product of this vector and that vector
   * @throws IllegalArgumentException if the dimensions of the two vectors are not equal
   */
  public dot(that: Vector): number {
    if (this.d !== that.d) throw new Error("Dimensions don't agree");
    let sum = 0.0;
    for (let i = 0; i < this.d; i++) {
      sum += this.data[i] * that.data[i];
    }
    return sum;
  }

  /**
   * Returns the magnitude of this vector.
   * This is also known as the L2 norm or the Euclidean norm.
   *
   * @return  the magnitude of this vector
   */
  public magnitude(): number {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Returns the Euclidean distance between this vector and the specified vector.
   *
   * @param  {Vector} that the other vector
   * @return  the Euclidean distance between this vector and that vector
   * @throws IllegalArgumentException if the dimensions of the two vectors are not equal
   */
  public distanceTo(that: Vector): number {
    if (this.d !== that.d) throw new Error("Dimensions don't agree");
    return this.minus(that).magnitude();
  }

  /**
   * Returns the sum of this vector and the specified vector.
   *
   * @param  {Vector} that the vector to add to this vector
   * @return {Vector} the vector whose value is {@code (this + that)}
   * @throws IllegalArgumentException if the dimensions of the two vectors are not equal
   */
  public plus(that: Vector): Vector {
    if (this.d !== that.d) throw new Error("Dimensions don't agree");
    const c: Vector = new Vector(this.d);
    for (let i = 0; i < this.d; i++) {
      c.data[i] = this.data[i] + that.data[i];
    }
    return c;
  }

  /**
   * Returns the difference between this vector and the specified vector.
   *
   * @param  {Vector} that the vector to subtract from this vector
   * @return {Vector} the vector whose value is {@code (this - that)}
   * @throws IllegalArgumentException if the dimensions of the two vectors are not equal
   */
  public minus(that: Vector): Vector {
    if (this.d !== that.d) throw new Error("Dimensions don't agree");
    const c: Vector = new Vector(this.d);
    for (let i = 0; i < this.d; i++) {
      c.data[i] = this.data[i] - that.data[i];
    }
    return c;
  }

  /**
   * Returns the ith cartesian coordinate.
   *
   * @param  {number} i the coordinate index
   * @return  the ith cartesian coordinate
   */
  public cartesian(i: number): number {
    return this.data[i];
  }

  /**
   * Returns the scalar-vector product of this vector and the specified scalar
   *
   * @param  {number} alpha the scalar
   * @return {Vector} the vector whose value is {@code (alpha * this)}
   * @deprecated Replaced by {@link #scale(double)}.
   */
  public times(alpha: number): Vector {
    const c: Vector = new Vector(this.d);
    for (let i = 0; i < this.d; i++) {
      c.data[i] = alpha * this.data[i];
    }
    return c;
  }

  /**
   * Returns the scalar-vector product of this vector and the specified scalar
   *
   * @param  {number} alpha the scalar
   * @return {Vector} the vector whose value is {@code (alpha * this)}
   */
  public scale(alpha: number): Vector {
    const c: Vector = new Vector(this.d);
    for (let i = 0; i < this.d; i++) {
      c.data[i] = alpha * this.data[i];
    }
    return c;
  }

  /**
   * Returns a unit vector in the direction of this vector.
   *
   * @return {Vector} a unit vector in the direction of this vector
   * @throws ArithmeticException if this vector is the zero vector
   */
  public direction(): Vector {
    if (this.magnitude() === 0.0)
      throw new Error('Zero-vector has no direction');
    return this.times(1.0 / this.magnitude());
  }

  /**
   * Returns a string representation of this vector.
   *
   * @return  a string representation of this vector, which consists of the
   * the vector entries, separates by single spaces
   */
  public toString(): string {
    const s= new String();
    for (let i = 0; i < this.d; i++) {
      s.append(`${this.data[i]} `);
    }
    return s.toString();
  }

  /**
   * Unit tests the {@code Vector} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const xdata: number[] = [1.0, 2.0, 3.0, 4.0];
    const ydata: number[] = [5.0, 2.0, 4.0, 1.0];
    const x: Vector = <any>(
      new (__Function.prototype.bind.apply(
        Vector,
        [null].concat(<any[]>xdata)
      ))()
    );
    const y: Vector = <any>(
      new (__Function.prototype.bind.apply(
        Vector,
        [null].concat(<any[]>ydata)
      ))()
    );
    StdOut.println$java_lang_Object(`   x       = ${x}`);
    StdOut.println$java_lang_Object(`   y       = ${y}`);
    let z: Vector = x.plus(y);
    StdOut.println$java_lang_Object(`   z       = ${z}`);
    z = z.times(10.0);
    StdOut.println$java_lang_Object(` 10z       = ${z}`);
    StdOut.println$java_lang_Object(`  |x|      = ${x.magnitude()}`);
    StdOut.println$java_lang_Object(` <x, y>    = ${x.dot(y)}`);
    StdOut.println$java_lang_Object(`dist(x, y) = ${x.distanceTo(y)}`);
    StdOut.println$java_lang_Object(`dir(x)     = ${x.direction()}`);
  }
}
Vector.__class = 'edu.princeton.cs.algs4.Vector';

var __Function = Function;

Vector.main(null);
