import { StdOut } from './StdOut';

/**
 * Preprocesses the pattern string.
 *
 * @param  pattern the pattern string
 * @param  R the alphabet size
 * @class
 */
export class RabinKarp {
  private pat: string;

  private patHash: number;

  private m: number;

  private q: number;

  private R: number;

  private RM: number;

  public constructor(pattern?: any, R?: any) {
    if (
      ((pattern != null &&
        pattern instanceof <any>Array &&
        (pattern.length == 0 ||
          pattern[0] == null ||
          typeof pattern[0] === 'string')) ||
        pattern === null) &&
      (typeof R === 'number' || R === null)
    ) {
      const __args = arguments;
      if (this.pat === undefined) this.pat = null;
      if (this.patHash === undefined) this.patHash = 0;
      if (this.m === undefined) this.m = 0;
      if (this.q === undefined) this.q = 0;
      if (this.R === undefined) this.R = 0;
      if (this.RM === undefined) this.RM = 0;
      if (this.pat === undefined) this.pat = null;
      if (this.patHash === undefined) this.patHash = 0;
      if (this.m === undefined) this.m = 0;
      if (this.q === undefined) this.q = 0;
      if (this.R === undefined) this.R = 0;
      if (this.RM === undefined) this.RM = 0;
      (() => {
        this.pat = /* valueOf */ new String(pattern).toString();
        this.R = R;
        throw new java.lang.UnsupportedOperationException(
          'Operation not supported yet'
        );
      })();
    } else if (
      (typeof pattern === 'string' || pattern === null) &&
      R === undefined
    ) {
      const __args = arguments;
      const pat: any = __args[0];
      if (this.pat === undefined) this.pat = null;
      if (this.patHash === undefined) this.patHash = 0;
      if (this.m === undefined) this.m = 0;
      if (this.q === undefined) this.q = 0;
      if (this.R === undefined) this.R = 0;
      if (this.RM === undefined) this.RM = 0;
      if (this.pat === undefined) this.pat = null;
      if (this.patHash === undefined) this.patHash = 0;
      if (this.m === undefined) this.m = 0;
      if (this.q === undefined) this.q = 0;
      if (this.R === undefined) this.R = 0;
      if (this.RM === undefined) this.RM = 0;
      (() => {
        this.pat = pat;
        this.R = 256;
        this.m = pat.length;
        this.q = RabinKarp.longRandomPrime();
        this.RM = 1;
        for (let i = 1; i <= this.m - 1; i++) {
          this.RM = (this.R * this.RM) % this.q;
        }
        this.patHash = this.hash(pat, this.m);
      })();
    } else throw new Error('invalid overload');
  }

  private hash(key: string, m: number): number {
    let h = 0;
    for (let j = 0; j < m; j++) {
      h =
        (this.R * h +
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            key.charAt(j)
          )) %
        this.q;
    }
    return h;
  }

  private check(txt: string, i: number): boolean {
    for (let j = 0; j < this.m; j++) {
      if (
        ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
          this.pat.charAt(j)
        ) !=
        ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
          txt.charAt(i + j)
        )
      )
        return false;
    }
    return true;
  }

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param   txt the text string
   * @return  the index of the first occurrence of the pattern string
   * in the text string; n if no such match
   */
  public search(txt: string): number {
    const n: number = txt.length;
    if (n < this.m) return n;
    let txtHash: number = this.hash(txt, this.m);
    if (this.patHash === txtHash && this.check(txt, 0)) return 0;
    for (let i: number = this.m; i < n; i++) {
      {
        txtHash =
          (txtHash +
            this.q -
            ((this.RM *
              ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                txt.charAt(i - this.m)
              )) %
              this.q)) %
          this.q;
        txtHash =
          (txtHash * this.R +
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              txt.charAt(i)
            )) %
          this.q;
        const offset: number = i - this.m + 1;
        if (this.patHash === txtHash && this.check(txt, offset)) return offset;
      }
    }
    return n;
  }

  private static longRandomPrime(): number {
    const prime: BigInteger = BigInteger.probablePrime(31, new Random());
    return prime.longValue();
  }

  /**
   *
   * Takes a pattern string and an input string as command-line arguments;
   * searches for the pattern string in the text string; and prints
   * the first occurrence of the pattern string in the text string.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const pat: string = args[0];
    const txt: string = args[1];
    const searcher: RabinKarp = new RabinKarp(pat);
    const offset: number = searcher.search(txt);
    StdOut.println$java_lang_Object(`text:    ${txt}`);
    StdOut.print$java_lang_Object('pattern: ');
    for (let i = 0; i < offset; i++) {
      StdOut.print$java_lang_Object(' ');
    }
    StdOut.println$java_lang_Object(pat);
  }
}
RabinKarp.__class = 'edu.princeton.cs.algs4.RabinKarp';

RabinKarp.main(null);
