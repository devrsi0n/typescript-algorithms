import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty symbol table with the specified initial capacity.
 * @param  capacity the maximum capacity
 * @class
 */
export class BinarySearchST<Key extends java.lang.Comparable<Key>, Value> {
  static INIT_CAPACITY = 2;

  private __keys: Key[];

  private vals: Value[];

  private n = 0;

  public constructor(capacity?: any) {
    if (typeof capacity === 'number' || capacity === null) {
      const __args = arguments;
      if (this.__keys === undefined) this.__keys = null;
      if (this.vals === undefined) this.vals = null;
      this.n = 0;
      if (this.__keys === undefined) this.__keys = null;
      if (this.vals === undefined) this.vals = null;
      (() => {
        this.__keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(capacity);
        this.vals = <Value[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(capacity);
      })();
    } else if (capacity === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const capacity: any = BinarySearchST.INIT_CAPACITY;
        if (this.__keys === undefined) this.__keys = null;
        if (this.vals === undefined) this.vals = null;
        this.n = 0;
        if (this.__keys === undefined) this.__keys = null;
        if (this.vals === undefined) this.vals = null;
        (() => {
          this.__keys = <Key[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(capacity);
          this.vals = <Value[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(capacity);
        })();
      }
    } else throw new Error('invalid overload');
  }

  private resize(capacity: number) {
    const tempk: Key[] = <Key[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(capacity);
    const tempv: Value[] = <Value[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(capacity);
    for (let i = 0; i < this.n; i++) {
      {
        tempk[i] = this.__keys[i];
        tempv[i] = this.vals[i];
      }
    }
    this.vals = tempv;
    this.__keys = tempk;
  }

  public size$(): number {
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
   * Does this symbol table contain the given key?
   *
   * @param   key the key
   * @return  `true` if this symbol table contains `key` and
   * `false` otherwise
   * @throws IllegalArgumentException if `key` is `null`
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    return this.get(key) != null;
  }

  /**
   * Returns the value associated with the given key in this symbol table.
   *
   * @param   key the key
   * @return  the value associated with the given key if the key is in the symbol table
   * and `null` if the key is not in the symbol table
   * @throws IllegalArgumentException if `key` is `null`
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    if (this.isEmpty()) return null;
    const i: number = this.rank(key);
    if (i < this.n && this.__keys[i].compareTo(key) === 0) return this.vals[i];
    return null;
  }

  /**
   * Returns the number of keys in this symbol table strictly less than `key`.
   *
   * @param   key the key
   * @return  the number of keys in the symbol table strictly less than `key`
   * @throws IllegalArgumentException if `key` is `null`
   */
  public rank(key: Key): number {
    if (key == null) throw new Error('argument to rank() is null');
    let lo = 0;
    let hi: number = this.n - 1;
    while (lo <= hi) {
      {
        const mid: number = lo + (((hi - lo) / 2) | 0);
        const cmp: number = key.compareTo(this.__keys[mid]);
        if (cmp < 0) hi = mid - 1;
        else if (cmp > 0) lo = mid + 1;
        else return mid;
      }
    }
    return lo;
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
    const i: number = this.rank(key);
    if (i < this.n && this.__keys[i].compareTo(key) === 0) {
      this.vals[i] = val;
      return;
    }
    if (this.n === this.__keys.length) this.resize(2 * this.__keys.length);
    for (let j: number = this.n; j > i; j--) {
      {
        this.__keys[j] = this.__keys[j - 1];
        this.vals[j] = this.vals[j - 1];
      }
    }
    this.__keys[i] = key;
    this.vals[i] = val;
    this.n++;
  }

  /**
   * Removes the specified key and associated value from this symbol table
   * (if the key is in the symbol table).
   *
   * @param   key the key
   * @throws IllegalArgumentException if `key` is `null`
   */
  public delete(key: Key) {
    if (key == null) throw new Error('argument to delete() is null');
    if (this.isEmpty()) return;
    const i: number = this.rank(key);
    if (i === this.n || this.__keys[i].compareTo(key) !== 0) {
      return;
    }
    for (let j: number = i; j < this.n - 1; j++) {
      {
        this.__keys[j] = this.__keys[j + 1];
        this.vals[j] = this.vals[j + 1];
      }
    }
    this.n--;
    this.__keys[this.n] = null;
    this.vals[this.n] = null;
    if (this.n > 0 && this.n === ((this.__keys.length / 4) | 0))
      this.resize((this.__keys.length / 2) | 0);
  }

  /**
   * Removes the smallest key and associated value from this symbol table.
   *
   * @throws Error if the symbol table is empty
   */
  public deleteMin() {
    if (this.isEmpty()) throw new Error('Symbol table underflow error');
    this.delete(this.min());
  }

  /**
   * Removes the largest key and associated value from this symbol table.
   *
   * @throws Error if the symbol table is empty
   */
  public deleteMax() {
    if (this.isEmpty()) throw new Error('Symbol table underflow error');
    this.delete(this.max());
  }

  /**
   * Returns the smallest key in this symbol table.
   *
   * @return  the smallest key in this symbol table
   * @throws Error if this symbol table is empty
   */
  public min(): Key {
    if (this.isEmpty()) throw new Error('called min() with empty symbol table');
    return this.__keys[0];
  }

  /**
   * Returns the largest key in this symbol table.
   *
   * @return  the largest key in this symbol table
   * @throws Error if this symbol table is empty
   */
  public max(): Key {
    if (this.isEmpty()) throw new Error('called max() with empty symbol table');
    return this.__keys[this.n - 1];
  }

  /**
   * Return the kth smallest key in this symbol table.
   *
   * @param   k the order statistic
   * @return  the `k`th smallest key in this symbol table
   * @throws IllegalArgumentException unless `k` is between 0 and
   * <em>n</em>�C1
   */
  public select(k: number): Key {
    if (k < 0 || k >= this.size()) {
      throw new Error(`called select() with invalid argument: ${k}`);
    }
    return this.__keys[k];
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
    const i: number = this.rank(key);
    if (i < this.n && key.compareTo(this.__keys[i]) === 0)
      return this.__keys[i];
    if (i === 0) return null;
    return this.__keys[i - 1];
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
    const i: number = this.rank(key);
    if (i === this.n) return null;
    return this.__keys[i];
  }

  public size$java_lang_Comparable$java_lang_Comparable(
    lo: Key,
    hi: Key
  ): number {
    if (lo == null) throw new Error('first argument to size() is null');
    if (hi == null) throw new Error('second argument to size() is null');
    if (lo.compareTo(hi) > 0) return 0;
    if (this.contains(hi)) return this.rank(hi) - this.rank(lo) + 1;
    return this.rank(hi) - this.rank(lo);
  }

  /**
   * Returns the number of keys in this symbol table in the specified range.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return  the number of keys in this symbol table between `lo`
   * (inclusive) and `hi` (inclusive)
   * @throws IllegalArgumentException if either `lo` or `hi`
   * is `null`
   */
  public size(lo?: any, hi?: any): any {
    if ((lo != null || lo === null) && (hi != null || hi === null)) {
      return <any>this.size$java_lang_Comparable$java_lang_Comparable(lo, hi);
    }
    if (lo === undefined && hi === undefined) {
      return <any>this.size$();
    }
    throw new Error('invalid overload');
  }

  public keys$(): Iterable<Key> {
    return this.keys(this.min(), this.max());
  }

  public keys$java_lang_Comparable$java_lang_Comparable(
    lo: Key,
    hi: Key
  ): Iterable<Key> {
    if (lo == null) throw new Error('first argument to keys() is null');
    if (hi == null) throw new Error('second argument to keys() is null');
    const queue: Queue<Key> = <any>new Queue<Key>();
    if (lo.compareTo(hi) > 0) return queue;
    for (let i: number = this.rank(lo); i < this.rank(hi); i++) {
      queue.enqueue(this.__keys[i]);
    }
    if (this.contains(hi)) queue.enqueue(this.__keys[this.rank(hi)]);
    return queue;
  }

  /**
   * Returns all keys in this symbol table in the given range,
   * as an `Iterable`.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return  all keys in this symbol table between `lo`
   * (inclusive) and `hi` (inclusive)
   * @throws IllegalArgumentException if either `lo` or `hi`
   * is `null`
   */
  public keys(lo?: any, hi?: any): any {
    if ((lo != null || lo === null) && (hi != null || hi === null)) {
      return <any>this.keys$java_lang_Comparable$java_lang_Comparable(lo, hi);
    }
    if (lo === undefined && hi === undefined) {
      return <any>this.keys$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Check internal invariants.
   * @return
   * @private
   */
  private check(): boolean {
    return this.isSorted() && this.rankCheck();
  }

  private isSorted(): boolean {
    for (let i = 1; i < this.size(); i++) {
      if (this.__keys[i].compareTo(this.__keys[i - 1]) < 0) return false;
    }
    return true;
  }

  private rankCheck(): boolean {
    for (let i = 0; i < this.size(); i++) {
      if (i !== this.rank(this.select(i))) return false;
    }
    for (let i = 0; i < this.size(); i++) {
      if (
        this.__keys[i].compareTo(this.select(this.rank(this.__keys[i]))) !== 0
      )
        return false;
    }
    return true;
  }

  /**
   * Unit tests the `BinarySearchST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: BinarySearchST<string, number> = <any>(
      new BinarySearchST<string, number>()
    );
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index138 = st.keys().iterator(); index138.hasNext(); ) {
      const s = index138.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
BinarySearchST.__class = 'edu.princeton.cs.algs4.BinarySearchST';

BinarySearchST.main(null);
