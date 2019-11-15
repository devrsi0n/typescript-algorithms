import { ST } from './ST';
import { In } from './In';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `LookupCSV` class provides a data-driven client for reading in a
 * key-value pairs from a file; then, printing the values corresponding to the
 * keys found on standard input. Both keys and values are strings.
 * The fields to serve as the key and value are taken as command-line arguments.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/35applications">Section 3.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LookupCSV {
  public static main(args: string[]) {
    const keyField: number = parseInt(args[1]);
    const valField: number = parseInt(args[2]);
    const st: ST<string, string> = <any>new ST<string, string>();
    const __in: In = new In(args[0]);
    while (__in.hasNextLine()) {
      {
        const line: string = __in.readLine();
        const tokens: string[] = line.split(',');
        const key: string = tokens[keyField];
        const val: string = tokens[valField];
        st.put(key, val);
      }
    }
    while (!StdIn.isEmpty()) {
      {
        const s: string = StdIn.readString();
        if (st.contains(s)) StdOut.println$java_lang_Object(st.get(s));
        else StdOut.println$java_lang_Object('Not found');
      }
    }
  }
}
LookupCSV.__class = 'edu.princeton.cs.algs4.LookupCSV';

LookupCSV.main(null);
