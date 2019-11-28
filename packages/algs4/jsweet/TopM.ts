import { MinPQ } from './MinPQ';
import { Transaction } from './Transaction';
import { StdIn } from './StdIn';
import { Stack } from './Stack';
import { StdOut } from './StdOut';

/**
 * The `TopM` class provides a client that reads a sequence of
 * transactions from standard input and prints the <em>m</em> largest ones
 * to standard output. This implementation uses a {@link MinPQ} of size
 * at most <em>m</em> + 1 to identify the <em>M</em> largest transactions
 * and a {@link Stack} to output them in the proper order.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/24pq">Section 2.4</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class TopM {
  /**
   * Reads a sequence of transactions from standard input; takes a
   * command-line integer m; prints to standard output the m largest
   * transactions in descending order.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const m: number = parseInt(args[0]);
    const pq: MinPQ<Transaction> = <any>new MinPQ<Transaction>(m + 1);
    while (StdIn.hasNextLine()) {
      {
        const line: string = StdIn.readLine();
        const transaction: Transaction = new Transaction(line);
        pq.insert(transaction);
        if (pq.size() > m) pq.delMin();
      }
    }
    const stack: Stack<Transaction> = <any>new Stack<Transaction>();
    for (let index364 = pq.iterator(); index364.hasNext(); ) {
      const transaction = index364.next();
      stack.push(transaction);
    }
    for (let index365 = stack.iterator(); index365.hasNext(); ) {
      const transaction = index365.next();
      StdOut.println$java_lang_Object(transaction);
    }
  }
}
TopM.__class = 'edu.princeton.cs.algs4.TopM';

TopM.main(null);
