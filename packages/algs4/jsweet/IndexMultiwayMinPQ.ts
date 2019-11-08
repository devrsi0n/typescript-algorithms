/**
 * Initializes an empty indexed priority queue with indices between {@code 0} to {@code N-1}
 * Worst case is O(n)
 * @param  N number of keys in the priority queue, index from {@code 0} to {@code N-1}
 * @param  D dimension of the heap
 * @param  C a Comparator over the keys
 * @throws Error if {@code N < 0}
 * @throws Error if {@code D < 2}
 * @class
 * @author Tristan Claverie
 */
export class IndexMultiwayMinPQ<Key> implements Iterable<number> {
  private d: number;

  private n: number;

  private nmax: number;

  private pq: number[];

  private qp: number[];

  private keys: Key[];

  private comp: Comparator<Key>;

  public constructor(N?: any, C?: any, D?: any) {
    if (
      (typeof N === 'number' || N === null) &&
      ((typeof C === 'function' && (<any>C).length == 2) || C === null) &&
      (typeof D === 'number' || D === null)
    ) {
      const __args = arguments;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.nmax === undefined) this.nmax = 0;
      if (this.pq === undefined) this.pq = null;
      if (this.qp === undefined) this.qp = null;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.nmax === undefined) this.nmax = 0;
      if (this.pq === undefined) this.pq = null;
      if (this.qp === undefined) this.qp = null;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (N < 0)
          throw new Error('Maximum number of elements cannot be negative');
        if (D < 2) throw new Error('Dimension should be 2 or over');
        this.d = D;
        this.nmax = N;
        this.pq = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.nmax + D);
        this.qp = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.nmax + D);
        this.keys = <Key[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.nmax + D);
        for (let i = 0; i < this.nmax + D; this.qp[i++] = -1) {}
        this.comp = <any>C;
      })();
    } else if (
      (typeof N === 'number' || N === null) &&
      (typeof C === 'number' || C === null) &&
      D === undefined
    ) {
      const __args = arguments;
      const D: any = __args[1];
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.nmax === undefined) this.nmax = 0;
      if (this.pq === undefined) this.pq = null;
      if (this.qp === undefined) this.qp = null;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.nmax === undefined) this.nmax = 0;
      if (this.pq === undefined) this.pq = null;
      if (this.qp === undefined) this.qp = null;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (N < 0)
          throw new Error('Maximum number of elements cannot be negative');
        if (D < 2) throw new Error('Dimension should be 2 or over');
        this.d = D;
        this.nmax = N;
        this.pq = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.nmax + D);
        this.qp = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(this.nmax + D);
        this.keys = <Key[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.nmax + D);
        for (let i = 0; i < this.nmax + D; this.qp[i++] = -1) {}
        this.comp = (arg0, arg1) => {
          return new IndexMultiwayMinPQ.MyComparator().compare(arg0, arg1);
        };
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Whether the priority queue is empty
   * Worst case is O(1)
   * @return  true if the priority queue is empty, false if not
   */
  public isEmpty(): boolean {
    return this.n === 0;
  }

  /**
   * Does the priority queue contains the index i ?
   * Worst case is O(1)
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @return  true if i is on the priority queue, false if not
   */
  public contains(i: number): boolean {
    if (i < 0 || i >= this.nmax) throw new Error();
    return this.qp[i + this.d] !== -1;
  }

  /**
   * Number of elements currently on the priority queue
   * Worst case is O(1)
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Associates a key with an index
   * Worst case is O(log-d(n))
   * @param  i an index
   * @param  key a Key associated with i
   * @throws Error if the specified index is invalid
   * @throws Error if the index is already in the queue
   */
  public insert(i: number, key: Key) {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (this.contains(i)) throw new Error('Index already there');
    this.keys[i + this.d] = key;
    this.pq[this.n + this.d] = i;
    this.qp[i + this.d] = this.n;
    this.swim(this.n++);
  }

  /**
   * Gets the index associated with the minimum key
   * Worst case is O(1)
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public minIndex(): number {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    return this.pq[this.d];
  }

  /**
   * Gets the minimum key currently in the queue
   * Worst case is O(1)
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key currently in the priority queue
   */
  public minKey(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    return this.keys[this.pq[this.d] + this.d];
  }

  /**
   * Deletes the minimum key
   * Worst case is O(d*log-d(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public delMin(): number {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    const min: number = this.pq[this.d];
    this.exch(0, --this.n);
    this.sink(0);
    this.qp[min + this.d] = -1;
    this.keys[this.pq[this.n + this.d] + this.d] = null;
    this.pq[this.n + this.d] = -1;
    return min;
  }

  /**
   * Gets the key associated with index i
   * Worst case is O(1)
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @throws Error if the index is not in the queue
   * @return  the key associated with index i
   */
  public keyOf(i: number): Key {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    return this.keys[i + this.d];
  }

  /**
   * Changes the key associated with index i to the given key
   * If the given key is greater, Worst case is O(d*log-d(n))
   * If the given key is lower,   Worst case is O(log-d(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws Error if the index has no key associated with
   */
  public changeKey(i: number, key: Key) {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    const tmp: Key = this.keys[i + this.d];
    this.keys[i + this.d] = key;
    if (this.comp(key, tmp) <= 0) {
      this.swim(this.qp[i + this.d]);
    } else {
      this.sink(this.qp[i + this.d]);
    }
  }

  /**
   * Decreases the key associated with index i to the given key
   * Worst case is O(log-d(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index has no key associated with
   * @throws Error if the given key is greater than the current key
   */
  public decreaseKey(i: number, key: Key) {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.comp(this.keys[i + this.d], key) <= 0)
      throw new Error('Calling with this argument would not decrease the Key');
    this.keys[i + this.d] = key;
    this.swim(this.qp[i + this.d]);
  }

  /**
   * Increases the key associated with index i to the given key
   * Worst case is O(d*log-d(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index has no key associated with
   * @throws Error if the given key is lower than the current key
   */
  public increaseKey(i: number, key: Key) {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.comp(this.keys[i + this.d], key) >= 0)
      throw new Error('Calling with this argument would not increase the Key');
    this.keys[i + this.d] = key;
    this.sink(this.qp[i + this.d]);
  }

  /**
   * Deletes the key associated to the given index
   * Worst case is O(d*log-d(n))
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the given index has no key associated with
   */
  public delete(i: number) {
    if (i < 0 || i >= this.nmax) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    const idx: number = this.qp[i + this.d];
    this.exch(idx, --this.n);
    this.swim(idx);
    this.sink(idx);
    this.keys[i + this.d] = null;
    this.qp[i + this.d] = -1;
  }

  /**
   * General helper functions
   * @param  i
   * @param  j
   * @return
   * @private
   */
  greater(i: number, j: number): boolean {
    return (
      this.comp(
        this.keys[this.pq[i + this.d] + this.d],
        this.keys[this.pq[j + this.d] + this.d]
      ) > 0
    );
  }

  exch(x: number, y: number) {
    const i: number = x + this.d;
    const j: number = y + this.d;
    const swap: number = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i] + this.d] = x;
    this.qp[this.pq[j] + this.d] = y;
  }

  /**
   * Functions for moving upward or downward
   * @param  i
   * @private
   */
  swim(i: number) {
    if (i > 0 && this.greater(((i - 1) / this.d) | 0, i)) {
      this.exch(i, ((i - 1) / this.d) | 0);
      this.swim(((i - 1) / this.d) | 0);
    }
  }

  sink(i: number) {
    if (this.d * i + 1 >= this.n) return;
    let min: number = this.minChild(i);
    while (min < this.n && this.greater(i, min)) {
      {
        this.exch(i, min);
        i = min;
        min = this.minChild(i);
      }
    }
  }

  /**
   * Deletes the minimum child
   * @param  i
   * @return
   * @private
   */
  minChild(i: number): number {
    const loBound: number = this.d * i + 1;
    const hiBound: number = this.d * i + this.d;
    let min: number = loBound;
    for (let cur: number = loBound; cur <= hiBound; cur++) {
      {
        if (cur < this.n && this.greater(min, cur)) min = cur;
      }
    }
    return min;
  }

  /**
   * Gets an Iterator over the indexes in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(d*log-d(n))
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the indexes in the priority queue in ascending order
   */
  public iterator(): Iterator<number> {
    return new IndexMultiwayMinPQ.MyIterator(this);
  }
}
IndexMultiwayMinPQ.__class = 'edu.princeton.cs.algs4.IndexMultiwayMinPQ';
IndexMultiwayMinPQ.__interfaces = ['Iterable'];

export namespace IndexMultiwayMinPQ {
  export class MyIterator implements Iterator<number> {
    public __parent: any;
    __clone: IndexMultiwayMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.__clone === undefined) this.__clone = null;
      this.__clone = <any>(
        new IndexMultiwayMinPQ<any>(
          __parent.nmax,
          <any>__parent.comp,
          __parent.d
        )
      );
      for (let i = 0; i < __parent.n; i++) {
        {
          this.__clone.insert(
            __parent.pq[i + __parent.d],
            __parent.keys[__parent.pq[i + __parent.d] + __parent.d]
          );
        }
      }
    }

    public hasNext(): boolean {
      return !this.__clone.isEmpty();
    }

    public next(): number {
      if (!this.hasNext()) throw new Error();
      return this.__clone.delMin();
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }
  }
  MyIterator.__class = 'edu.princeton.cs.algs4.IndexMultiwayMinPQ.MyIterator';
  MyIterator.__interfaces = ['java.util.Iterator'];

  /**
   * Comparator
   * @class
   */
  export class MyComparator {
    public __parent: any;
    /**
     *
     * @param  key1
     * @param  key2
     * @return
     */
    public compare(key1: any, key2: any): number {
      return (<any>key1).compareTo(key2);
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  MyComparator.__class =
    'edu.princeton.cs.algs4.IndexMultiwayMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
