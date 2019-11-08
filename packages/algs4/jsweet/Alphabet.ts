import { StdOut } from './StdOut';

/**
 * Initializes a new alphabet from the given set of characters.
 *
 * @param  alpha the set of characters
 * @class
 */
export class Alphabet {
  /**
   * The binary alphabet { 0, 1 }.
   */
  public static BINARY: Alphabet;
  public static BINARY_$LI$(): Alphabet {
    if (Alphabet.BINARY == null) Alphabet.BINARY = new Alphabet('01');
    return Alphabet.BINARY;
  }

  /**
   * The octal alphabet { 0, 1, 2, 3, 4, 5, 6, 7 }.
   */
  public static OCTAL: Alphabet;
  public static OCTAL_$LI$(): Alphabet {
    if (Alphabet.OCTAL == null) Alphabet.OCTAL = new Alphabet('01234567');
    return Alphabet.OCTAL;
  }

  /**
   * The decimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }.
   */
  public static DECIMAL: Alphabet;
  public static DECIMAL_$LI$(): Alphabet {
    if (Alphabet.DECIMAL == null) Alphabet.DECIMAL = new Alphabet('0123456789');
    return Alphabet.DECIMAL;
  }

  /**
   * The hexadecimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F }.
   */
  public static HEXADECIMAL: Alphabet;
  public static HEXADECIMAL_$LI$(): Alphabet {
    if (Alphabet.HEXADECIMAL == null)
      Alphabet.HEXADECIMAL = new Alphabet('0123456789ABCDEF');
    return Alphabet.HEXADECIMAL;
  }

  /**
   * The DNA alphabet { A, C, T, G }.
   */
  public static DNA: Alphabet;
  public static DNA_$LI$(): Alphabet {
    if (Alphabet.DNA == null) Alphabet.DNA = new Alphabet('ACGT');
    return Alphabet.DNA;
  }

  /**
   * The lowercase alphabet { a, b, c, ..., z }.
   */
  public static LOWERCASE: Alphabet;
  public static LOWERCASE_$LI$(): Alphabet {
    if (Alphabet.LOWERCASE == null)
      Alphabet.LOWERCASE = new Alphabet('abcdefghijklmnopqrstuvwxyz');
    return Alphabet.LOWERCASE;
  }

  /**
   * The uppercase alphabet { A, B, C, ..., Z }.
   */
  public static UPPERCASE: Alphabet;
  public static UPPERCASE_$LI$(): Alphabet {
    if (Alphabet.UPPERCASE == null)
      Alphabet.UPPERCASE = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return Alphabet.UPPERCASE;
  }

  /**
   * The protein alphabet { A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y }.
   */
  public static PROTEIN: Alphabet;
  public static PROTEIN_$LI$(): Alphabet {
    if (Alphabet.PROTEIN == null)
      Alphabet.PROTEIN = new Alphabet('ACDEFGHIKLMNPQRSTVWY');
    return Alphabet.PROTEIN;
  }

  /**
   * The base-64 alphabet (64 characters).
   */
  public static BASE64: Alphabet;
  public static BASE64_$LI$(): Alphabet {
    if (Alphabet.BASE64 == null)
      Alphabet.BASE64 = new Alphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      );
    return Alphabet.BASE64;
  }

  /**
   * The ASCII alphabet (0-127).
   */
  public static ASCII: Alphabet;
  public static ASCII_$LI$(): Alphabet {
    if (Alphabet.ASCII == null) Alphabet.ASCII = new Alphabet(128);
    return Alphabet.ASCII;
  }

  /**
   * The extended ASCII alphabet (0-255).
   */
  public static EXTENDED_ASCII: Alphabet;
  public static EXTENDED_ASCII_$LI$(): Alphabet {
    if (Alphabet.EXTENDED_ASCII == null)
      Alphabet.EXTENDED_ASCII = new Alphabet(256);
    return Alphabet.EXTENDED_ASCII;
  }

  /**
   * The Unicode 16 alphabet (0-65,535).
   */
  public static UNICODE16: Alphabet;
  public static UNICODE16_$LI$(): Alphabet {
    if (Alphabet.UNICODE16 == null) Alphabet.UNICODE16 = new Alphabet(65536);
    return Alphabet.UNICODE16;
  }

  private alphabet: string[];

  private inverse: number[];

  private __R: number;

  public constructor(alpha?: any) {
    if (typeof alpha === 'string' || alpha === null) {
      const __args = arguments;
      if (this.alphabet === undefined) this.alphabet = null;
      if (this.inverse === undefined) this.inverse = null;
      if (this.__R === undefined) this.__R = 0;
      if (this.alphabet === undefined) this.alphabet = null;
      if (this.inverse === undefined) this.inverse = null;
      if (this.__R === undefined) this.__R = 0;
      (() => {
        const unicode: boolean[] = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })('\uFFFF');
        for (let i = 0; i < alpha.length; i++) {
          {
            const c: string = alpha.charAt(i);
            if (unicode[c.charCodeAt(0)])
              throw new Error(`Illegal alphabet: repeated character = '${c}'`);
            unicode[c.charCodeAt(0)] = true;
          }
        }
        this.alphabet = /* toCharArray */ alpha.split('');
        this.__R = alpha.length;
        this.inverse = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })('\uFFFF');
        for (let i = 0; i < this.inverse.length; i++) {
          this.inverse[i] = -1;
        }
        for (let c = 0; c < this.__R; c++) {
          this.inverse[this.alphabet[c].charCodeAt(0)] = c;
        }
      })();
    } else if (typeof alpha === 'number' || alpha === null) {
      const __args = arguments;
      const radix: any = __args[0];
      if (this.alphabet === undefined) this.alphabet = null;
      if (this.inverse === undefined) this.inverse = null;
      if (this.__R === undefined) this.__R = 0;
      if (this.alphabet === undefined) this.alphabet = null;
      if (this.inverse === undefined) this.inverse = null;
      if (this.__R === undefined) this.__R = 0;
      (() => {
        this.__R = radix;
        this.alphabet = (s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.__R);
        this.inverse = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.__R);
        for (let i = 0; i < this.__R; i++) {
          this.alphabet[i] = String.fromCharCode(i);
        }
        for (let i = 0; i < this.__R; i++) {
          this.inverse[i] = i;
        }
      })();
    } else if (alpha === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const radix: any = 256;
        if (this.alphabet === undefined) this.alphabet = null;
        if (this.inverse === undefined) this.inverse = null;
        if (this.__R === undefined) this.__R = 0;
        if (this.alphabet === undefined) this.alphabet = null;
        if (this.inverse === undefined) this.inverse = null;
        if (this.__R === undefined) this.__R = 0;
        (() => {
          this.__R = radix;
          this.alphabet = (s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(this.__R);
          this.inverse = (s => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(this.__R);
          for (let i = 0; i < this.__R; i++) {
            this.alphabet[i] = String.fromCharCode(i);
          }
          for (let i = 0; i < this.__R; i++) {
            this.inverse[i] = i;
          }
        })();
      }
    } else throw new Error('invalid overload');
  }

  /**
   * Returns true if the argument is a character in this alphabet.
   *
   * @param   c the character
   * @return  {@code true} if {@code c} is a character in this alphabet;
   * {@code false} otherwise
   */
  public contains(c: string): boolean {
    return this.inverse[c.charCodeAt(0)] !== -1;
  }

  /**
   * Returns the number of characters in this alphabet (the radix).
   *
   * @return  the number of characters in this alphabet
   * @deprecated Replaced by {@link #radix()}.
   */
  public R(): number {
    return this.__R;
  }

  /**
   * Returns the number of characters in this alphabet (the radix).
   *
   * @return  the number of characters in this alphabet
   */
  public radix(): number {
    return this.__R;
  }

  /**
   * Returns the binary logarithm of the number of characters in this alphabet.
   *
   * @return  the binary logarithm (rounded up) of the number of characters in this alphabet
   */
  public lgR(): number {
    let lgR = 0;
    for (
      let t: number = this.__R - 1;
      t >= 1;
      t = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(t / 2)
    ) {
      lgR++;
    }
    return lgR;
  }

  /**
   * Returns the index corresponding to the argument character.
   *
   * @param   c the character
   * @return  the index corresponding to the character {@code c}
   * @throws IllegalArgumentException unless {@code c} is a character in this alphabet
   */
  public toIndex(c: string): number {
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >=
        this.inverse.length ||
      this.inverse[c.charCodeAt(0)] === -1
    ) {
      throw new Error(`Character ${c} not in alphabet`);
    }
    return this.inverse[c.charCodeAt(0)];
  }

  /**
   * Returns the indices corresponding to the argument characters.
   *
   * @param   s the characters
   * @return  the indices corresponding to the characters {@code s}
   * @throws IllegalArgumentException unless every character in {@code s}
   * is a character in this alphabet
   */
  public toIndices(s: string): number[] {
    const source: string[] = /* toCharArray */ s.split('');
    const target: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(s.length);
    for (let i = 0; i < source.length; i++) {
      target[i] = this.toIndex(source[i]);
    }
    return target;
  }

  /**
   * Returns the character corresponding to the argument index.
   *
   * @param   index the index
   * @return  the character corresponding to the index {@code index}
   * @throws IllegalArgumentException unless {@code 0 <= index < R}
   */
  public toChar(index: number): string {
    if (index < 0 || index >= this.__R) {
      throw new Error(`index must be between 0 and ${this.__R}: ${index}`);
    }
    return this.alphabet[index];
  }

  /**
   * Returns the characters corresponding to the argument indices.
   *
   * @param   indices the indices
   * @return  the characters corresponding to the indices {@code indices}
   * @throws IllegalArgumentException unless {@code 0 < indices[i] < R}
   * for every {@code i}
   */
  public toChars(indices: number[]): string {
    const s= new java.lang.StringBuilder(
      indices.length
    );
    for (let i = 0; i < indices.length; i++) {
      s.append(this.toChar(indices[i]));
    }
    return s.toString();
  }

  /**
   * Unit tests the {@code Alphabet} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const encoded1: number[] = Alphabet.BASE64_$LI$().toIndices(
      'NowIsTheTimeForAllGoodMen'
    );
    const decoded1: string = Alphabet.BASE64_$LI$().toChars(encoded1);
    StdOut.println$java_lang_Object(decoded1);
    const encoded2: number[] = Alphabet.DNA_$LI$().toIndices(
      'AACGAACGGTTTACCCCG'
    );
    const decoded2: string = Alphabet.DNA_$LI$().toChars(encoded2);
    StdOut.println$java_lang_Object(decoded2);
    const encoded3: number[] = Alphabet.DECIMAL_$LI$().toIndices(
      '01234567890123456789'
    );
    const decoded3: string = Alphabet.DECIMAL_$LI$().toChars(encoded3);
    StdOut.println$java_lang_Object(decoded3);
  }
}
Alphabet.__class = 'edu.princeton.cs.algs4.Alphabet';

Alphabet.UNICODE16_$LI$();

Alphabet.EXTENDED_ASCII_$LI$();

Alphabet.ASCII_$LI$();

Alphabet.BASE64_$LI$();

Alphabet.PROTEIN_$LI$();

Alphabet.UPPERCASE_$LI$();

Alphabet.LOWERCASE_$LI$();

Alphabet.DNA_$LI$();

Alphabet.HEXADECIMAL_$LI$();

Alphabet.DECIMAL_$LI$();

Alphabet.OCTAL_$LI$();

Alphabet.BINARY_$LI$();

Alphabet.main(null);
