import { BinaryOut } from './BinaryOut';

/**
 * Initializes a binary input stream from an {@code InputStream}.
 *
 * @param {InputStream} is the {@code InputStream} object
 * @class
 * @author Robert Sedgewick
 */
export class BinaryIn {
  static EOF = -1;

  private in: BufferedInputStream;

  private buffer: number;

  private n: number;

  public constructor(is?: any) {
    if ((is != null && is instanceof <any>InputStream) || is === null) {
      const __args = arguments;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        this.in = new BufferedInputStream(is);
        this.fillBuffer();
      })();
    } else if ((is != null && is instanceof <any>Socket) || is === null) {
      const __args = arguments;
      const socket: any = __args[0];
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        try {
          const is: InputStream = socket.getInputStream();
          this.in = new BufferedInputStream(is);
          this.fillBuffer();
        } catch (ioe) {
          console.error(`Could not open ${socket}`);
        }
      })();
    } else if ((is != null && is instanceof <any>URL) || is === null) {
      const __args = arguments;
      const url: any = __args[0];
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        try {
          const site: URLConnection = url.openConnection();
          const is: InputStream = site.getInputStream();
          this.in = new BufferedInputStream(is);
          this.fillBuffer();
        } catch (ioe) {
          console.error(`Could not open ${url}`);
        }
      })();
    } else if (typeof is === 'string' || is === null) {
      const __args = arguments;
      const name: any = __args[0];
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        try {
          const file: File = new File(name);
          if (file.exists()) {
            const fis: FileInputStream = new FileInputStream(file);
            this.in = new BufferedInputStream(fis);
            this.fillBuffer();
            return;
          }
          let url: URL = (<any>this.constructor).getResource(name);
          if (url == null) {
            url = <URL>new URL(name);
          }
          const site: URLConnection = url.openConnection();
          const is: InputStream = site.getInputStream();
          this.in = new BufferedInputStream(is);
          this.fillBuffer();
        } catch (ioe) {
          console.error(`Could not open ${name}`);
        }
      })();
    } else if (is === undefined) {
      const __args = arguments;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.in === undefined) this.in = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        this.in = new BufferedInputStream(java.lang.System.in);
        this.fillBuffer();
      })();
    } else throw new Error('invalid overload');
  }

  private fillBuffer() {
    try {
      this.buffer = this.in.read();
      this.n = 8;
    } catch (e) {
      console.error('EOF');
      this.buffer = BinaryIn.EOF;
      this.n = -1;
    }
  }

  /**
   * Returns true if this binary input stream exists.
   *
   * @return  {@code true} if this binary input stream exists;
   * {@code false} otherwise
   */
  public exists(): boolean {
    return this.in != null;
  }

  /**
   * Returns true if this binary input stream is empty.
   *
   * @return  {@code true} if this binary input stream is empty;
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.buffer === BinaryIn.EOF;
  }

  /**
   * Reads the next bit of data from this binary input stream and return as a boolean.
   *
   * @return  the next bit of data from this binary input stream as a {@code boolean}
   * @throws Error if this binary input stream is empty
   */
  public readBoolean(): boolean {
    if (this.isEmpty())
      throw new Error('Reading from empty input stream');
    this.n--;
    const bit: boolean = ((this.buffer >> this.n) & 1) === 1;
    if (this.n === 0) this.fillBuffer();
    return bit;
  }

  public readChar$(): string {
    if (this.isEmpty())
      throw new Error('Reading from empty input stream');
    if (this.n === 8) {
      const x: number = this.buffer;
      this.fillBuffer();
      return String.fromCharCode(x & 255);
    }
    let x: number = this.buffer;
    x <<= 8 - this.n;
    const oldN: number = this.n;
    this.fillBuffer();
    if (this.isEmpty())
      throw new Error('Reading from empty input stream');
    this.n = oldN;
    x |= this.buffer >>> this.n;
    return String.fromCharCode(x & 255);
  }

  public readChar$int(r: number): string {
    if (r < 1 || r > 16) throw new Error(`Illegal value of r = ${r}`);
    if (r === 8) return this.readChar();
    let x: string = String.fromCharCode(0);
    for (let i = 0; i < r; i++) {
      {
        x = String.fromCharCode(x.charCodeAt(0) << 1);
        const bit: boolean = this.readBoolean();
        if (bit) x = String.fromCharCode(x.charCodeAt(0) | 1);
      }
    }
    return x;
  }

  /**
   * Reads the next r bits from this binary input stream and return as an r-bit character.
   *
   * @param   r number of bits to read
   * @return  the next {@code r} bits of data from this binary input streamt as a {@code char}
   * @throws Error if there are fewer than {@code r} bits available
   * @throws IllegalArgumentException unless {@code 1 <= r <= 16}
   */
  public readChar(r?: any): any {
    if (typeof r === 'number' || r === null) {
      return <any>this.readChar$int(r);
    }
    if (r === undefined) {
      return <any>this.readChar$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads the remaining bytes of data from this binary input stream and return as a string.
   *
   * @return  the remaining bytes of data from this binary input stream as a {@code String}
   * @throws Error if this binary input stream is empty or if the number of bits
   * available is not a multiple of 8 (byte-aligned)
   */
  public readString(): string {
    if (this.isEmpty())
      throw new Error('Reading from empty input stream');
    const sb= new String();
    while (!this.isEmpty()) {
      {
        const c: string = this.readChar();
        sb.append(c);
      }
    }
    return sb.toString();
  }

  /**
   * Reads the next 16 bits from this binary input stream and return as a 16-bit short.
   *
   * @return  the next 16 bits of data from this binary input stream as a {@code short}
   * @throws Error if there are fewer than 16 bits available
   */
  public readShort(): number {
    let x = 0;
    for (let i = 0; i < 2; i++) {
      {
        const c: string = this.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  public readInt$(): number {
    let x = 0;
    for (let i = 0; i < 4; i++) {
      {
        const c: string = this.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  public readInt$int(r: number): number {
    if (r < 1 || r > 32) throw new Error(`Illegal value of r = ${r}`);
    if (r === 32) return this.readInt();
    let x = 0;
    for (let i = 0; i < r; i++) {
      {
        x <<= 1;
        const bit: boolean = this.readBoolean();
        if (bit) x |= 1;
      }
    }
    return x;
  }

  /**
   * Reads the next r bits from this binary input stream return as an r-bit int.
   *
   * @param   r number of bits to read
   * @return  the next {@code r} bits of data from this binary input stream as a {@code int}
   * @throws Error if there are fewer than r bits available
   * @throws IllegalArgumentException unless {@code 1 <= r <= 32}
   */
  public readInt(r?: any): any {
    if (typeof r === 'number' || r === null) {
      return <any>this.readInt$int(r);
    }
    if (r === undefined) {
      return <any>this.readInt$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads the next 64 bits from this binary input stream and return as a 64-bit long.
   *
   * @return  the next 64 bits of data from this binary input stream as a {@code long}
   * @throws Error if there are fewer than 64 bits available
   */
  public readLong(): number {
    let x = 0;
    for (let i = 0; i < 8; i++) {
      {
        const c: string = this.readChar();
        x <<= 8;
        x |= c.charCodeAt(0);
      }
    }
    return x;
  }

  /**
   * Reads the next 64 bits from this binary input stream and return as a 64-bit double.
   *
   * @return  the next 64 bits of data from this binary input stream as a {@code double}
   * @throws Error if there are fewer than 64 bits available
   */
  public readDouble(): number {
    return javaemul.internal.DoubleHelper.longBitsToDouble(this.readLong());
  }

  /**
   * Reads the next 32 bits from this binary input stream and return as a 32-bit float.
   *
   * @return  the next 32 bits of data from this binary input stream as a {@code float}
   * @throws Error if there are fewer than 32 bits available
   */
  public readFloat(): number {
    return javaemul.internal.FloatHelper.intBitsToFloat(this.readInt());
  }

  /**
   * Reads the next 8 bits from this binary input stream and return as an 8-bit byte.
   *
   * @return  the next 8 bits of data from this binary input stream as a {@code byte}
   * @throws Error if there are fewer than 8 bits available
   */
  public readByte(): number {
    const c: string = this.readChar();
    return (
      (<number>(
        ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) & 255)
      )) | 0
    );
  }

  /**
   * Unit tests the {@code BinaryIn} data type.
   * Reads the name of a file or URL (first command-line argument)
   * and writes it to a file (second command-line argument).
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: BinaryIn = new BinaryIn(args[0]);
    const out: BinaryOut = new BinaryOut(args[1]);
    while (!__in.isEmpty()) {
      {
        const c: string = __in.readChar();
        out.write$char(c);
      }
    }
    out.flush();
  }
}
BinaryIn.__class = 'edu.princeton.cs.algs4.BinaryIn';

BinaryIn.main(null);
