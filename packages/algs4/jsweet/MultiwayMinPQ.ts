/**
 * Initializes a priority queue with given indexes
 * Worst case is O(a*log-d(n))
 *
 * @param   d dimension of the heap
 * @param   comparator a Comparator over the keys
 * @param   a an array of keys
 * @throws Error if `d < 2`
 * @class
 * @author Tristan Claverie
 */
export class MultiwayMinPQ<Key> implements Iterable<Key> {
  private d: number;

  private n: number;

  private order: number;

  private keys: Key[];

  private comp: Comparator<Key>;

  public constructor(comparator?: any, a?: any, d?: any) {
    if (
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null) &&
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof d === 'number' || d === null)
    ) {
      const __args = arguments;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (d < 2) throw new Error('Dimension should be 2 or over');
        this.d = d;
        this.order = 1;
        this.keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(d << 1);
        this.comp = <any>comparator;
        for (let index317 = 0; index317 < a.length; index317++) {
          const key = a[index317];
          this.insert(key);
        }
      })();
    } else if (
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null) &&
      (typeof a === 'number' || a === null) &&
      d === undefined
    ) {
      const __args = arguments;
      const d: any = __args[1];
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (d < 2) throw new Error('Dimension should be 2 or over');
        this.d = d;
        this.order = 1;
        this.keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(d << 1);
        this.comp = <any>comparator;
      })();
    } else if (
      ((comparator != null &&
        comparator instanceof <any>Array &&
        (comparator.length == 0 ||
          comparator[0] == null ||
          comparator[0] != null)) ||
        comparator === null) &&
      (typeof a === 'number' || a === null) &&
      d === undefined
    ) {
      const __args = arguments;
      const a: any = __args[0];
      const d: any = __args[1];
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (d < 2) throw new Error('Dimension should be 2 or over');
        this.d = d;
        this.order = 1;
        this.keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(d << 1);
        this.comp = (arg0, arg1) => {
          return new MultiwayMinPQ.MyComparator().compare(arg0, arg1);
        };
        for (let index318 = 0; index318 < a.length; index318++) {
          const key = a[index318];
          this.insert(key);
        }
      })();
    } else if (
      (typeof comparator === 'number' || comparator === null) &&
      a === undefined &&
      d === undefined
    ) {
      const __args = arguments;
      const d: any = __args[0];
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      if (this.d === undefined) this.d = 0;
      if (this.n === undefined) this.n = 0;
      if (this.order === undefined) this.order = 0;
      if (this.keys === undefined) this.keys = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (d < 2) throw new Error('Dimension should be 2 or over');
        this.d = d;
        this.order = 1;
        this.keys = <Key[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(d << 1);
        this.comp = (arg0, arg1) => {
          return new MultiwayMinPQ.MyComparator().compare(arg0, arg1);
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
   * Number of elements currently on the priority queue
   * Worst case is O(1)
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Puts a Key on the priority queue
   * Worst case is O(log-d(n))
   * @param  key a Key
   */
  public insert(key: Key) {
    this.keys[this.n + this.d] = key;
    this.swim(this.n++);
    if (this.n === this.keys.length - this.d) {
      this.resize(this.getN(this.order + 1) + this.d);
      this.order++;
    }
  }

  /**
   * Gets the minimum key currently in the queue
   * Worst case is O(1)
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key currently in the priority queue
   */
  public minKey(): Key {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.keys[this.d];
  }

  /**
   * Deletes the minimum key
   * Worst case is O(d*log-d(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key
   */
  public delMin(): Key {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    this.exch(0, --this.n);
    this.sink(0);
    const min: Key = this.keys[this.n + this.d];
    this.keys[this.n + this.d] = null;
    const number: number = this.getN(this.order - 2);
    if (this.order > 1 && this.n === number) {
      this.resize(
        number + ((<number>Math.pow(this.d, this.order - 1)) | 0) + this.d
      );
      this.order--;
    }
    return min;
  }

  /**
   * General helper functions
   * @param  x
   * @param  y
   * @return
   * @private
   */
  greater(x: number, y: number): boolean {
    const i: number = x + this.d;
    const j: number = y + this.d;
    if (this.keys[i] == null) return false;
    if (this.keys[j] == null) return true;
    return this.comp(this.keys[i], this.keys[j]) > 0;
  }

  exch(x: number, y: number) {
    const i: number = x + this.d;
    const j: number = y + this.d;
    const swap: Key = this.keys[i];
    this.keys[i] = this.keys[j];
    this.keys[j] = swap;
  }

  getN(order: number): number {
    return (
      ((1 - ((<number>Math.pow(this.d, order + 1)) | 0)) / (1 - this.d)) | 0
    );
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
    const child: number = this.d * i + 1;
    if (child >= this.n) return;
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
   * Resize the priority queue
   * @param  N
   * @private
   */
  resize(N: number) {
    const array: Key[] = <Key[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(N);
    for (let i = 0; i < Math.min(this.keys.length, array.length); i++) {
      {
        array[i] = this.keys[i];
        this.keys[i] = null;
      }
    }
    this.keys = array;
  }

  /**
   * Gets an Iterator over the keys in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(d*log-d(n))
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the keys in the priority queue in ascending order
   */
  public iterator(): Iterator<Key> {
    return new MultiwayMinPQ.MyIterator(this);
  }
}
MultiwayMinPQ.__class = 'edu.princeton.cs.algs4.MultiwayMinPQ';
MultiwayMinPQ.__interfaces = ['Iterable'];

export namespace MultiwayMinPQ {
  export class MyIterator implements Iterator<any> {
    public __parent: any;
    data: MultiwayMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.data === undefined) this.data = null;
      this.data = <any>new MultiwayMinPQ<any>(<any>__parent.comp, __parent.d);
      this.data.keys = <any[]>((s) => {
        const a = [];
        while (s-- > 0) a.push(null);
        return a;
      })(__parent.keys.length);
      this.data.n = __parent.n;
      for (let i = 0; i < __parent.keys.length; i++) {
        {
          this.data.keys[i] = __parent.keys[i];
        }
      }
    }

    public hasNext(): boolean {
      return !this.data.isEmpty();
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      return this.data.delMin();
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }
  }
  MyIterator.__class = 'edu.princeton.cs.algs4.MultiwayMinPQ.MyIterator';
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
  MyComparator.__class = 'edu.princeton.cs.algs4.MultiwayMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
