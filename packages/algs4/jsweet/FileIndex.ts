import { ST } from './ST';
import { SET } from './SET';
import { StdOut } from './StdOut';
import { In } from './In';
import { StdIn } from './StdIn';

/**
 * The {@code FileIndex} class provides a client for indexing a set of files,
 * specified as command-line arguments. It takes queries from standard input
 * and prints each file that contains the given query.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/35applications">Section 3.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class FileIndex {


  public static main(args: string[]) {
    const st: ST<string, SET<File>> = <any>new ST<string, SET<File>>();
    StdOut.println$java_lang_Object('Indexing files');
    for (let index257 = 0; index257 < args.length; index257++) {
      const filename = args[index257];
      {
        StdOut.println$java_lang_Object(`  ${filename}`);
        const file: File = new File(filename);
        const __in: In = new In(file);
        while (!__in.isEmpty()) {
          {
            const word: string = __in.readString();
            if (!st.contains(word)) st.put(word, <any>new SET<File>());
            const set: SET<File> = st.get(word);
            set.add(file);
          }
        }
      }
    }
    while (!StdIn.isEmpty()) {
      {
        const query: string = StdIn.readString();
        if (st.contains(query)) {
          const set: SET<File> = st.get(query);
          for (let index258 = set.iterator(); index258.hasNext(); ) {
            const file = index258.next();
            {
              StdOut.println$java_lang_Object(`  ${file.getName()}`);
            }
          }
        }
      }
    }
  }
}
FileIndex.__class = 'edu.princeton.cs.algs4.FileIndex';

FileIndex.main(null);
