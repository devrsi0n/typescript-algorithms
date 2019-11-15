import { SequentialSearchST } from './SequentialSearchST';
import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty symbol table with `m` chains.
 * @param  m the initial number of chains
 * @class
 * @author Robert Sedgewick
 */
export class SeparateChainingHashST<Key, Value> {
  static INIT_CAPACITY = 4;

  private n: number;

  private m: number;

  private st: SequentialSearchST<Key, Value>[];

  public constructor(m?: any) {
    if (typeof m === 'number' || m === null) {
      const __args = arguments;
      if (this.n === undefined) this.n = 0;
      if (this.m === undefined) this.m = 0;
      if (this.st === undefined) this.st = null;
      if (this.n === undefined) this.n = 0;
      if (this.m === undefined) this.m = 0;
      if (this.st === undefined) this.st = null;
      (() => {
        this.m = m;
        this.st = <SequentialSearchST<Key, Value>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(m);
        for (let i = 0; i < m; i++) {
          this.st[i] = <any>new SequentialSearchST<Key, Value>();
        }
      })();
    } else if (m === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const m: any = SeparateChainingHashST.INIT_CAPACITY;
        if (this.n === undefined) this.n = 0;
        if (this.m === undefined) this.m = 0;
        if (this.st === undefined) this.st = null;
        if (this.n === undefined) this.n = 0;
        if (this.m === undefined) this.m = 0;
        if (this.st === undefined) this.st = null;
        (() => {
          this.m = m;
          this.st = <SequentialSearchST<Key, Value>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(m);
          for (let i = 0; i < m; i++) {
            this.st[i] = <any>new SequentialSearchST<Key, Value>();
          }
        })();
      }
    } else throw new Error('invalid overload');
  }

  private resize(chains: number) {
    const temp: SeparateChainingHashST<Key, Value> = <any>(
      new SeparateChainingHashST<Key, Value>(chains)
    );
    for (let i = 0; i < this.m; i++) {
      {
        for (
          let index339 = this.st[i].keys().iterator();
          index339.hasNext();

        ) {
          const key = index339.next();
          {
            temp.put(key, this.st[i].get(key));
          }
        }
      }
    }
    this.m = temp.m;
    this.n = temp.n;
    this.st = temp.st;
  }

  private hash(key: Key): number {
    return /* hashCode */ ((<any>((o: any) => {
        if (o.hashCode) {
          return o.hashCode();
        }
        return o
          .toString()
          .split('')
          .reduce(
            (prevHash, currVal) =>
              ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
            0
          );
      })(key)) & 2147483647) % this.m;
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   *
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns true if this symbol table is empty.
   *
   * @return  `true` if this symbol table is empty;
   * `false` otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns true if this symbol table contains the specified key.
   *
   * @param   key the key
   * @return  `true` if this symbol table contains `key`;
   * `false` otherwise
   * @throws IllegalArgumentException if `key` is `null`
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    return this.get(key) != null;
  }

  /**
   * Returns the value associated with the specified key in this symbol table.
   *
   * @param   key the key
   * @return  the value associated with `key` in the symbol table;
   * `null` if no such value
   * @throws IllegalArgumentException if `key` is `null`
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    const i: number = this.hash(key);
    return this.st[i].get(key);
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
    if (key == null) throw new Error('first argument to put() is null');
    if (val == null) {
      this.delete(key);
      return;
    }
    if (this.n >= 10 * this.m) this.resize(2 * this.m);
    const i: number = this.hash(key);
    if (!this.st[i].contains(key)) this.n++;
    this.st[i].put(key, val);
  }

  /**
   * Removes the specified key and its associated value from this symbol table
   * (if the key is in this symbol table).
   *
   * @param   key the key
   * @throws IllegalArgumentException if `key` is `null`
   */
  public delete(key: Key) {
    if (key == null) throw new Error('argument to delete() is null');
    const i: number = this.hash(key);
    if (this.st[i].contains(key)) this.n--;
    this.st[i].delete(key);
    if (this.m > SeparateChainingHashST.INIT_CAPACITY && this.n <= 2 * this.m)
      this.resize((this.m / 2) | 0);
  }

  public keys(): Iterable<Key> {
    const queue: Queue<Key> = <any>new Queue<Key>();
    for (let i = 0; i < this.m; i++) {
      {
        for (
          let index340 = this.st[i].keys().iterator();
          index340.hasNext();

        ) {
          const key = index340.next();
          queue.enqueue(key);
        }
      }
    }
    return queue;
  }

  /**
   * Unit tests the `SeparateChainingHashST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: SeparateChainingHashST<string, number> = <any>(
      new SeparateChainingHashST<string, number>()
    );
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index341 = st.keys().iterator(); index341.hasNext(); ) {
      const s = index341.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
SeparateChainingHashST.__class =
  'edu.princeton.cs.algs4.SeparateChainingHashST';

SeparateChainingHashST.main(null);
