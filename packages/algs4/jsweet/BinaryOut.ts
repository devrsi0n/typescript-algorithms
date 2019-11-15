import { BinaryIn } from './BinaryIn';

/**
 * Initializes a binary output stream from an `OutputStream`.
 * @param {OutputStream} os the `OutputStream`
 * @class
 * @author Robert Sedgewick
 */
export class BinaryOut {
  private out: BufferedOutputStream;

  private buffer: number;

  private n: number;

  public constructor(os?: any) {
    if ((os != null && os instanceof <any>OutputStream) || os === null) {
      const __args = arguments;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        this.out = new BufferedOutputStream(os);
      })();
    } else if (typeof os === 'string' || os === null) {
      const __args = arguments;
      const filename: any = __args[0];
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        try {
          const os: OutputStream = new FileOutputStream(filename);
          this.out = new BufferedOutputStream(os);
        } catch (e) {
          console.error(e.message, e);
        }
      })();
    } else if ((os != null && os instanceof <any>Socket) || os === null) {
      const __args = arguments;
      const socket: any = __args[0];
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        try {
          const os: OutputStream = socket.getOutputStream();
          this.out = new BufferedOutputStream(os);
        } catch (e) {
          console.error(e.message, e);
        }
      })();
    } else if (os === undefined) {
      const __args = arguments;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      if (this.out === undefined) this.out = null;
      if (this.buffer === undefined) this.buffer = 0;
      if (this.n === undefined) this.n = 0;
      (() => {
        this.out = new BufferedOutputStream(java.lang.System.out);
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Writes the specified bit to the binary output stream.
   * @param  x the bit
   * @private
   */
  private writeBit(x: boolean) {
    this.buffer <<= 1;
    if (x) this.buffer |= 1;
    this.n++;
    if (this.n === 8) this.clearBuffer();
  }

  /**
   * Writes the 8-bit byte to the binary output stream.
   * @param  x the byte
   * @private
   */
  private writeByte(x: number) {
    if (this.n === 0) {
      try {
        this.out.write(x);
      } catch (e) {
        console.error(e.message, e);
      }
      return;
    }
    for (let i = 0; i < 8; i++) {
      {
        const bit: boolean = ((x >>> (8 - i - 1)) & 1) === 1;
        this.writeBit(bit);
      }
    }
  }

  private clearBuffer() {
    if (this.n === 0) return;
    if (this.n > 0) this.buffer <<= 8 - this.n;
    try {
      this.out.write(this.buffer);
    } catch (e) {
      console.error(e.message, e);
    }
    this.n = 0;
    this.buffer = 0;
  }

  /**
   * Flushes the binary output stream, padding 0s if number of bits written so far
   * is not a multiple of 8.
   */
  public flush() {
    this.clearBuffer();
    try {
      this.out.flush();
    } catch (e) {
      console.error(e.message, e);
    }
  }

  /**
   * Flushes and closes the binary output stream.
   * Once it is closed, bits can no longer be written.
   */
  public close() {
    this.flush();
    try {
      this.out.close();
    } catch (e) {
      console.error(e.message, e);
    }
  }

  public write$boolean(x: boolean) {
    this.writeBit(x);
  }

  public write$byte(x: number) {
    this.writeByte(x & 255);
  }

  public write$int(x: number) {
    this.writeByte((x >>> 24) & 255);
    this.writeByte((x >>> 16) & 255);
    this.writeByte((x >>> 8) & 255);
    this.writeByte((x >>> 0) & 255);
  }

  public write$int$int(x: number, r: number) {
    if (r === 32) {
      this.write$int(x);
      return;
    }
    if (r < 1 || r > 32) throw new Error(`Illegal value for r = ${r}`);
    if (x >= 1 << r) throw new Error(`Illegal ${r}-bit char = ${x}`);
    for (let i = 0; i < r; i++) {
      {
        const bit: boolean = ((x >>> (r - i - 1)) & 1) === 1;
        this.writeBit(bit);
      }
    }
  }

  public write$double(x: number) {
    this.write$long(javaemul.internal.DoubleHelper.doubleToRawLongBits(x));
  }

  public write$long(x: number) {
    this.writeByte((<number>((x >>> 56) & 255)) | 0);
    this.writeByte((<number>((x >>> 48) & 255)) | 0);
    this.writeByte((<number>((x >>> 40) & 255)) | 0);
    this.writeByte((<number>((x >>> 32) & 255)) | 0);
    this.writeByte((<number>((x >>> 24) & 255)) | 0);
    this.writeByte((<number>((x >>> 16) & 255)) | 0);
    this.writeByte((<number>((x >>> 8) & 255)) | 0);
    this.writeByte((<number>((x >>> 0) & 255)) | 0);
  }

  public write$float(x: number) {
    this.write$int(javaemul.internal.FloatHelper.floatToRawIntBits(x));
  }

  public write$short(x: number) {
    this.writeByte((x >>> 8) & 255);
    this.writeByte((x >>> 0) & 255);
  }

  public write$char(x: string) {
    if (
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) < 0 ||
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) >= 256
    )
      throw new Error(`Illegal 8-bit char = ${x}`);
    this.writeByte(x.charCodeAt(0));
  }

  public write$char$int(x: string, r: number) {
    if (r === 8) {
      this.write$char(x);
      return;
    }
    if (r < 1 || r > 16) throw new Error(`Illegal value for r = ${r}`);
    if (((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x) >= 1 << r)
      throw new Error(`Illegal ${r}-bit char = ${x}`);
    for (let i = 0; i < r; i++) {
      {
        const bit: boolean = ((x >>> (r - i - 1)) & 1) === 1;
        this.writeBit(bit);
      }
    }
  }

  public write$java_lang_String(s: string) {
    for (let i = 0; i < s.length; i++) {
      this.write$char(s.charAt(i));
    }
  }

  public write$java_lang_String$int(s: string, r: number) {
    for (let i = 0; i < s.length; i++) {
      this.write$char$int(s.charAt(i), r);
    }
  }

  /**
   * Writes the string of r-bit characters to the binary output stream.
   * @param   s the `String` to write
   * @param   r the number of relevants bits in each character
   * @throws IllegalArgumentException unless r is between 1 and 16
   * @throws IllegalArgumentException if any character in the string is not
   * between 0 and 2<sup>r</sup> - 1
   */
  public write(s?: any, r?: any): any {
    if (
      (typeof s === 'string' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>this.write$java_lang_String$int(s, r);
    }
    if (
      (typeof s === 'string' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>this.write$char$int(s, r);
    }
    if (
      (typeof s === 'number' || s === null) &&
      (typeof r === 'number' || r === null)
    ) {
      return <any>this.write$int$int(s, r);
    }
    if ((typeof s === 'string' || s === null) && r === undefined) {
      return <any>this.write$java_lang_String(s);
    }
    if ((typeof s === 'boolean' || s === null) && r === undefined) {
      return <any>this.write$boolean(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$byte(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$short(s);
    }
    if ((typeof s === 'string' || s === null) && r === undefined) {
      return <any>this.write$char(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$int(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$long(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$float(s);
    }
    if ((typeof s === 'number' || s === null) && r === undefined) {
      return <any>this.write$double(s);
    }
    throw new Error('invalid overload');
  }

  /**
   * Test client. Read bits from standard input and write to the file
   * specified on command line.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const filename: string = args[0];
    const out: BinaryOut = new BinaryOut(filename);
    const __in: BinaryIn = new BinaryIn();
    while (!__in.isEmpty()) {
      {
        const c: string = __in.readChar();
        out.write$char(c);
      }
    }
    out.flush();
  }
}
BinaryOut.__class = 'edu.princeton.cs.algs4.BinaryOut';

BinaryOut.main(null);
