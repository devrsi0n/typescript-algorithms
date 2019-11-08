import { In } from './In';
import { ST } from './ST';
import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The {@code LookupIndex} class provides a data-driven client for reading in a
 * key-value pairs from a file; then, printing the values corresponding to the
 * keys found on standard input. Keys are strings; values are lists of strings.
 * The separating delimiter is taken as a command-line argument. This client
 * is sometimes known as an <em>inverted index</em>.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/35applications">Section 3.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LookupIndex {


  public static main(args: string[]) {
    const filename: string = args[0];
    const separator: string = args[1];
    const __in: In = new In(filename);
    const st: ST<string, Queue<string>> = <any>new ST<string, Queue<string>>();
    const ts: ST<string, Queue<string>> = <any>new ST<string, Queue<string>>();
    while (__in.hasNextLine()) {
      {
        const line: string = __in.readLine();
        const fields: string[] = line.split(separator);
        const key: string = fields[0];
        for (let i = 1; i < fields.length; i++) {
          {
            const val: string = fields[i];
            if (!st.contains(key)) st.put(key, <any>new Queue<string>());
            if (!ts.contains(val)) ts.put(val, <any>new Queue<string>());
            st.get(key).enqueue(val);
            ts.get(val).enqueue(key);
          }
        }
      }
    }
    StdOut.println$java_lang_Object('Done indexing');
    while (!StdIn.isEmpty()) {
      {
        const query: string = StdIn.readLine();
        if (st.contains(query))
          for (let index315 = st.get(query).iterator(); index315.hasNext(); ) {
            const vals = index315.next();
            StdOut.println$java_lang_Object(`  ${vals}`);
          }
        if (ts.contains(query))
          for (let index316 = ts.get(query).iterator(); index316.hasNext(); ) {
            const keys = index316.next();
            StdOut.println$java_lang_Object(`  ${keys}`);
          }
      }
    }
  }
}
LookupIndex.__class = 'edu.princeton.cs.algs4.LookupIndex';

LookupIndex.main(null);
