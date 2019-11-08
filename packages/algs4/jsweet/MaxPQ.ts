import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty priority queue with the given initial capacity,
 * using the given comparator.
 *
 * @param  {number} initCapacity the initial capacity of this priority queue
 * @param  {*} comparator the order in which to compare the keys
 * @class
 * @author Robert Sedgewick
 */
export class MaxPQ<Key> implements Iterable<Key> {
  private pq: Key[];

  private n: number;

  private comparator: Comparator<Key>;

  public constructor(initCapacity?: any, comparator?: any) {
    if (
      (typeof initCapacity === 'number' || initCapacity === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      const __args = arguments;
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        this.comparator = <any>comparator;
        this.pq = <Key[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(initCapacity + 1);
        this.n = 0;
      })();
    } else if (
      ((typeof initCapacity === 'function' &&
        (<any>initCapacity).length == 2) ||
        initCapacity === null) &&
      comparator === undefined
    ) {
      const __args = arguments;
      const comparator: any = __args[0];
      {
        const __args = arguments;
        const initCapacity: any = 1;
        if (this.pq === undefined) this.pq = null;
        if (this.n === undefined) this.n = 0;
        if (this.comparator === undefined) this.comparator = null;
        if (this.pq === undefined) this.pq = null;
        if (this.n === undefined) this.n = 0;
        if (this.comparator === undefined) this.comparator = null;
        (() => {
          this.comparator = <any>comparator;
          this.pq = <Key[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(initCapacity + 1);
          this.n = 0;
        })();
      }
    } else if (
      ((initCapacity != null &&
        initCapacity instanceof <any>Array &&
        (initCapacity.length == 0 ||
          initCapacity[0] == null ||
          initCapacity[0] != null)) ||
        initCapacity === null) &&
      comparator === undefined
    ) {
      const __args = arguments;
      const keys: any = __args[0];
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        this.n = keys.length;
        this.pq = <Key[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(keys.length + 1);
        for (let i = 0; i < this.n; i++) {
          this.pq[i + 1] = keys[i];
        }
        for (let k: number = (this.n / 2) | 0; k >= 1; k--) {
          this.sink(k);
        }
      })();
    } else if (
      (typeof initCapacity === 'number' || initCapacity === null) &&
      comparator === undefined
    ) {
      const __args = arguments;
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.pq === undefined) this.pq = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        this.pq = <Key[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(initCapacity + 1);
        this.n = 0;
      })();
    } else if (initCapacity === undefined && comparator === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const initCapacity: any = 1;
        if (this.pq === undefined) this.pq = null;
        if (this.n === undefined) this.n = 0;
        if (this.comparator === undefined) this.comparator = null;
        if (this.pq === undefined) this.pq = null;
        if (this.n === undefined) this.n = 0;
        if (this.comparator === undefined) this.comparator = null;
        (() => {
          this.pq = <Key[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(initCapacity + 1);
          this.n = 0;
        })();
      }
    } else throw new Error('invalid overload');
  }

  /**
   * Returns true if this priority queue is empty.
   *
   * @return  {@code true} if this priority queue is empty;
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.n === 0;
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
   * Returns a largest key on this priority queue.
   *
   * @return  a largest key on this priority queue
   * @throws Error if this priority queue is empty
   */
  public max(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue underflow');
    return this.pq[1];
  }

  resize(capacity: number) {
    const temp: Key[] = <Key[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(capacity);
    for (let i = 1; i <= this.n; i++) {
      {
        temp[i] = this.pq[i];
      }
    }
    this.pq = temp;
  }

  /**
   * Adds a new key to this priority queue.
   *
   * @param  {*} x the new key to add to this priority queue
   */
  public insert(x: Key) {
    if (this.n === this.pq.length - 1) this.resize(2 * this.pq.length);
    this.pq[++this.n] = x;
    this.swim(this.n);
  }

  /**
   * Removes and returns a largest key on this priority queue.
   *
   * @return  a largest key on this priority queue
   * @throws Error if this priority queue is empty
   */
  public delMax(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue underflow');
    const max: Key = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.pq[this.n + 1] = null;
    if (this.n > 0 && this.n === (((this.pq.length - 1) / 4) | 0))
      this.resize((this.pq.length / 2) | 0);
    return max;
  }

  /**
   * Helper functions to restore the heap invariant.
   * @param {number} k
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
   * Helper functions for compares and swaps.
   * @param {number} i
   * @param {number} j
   * @return
   * @private
   */
  less(i: number, j: number): boolean {
    if (this.comparator == null) {
      return (<any>this.pq[i]).compareTo(this.pq[j]) < 0;
    }
    return this.comparator(this.pq[i], this.pq[j]) < 0;
  }

  exch(i: number, j: number) {
    const swap: Key = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
  }

  isMaxHeap(): boolean {
    for (let i = 1; i <= this.n; i++) {
      {
        if (this.pq[i] == null) return false;
      }
    }
    for (let i: number = this.n + 1; i < this.pq.length; i++) {
      {
        if (this.pq[i] != null) return false;
      }
    }
    if (this.pq[0] != null) return false;
    return this.isMaxHeapOrdered(1);
  }

  isMaxHeapOrdered(k: number): boolean {
    if (k > this.n) return true;
    const left: number = 2 * k;
    const right: number = 2 * k + 1;
    if (left <= this.n && this.less(k, left)) return false;
    if (right <= this.n && this.less(k, right)) return false;
    return this.isMaxHeapOrdered(left) && this.isMaxHeapOrdered(right);
  }

  /**
   * Returns an iterator that iterates over the keys on this priority queue
   * in descending order.
   * The iterator doesn't implement {@code remove()} since it's optional.
   *
   * @return  an iterator that iterates over the keys in descending order
   */
  public iterator(): Iterator<Key> {
    return new MaxPQ.HeapIterator(this);
  }

  /**
   * Unit tests the {@code MaxPQ} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const pq: MaxPQ<string> = <any>new MaxPQ<string>();
    while (!StdIn.isEmpty()) {
      {
        const item: string = StdIn.readString();
        if (!/* equals */ (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(item, '-'))) pq.insert(item);
        else if (!pq.isEmpty())
          StdOut.print$java_lang_Object(`${pq.delMax()} `);
      }
    }
    StdOut.println$java_lang_Object(`(${pq.size()} left on pq)`);
  }
}
MaxPQ.__class = 'edu.princeton.cs.algs4.MaxPQ';
MaxPQ.__interfaces = ['Iterable'];

export namespace MaxPQ {
  export class HeapIterator implements Iterator<any> {
    public __parent: any;
    copy: MaxPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.copy === undefined) this.copy = null;
      if (__parent.comparator == null)
        this.copy = <any>new MaxPQ<any>(__parent.size());
      else
        this.copy = <any>(
          new MaxPQ<any>(__parent.size(), <any>__parent.comparator)
        );
      for (let i = 1; i <= __parent.n; i++) {
        this.copy.insert(__parent.pq[i]);
      }
    }

    public hasNext(): boolean {
      return !this.copy.isEmpty();
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      return this.copy.delMax();
    }
  }
  HeapIterator.__class = 'edu.princeton.cs.algs4.MaxPQ.HeapIterator';
  HeapIterator.__interfaces = ['java.util.Iterator'];
}

MaxPQ.main(null);
