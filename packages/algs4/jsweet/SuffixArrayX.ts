import { StdIn } from './StdIn';
import { SuffixArray } from './SuffixArray';
import { StdOut } from './StdOut';

/**
 * Initializes a suffix array for the given `text` string.
 * @param  text the input string
 * @class
 */
export class SuffixArrayX {
  static CUTOFF = 5;

  private text: string[];

  private __index: number[];

  private n: number;

  public constructor(text: string) {
    if (this.text === undefined) this.text = null;
    if (this.__index === undefined) this.__index = null;
    if (this.n === undefined) this.n = 0;
    this.n = text.length;
    text = `${text}\u0000`;
    this.text = /* toCharArray */ text.split('');
    this.__index = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i = 0; i < this.n; i++) {
      this.__index[i] = i;
    }
    this.sort(0, this.n - 1, 0);
  }

  private sort(lo: number, hi: number, d: number) {
    if (hi <= lo + SuffixArrayX.CUTOFF) {
      this.insertion(lo, hi, d);
      return;
    }
    let lt: number = lo;
    let gt: number = hi;
    const v: string = this.text[this.__index[lo] + d];
    let i: number = lo + 1;
    while (i <= gt) {
      {
        const t: string = this.text[this.__index[i] + d];
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(t) <
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(v)
        )
          this.exch(lt++, i++);
        else if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(t) >
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(v)
        )
          this.exch(i, gt--);
        else i++;
      }
    }
    this.sort(lo, lt - 1, d);
    if (((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(v) > 0)
      this.sort(lt, gt, d + 1);
    this.sort(gt + 1, hi, d);
  }

  private insertion(lo: number, hi: number, d: number) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && this.less(this.__index[j], this.__index[j - 1], d);
        j--
      ) {
        this.exch(j, j - 1);
      }
    }
  }

  private less(i: number, j: number, d: number): boolean {
    if (i === j) return false;
    i += d;
    j += d;
    while (i < this.n && j < this.n) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[i]
          ) <
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[j]
          )
        )
          return true;
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[i]
          ) >
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[j]
          )
        )
          return false;
        i++;
        j++;
      }
    }
    return i > j;
  }

  private exch(i: number, j: number) {
    const swap: number = this.__index[i];
    this.__index[i] = this.__index[j];
    this.__index[j] = swap;
  }

  /**
   * Returns the length of the input string.
   * @return  the length of the input string
   */
  public length(): number {
    return this.n;
  }

  /**
   * Returns the index into the original string of the <em>i</em>th smallest suffix.
   * That is, `text.substring(sa.index(i))` is the <em>i</em> smallest suffix.
   * @param  i an integer between 0 and <em>n</em>-1
   * @return  the index into the original string of the <em>i</em>th smallest suffix
   * @throws Error unless `0 <=i < n`
   */
  public index(i: number): number {
    if (i < 0 || i >= this.n) throw new Error();
    return this.__index[i];
  }

  public lcp$int(i: number): number {
    if (i < 1 || i >= this.n) throw new Error();
    return this.lcp$int$int(this.__index[i], this.__index[i - 1]);
  }

  public lcp$int$int(i: number, j: number): number {
    let length = 0;
    while (i < this.n && j < this.n) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[i]
          ) !=
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[j]
          )
        )
          return length;
        i++;
        j++;
        length++;
      }
    }
    return length;
  }

  public lcp(i?: any, j?: any): any {
    if (
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>this.lcp$int$int(i, j);
    }
    if ((typeof i === 'number' || i === null) && j === undefined) {
      return <any>this.lcp$int(i);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the <em>i</em>th smallest suffix as a string.
   * @param  i the index
   * @return  the <em>i</em> smallest suffix as a string
   * @throws Error unless `0 <= i < n`
   */
  public select(i: number): string {
    if (i < 0 || i >= this.n) throw new Error();
    return <string>(
      ((str, index, len) => str.substring(index, index + len))(
        this.text.join(''),
        this.__index[i],
        this.n - this.__index[i]
      )
    );
  }

  /**
   * Returns the number of suffixes strictly less than the `query` string.
   * We note that `rank(select(i))` equals `i` for each `i`
   * between 0 and <em>n</em>-1.
   * @param  query the query string
   * @return  the number of suffixes strictly less than `query`
   */
  public rank(query: string): number {
    let lo = 0;
    let hi: number = this.n - 1;
    while (lo <= hi) {
      {
        const mid: number = lo + (((hi - lo) / 2) | 0);
        const cmp: number = this.compare(query, this.__index[mid]);
        if (cmp < 0) hi = mid - 1;
        else if (cmp > 0) lo = mid + 1;
        else return mid;
      }
    }
    return lo;
  }

  private compare(query: string, i: number): number {
    const m: number = query.length;
    let j = 0;
    while (i < this.n && j < m) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            query.charAt(j)
          ) !=
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            this.text[i]
          )
        )
          return (
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              query.charAt(j)
            ) -
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              this.text[i]
            )
          );
        i++;
        j++;
      }
    }
    if (i < this.n) return -1;
    if (j < m) return +1;
    return 0;
  }

  /**
   * Unit tests the `SuffixArrayx` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const s: string = /* replaceAll */ StdIn.readAll()
      .replace(new RegExp('\n', 'g'), ' ')
      .trim();
    const suffix1: SuffixArrayX = new SuffixArrayX(s);
    const suffix2: SuffixArray = new SuffixArray(s);
    let check = true;
    for (let i = 0; check && i < s.length; i++) {
      {
        if (suffix1.index(i) !== suffix2.index(i)) {
          StdOut.println$java_lang_Object(
            `suffix1(${i}) = ${suffix1.index(i)}`
          );
          StdOut.println$java_lang_Object(
            `suffix2(${i}) = ${suffix2.index(i)}`
          );
          const ith = `"${s.substring(
            suffix1.index(i),
            Math.min(suffix1.index(i) + 50, s.length)
          )}"`;
          const jth = `"${s.substring(
            suffix2.index(i),
            Math.min(suffix2.index(i) + 50, s.length)
          )}"`;
          StdOut.println$java_lang_Object(ith);
          StdOut.println$java_lang_Object(jth);
          check = false;
        }
      }
    }
    StdOut.println$java_lang_Object('  i ind lcp rnk  select');
    StdOut.println$java_lang_Object('---------------------------');
    for (let i = 0; i < s.length; i++) {
      {
        const index: number = suffix2.index(i);
        const ith = `"${s.substring(index, Math.min(index + 50, s.length))}"`;
        const rank: number = suffix2.rank(s.substring(index));
        if (i === 0) {
          StdOut.printf('%3d %3d %3s %3d  %s\n', i, index, '-', rank, ith);
        } else {
          const lcp: number = suffix2.lcp(i);
          StdOut.printf('%3d %3d %3d %3d  %s\n', i, index, lcp, rank, ith);
        }
      }
    }
  }
}
SuffixArrayX.__class = 'edu.princeton.cs.algs4.SuffixArrayX';

SuffixArrayX.main(null);
