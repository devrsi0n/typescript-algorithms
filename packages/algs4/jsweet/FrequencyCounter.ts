import { ST } from './ST';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `FrequencyCounter` class provides a client for
 * reading in a sequence of words and printing a word (exceeding
 * a given length) that occurs most frequently. It is useful as
 * a test client for various symbol table implementations.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/31elementary">Section 3.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class FrequencyCounter {
  /**
   * Reads in a command-line integer and sequence of words from
   * standard input and prints out a word (whose length exceeds
   * the threshold) that occurs most frequently to standard output.
   * It also prints out the number of words whose length exceeds
   * the threshold and the number of distinct such words.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    let distinct = 0;
    let words = 0;
    const minlen: number = parseInt(args[0]);
    const st: ST<string, number> = <any>new ST<string, number>();
    while (!StdIn.isEmpty()) {
      {
        const key: string = StdIn.readString();
        if (key.length < minlen) continue;
        words++;
        if (st.contains(key)) {
          st.put(key, st.get(key) + 1);
        } else {
          st.put(key, 1);
          distinct++;
        }
      }
    }
    let max = '';
    st.put(max, 0);
    for (let index270 = st.keys().iterator(); index270.hasNext(); ) {
      const word = index270.next();
      {
        if (st.get(word) > st.get(max)) max = word;
      }
    }
    StdOut.println$java_lang_Object(`${max} ${st.get(max)}`);
    StdOut.println$java_lang_Object(`distinct = ${distinct}`);
    StdOut.println$java_lang_Object(`words    = ${words}`);
  }
}
FrequencyCounter.__class = 'edu.princeton.cs.algs4.FrequencyCounter';

FrequencyCounter.main(null);
