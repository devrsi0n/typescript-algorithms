import { Complex } from './Complex';
import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * The {@code FFT} class provides methods for computing the
 * FFT (Fast-Fourier Transform), inverse FFT, linear convolution,
 * and circular convolution of a complex array.
 * <p>
 * It is a bare-bones implementation that runs in <em>n</em> log <em>n</em> time,
 * where <em>n</em> is the length of the complex array. For simplicity,
 * <em>n</em> must be a power of 2.
 * Our goal is to optimize the clarity of the code, rather than performance.
 * It is not the most memory efficient implementation because it uses
 * objects to represents complex numbers and it it re-allocates memory
 * for the subarray, instead of doing in-place or reusing a single temporary array.
 *
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/99scientific">Section 9.9</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class FFT {
  static ZERO: Complex;
  public static ZERO_$LI$(): Complex {
    if (FFT.ZERO == null) FFT.ZERO = new Complex(0, 0);
    return FFT.ZERO;
  }



  /**
   * Returns the FFT of the specified complex array.
   *
   * @param  {Array} x the complex array
   * @return  the FFT of the complex array {@code x}
   * @throws IllegalArgumentException if the length of {@code x} is not a power of 2
   */
  public static fft(x: Complex[]): Complex[] {
    const n: number = x.length;
    if (n === 1) {
      return [x[0]];
    }
    if (n % 2 !== 0) {
      throw new Error('n is not a power of 2');
    }
    const even: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })((n / 2) | 0);
    for (let k = 0; k < ((n / 2) | 0); k++) {
      {
        even[k] = x[2 * k];
      }
    }
    const q: Complex[] = FFT.fft(even);
    const odd: Complex[] = even;
    for (let k = 0; k < ((n / 2) | 0); k++) {
      {
        odd[k] = x[2 * k + 1];
      }
    }
    const r: Complex[] = FFT.fft(odd);
    const y: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let k = 0; k < ((n / 2) | 0); k++) {
      {
        const kth: number = (-2 * k * Math.PI) / n;
        const wk: Complex = new Complex(Math.cos(kth), Math.sin(kth));
        y[k] = q[k].plus(wk.times$edu_princeton_cs_algs4_Complex(r[k]));
        y[k + ((n / 2) | 0)] = q[k].minus(
          wk.times$edu_princeton_cs_algs4_Complex(r[k])
        );
      }
    }
    return y;
  }

  /**
   * Returns the inverse FFT of the specified complex array.
   *
   * @param  {Array} x the complex array
   * @return  the inverse FFT of the complex array {@code x}
   * @throws IllegalArgumentException if the length of {@code x} is not a power of 2
   */
  public static ifft(x: Complex[]): Complex[] {
    const n: number = x.length;
    let y: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        y[i] = x[i].conjugate();
      }
    }
    y = FFT.fft(y);
    for (let i = 0; i < n; i++) {
      {
        y[i] = y[i].conjugate();
      }
    }
    for (let i = 0; i < n; i++) {
      {
        y[i] = y[i].scale(1.0 / n);
      }
    }
    return y;
  }

  /**
   * Returns the circular convolution of the two specified complex arrays.
   *
   * @param  {Array} x one complex array
   * @param  {Array} y the other complex array
   * @return  the circular convolution of {@code x} and {@code y}
   * @throws IllegalArgumentException if the length of {@code x} does not equal
   * the length of {@code y} or if the length is not a power of 2
   */
  public static cconvolve(x: Complex[], y: Complex[]): Complex[] {
    if (x.length !== y.length) {
      throw new Error("Dimensions don't agree");
    }
    const n: number = x.length;
    const a: Complex[] = FFT.fft(x);
    const b: Complex[] = FFT.fft(y);
    const c: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        c[i] = a[i].times$edu_princeton_cs_algs4_Complex(b[i]);
      }
    }
    return FFT.ifft(c);
  }

  /**
   * Returns the linear convolution of the two specified complex arrays.
   *
   * @param  {Array} x one complex array
   * @param  {Array} y the other complex array
   * @return  the linear convolution of {@code x} and {@code y}
   * @throws IllegalArgumentException if the length of {@code x} does not equal
   * the length of {@code y} or if the length is not a power of 2
   */
  public static convolve(x: Complex[], y: Complex[]): Complex[] {
    const a: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(2 * x.length);
    for (let i = 0; i < x.length; i++) {
      a[i] = x[i];
    }
    for (let i: number = x.length; i < 2 * x.length; i++) {
      a[i] = FFT.ZERO_$LI$();
    }
    const b: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(2 * y.length);
    for (let i = 0; i < y.length; i++) {
      b[i] = y[i];
    }
    for (let i: number = y.length; i < 2 * y.length; i++) {
      b[i] = FFT.ZERO_$LI$();
    }
    return FFT.cconvolve(a, b);
  }

  private static show(x: Complex[], title: string) {
    StdOut.println$java_lang_Object(title);
    StdOut.println$java_lang_Object('-------------------');
    for (let i = 0; i < x.length; i++) {
      {
        StdOut.println$java_lang_Object(x[i]);
      }
    }
    StdOut.println();
  }

  /**
   * Unit tests the {@code FFT} class.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = parseInt(args[0]);
    const x: Complex[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        x[i] = new Complex(i, 0);
        x[i] = new Complex(StdRandom.uniform$double$double(-1.0, 1.0), 0);
      }
    }
    FFT.show(x, 'x');
    const y: Complex[] = FFT.fft(x);
    FFT.show(y, 'y = fft(x)');
    const z: Complex[] = FFT.ifft(y);
    FFT.show(z, 'z = ifft(y)');
    const c: Complex[] = FFT.cconvolve(x, x);
    FFT.show(c, 'c = cconvolve(x, x)');
    const d: Complex[] = FFT.convolve(x, x);
    FFT.show(d, 'd = convolve(x, x)');
  }
}
FFT.__class = 'edu.princeton.cs.algs4.FFT';

FFT.ZERO_$LI$();

FFT.main(null);
