import { BinaryStdOut } from './BinaryStdOut';

/**
 * <i>Binary standard input</i>. This class provides methods for reading
 * in bits from standard input, either one bit at a time (as a `boolean`),
 * 8 bits at a time (as a `byte` or `char`),
 * 16 bits at a time (as a `short`), 32 bits at a time
 * (as an `int` or `float`), or 64 bits at a time (as a
 * `double` or `long`).
 * <p>
 * All primitive types are assumed to be represented using their
 * standard Java representations, in big-endian (most significant
 * byte first) order.
 * <p>
 * The client should not intermix calls to `BinaryStdIn` with calls
 * to `StdIn` or `System.in`;
 * otherwise unexpected behavior will result.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BinaryStdIn {
  static EOF = -1;

  static in: BufferedInputStream = null;

  static buffer = 0;

  static n = 0;

  static isInitialized = false;

  private static initialize() {
    BinaryStdIn.in = new BufferedInputStream(java.lang.System.in);
    BinaryStdIn.buffer = 0;
    BinaryStdIn.n = 0;
    BinaryStdIn.fillBuffer();
    BinaryStdIn.isInitialized = true;
  }

  private static fillBuffer() {
    try {
      BinaryStdIn.buffer = BinaryStdIn.in.read();
      BinaryStdIn.n = 8;
    } catch (e) {
      console.info('EOF');
      BinaryStdIn.buffer = BinaryStdIn.EOF;
      BinaryStdIn.n = -1;
    }
  }

  /**
   * Close this input stream and release any associated system resources.
   */
  public static close() {
    if (!BinaryStdIn.isInitialized) BinaryStdIn.initialize();
    try {
      BinaryStdIn.in.close();
      BinaryStdIn.isInitialized = false;
    } catch (ioe) {
      throw new Error(`Could not close BinaryStdIn: ${ioe}`);
    }
  }

  /**
   * Returns true if standard input is empty.
   * @return  true if and only if standard input is empty
   */
  public static isEmpty(): boolean {
    if (!BinaryStdIn.isInitialized) BinaryStdIn.initialize();
    return BinaryStdIn.buffer === BinaryStdIn.EOF;
  }

  /**
   * Reads the next bit of data from standard input and return as a boolean.
   *
   * @return  the next bit of data from standard input as a `boolean`
   * @throws Error if standard input is empty
   */
  public static readBoolean(): boolean {
    if (BinaryStdIn.isEmpty())
      throw new Error('Reading from empty input stream');
    BinaryStdIn.n--;
    const bit: boolean = ((BinaryStdIn.buffer >> BinaryStdIn.n) & 1) === 1;
    if (BinaryStdIn.n === 0) BinaryStdIn.fillBuffer();
    return bit;
  }

  public static readChar$(): string {
    if (BinaryStdIn.isEmpty())
      throw new Error('Reading from empty input stream');
    if (BinaryStdIn.n === 8) {
      const x: number = BinaryStdIn.buffer;
      BinaryStdIn.fillBuffer();
      return String.fromCharCode(x & 255);
    }
    let x: number = BinaryStdIn.buffer;
    x <<= 8 - BinaryStdIn.n;
    const oldN: number = BinaryStdIn.n;
    BinaryStdIn.fillBuffer();
    if (BinaryStdIn.isEmpty())
      throw new Error('Reading from empty input stream');
    BinaryStdIn.n = oldN;
    x |= BinaryStdIn.buffer >>> BinaryStdIn.n;
    return String.fromCharCode(x & 255);
  }

  public static readChar$int(r: number): string {
    if (r < 1 || r > 16) throw new Error(`Illegal value of r = ${r}`);
    if (r === 8) return BinaryStdIn.readChar();
    let x: string = String.fromCharCode(0);
    for (let i = 0; i < r; i++) {
      {
        x = String.fromCharCode(x.charCodeAt(0) << 1);
        const bit: boolean = BinaryStdIn.readBoolean();
        if (bit) x = String.fromCharCode(x.charCodeAt(0) | 1);
      }
    }
    return x;
  }

  /**
   * Reads the next r bits from standard input and return as an r-bit character.
   *
   * @param   r number of bits to read.
   * @return  the next r bits of data from standard input as a `char`
   * @throws Error if there are fewer than `r` bits available on standard input
   * @throws IllegalArgumentException unless `1 <= r <= 16`
   */
  public static readChar(r?: any): any {
    if (typeof r === 'number' || r === null) {
      return <any>BinaryStdIn.readChar$int(r);
    }
    if (r === undefined) {
      return <any>BinaryStdIn.readChar$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads the remaining bytes of data from standard input and return as a string.
   *
   * @return  the remaining bytes of data from standard input as a `String`
   * @throws Error if standard input is empty or if the number of bits
   * available on standard input is not a multiple of 8 (byte-aligned)
   */
  public static readString(): string {
    if (BinaryStdIn.isEmpty())
      throw new Error('Reading from empty input stream');
    const sb = new String();
    while (!BinaryStdIn.isEmpty()) {
      {
        const c: string = BinaryStdIn.readChar();
        sb.append(c);
      }
    }
    return sb.toString();
  }

  /**
   * Reads the next 16 bits from standard input and return as a 16-bit short.
   *
   * @return  the next 16 bits of data from standard input as a `short`
   * @throws Error if there are fewer than 16 bits available on standard input
   */
  public static readShort(): number {
    let x = 0;
    for (let i = 0; i < 2; i++) {
      {
        const c: string = BinaryStdIn.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  public static readInt$(): number {
    let x = 0;
    for (let i = 0; i < 4; i++) {
      {
        const c: string = BinaryStdIn.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  public static readInt$int(r: number): number {
    if (r < 1 || r > 32) throw new Error(`Illegal value of r = ${r}`);
    if (r === 32) return BinaryStdIn.readInt();
    let x = 0;
    for (let i = 0; i < r; i++) {
      {
        x <<= 1;
        const bit: boolean = BinaryStdIn.readBoolean();
        if (bit) x |= 1;
      }
    }
    return x;
  }

  /**
   * Reads the next r bits from standard input and return as an r-bit int.
   *
   * @param   r number of bits to read.
   * @return  the next r bits of data from standard input as a `int`
   * @throws Error if there are fewer than `r` bits available on standard input
   * @throws IllegalArgumentException unless `1 <= r <= 32`
   */
  public static readInt(r?: any): any {
    if (typeof r === 'number' || r === null) {
      return <any>BinaryStdIn.readInt$int(r);
    }
    if (r === undefined) {
      return <any>BinaryStdIn.readInt$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads the next 64 bits from standard input and return as a 64-bit long.
   *
   * @return  the next 64 bits of data from standard input as a `long`
   * @throws Error if there are fewer than 64 bits available on standard input
   */
  public static readLong(): number {
    let x = 0;
    for (let i = 0; i < 8; i++) {
      {
        const c: string = BinaryStdIn.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  /**
   * Reads the next 64 bits from standard input and return as a 64-bit double.
   *
   * @return  the next 64 bits of data from standard input as a `double`
   * @throws Error if there are fewer than 64 bits available on standard input
   */
  public static readDouble(): number {
    return javaemul.internal.DoubleHelper.longBitsToDouble(
      BinaryStdIn.readLong()
    );
  }

  /**
   * Reads the next 32 bits from standard input and return as a 32-bit float.
   *
   * @return  the next 32 bits of data from standard input as a `float`
   * @throws Error if there are fewer than 32 bits available on standard input
   */
  public static readFloat(): number {
    return javaemul.internal.FloatHelper.intBitsToFloat(BinaryStdIn.readInt());
  }

  /**
   * Reads the next 8 bits from standard input and return as an 8-bit byte.
   *
   * @return  the next 8 bits of data from standard input as a `byte`
   * @throws Error if there are fewer than 8 bits available on standard input
   */
  public static readByte(): number {
    const c: string = BinaryStdIn.readChar();
    return (
      (<number>(
        (((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) & 255)
      )) | 0
    );
  }

  /**
   * Test client. Reads in a binary input file from standard input and writes
   * it to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    while (!BinaryStdIn.isEmpty()) {
      {
        const c: string = BinaryStdIn.readChar();
        BinaryStdOut.write$char(c);
      }
    }
    BinaryStdOut.flush();
  }
}
BinaryStdIn.__class = 'edu.princeton.cs.algs4.BinaryStdIn';

BinaryStdIn.main(null);
