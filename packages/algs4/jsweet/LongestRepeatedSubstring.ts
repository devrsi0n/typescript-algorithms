import { SuffixArray } from './SuffixArray';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `LongestRepeatedSubstring` class provides a {@link SuffixArray}
 * client for computing the longest repeated substring of a string that
 * appears at least twice. The repeated substrings may overlap (but must
 * be distinct).
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/63suffix">Section 6.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * <p>
 * See also {@link LongestCommonSubstring}.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LongestRepeatedSubstring {
  /**
   * Returns the longest repeated substring of the specified string.
   *
   * @param   text the string
   * @return  the longest repeated substring that appears in `text`;
   * the empty string if no such string
   */
  public static lrs(text: string): string {
    const n: number = text.length;
    const sa: SuffixArray = new SuffixArray(text);
    let lrs = '';
    for (let i = 1; i < n; i++) {
      {
        const length: number = sa.lcp(i);
        if (length > lrs.length) {
          lrs = text.substring(sa.index(i), sa.index(i) + length);
        }
      }
    }
    return lrs;
  }

  /**
   * Unit tests the `lrs()` method.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const text: string = /* replaceAll */ StdIn.readAll().replace(
      new RegExp('\\s+', 'g'),
      ' '
    );
    StdOut.println$java_lang_Object(`'${LongestRepeatedSubstring.lrs(text)}'`);
  }
}
LongestRepeatedSubstring.__class =
  'edu.princeton.cs.algs4.LongestRepeatedSubstring';

LongestRepeatedSubstring.main(null);
