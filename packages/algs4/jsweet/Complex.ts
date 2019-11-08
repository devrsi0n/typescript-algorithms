import { StdOut } from './StdOut';

/**
 * Initializes a complex number from the specified real and imaginary parts.
 *
 * @param {number} real the real part
 * @param {number} imag the imaginary part
 * @class
 * @author Robert Sedgewick
 */
export class Complex {
  private __re: number;

  private __im: number;

  public constructor(real: number, imag: number) {
    if (this.__re === undefined) this.__re = 0;
    if (this.__im === undefined) this.__im = 0;
    this.__re = real;
    this.__im = imag;
  }

  /**
   * Returns a string representation of this complex number.
   *
   * @return  a string representation of this complex number,
   * of the form 34 - 56i.
   */
  public toString(): string {
    if (this.__im === 0) return `${this.__re}`;
    if (this.__re === 0) return `${this.__im}i`;
    if (this.__im < 0) return `${this.__re} - ${-this.__im}i`;
    return `${this.__re} + ${this.__im}i`;
  }

  /**
   * Returns the absolute value of this complex number.
   * This quantity is also known as the <em>modulus</em> or <em>magnitude</em>.
   *
   * @return  the absolute value of this complex number
   */
  public abs(): number {
    return /* hypot */ (x => Math.sqrt(x * x + y * y))(this.__re, this.__im);
  }

  /**
   * Returns the phase of this complex number.
   * This quantity is also known as the <em>angle</em> or <em>argument</em>.
   *
   * @return  the phase of this complex number, a real number between -pi and pi
   */
  public phase(): number {
    return Math.atan2(this.__im, this.__re);
  }

  /**
   * Returns the sum of this complex number and the specified complex number.
   *
   * @param  {Complex} that the other complex number
   * @return {Complex} the complex number whose value is {@code (this + that)}
   */
  public plus(that: Complex): Complex {
    const real: number = this.__re + that.__re;
    const imag: number = this.__im + that.__im;
    return new Complex(real, imag);
  }

  /**
   * Returns the result of subtracting the specified complex number from
   * this complex number.
   *
   * @param  {Complex} that the other complex number
   * @return {Complex} the complex number whose value is {@code (this - that)}
   */
  public minus(that: Complex): Complex {
    const real: number = this.__re - that.__re;
    const imag: number = this.__im - that.__im;
    return new Complex(real, imag);
  }

  public times$edu_princeton_cs_algs4_Complex(that: Complex): Complex {
    const real: number = this.__re * that.__re - this.__im * that.__im;
    const imag: number = this.__re * that.__im + this.__im * that.__re;
    return new Complex(real, imag);
  }

  /**
   * Returns the product of this complex number and the specified complex number.
   *
   * @param  {Complex} that the other complex number
   * @return {Complex} the complex number whose value is {@code (this * that)}
   */
  public times(that?: any): any {
    if ((that != null && that instanceof <any>Complex) || that === null) {
      return <any>this.times$edu_princeton_cs_algs4_Complex(that);
    }
    if (typeof that === 'number' || that === null) {
      return <any>this.times$double(that);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the product of this complex number and the specified scalar.
   *
   * @param  {number} alpha the scalar
   * @return {Complex} the complex number whose value is {@code (alpha * this)}
   */
  public scale(alpha: number): Complex {
    return new Complex(alpha * this.__re, alpha * this.__im);
  }

  public times$double(alpha: number): Complex {
    return new Complex(alpha * this.__re, alpha * this.__im);
  }

  /**
   * Returns the complex conjugate of this complex number.
   *
   * @return {Complex} the complex conjugate of this complex number
   */
  public conjugate(): Complex {
    return new Complex(this.__re, -this.__im);
  }

  /**
   * Returns the reciprocal of this complex number.
   *
   * @return {Complex} the complex number whose value is {@code (1 / this)}
   */
  public reciprocal(): Complex {
    const scale: number = this.__re * this.__re + this.__im * this.__im;
    return new Complex(this.__re / scale, -this.__im / scale);
  }

  /**
   * Returns the real part of this complex number.
   *
   * @return  the real part of this complex number
   */
  public re(): number {
    return this.__re;
  }

  /**
   * Returns the imaginary part of this complex number.
   *
   * @return  the imaginary part of this complex number
   */
  public im(): number {
    return this.__im;
  }

  /**
   * Returns the result of dividing the specified complex number into
   * this complex number.
   *
   * @param  {Complex} that the other complex number
   * @return {Complex} the complex number whose value is {@code (this / that)}
   */
  public divides(that: Complex): Complex {
    return this.times$edu_princeton_cs_algs4_Complex(that.reciprocal());
  }

  /**
   * Returns the complex exponential of this complex number.
   *
   * @return {Complex} the complex exponential of this complex number
   */
  public exp(): Complex {
    return new Complex(
      Math.exp(this.__re) * Math.cos(this.__im),
      Math.exp(this.__re) * Math.sin(this.__im)
    );
  }

  /**
   * Returns the complex sine of this complex number.
   *
   * @return {Complex} the complex sine of this complex number
   */
  public sin(): Complex {
    return new Complex(
      Math.sin(this.__re) *
        /* cosh */ (x => (Math.exp(x) + Math.exp(-x)) / 2)(this.__im),
      Math.cos(this.__re) *
        /* sinh */ (x => (Math.exp(x) - Math.exp(-x)) / 2)(this.__im)
    );
  }

  /**
   * Returns the complex cosine of this complex number.
   *
   * @return {Complex} the complex cosine of this complex number
   */
  public cos(): Complex {
    return new Complex(
      Math.cos(this.__re) *
        /* cosh */ (x => (Math.exp(x) + Math.exp(-x)) / 2)(this.__im),
      -Math.sin(this.__re) *
        /* sinh */ (x => (Math.exp(x) - Math.exp(-x)) / 2)(this.__im)
    );
  }

  /**
   * Returns the complex tangent of this complex number.
   *
   * @return {Complex} the complex tangent of this complex number
   */
  public tan(): Complex {
    return this.sin().divides(this.cos());
  }

  /**
   * Unit tests the {@code Complex} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: Complex = new Complex(5.0, 6.0);
    const b: Complex = new Complex(-3.0, 4.0);
    StdOut.println$java_lang_Object(`a            = ${a}`);
    StdOut.println$java_lang_Object(`b            = ${b}`);
    StdOut.println$java_lang_Object(`Re(a)        = ${a.re()}`);
    StdOut.println$java_lang_Object(`Im(a)        = ${a.im()}`);
    StdOut.println$java_lang_Object(`b + a        = ${b.plus(a)}`);
    StdOut.println$java_lang_Object(`a - b        = ${a.minus(b)}`);
    StdOut.println$java_lang_Object(
      `a * b        = ${a.times$edu_princeton_cs_algs4_Complex(b)}`
    );
    StdOut.println$java_lang_Object(
      `b * a        = ${b.times$edu_princeton_cs_algs4_Complex(a)}`
    );
    StdOut.println$java_lang_Object(`a / b        = ${a.divides(b)}`);
    StdOut.println$java_lang_Object(
      `(a / b) * b  = ${a.divides(b).times$edu_princeton_cs_algs4_Complex(b)}`
    );
    StdOut.println$java_lang_Object(`conj(a)      = ${a.conjugate()}`);
    StdOut.println$java_lang_Object(`|a|          = ${a.abs()}`);
    StdOut.println$java_lang_Object(`tan(a)       = ${a.tan()}`);
  }
}
Complex.__class = 'edu.princeton.cs.algs4.Complex';

Complex.main(null);
