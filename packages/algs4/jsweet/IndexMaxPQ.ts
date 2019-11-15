import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Initializes an empty indexed priority queue with indices between `0`
 * and `maxN - 1`.
 *
 * @param   maxN the keys on this priority queue are index from `0` to `maxN - 1`
 * @throws IllegalArgumentException if `maxN < 0`
 * @class
 * @author Robert Sedgewick
 */
export class IndexMaxPQ<Key extends java.lang.Comparable<Key>>
  implements Iterable<number> {
  private n: number;

  private pq: number[];

  private qp: number[];

  private keys: Key[];

  public constructor(maxN: number) {
    if (this.n === undefined) this.n = 0;
    if (this.pq === undefined) this.pq = null;
    if (this.qp === undefined) this.qp = null;
    if (this.keys === undefined) this.keys = null;
    if (maxN < 0) throw new Error();
    this.n = 0;
    this.keys = <Key[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(maxN + 1);
    this.pq = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(maxN + 1);
    this.qp = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(maxN + 1);
    for (let i = 0; i <= maxN; i++) {
      this.qp[i] = -1;
    }
  }

  /**
   * Returns true if this priority queue is empty.
   *
   * @return  `true` if this priority queue is empty;
   * `false` otherwise
   */
  public isEmpty(): boolean {
    return this.n === 0;
  }

  /**
   * Is `i` an index on this priority queue?
   *
   * @param   i an index
   * @return  `true` if `i` is an index on this priority queue;
   * `false` otherwise
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   */
  public contains(i: number): boolean {
    return this.qp[i] !== -1;
  }

  /**
   * Returns the number of keys on this priority queue.
   *
   * @return  the number of keys on this priority queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Associate key with index i.
   *
   * @param   i an index
   * @param   key the key to associate with index `i`
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws IllegalArgumentException if there already is an item
   * associated with index `i`
   */
  public insert(i: number, key: Key) {
    if (this.contains(i))
      throw new Error('index is already in the priority queue');
    this.n++;
    this.qp[i] = this.n;
    this.pq[this.n] = i;
    this.keys[i] = key;
    this.swim(this.n);
  }

  /**
   * Returns an index associated with a maximum key.
   *
   * @return  an index associated with a maximum key
   * @throws Error if this priority queue is empty
   */
  public maxIndex(): number {
    if (this.n === 0) throw new Error('Priority queue underflow');
    return this.pq[1];
  }

  /**
   * Returns a maximum key.
   *
   * @return  a maximum key
   * @throws Error if this priority queue is empty
   */
  public maxKey(): Key {
    if (this.n === 0) throw new Error('Priority queue underflow');
    return this.keys[this.pq[1]];
  }

  /**
   * Removes a maximum key and returns its associated index.
   *
   * @return  an index associated with a maximum key
   * @throws Error if this priority queue is empty
   */
  public delMax(): number {
    if (this.n === 0) throw new Error('Priority queue underflow');
    const max: number = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.qp[max] = -1;
    this.keys[max] = null;
    this.pq[this.n + 1] = -1;
    return max;
  }

  /**
   * Returns the key associated with index `i`.
   *
   * @param   i the index of the key to return
   * @return  the key associated with index `i`
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws Error no key is associated with index `i`
   */
  public keyOf(i: number): Key {
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    else return this.keys[i];
  }

  /**
   * Change the key associated with index `i` to the specified value.
   *
   * @param   i the index of the key to change
   * @param   key change the key associated with index `i` to this key
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   */
  public changeKey(i: number, key: Key) {
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    this.keys[i] = key;
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  /**
   * Change the key associated with index `i` to the specified value.
   *
   * @param   i the index of the key to change
   * @param   key change the key associated with index `i` to this key
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @deprecated Replaced by `changeKey(int, Key)`.
   */
  public change(i: number, key: Key) {
    this.changeKey(i, key);
  }

  /**
   * Increase the key associated with index `i` to the specified value.
   *
   * @param   i the index of the key to increase
   * @param   key increase the key associated with index `i` to this key
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws IllegalArgumentException if `key <= keyOf(i)`
   * @throws Error no key is associated with index `i`
   */
  public increaseKey(i: number, key: Key) {
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    if (this.keys[i].compareTo(key) >= 0)
      throw new Error(
        'Calling increaseKey() with given argument would not strictly increase the key'
      );
    this.keys[i] = key;
    this.swim(this.qp[i]);
  }

  /**
   * Decrease the key associated with index `i` to the specified value.
   *
   * @param   i the index of the key to decrease
   * @param   key decrease the key associated with index `i` to this key
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws IllegalArgumentException if `key >= keyOf(i)`
   * @throws Error no key is associated with index `i`
   */
  public decreaseKey(i: number, key: Key) {
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    if (this.keys[i].compareTo(key) <= 0)
      throw new Error(
        'Calling decreaseKey() with given argument would not strictly decrease the key'
      );
    this.keys[i] = key;
    this.sink(this.qp[i]);
  }

  /**
   * Remove the key on the priority queue associated with index `i`.
   *
   * @param   i the index of the key to remove
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws Error no key is associated with index `i`
   */
  public delete(i: number) {
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    const index: number = this.qp[i];
    this.exch(index, this.n--);
    this.swim(index);
    this.sink(index);
    this.keys[i] = null;
    this.qp[i] = -1;
  }

  /**
   * General helper functions.
   * @param  i
   * @param  j
   * @return
   * @private
   */
  less(i: number, j: number): boolean {
    return this.keys[this.pq[i]].compareTo(this.keys[this.pq[j]]) < 0;
  }

  exch(i: number, j: number) {
    const swap: number = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }

  /**
   * Heap helper functions.
   * @param  k
   * @private
   */
  swim(k: number) {
    while (k > 1 && this.less((k / 2) | 0, k)) {
      {
        this.exch(k, (k / 2) | 0);
        k = (k / 2) | 0;
      }
    }
  }

  sink(k: number) {
    while (2 * k <= this.n) {
      {
        let j: number = 2 * k;
        if (j < this.n && this.less(j, j + 1)) j++;
        if (!this.less(k, j)) break;
        this.exch(k, j);
        k = j;
      }
    }
  }

  /**
   * Returns an iterator that iterates over the keys on the
   * priority queue in descending order.
   * The iterator doesn't implement `remove()` since it's optional.
   *
   * @return  an iterator that iterates over the keys in descending order
   */
  public iterator(): Iterator<number> {
    return new IndexMaxPQ.HeapIterator(this);
  }

  /**
   * Unit tests the `IndexMaxPQ` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const strings: string[] = [
      'it',
      'was',
      'the',
      'best',
      'of',
      'times',
      'it',
      'was',
      'the',
      'worst',
    ];
    const pq: IndexMaxPQ<string> = <any>new IndexMaxPQ<string>(strings.length);
    for (let i = 0; i < strings.length; i++) {
      {
        pq.insert(i, strings[i]);
      }
    }
    for (let index290 = pq.iterator(); index290.hasNext(); ) {
      const i = index290.next();
      {
        StdOut.println$java_lang_Object(`${i} ${strings[i]}`);
      }
    }
    StdOut.println();
    for (let i = 0; i < strings.length; i++) {
      {
        if (StdRandom.uniform() < 0.5)
          pq.increaseKey(i, strings[i] + strings[i]);
        else pq.decreaseKey(i, strings[i].substring(0, 1));
      }
    }
    while (!pq.isEmpty()) {
      {
        const key: string = pq.maxKey();
        const i: number = pq.delMax();
        StdOut.println$java_lang_Object(`${i} ${key}`);
      }
    }
    StdOut.println();
    for (let i = 0; i < strings.length; i++) {
      {
        pq.insert(i, strings[i]);
      }
    }
    const perm: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(strings.length);
    for (let i = 0; i < strings.length; i++) {
      perm[i] = i;
    }
    StdRandom.shuffle$int_A(perm);
    for (let i = 0; i < perm.length; i++) {
      {
        const key: string = pq.keyOf(perm[i]);
        pq.delete(perm[i]);
        StdOut.println$java_lang_Object(`${perm[i]} ${key}`);
      }
    }
  }
}
IndexMaxPQ.__class = 'edu.princeton.cs.algs4.IndexMaxPQ';
IndexMaxPQ.__interfaces = ['Iterable'];

export namespace IndexMaxPQ {
  export class HeapIterator implements Iterator<number> {
    public __parent: any;
    copy: IndexMaxPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.copy === undefined) this.copy = null;
      this.copy = <any>new IndexMaxPQ<any>(__parent.pq.length - 1);
      for (let i = 1; i <= __parent.n; i++) {
        this.copy.insert(__parent.pq[i], __parent.keys[__parent.pq[i]]);
      }
    }

    public hasNext(): boolean {
      return !this.copy.isEmpty();
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public next(): number {
      if (!this.hasNext()) throw new Error();
      return this.copy.delMax();
    }
  }
  HeapIterator.__class = 'edu.princeton.cs.algs4.IndexMaxPQ.HeapIterator';
  HeapIterator.__interfaces = ['java.util.Iterator'];
}

IndexMaxPQ.main(null);
