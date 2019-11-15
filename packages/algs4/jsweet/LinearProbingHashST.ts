import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty symbol table with the specified initial capacity.
 *
 * @param  capacity the initial capacity
 * @class
 * @author Robert Sedgewick
 */
export class LinearProbingHashST<Key, Value> {
  static INIT_CAPACITY = 4;

  private n: number;

  private m: number;

  private __keys: Key[];

  private vals: Value[];

  public constructor(capacity?: any) {
    if (typeof capacity === 'number' || capacity === null) {
      const __args = arguments;
      if (this.n === undefined) this.n = 0;
      if (this.m === undefined) this.m = 0;
      if (this.__keys === undefined) this.__keys = null;
      if (this.vals === undefined) this.vals = null;
      if (this.n === undefined) this.n = 0;
      if (this.m === undefined) this.m = 0;
      if (this.__keys === undefined) this.__keys = null;
      if (this.vals === undefined) this.vals = null;
      (() => {
        this.m = capacity;
        this.n = 0;
        this.__keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.m);
        this.vals = <Value[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.m);
      })();
    } else if (capacity === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const capacity: any = LinearProbingHashST.INIT_CAPACITY;
        if (this.n === undefined) this.n = 0;
        if (this.m === undefined) this.m = 0;
        if (this.__keys === undefined) this.__keys = null;
        if (this.vals === undefined) this.vals = null;
        if (this.n === undefined) this.n = 0;
        if (this.m === undefined) this.m = 0;
        if (this.__keys === undefined) this.__keys = null;
        if (this.vals === undefined) this.vals = null;
        (() => {
          this.m = capacity;
          this.n = 0;
          this.__keys = <Key[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(this.m);
          this.vals = <Value[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(this.m);
        })();
      }
    } else throw new Error('invalid overload');
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

  private resize(capacity: number) {
    const temp: LinearProbingHashST<Key, Value> = <any>(
      new LinearProbingHashST<Key, Value>(capacity)
    );
    for (let i = 0; i < this.m; i++) {
      {
        if (this.__keys[i] != null) {
          temp.put(this.__keys[i], this.vals[i]);
        }
      }
    }
    this.__keys = temp.__keys;
    this.vals = temp.vals;
    this.m = temp.m;
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
    if (this.n >= ((this.m / 2) | 0)) this.resize(2 * this.m);
    let i: number;
    for (i = this.hash(key); this.__keys[i] != null; i = (i + 1) % this.m) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(this.__keys[i], key)) {
          this.vals[i] = val;
          return;
        }
      }
    }
    this.__keys[i] = key;
    this.vals[i] = val;
    this.n++;
  }

  /**
   * Returns the value associated with the specified key.
   * @param  key the key
   * @return  the value associated with `key`;
   * `null` if no such value
   * @throws IllegalArgumentException if `key` is `null`
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    for (
      let i: number = this.hash(key);
      this.__keys[i] != null;
      i = (i + 1) % this.m
    ) {
      if (/* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          }
          return o1 === o2;
        })(this.__keys[i], key)) return this.vals[i];
    }
    return null;
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
    if (!this.contains(key)) return;
    let i: number = this.hash(key);
    while (!/* equals */ (<any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(key, this.__keys[i]))) {
      {
        i = (i + 1) % this.m;
      }
    }
    this.__keys[i] = null;
    this.vals[i] = null;
    i = (i + 1) % this.m;
    while (this.__keys[i] != null) {
      {
        const keyToRehash: Key = this.__keys[i];
        const valToRehash: Value = this.vals[i];
        this.__keys[i] = null;
        this.vals[i] = null;
        this.n--;
        this.put(keyToRehash, valToRehash);
        i = (i + 1) % this.m;
      }
    }
    this.n--;
    if (this.n > 0 && this.n <= ((this.m / 8) | 0))
      this.resize((this.m / 2) | 0);
  }

  /**
   * Returns all keys in this symbol table as an `Iterable`.
   * To iterate over all of the keys in the symbol table named `st`,
   * use the foreach notation: `for (Key key : st.keys())`.
   *
   * @return  all keys in this symbol table
   */
  public keys(): Iterable<Key> {
    const queue: Queue<Key> = <any>new Queue<Key>();
    for (let i = 0; i < this.m; i++) {
      if (this.__keys[i] != null) queue.enqueue(this.__keys[i]);
    }
    return queue;
  }

  private check(): boolean {
    if (this.m < 2 * this.n) {
      console.error(`Hash table size m = ${this.m}; array size n = ${this.n}`);
      return false;
    }
    for (let i = 0; i < this.m; i++) {
      {
        if (this.__keys[i] == null) continue;
        else if (this.get(this.__keys[i]) !== this.vals[i]) {
          console.error(
            `get[${this.__keys[i]}] = ${this.get(this.__keys[i])}; vals[i] = ${
              this.vals[i]
            }`
          );
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Unit tests the `LinearProbingHashST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: LinearProbingHashST<string, number> = <any>(
      new LinearProbingHashST<string, number>()
    );
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index311 = st.keys().iterator(); index311.hasNext(); ) {
      const s = index311.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
LinearProbingHashST.__class = 'edu.princeton.cs.algs4.LinearProbingHashST';

LinearProbingHashST.main(null);
