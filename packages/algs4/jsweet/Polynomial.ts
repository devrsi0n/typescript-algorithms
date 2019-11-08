import { StdOut } from './StdOut';

/**
 * Initializes a new polynomial a x^b
 * @param  a the leading coefficient
 * @param  b the exponent
 * @throws IllegalArgumentException if {@code b} is negative
 * @class
 * @author Robert Sedgewick
 */
export class Polynomial {
  private coef: number[];

  private __degree: number;

  public constructor(a: number, b: number) {
    if (this.coef === undefined) this.coef = null;
    if (this.__degree === undefined) this.__degree = 0;
    if (b < 0) {
      throw new Error(`exponent cannot be negative: ${b}`);
    }
    this.coef = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(b + 1);
    this.coef[b] = a;
    this.reduce();
  }

  private reduce() {
    this.__degree = -1;
    for (let i: number = this.coef.length - 1; i >= 0; i--) {
      {
        if (this.coef[i] !== 0) {
          this.__degree = i;
          return;
        }
      }
    }
  }

  /**
   * Returns the degree of this polynomial.
   * @return  the degree of this polynomial, -1 for the zero polynomial.
   */
  public degree(): number {
    return this.__degree;
  }

  /**
   * Returns the sum of this polynomial and the specified polynomial.
   *
   * @param  {Polynomial} that the other polynomial
   * @return {Polynomial} the polynomial whose value is {@code (this(x) + that(x))}
   */
  public plus(that: Polynomial): Polynomial {
    const poly: Polynomial = new Polynomial(
      0,
      Math.max(this.__degree, that.__degree)
    );
    for (let i = 0; i <= this.__degree; i++) {
      poly.coef[i] += this.coef[i];
    }
    for (let i = 0; i <= that.__degree; i++) {
      poly.coef[i] += that.coef[i];
    }
    poly.reduce();
    return poly;
  }

  /**
   * Returns the result of subtracting the specified polynomial
   * from this polynomial.
   *
   * @param  {Polynomial} that the other polynomial
   * @return {Polynomial} the polynomial whose value is {@code (this(x) - that(x))}
   */
  public minus(that: Polynomial): Polynomial {
    const poly: Polynomial = new Polynomial(
      0,
      Math.max(this.__degree, that.__degree)
    );
    for (let i = 0; i <= this.__degree; i++) {
      poly.coef[i] += this.coef[i];
    }
    for (let i = 0; i <= that.__degree; i++) {
      poly.coef[i] -= that.coef[i];
    }
    poly.reduce();
    return poly;
  }

  /**
   * Returns the product of this polynomial and the specified polynomial.
   * Takes time proportional to the product of the degrees.
   * (Faster algorithms are known, e.g., via FFT.)
   *
   * @param  {Polynomial} that the other polynomial
   * @return {Polynomial} the polynomial whose value is {@code (this(x) * that(x))}
   */
  public times(that: Polynomial): Polynomial {
    const poly: Polynomial = new Polynomial(0, this.__degree + that.__degree);
    for (let i = 0; i <= this.__degree; i++) {
      for (let j = 0; j <= that.__degree; j++) {
        poly.coef[i + j] += this.coef[i] * that.coef[j];
      }
    }
    poly.reduce();
    return poly;
  }

  /**
   * Returns the composition of this polynomial and the specified
   * polynomial.
   * Takes time proportional to the product of the degrees.
   * (Faster algorithms are known, e.g., via FFT.)
   *
   * @param  {Polynomial} that the other polynomial
   * @return {Polynomial} the polynomial whose value is {@code (this(that(x)))}
   */
  public compose(that: Polynomial): Polynomial {
    let poly: Polynomial = new Polynomial(0, 0);
    for (let i: number = this.__degree; i >= 0; i--) {
      {
        const term: Polynomial = new Polynomial(this.coef[i], 0);
        poly = term.plus(that.times(poly));
      }
    }
    return poly;
  }

  /**
   *
   * Compares this polynomial to the specified polynomial.
   *
   * @param   other the other polynoimal
   * @return  {@code true} if this polynomial equals {@code other};
   * {@code false} otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Polynomial = <Polynomial>other;
    if (this.__degree !== that.__degree) return false;
    for (let i: number = this.__degree; i >= 0; i--) {
      if (this.coef[i] !== that.coef[i]) return false;
    }
    return true;
  }

  /**
   * Returns the result of differentiating this polynomial.
   *
   * @return {Polynomial} the polynomial whose value is {@code this'(x)}
   */
  public differentiate(): Polynomial {
    if (this.__degree === 0) return new Polynomial(0, 0);
    const poly: Polynomial = new Polynomial(0, this.__degree - 1);
    poly.__degree = this.__degree - 1;
    for (let i = 0; i < this.__degree; i++) {
      poly.coef[i] = (i + 1) * this.coef[i + 1];
    }
    return poly;
  }

  /**
   * Returns the result of evaluating this polynomial at the point x.
   *
   * @param   x the point at which to evaluate the polynomial
   * @return  the integer whose value is {@code (this(x))}
   */
  public evaluate(x: number): number {
    let p = 0;
    for (let i: number = this.__degree; i >= 0; i--) {
      p = this.coef[i] + x * p;
    }
    return p;
  }

  /**
   * Compares two polynomials by degree, breaking ties by coefficient of leading term.
   *
   * @param  {Polynomial} that the other point
   * @return  the value {@code 0} if this polynomial is equal to the argument
   * polynomial (precisely when {@code equals()} returns {@code true});
   * a negative integer if this polynomialt is less than the argument
   * polynomial; and a positive integer if this polynomial is greater than the
   * argument point
   */
  public compareTo(that: Polynomial): number {
    if (this.__degree < that.__degree) return -1;
    if (this.__degree > that.__degree) return +1;
    for (let i: number = this.__degree; i >= 0; i--) {
      {
        if (this.coef[i] < that.coef[i]) return -1;
        if (this.coef[i] > that.coef[i]) return +1;
      }
    }
    return 0;
  }

  /**
   * Return a string representation of this polynomial.
   * @return  a string representation of this polynomial in the format
   * 4x^5 - 3x^2 + 11x + 5
   */
  public toString(): string {
    if (this.__degree === -1) return '0';
    if (this.__degree === 0) return `${this.coef[0]}`;
    if (this.__degree === 1) return `${this.coef[1]}x + ${this.coef[0]}`;
    let s = `${this.coef[this.__degree]}x^${this.__degree}`;
    for (let i: number = this.__degree - 1; i >= 0; i--) {
      {
        if (this.coef[i] === 0) continue;
        else if (this.coef[i] > 0) s = `${s} + ${this.coef[i]}`;
        else if (this.coef[i] < 0) s = `${s} - ${-this.coef[i]}`;
        if (i === 1) s += 'x';
        else if (i > 1) s = `${s}x^${i}`;
      }
    }
    return s;
  }

  /**
   * Unit tests the polynomial data type.
   *
   * @param  args the command-line arguments (none)
   */
  public static main(args: string[]) {
    const zero: Polynomial = new Polynomial(0, 0);
    const p1: Polynomial = new Polynomial(4, 3);
    const p2: Polynomial = new Polynomial(3, 2);
    const p3: Polynomial = new Polynomial(1, 0);
    const p4: Polynomial = new Polynomial(2, 1);
    const p: Polynomial = p1
      .plus(p2)
      .plus(p3)
      .plus(p4);
    const q1: Polynomial = new Polynomial(3, 2);
    const q2: Polynomial = new Polynomial(5, 0);
    const q: Polynomial = q1.plus(q2);
    const r: Polynomial = p.plus(q);
    const s: Polynomial = p.times(q);
    const t: Polynomial = p.compose(q);
    const u: Polynomial = p.minus(p);
    StdOut.println$java_lang_Object(`zero(x)     = ${zero}`);
    StdOut.println$java_lang_Object(`p(x)        = ${p}`);
    StdOut.println$java_lang_Object(`q(x)        = ${q}`);
    StdOut.println$java_lang_Object(`p(x) + q(x) = ${r}`);
    StdOut.println$java_lang_Object(`p(x) * q(x) = ${s}`);
    StdOut.println$java_lang_Object(`p(q(x))     = ${t}`);
    StdOut.println$java_lang_Object(`p(x) - p(x) = ${u}`);
    StdOut.println$java_lang_Object(`0 - p(x)    = ${zero.minus(p)}`);
    StdOut.println$java_lang_Object(`p(3)        = ${p.evaluate(3)}`);
    StdOut.println$java_lang_Object(`p'(x)       = ${p.differentiate()}`);
    StdOut.println$java_lang_Object(
      `p''(x)      = ${p.differentiate().differentiate()}`
    );
  }
}
Polynomial.__class = 'edu.princeton.cs.algs4.Polynomial';

Polynomial.main(null);
