import { StdOut } from './StdOut';

/**
 * Preprocesses the pattern string.
 *
 * @param  pattern the pattern string
 * @param  R the alphabet size
 * @class
 */
export class BoyerMoore {
  private R: number;

  private right: number[];

  private pattern: string[];

  private pat: string;

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
      if (this.R === undefined) this.R = 0;
      if (this.right === undefined) this.right = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      if (this.R === undefined) this.R = 0;
      if (this.right === undefined) this.right = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      (() => {
        this.R = R;
        this.pattern = (s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(pattern.length);
        for (let j = 0; j < pattern.length; j++) {
          this.pattern[j] = pattern[j];
        }
        this.right = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(R);
        for (let c = 0; c < R; c++) {
          this.right[c] = -1;
        }
        for (let j = 0; j < pattern.length; j++) {
          this.right[pattern[j].charCodeAt(0)] = j;
        }
      })();
    } else if (
      (typeof pattern === 'string' || pattern === null) &&
      R === undefined
    ) {
      const __args = arguments;
      const pat: any = __args[0];
      if (this.R === undefined) this.R = 0;
      if (this.right === undefined) this.right = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      if (this.R === undefined) this.R = 0;
      if (this.right === undefined) this.right = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      (() => {
        this.R = 256;
        this.pat = pat;
        this.right = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.R);
        for (let c = 0; c < this.R; c++) {
          this.right[c] = -1;
        }
        for (let j = 0; j < pat.length; j++) {
          this.right[pat.charAt(j).charCodeAt(0)] = j;
        }
      })();
    } else throw new Error('invalid overload');
  }

  public search$java_lang_String(txt: string): number {
    const m: number = this.pat.length;
    const n: number = txt.length;
    let skip: number;
    for (let i = 0; i <= n - m; i += skip) {
      {
        skip = 0;
        for (let j: number = m - 1; j >= 0; j--) {
          {
            if (
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                this.pat.charAt(j)
              ) !=
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                txt.charAt(i + j)
              )
            ) {
              skip = Math.max(
                1,
                j - this.right[txt.charAt(i + j).charCodeAt(0)]
              );
              break;
            }
          }
        }
        if (skip === 0) return i;
      }
    }
    return n;
  }

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param   txt the text string
   * @return  the index of the first occurrence of the pattern string
   * in the text string; n if no such match
   */
  public search(txt?: any): any {
    if (typeof txt === 'string' || txt === null) {
      return <any>this.search$java_lang_String(txt);
    }
    if (
      (txt != null &&
        txt instanceof <any>Array &&
        (txt.length == 0 || txt[0] == null || typeof txt[0] === 'string')) ||
      txt === null
    ) {
      return <any>this.search$char_A(txt);
    }
    throw new Error('invalid overload');
  }

  public search$char_A(text: string[]): number {
    const m: number = this.pattern.length;
    const n: number = text.length;
    let skip: number;
    for (let i = 0; i <= n - m; i += skip) {
      {
        skip = 0;
        for (let j: number = m - 1; j >= 0; j--) {
          {
            if (
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                this.pattern[j]
              ) !=
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                text[i + j]
              )
            ) {
              skip = Math.max(1, j - this.right[text[i + j].charCodeAt(0)]);
              break;
            }
          }
        }
        if (skip === 0) return i;
      }
    }
    return n;
  }

  /**
   * Takes a pattern string and an input string as command-line arguments;
   * searches for the pattern string in the text string; and prints
   * the first occurrence of the pattern string in the text string.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const pat: string = args[0];
    const txt: string = args[1];
    const pattern: string[] = /* toCharArray */ pat.split('');
    const text: string[] = /* toCharArray */ txt.split('');
    const boyermoore1: BoyerMoore = new BoyerMoore(pat);
    const boyermoore2: BoyerMoore = new BoyerMoore(pattern, 256);
    const offset1: number = boyermoore1.search$java_lang_String(txt);
    const offset2: number = boyermoore2.search$char_A(text);
    StdOut.println$java_lang_Object(`text:    ${txt}`);
    StdOut.print$java_lang_Object('pattern: ');
    for (let i = 0; i < offset1; i++) {
      StdOut.print$java_lang_Object(' ');
    }
    StdOut.println$java_lang_Object(pat);
    StdOut.print$java_lang_Object('pattern: ');
    for (let i = 0; i < offset2; i++) {
      StdOut.print$java_lang_Object(' ');
    }
    StdOut.println$java_lang_Object(pat);
  }
}
BoyerMoore.__class = 'edu.princeton.cs.algs4.BoyerMoore';

BoyerMoore.main(null);
