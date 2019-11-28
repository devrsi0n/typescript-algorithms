import { ST } from './ST';
import { StdOut } from './StdOut';

/**
 * Initializes a d-dimensional zero vector.
 * @param  d the dimension of the vector
 * @class
 * @author Robert Sedgewick
 */
export class SparseVector {
  private d: number;

  private st: ST<number, number>;

  public constructor(d: number) {
    if (this.d === undefined) this.d = 0;
    if (this.st === undefined) this.st = null;
    this.d = d;
    this.st = <any>new ST<number, number>();
  }

  /**
   * Sets the ith coordinate of this vector to the specified value.
   *
   * @param   i the index
   * @param   value the new value
   * @throws IllegalArgumentException unless i is between 0 and d-1
   */
  public put(i: number, value: number) {
    if (i < 0 || i >= this.d) throw new Error('Illegal index');
    if (value === 0.0) this.st.delete(i);
    else this.st.put(i, value);
  }

  /**
   * Returns the ith coordinate of this vector.
   *
   * @param   i the index
   * @return  the value of the ith coordinate of this vector
   * @throws IllegalArgumentException unless i is between 0 and d-1
   */
  public get(i: number): number {
    if (i < 0 || i >= this.d) throw new Error('Illegal index');
    if (this.st.contains(i)) return this.st.get(i);
    return 0.0;
  }

  /**
   * Returns the number of nonzero entries in this vector.
   *
   * @return  the number of nonzero entries in this vector
   */
  public nnz(): number {
    return this.st.size();
  }

  /**
   * Returns the dimension of this vector.
   *
   * @return  the dimension of this vector
   * @deprecated Replaced by {@link #dimension()}.
   */
  public size(): number {
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

  public dot$edu_princeton_cs_algs4_SparseVector(that: SparseVector): number {
    if (this.d !== that.d) throw new Error('Vector lengths disagree');
    let sum = 0.0;
    if (this.st.size() <= that.st.size()) {
      for (let index348 = this.st.keys().iterator(); index348.hasNext(); ) {
        const i = index348.next();
        if (that.st.contains(i)) sum += this.get(i) * that.get(i);
      }
    } else {
      for (let index349 = that.st.keys().iterator(); index349.hasNext(); ) {
        const i = index349.next();
        if (this.st.contains(i)) sum += this.get(i) * that.get(i);
      }
    }
    return sum;
  }

  /**
   * Returns the inner product of this vector with the specified vector.
   *
   * @param  {SparseVector} that the other vector
   * @return  the dot product between this vector and that vector
   * @throws IllegalArgumentException if the lengths of the two vectors are not equal
   */
  public dot(that?: any): any {
    if ((that != null && that instanceof <any>SparseVector) || that === null) {
      return <any>this.dot$edu_princeton_cs_algs4_SparseVector(that);
    }
    if (
      (that != null &&
        that instanceof <any>Array &&
        (that.length == 0 || that[0] == null || typeof that[0] === 'number')) ||
      that === null
    ) {
      return <any>this.dot$double_A(that);
    }
    throw new Error('invalid overload');
  }

  public dot$double_A(that: number[]): number {
    let sum = 0.0;
    for (let index350 = this.st.keys().iterator(); index350.hasNext(); ) {
      const i = index350.next();
      sum += that[i] * this.get(i);
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
    return Math.sqrt(this.dot$edu_princeton_cs_algs4_SparseVector(this));
  }

  /**
   * Returns the Euclidean norm of this vector.
   *
   * @return  the Euclidean norm of this vector
   * @deprecated Replaced by {@link #magnitude()}.
   */
  public norm(): number {
    return Math.sqrt(this.dot$edu_princeton_cs_algs4_SparseVector(this));
  }

  /**
   * Returns the scalar-vector product of this vector with the specified scalar.
   *
   * @param   alpha the scalar
   * @return {SparseVector} the scalar-vector product of this vector with the specified scalar
   */
  public scale(alpha: number): SparseVector {
    const c: SparseVector = new SparseVector(this.d);
    for (let index351 = this.st.keys().iterator(); index351.hasNext(); ) {
      const i = index351.next();
      c.put(i, alpha * this.get(i));
    }
    return c;
  }

  /**
   * Returns the sum of this vector and the specified vector.
   *
   * @param  {SparseVector} that the vector to add to this vector
   * @return {SparseVector} the sum of this vector and that vector
   * @throws IllegalArgumentException if the dimensions of the two vectors are not equal
   */
  public plus(that: SparseVector): SparseVector {
    if (this.d !== that.d) throw new Error('Vector lengths disagree');
    const c: SparseVector = new SparseVector(this.d);
    for (let index352 = this.st.keys().iterator(); index352.hasNext(); ) {
      const i = index352.next();
      c.put(i, this.get(i));
    }
    for (let index353 = that.st.keys().iterator(); index353.hasNext(); ) {
      const i = index353.next();
      c.put(i, that.get(i) + c.get(i));
    }
    return c;
  }

  /**
   * Returns a string representation of this vector.
   * @return  a string representation of this vector, which consists of the
   * the vector entries, separates by commas, enclosed in parentheses
   */
  public toString(): string {
    const s = new String();
    for (let index354 = this.st.keys().iterator(); index354.hasNext(); ) {
      const i = index354.next();
      {
        s.append(`(${i}, ${this.st.get(i)}) `);
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the `SparseVector` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: SparseVector = new SparseVector(10);
    const b: SparseVector = new SparseVector(10);
    a.put(3, 0.5);
    a.put(9, 0.75);
    a.put(6, 0.11);
    a.put(6, 0.0);
    b.put(3, 0.6);
    b.put(4, 0.9);
    StdOut.println$java_lang_Object(`a = ${a}`);
    StdOut.println$java_lang_Object(`b = ${b}`);
    StdOut.println$java_lang_Object(
      `a dot b = ${a.dot$edu_princeton_cs_algs4_SparseVector(b)}`
    );
    StdOut.println$java_lang_Object(`a + b   = ${a.plus(b)}`);
  }
}
SparseVector.__class = 'edu.princeton.cs.algs4.SparseVector';

SparseVector.main(null);
