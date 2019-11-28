import { SuffixArray } from './SuffixArray';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * The `LongestCommonSubstring` class provides a {@link SuffixArray}
 * client for computing the longest common substring that appears in two
 * given strings.
 * <p>
 * This implementation computes the suffix array of each string and applies a
 * merging operation to determine the longest common substring.
 * For an alternate implementation, see
 * <a href = "https://algs4.cs.princeton.edu/63suffix/LongestCommonSubstringConcatenate.java.html">LongestCommonSubstringConcatenate.java</a>.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/63suffix">Section 6.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * <p>
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LongestCommonSubstring {
  private static lcp(s: string, p: number, t: string, q: number): string {
    const n: number = Math.min(s.length - p, t.length - q);
    for (let i = 0; i < n; i++) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            s.charAt(p + i)
          ) !=
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            t.charAt(q + i)
          )
        )
          return s.substring(p, p + i);
      }
    }
    return s.substring(p, p + n);
  }

  private static compare(s: string, p: number, t: string, q: number): number {
    const n: number = Math.min(s.length - p, t.length - q);
    for (let i = 0; i < n; i++) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            s.charAt(p + i)
          ) !=
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            t.charAt(q + i)
          )
        )
          return (
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              s.charAt(p + i)
            ) -
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              t.charAt(q + i)
            )
          );
      }
    }
    if (s.length - p < t.length - q) return -1;
    if (s.length - p > t.length - q) return +1;
    return 0;
  }

  /**
   * Returns the longest common string of the two specified strings.
   *
   * @param   s one string
   * @param   t the other string
   * @return  the longest common string that appears as a substring
   * in both `s` and `t`; the empty string
   * if no such string
   */
  public static lcs(s: string, t: string): string {
    const suffix1: SuffixArray = new SuffixArray(s);
    const suffix2: SuffixArray = new SuffixArray(t);
    let lcs = '';
    let i = 0;
    let j = 0;
    while (i < s.length && j < t.length) {
      {
        const p: number = suffix1.index(i);
        const q: number = suffix2.index(j);
        const x: string = LongestCommonSubstring.lcp(s, p, t, q);
        if (x.length > lcs.length) lcs = x;
        if (LongestCommonSubstring.compare(s, p, t, q) < 0) i++;
        else j++;
      }
    }
    return lcs;
  }

  /**
   * Unit tests the `lcs()` method.
   * Reads in two strings from files specified as command-line arguments;
   * computes the longest common substring; and prints the results to
   * standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const in1: In = new In(args[0]);
    const in2: In = new In(args[1]);
    const s: string = /* replaceAll */ in1
      .readAll()
      .trim()
      .replace(new RegExp('\\s+', 'g'), ' ');
    const t: string = /* replaceAll */ in2
      .readAll()
      .trim()
      .replace(new RegExp('\\s+', 'g'), ' ');
    StdOut.println$java_lang_Object(`'${LongestCommonSubstring.lcs(s, t)}'`);
  }
}
LongestCommonSubstring.__class =
  'edu.princeton.cs.algs4.LongestCommonSubstring';

LongestCommonSubstring.main(null);
