import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty symbol table.
 * @class
 * @author Robert Sedgewick
 */
export class ST<Key extends java.lang.Comparable<Key>, Value>
  implements Iterable<Key> {
  private st: TreeMap<Key, Value>;

  public constructor() {
    if (this.st === undefined) this.st = null;
    this.st = <any>new TreeMap<Key, Value>();
  }

  /**
   * Returns the value associated with the given key in this symbol table.
   *
   * @param   key the key
   * @return  the value associated with the given key if the key is in this symbol table;
   * `null` if the key is not in this symbol table
   * @throws IllegalArgumentException if `key` is `null`
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('calls get() with null key');
    return this.st.get(key);
  }

  /**
   * Inserts the specified key-value pair into the symbol table, overwriting the old
   * value with the new value if the symbol table already contains the specified key.
   * Deletes the specified key (and its associated value) from this symbol table
   * if the specified value is `null`.
   *
   * @param   key the key
   * @param   val the value
   * @throws IllegalArgumentException if `key` is `null`
   */
  public put(key: Key, val: Value) {
    if (key == null) throw new Error('calls put() with null key');
    if (val == null) this.st.remove(key);
    else this.st.put(key, val);
  }

  /**
   * Removes the specified key and its associated value from this symbol table
   * (if the key is in this symbol table).
   *
   * @param   key the key
   * @throws IllegalArgumentException if `key` is `null`
   */
  public delete(key: Key) {
    if (key == null) throw new Error('calls delete() with null key');
    this.st.remove(key);
  }

  /**
   * Returns true if this symbol table contain the given key.
   *
   * @param   key the key
   * @return  `true` if this symbol table contains `key` and
   * `false` otherwise
   * @throws IllegalArgumentException if `key` is `null`
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('calls contains() with null key');
    return this.st.containsKey(key);
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   *
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.st.size();
  }

  /**
   * Returns true if this symbol table is empty.
   *
   * @return  `true` if this symbol table is empty and `false` otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns all keys in this symbol table.
   * <p>
   * To iterate over all of the keys in the symbol table named `st`,
   * use the foreach notation: `for (Key key : st.keys())`.
   *
   * @return  all keys in this symbol table
   */
  public keys(): Iterable<Key> {
    return this.st.keySet();
  }

  /**
   * Returns all of the keys in this symbol table.
   * To iterate over all of the keys in a symbol table named `st`, use the
   * foreach notation: `for (Key key : st)`.
   * <p>
   * This method is provided for backward compatibility with the version from
   * <em>Introduction to Programming in Java: An Interdisciplinary Approach.</em>
   *
   * @return      an iterator to all of the keys in this symbol table
   * @deprecated Replaced by {@link #keys()}.
   */
  public iterator(): Iterator<Key> {
    return this.st.keySet().iterator();
  }

  /**
   * Returns the smallest key in this symbol table.
   *
   * @return  the smallest key in this symbol table
   * @throws Error if this symbol table is empty
   */
  public min(): Key {
    if (this.isEmpty()) throw new Error('calls min() with empty symbol table');
    return this.st.firstKey();
  }

  /**
   * Returns the largest key in this symbol table.
   *
   * @return  the largest key in this symbol table
   * @throws Error if this symbol table is empty
   */
  public max(): Key {
    if (this.isEmpty()) throw new Error('calls max() with empty symbol table');
    return this.st.lastKey();
  }

  /**
   * Returns the smallest key in this symbol table greater than or equal to `key`.
   *
   * @param   key the key
   * @return  the smallest key in this symbol table greater than or equal to `key`
   * @throws Error if there is no such key
   * @throws IllegalArgumentException if `key` is `null`
   */
  public ceiling(key: Key): Key {
    if (key == null) throw new Error('argument to ceiling() is null');
    const k: Key = this.st.ceilingKey(key);
    if (k == null) throw new Error(`all keys are less than ${key}`);
    return k;
  }

  /**
   * Returns the largest key in this symbol table less than or equal to `key`.
   *
   * @param   key the key
   * @return  the largest key in this symbol table less than or equal to `key`
   * @throws Error if there is no such key
   * @throws IllegalArgumentException if `key` is `null`
   */
  public floor(key: Key): Key {
    if (key == null) throw new Error('argument to floor() is null');
    const k: Key = this.st.floorKey(key);
    if (k == null) throw new Error(`all keys are greater than ${key}`);
    return k;
  }

  /**
   * Unit tests the `ST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: ST<string, number> = <any>new ST<string, number>();
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index355 = st.keys().iterator(); index355.hasNext(); ) {
      const s = index355.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
ST.__class = 'edu.princeton.cs.algs4.ST';
ST.__interfaces = ['Iterable'];

ST.main(null);
