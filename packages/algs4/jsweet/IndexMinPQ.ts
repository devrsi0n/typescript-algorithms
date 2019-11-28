import { StdOut } from './StdOut';

/**
 * Initializes an empty indexed priority queue with indices between `0`
 * and `maxN - 1`.
 * @param   maxN the keys on this priority queue are index from `0`
 * `maxN - 1`
 * @throws IllegalArgumentException if `maxN < 0`
 * @class
 * @author Robert Sedgewick
 */
export class IndexMinPQ<Key extends java.lang.Comparable<Key>>
  implements Iterable<number> {
  private maxN: number;

  private n: number;

  private pq: number[];

  private qp: number[];

  private keys: Key[];

  public constructor(maxN: number) {
    if (this.maxN === undefined) this.maxN = 0;
    if (this.n === undefined) this.n = 0;
    if (this.pq === undefined) this.pq = null;
    if (this.qp === undefined) this.qp = null;
    if (this.keys === undefined) this.keys = null;
    if (maxN < 0) throw new Error();
    this.maxN = maxN;
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
    if (i < 0 || i >= this.maxN) throw new Error();
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
   * Associates key with index `i`.
   *
   * @param   i an index
   * @param   key the key to associate with index `i`
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws IllegalArgumentException if there already is an item associated
   * with index `i`
   */
  public insert(i: number, key: Key) {
    if (i < 0 || i >= this.maxN) throw new Error();
    if (this.contains(i))
      throw new Error('index is already in the priority queue');
    this.n++;
    this.qp[i] = this.n;
    this.pq[this.n] = i;
    this.keys[i] = key;
    this.swim(this.n);
  }

  /**
   * Returns an index associated with a minimum key.
   *
   * @return  an index associated with a minimum key
   * @throws Error if this priority queue is empty
   */
  public minIndex(): number {
    if (this.n === 0) throw new Error('Priority queue underflow');
    return this.pq[1];
  }

  /**
   * Returns a minimum key.
   *
   * @return  a minimum key
   * @throws Error if this priority queue is empty
   */
  public minKey(): Key {
    if (this.n === 0) throw new Error('Priority queue underflow');
    return this.keys[this.pq[1]];
  }

  /**
   * Removes a minimum key and returns its associated index.
   * @return  an index associated with a minimum key
   * @throws Error if this priority queue is empty
   */
  public delMin(): number {
    if (this.n === 0) throw new Error('Priority queue underflow');
    const min: number = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.qp[min] = -1;
    this.keys[min] = null;
    this.pq[this.n + 1] = -1;
    return min;
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
    if (i < 0 || i >= this.maxN) throw new Error();
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
   * @throws Error no key is associated with index `i`
   */
  public changeKey(i: number, key: Key) {
    if (i < 0 || i >= this.maxN) throw new Error();
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
   * Decrease the key associated with index `i` to the specified value.
   *
   * @param   i the index of the key to decrease
   * @param   key decrease the key associated with index `i` to this key
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws IllegalArgumentException if `key >= keyOf(i)`
   * @throws Error no key is associated with index `i`
   */
  public decreaseKey(i: number, key: Key) {
    if (i < 0 || i >= this.maxN) throw new Error();
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    if (this.keys[i].compareTo(key) <= 0)
      throw new Error(
        'Calling decreaseKey() with given argument would not strictly decrease the key'
      );
    this.keys[i] = key;
    this.swim(this.qp[i]);
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
    if (i < 0 || i >= this.maxN) throw new Error();
    if (!this.contains(i))
      throw new Error('index is not in the priority queue');
    if (this.keys[i].compareTo(key) >= 0)
      throw new Error(
        'Calling increaseKey() with given argument would not strictly increase the key'
      );
    this.keys[i] = key;
    this.sink(this.qp[i]);
  }

  /**
   * Remove the key associated with index `i`.
   *
   * @param   i the index of the key to remove
   * @throws IllegalArgumentException unless `0 <= i < maxN`
   * @throws Error no key is associated with index `i`
   */
  public delete(i: number) {
    if (i < 0 || i >= this.maxN) throw new Error();
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
  greater(i: number, j: number): boolean {
    return this.keys[this.pq[i]].compareTo(this.keys[this.pq[j]]) > 0;
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
    while (k > 1 && this.greater((k / 2) | 0, k)) {
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
        if (j < this.n && this.greater(j, j + 1)) j++;
        if (!this.greater(k, j)) break;
        this.exch(k, j);
        k = j;
      }
    }
  }

  /**
   * Returns an iterator that iterates over the keys on the
   * priority queue in ascending order.
   * The iterator doesn't implement `remove()` since it's optional.
   *
   * @return  an iterator that iterates over the keys in ascending order
   */
  public iterator(): Iterator<number> {
    return new IndexMinPQ.HeapIterator(this);
  }

  /**
   * Unit tests the `IndexMinPQ` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
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
    const pq: IndexMinPQ<string> = <any>new IndexMinPQ<string>(strings.length);
    for (let i = 0; i < strings.length; i++) {
      {
        pq.insert(i, strings[i]);
      }
    }
    while (!pq.isEmpty()) {
      {
        const i: number = pq.delMin();
        StdOut.println$java_lang_Object(`${i} ${strings[i]}`);
      }
    }
    StdOut.println();
    for (let i = 0; i < strings.length; i++) {
      {
        pq.insert(i, strings[i]);
      }
    }
    for (let index291 = pq.iterator(); index291.hasNext(); ) {
      const i = index291.next();
      {
        StdOut.println$java_lang_Object(`${i} ${strings[i]}`);
      }
    }
    while (!pq.isEmpty()) {
      {
        pq.delMin();
      }
    }
  }
}
IndexMinPQ.__class = 'edu.princeton.cs.algs4.IndexMinPQ';
IndexMinPQ.__interfaces = ['Iterable'];

export namespace IndexMinPQ {
  export class HeapIterator implements Iterator<number> {
    public __parent: any;
    copy: IndexMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.copy === undefined) this.copy = null;
      this.copy = <any>new IndexMinPQ<any>(__parent.pq.length - 1);
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
      return this.copy.delMin();
    }
  }
  HeapIterator.__class = 'edu.princeton.cs.algs4.IndexMinPQ.HeapIterator';
  HeapIterator.__interfaces = ['java.util.Iterator'];
}

IndexMinPQ.main(null);
