import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes a suffix array for the given {@code text} string.
 * @param  text the input string
 * @class
 */
export class SuffixArray {
  private suffixes: SuffixArray.Suffix[];

  public constructor(text: string) {
    if (this.suffixes === undefined) this.suffixes = null;
    const n: number = text.length;
    this.suffixes = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      this.suffixes[i] = new SuffixArray.Suffix(text, i);
    }
    Arrays.sort(this.suffixes);
  }

  /**
   * Returns the length of the input string.
   * @return  the length of the input string
   */
  public length(): number {
    return this.suffixes.length;
  }

  /**
   * Returns the index into the original string of the <em>i</em>th smallest suffix.
   * That is, {@code text.substring(sa.index(i))} is the <em>i</em>th smallest suffix.
   * @param  i an integer between 0 and <em>n</em>-1
   * @return  the index into the original string of the <em>i</em>th smallest suffix
   * @throws Error unless {@code 0 <= i < n}
   */
  public index(i: number): number {
    if (i < 0 || i >= this.suffixes.length) throw new Error();
    return this.suffixes[i].index;
  }

  /**
   * Returns the length of the longest common prefix of the <em>i</em>th
   * smallest suffix and the <em>i</em>-1st smallest suffix.
   * @param  i an integer between 1 and <em>n</em>-1
   * @return  the length of the longest common prefix of the <em>i</em>th
   * smallest suffix and the <em>i</em>-1st smallest suffix.
   * @throws Error unless {@code 1 <= i < n}
   */
  public lcp(i: number): number {
    if (i < 1 || i >= this.suffixes.length) throw new Error();
    return SuffixArray.lcpSuffix(this.suffixes[i], this.suffixes[i - 1]);
  }

  static lcpSuffix(s: SuffixArray.Suffix, t: SuffixArray.Suffix): number {
    const n: number = Math.min(s.length(), t.length());
    for (let i = 0; i < n; i++) {
      {
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            s.charAt(i)
          ) !=
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(t.charAt(i))
        )
          return i;
      }
    }
    return n;
  }

  /**
   * Returns the <em>i</em>th smallest suffix as a string.
   * @param  i the index
   * @return  the <em>i</em> smallest suffix as a string
   * @throws Error unless {@code 0 <= i < n}
   */
  public select(i: number): string {
    if (i < 0 || i >= this.suffixes.length) throw new Error();
    return this.suffixes[i].toString();
  }

  /**
   * Returns the number of suffixes strictly less than the {@code query} string.
   * We note that {@code rank(select(i))} equals {@code i} for each {@code i}
   * between 0 and <em>n</em>-1.
   * @param  query the query string
   * @return  the number of suffixes strictly less than {@code query}
   */
  public rank(query: string): number {
    let lo = 0;
    let hi: number = this.suffixes.length - 1;
    while (lo <= hi) {
      {
        const mid: number = lo + (((hi - lo) / 2) | 0);
        const cmp: number = SuffixArray.compare(query, this.suffixes[mid]);
        if (cmp < 0) hi = mid - 1;
        else if (cmp > 0) lo = mid + 1;
        else return mid;
      }
    }
    return lo;
  }

  static compare(query: string, suffix: SuffixArray.Suffix): number {
    const n: number = Math.min(query.length, suffix.length());
    for (let i = 0; i < n; i++) {
      {
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            query.charAt(i)
          ) <
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            suffix.charAt(i)
          )
        )
          return -1;
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            query.charAt(i)
          ) >
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            suffix.charAt(i)
          )
        )
          return +1;
      }
    }
    return query.length - suffix.length();
  }

  /**
   * Unit tests the {@code SuffixArray} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const s: string = /* replaceAll */ StdIn.readAll()
      .replace(new RegExp('\\s+', 'g'), ' ')
      .trim();
    const suffix: SuffixArray = new SuffixArray(s);
    StdOut.println$java_lang_Object('  i ind lcp rnk select');
    StdOut.println$java_lang_Object('---------------------------');
    for (let i = 0; i < s.length; i++) {
      {
        const index: number = suffix.index(i);
        const ith = `"${s.substring(index, Math.min(index + 50, s.length))}"`;
        const rank: number = suffix.rank(s.substring(index));
        if (i === 0) {
          StdOut.printf('%3d %3d %3s %3d %s\n', i, index, '-', rank, ith);
        } else {
          const lcp: number = suffix.lcp(i);
          StdOut.printf('%3d %3d %3d %3d %s\n', i, index, lcp, rank, ith);
        }
      }
    }
  }
}
SuffixArray.__class = 'edu.princeton.cs.algs4.SuffixArray';

export namespace SuffixArray {
  export class Suffix implements java.lang.Comparable<SuffixArray.Suffix> {
    text: string;

    index: number;

    constructor(text: string, index: number) {
      if (this.text === undefined) this.text = null;
      if (this.index === undefined) this.index = 0;
      this.text = text;
      this.index = index;
    }

    length(): number {
      return this.text.length - this.index;
    }

    charAt(i: number): string {
      return this.text.charAt(this.index + i);
    }

    public compareTo(that: SuffixArray.Suffix): number {
      if (this === that) return 0;
      const n: number = Math.min(this.length(), that.length());
      for (let i = 0; i < n; i++) {
        {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              this.charAt(i)
            ) <
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              that.charAt(i)
            )
          )
            return -1;
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              this.charAt(i)
            ) >
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              that.charAt(i)
            )
          )
            return +1;
        }
      }
      return this.length() - that.length();
    }

    public toString(): string {
      return this.text.substring(this.index);
    }
  }
  Suffix.__class = 'edu.princeton.cs.algs4.SuffixArray.Suffix';
  Suffix.__interfaces = ['java.lang.Comparable'];
}

SuffixArray.main(null);
