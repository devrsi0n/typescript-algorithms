import { StdOut } from './StdOut';

/**
 * Preprocesses the pattern string.
 *
 * @param  pattern the pattern string
 * @param  R the alphabet size
 * @class
 */
export class KMP {
  private R: number;

  private dfa: number[][];

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
      if (this.dfa === undefined) this.dfa = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      if (this.R === undefined) this.R = 0;
      if (this.dfa === undefined) this.dfa = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      (() => {
        this.R = R;
        this.pattern = ((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(pattern.length);
        for (let j = 0; j < pattern.length; j++) {
          this.pattern[j] = pattern[j];
        }
        const m: number = pattern.length;
        this.dfa = <any>(function(dims) {
          const allocate = function(dims) {
            if (dims.length == 0) {
              return 0;
            }
            const array = [];
            for (let i = 0; i < dims[0]; i++) {
              array.push(allocate(dims.slice(1)));
            }
            return array;
          };
          return allocate(dims);
        })([R, m]);
        this.dfa[pattern[0].charCodeAt(0)][0] = 1;
        for (let x = 0, j = 1; j < m; j++) {
          {
            for (let c = 0; c < R; c++) {
              this.dfa[c][j] = this.dfa[c][x];
            }
            this.dfa[pattern[j].charCodeAt(0)][j] = j + 1;
            x = this.dfa[pattern[j].charCodeAt(0)][x];
          }
        }
      })();
    } else if (
      (typeof pattern === 'string' || pattern === null) &&
      R === undefined
    ) {
      const __args = arguments;
      const pat: any = __args[0];
      if (this.R === undefined) this.R = 0;
      if (this.dfa === undefined) this.dfa = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      if (this.R === undefined) this.R = 0;
      if (this.dfa === undefined) this.dfa = null;
      if (this.pattern === undefined) this.pattern = null;
      if (this.pat === undefined) this.pat = null;
      (() => {
        this.R = 256;
        this.pat = pat;
        const m: number = pat.length;
        this.dfa = <any>(function(dims) {
          const allocate = function(dims) {
            if (dims.length == 0) {
              return 0;
            }
            const array = [];
            for (let i = 0; i < dims[0]; i++) {
              array.push(allocate(dims.slice(1)));
            }
            return array;
          };
          return allocate(dims);
        })([this.R, m]);
        this.dfa[pat.charAt(0).charCodeAt(0)][0] = 1;
        for (let x = 0, j = 1; j < m; j++) {
          {
            for (let c = 0; c < this.R; c++) {
              this.dfa[c][j] = this.dfa[c][x];
            }
            this.dfa[pat.charAt(j).charCodeAt(0)][j] = j + 1;
            x = this.dfa[pat.charAt(j).charCodeAt(0)][x];
          }
        }
      })();
    } else throw new Error('invalid overload');
  }

  public search$java_lang_String(txt: string): number {
    const m: number = this.pat.length;
    const n: number = txt.length;
    let i: number;
    let j: number;
    for (i = 0, j = 0; i < n && j < m; i++) {
      {
        j = this.dfa[txt.charAt(i).charCodeAt(0)][j];
      }
    }
    if (j === m) return i - m;
    return n;
  }

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param   txt the text string
   * @return  the index of the first occurrence of the pattern string
   * in the text string; N if no such match
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
    let i: number;
    let j: number;
    for (i = 0, j = 0; i < n && j < m; i++) {
      {
        j = this.dfa[text[i].charCodeAt(0)][j];
      }
    }
    if (j === m) return i - m;
    return n;
  }

  /**
   *
   * Takes a pattern string and an input string as command-line arguments;
   * searches for the pattern string in the text string; and prints
   * the first occurrence of the pattern string in the text string.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const pat: string = args[0];
    const txt: string = args[1];
    const pattern: string[] = /* toCharArray */ pat.split('');
    const text: string[] = /* toCharArray */ txt.split('');
    const kmp1: KMP = new KMP(pat);
    const offset1: number = kmp1.search$java_lang_String(txt);
    const kmp2: KMP = new KMP(pattern, 256);
    const offset2: number = kmp2.search$char_A(text);
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
KMP.__class = 'edu.princeton.cs.algs4.KMP';

KMP.main(null);
