/**
 * <i>Binary standard output</i>. This class provides methods for converting
 * primtive type variables (`boolean`, `byte`, `char`,
 * `int`, `long`, `float`, and `double`)
 * to sequences of bits and writing them to standard output.
 * Uses big-endian (most-significant byte first).
 * <p>
 * The client must `flush()` the output stream when finished writing bits.
 * <p>
 * The client should not intermix calls to `BinaryStdOut` with calls
 * to `StdOut` or `System.out`; otherwise unexpected behavior
 * will result.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BinaryStdOut {
  static out: BufferedOutputStream = null;

  static buffer = 0;

  static n = 0;

  static isInitialized = false;

  private static initialize() {
    BinaryStdOut.out = new BufferedOutputStream(java.lang.System.out);
    BinaryStdOut.buffer = 0;
    BinaryStdOut.n = 0;
    BinaryStdOut.isInitialized = true;
  }

  /**
   * Writes the specified bit to standard output.
   * @param  bit
   * @private
   */
  private static writeBit(bit: boolean) {
    if (!BinaryStdOut.isInitialized) BinaryStdOut.initialize();
    BinaryStdOut.buffer <<= 1;
    if (bit) BinaryStdOut.buffer |= 1;
    BinaryStdOut.n++;
    if (BinaryStdOut.n === 8) BinaryStdOut.clearBuffer();
  }

  /**
   * Writes the 8-bit byte to standard output.
   * @param  x
   * @private
   */
  private static writeByte(x: number) {
    if (!BinaryStdOut.isInitialized) BinaryStdOut.initialize();
    if (BinaryStdOut.n === 0) {
      try {
        BinaryStdOut.out.write(x);
      } catch (e) {
        console.error(e.message, e);
      }
      return;
    }
    for (let i = 0; i < 8; i++) {
      {
        const bit: boolean = ((x >>> (8 - i - 1)) & 1) === 1;
        BinaryStdOut.writeBit(bit);
      }
    }
  }

  private static clearBuffer() {
    if (!BinaryStdOut.isInitialized) BinaryStdOut.initialize();
    if (BinaryStdOut.n === 0) return;
    if (BinaryStdOut.n > 0) BinaryStdOut.buffer <<= 8 - BinaryStdOut.n;
    try {
      BinaryStdOut.out.write(BinaryStdOut.buffer);
    } catch (e) {
      console.error(e.message, e);
    }
    BinaryStdOut.n = 0;
    BinaryStdOut.buffer = 0;
  }

  /**
   * Flushes standard output, padding 0s if number of bits written so far
   * is not a multiple of 8.
   */
  public static flush() {
    BinaryStdOut.clearBuffer();
    try {
      BinaryStdOut.out.flush();
    } catch (e) {
      console.error(e.message, e);
    }
  }

  /**
   * Flushes and closes standard output. Once standard output is closed, you can no
   * longer write bits to it.
   */
  public static close() {
    BinaryStdOut.flush();
    try {
      BinaryStdOut.out.close();
      BinaryStdOut.isInitialized = false;
    } catch (e) {
      console.error(e.message, e);
    }
  }

  public static write$boolean(x: boolean) {
    BinaryStdOut.writeBit(x);
  }

  public static write$byte(x: number) {
    BinaryStdOut.writeByte(x & 255);
  }

  public static write$int(x: number) {
    BinaryStdOut.writeByte((x >>> 24) & 255);
    BinaryStdOut.writeByte((x >>> 16) & 255);
    BinaryStdOut.writeByte((x >>> 8) & 255);
    BinaryStdOut.writeByte((x >>> 0) & 255);
  }

  public static write$int$int(x: number, r: number) {
    if (r === 32) {
      BinaryStdOut.write$int(x);
      return;
    }
    if (r < 1 || r > 32) throw new Error(`Illegal value for r = ${r}`);
    if (x < 0 || x >= 1 << r) throw new Error(`Illegal ${r}-bit char = ${x}`);
    for (let i = 0; i < r; i++) {
      {
        const bit: boolean = ((x >>> (r - i - 1)) & 1) === 1;
        BinaryStdOut.writeBit(bit);
      }
    }
  }

  public static write$double(x: number) {
    BinaryStdOut.write$long(
      javaemul.internal.DoubleHelper.doubleToRawLongBits(x)
    );
  }

  public static write$long(x: number) {
    BinaryStdOut.writeByte((<number>((x >>> 56) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 48) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 40) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 32) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 24) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 16) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 8) & 255)) | 0);
    BinaryStdOut.writeByte((<number>((x >>> 0) & 255)) | 0);
  }

  public static write$float(x: number) {
    BinaryStdOut.write$int(javaemul.internal.FloatHelper.floatToRawIntBits(x));
  }

  public static write$short(x: number) {
    BinaryStdOut.writeByte((x >>> 8) & 255);
    BinaryStdOut.writeByte((x >>> 0) & 255);
  }

  public static write$char(x: string) {
    if (
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) < 0 ||
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) >= 256
    )
      throw new Error(`Illegal 8-bit char = ${x}`);
    BinaryStdOut.writeByte(x.charCodeAt(0));
  }

  public static write$char$int(x: string, r: number) {
    if (r === 8) {
      BinaryStdOut.write$char(x);
      return;
    }
    if (r < 1 || r > 16) throw new Error(`Illegal value for r = ${r}`);
    if (((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) >= 1 << r)
      throw new Error(`Illegal ${r}-bit char = ${x}`);
    for (let i = 0; i < r; i++) {
      {
        const bit: boolean = ((x >>> (r - i - 1)) & 1) === 1;
        BinaryStdOut.writeBit(bit);
      }
    }
  }

  public static write$java_lang_String(s: string) {
    for (let i = 0; i < s.length; i++) {
      BinaryStdOut.write$char(s.charAt(i));
    }
  }

  public static write$java_lang_String$int(s: string, r: number) {
    for (let i = 0; i < s.length; i++) {
      BinaryStdOut.write$char$int(s.charAt(i), r);
    }
  }

  /**
   * Writes the string of r-bit characters to standard output.
   * @param  s the `String` to write.
   * @param  r the number of relevants bits in each character.
   * @throws IllegalArgumentException if r is not between 1 and 16.
   * @throws IllegalArgumentException if any character in the string is not
   * between 0 and 2<sup>r</sup> - 1.
   */
  public static write(s?: any, r?: any): any {
    if (
      (typeof s === 'string' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>BinaryStdOut.write$java_lang_String$int(s, r);
    }
    if (
      (typeof s === 'string' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>BinaryStdOut.write$char$int(s, r);
    }
    if (
      (typeof s === 'number' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>BinaryStdOut.write$int$int(s, r);
    }
    if ((typeof s === 'string' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$java_lang_String(s);
    }
    if ((typeof s === 'boolean' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$boolean(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$byte(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$short(s);
    }
    if ((typeof s === 'string' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$char(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$int(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$long(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$float(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>BinaryStdOut.write$double(s);
    }
    throw new Error('invalid overload');
  }

  /**
   * Tests the methods in this class.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const m: number = parseInt(args[0]);
    for (let i = 0; i < m; i++) {
      {
        BinaryStdOut.write$int(i);
      }
    }
    BinaryStdOut.flush();
  }
}
BinaryStdOut.__class = 'edu.princeton.cs.algs4.BinaryStdOut';

BinaryStdOut.main(null);
