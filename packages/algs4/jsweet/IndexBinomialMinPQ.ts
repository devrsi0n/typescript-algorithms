/**
 * Initializes an empty indexed priority queue with indices between `0` to `N-1`
 * Worst case is O(n)
 * @param  N number of keys in the priority queue, index from `0` to `N-1`
 * @param  comparator a Comparator over the keys
 * @throws Error if `N < 0`
 * @class
 * @author Tristan Claverie
 */
export class IndexBinomialMinPQ<Key> implements Iterable<number> {
  private head: IndexBinomialMinPQ.Node<Key>;

  private nodes: IndexBinomialMinPQ.Node<Key>[];

  private n: number;

  private comparator: Comparator<Key>;

  public constructor(N?: any, comparator?: any) {
    if (
      (typeof N === 'number' || N === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        if (N < 0)
          throw new Error('Cannot create a priority queue of negative size');
        this.comparator = <any>comparator;
        this.nodes = <IndexBinomialMinPQ.Node<Key>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(N);
        this.n = N;
      })();
    } else if (
      (typeof N === 'number' || N === null) &&
      comparator === undefined
    ) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        if (N < 0)
          throw new Error('Cannot create a priority queue of negative size');
        this.comparator = (arg0, arg1) => {
          return new IndexBinomialMinPQ.MyComparator().compare(arg0, arg1);
        };
        this.nodes = <IndexBinomialMinPQ.Node<Key>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(N);
        this.n = N;
      })();
    } else if (N === undefined && comparator === undefined) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      if (this.head === undefined) this.head = null;
      if (this.nodes === undefined) this.nodes = null;
      if (this.n === undefined) this.n = 0;
      if (this.comparator === undefined) this.comparator = null;
      (() => {
        this.comparator = <any>null;
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Whether the priority queue is empty
   * Worst case is O(1)
   * @return  true if the priority queue is empty, false if not
   */
  public isEmpty(): boolean {
    return this.head == null;
  }

  /**
   * Does the priority queue contains the index i ?
   * Worst case is O(1)
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @return  true if i is on the priority queue, false if not
   */
  public contains(i: number): boolean {
    if (i < 0 || i >= this.n) throw new Error();
    else return this.nodes[i] != null;
  }

  /**
   * Number of elements currently on the priority queue
   * Worst case is O(log(n))
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    let result = 0;
    let tmp: number;
    for (
      let node: IndexBinomialMinPQ.Node<Key> = this.head;
      node != null;
      node = node.sibling
    ) {
      {
        if (node.order > 30) {
          throw new Error(
            'The number of elements cannot be evaluated, but the priority queue is still valid.'
          );
        }
        tmp = 1 << node.order;
        result |= tmp;
      }
    }
    return result;
  }

  /**
   * Associates a key with an index
   * Worst case is O(log(n))
   * @param  i an index
   * @param  key a Key associated with i
   * @throws Error if the specified index is invalid
   * @throws Error if the index is already in the queue
   */
  public insert(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (this.contains(i))
      throw new Error('Specified index is already in the queue');
    const x: IndexBinomialMinPQ.Node<Key> = <any>(
      new IndexBinomialMinPQ.Node<Key>(this)
    );
    x.key = key;
    x.index = i;
    x.order = 0;
    this.nodes[i] = x;
    const H: IndexBinomialMinPQ<Key> = <any>new IndexBinomialMinPQ<Key>();
    H.head = x;
    this.head = this.union(H).head;
  }

  /**
   * Gets the index associated with the minimum key
   * Worst case is O(log(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public minIndex(): number {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    let min: IndexBinomialMinPQ.Node<Key> = this.head;
    let current: IndexBinomialMinPQ.Node<Key> = this.head;
    while (current.sibling != null) {
      {
        min = this.greater(min.key, current.sibling.key)
          ? current.sibling
          : min;
        current = current.sibling;
      }
    }
    return min.index;
  }

  /**
   * Gets the minimum key currently in the queue
   * Worst case is O(log(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key currently in the priority queue
   */
  public minKey(): Key {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    let min: IndexBinomialMinPQ.Node<Key> = this.head;
    let current: IndexBinomialMinPQ.Node<Key> = this.head;
    while (current.sibling != null) {
      {
        min = this.greater(min.key, current.sibling.key)
          ? current.sibling
          : min;
        current = current.sibling;
      }
    }
    return min.key;
  }

  /**
   * Deletes the minimum key
   * Worst case is O(log(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public delMin(): number {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    const min: IndexBinomialMinPQ.Node<Key> = this.eraseMin();
    let x: IndexBinomialMinPQ.Node<Key> = min.child == null ? min : min.child;
    if (min.child != null) {
      min.child = null;
      let prevx: IndexBinomialMinPQ.Node<Key> = null;
      let nextx: IndexBinomialMinPQ.Node<Key> = x.sibling;
      while (nextx != null) {
        {
          x.parent = null;
          x.sibling = prevx;
          prevx = x;
          x = nextx;
          nextx = nextx.sibling;
        }
      }
      x.parent = null;
      x.sibling = prevx;
      const H: IndexBinomialMinPQ<Key> = <any>new IndexBinomialMinPQ<Key>();
      H.head = x;
      this.head = this.union(H).head;
    }
    return min.index;
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
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    return this.nodes[i].key;
  }

  /**
   * Changes the key associated with index i to the given key
   * Worst case is O(log(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws Error if the index has no key associated with
   */
  public changeKey(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.greater(this.nodes[i].key, key)) this.decreaseKey(i, key);
    else this.increaseKey(i, key);
  }

  /**
   * Decreases the key associated with index i to the given key
   * Worst case is O(log(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index has no key associated with
   * @throws Error if the given key is greater than the current key
   */
  public decreaseKey(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.greater(key, this.nodes[i].key))
      throw new Error('Calling with this argument would not decrease the key');
    const x: IndexBinomialMinPQ.Node<Key> = this.nodes[i];
    x.key = key;
    this.swim(i);
  }

  /**
   * Increases the key associated with index i to the given key
   * Worst case is O(log(n))
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index has no key associated with
   * @throws Error if the given key is lower than the current key
   */
  public increaseKey(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.greater(this.nodes[i].key, key))
      throw new Error('Calling with this argument would not increase the key');
    this.delete(i);
    this.insert(i, key);
  }

  /**
   * Deletes the key associated the given index
   * Worst case is O(log(n))
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the given index has no key associated with
   */
  public delete(i: number) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    this.toTheRoot(i);
    let x: IndexBinomialMinPQ.Node<Key> = this.erase(i);
    if (x.child != null) {
      const y: IndexBinomialMinPQ.Node<Key> = x;
      x = x.child;
      y.child = null;
      let prevx: IndexBinomialMinPQ.Node<Key> = null;
      let nextx: IndexBinomialMinPQ.Node<Key> = x.sibling;
      while (nextx != null) {
        {
          x.parent = null;
          x.sibling = prevx;
          prevx = x;
          x = nextx;
          nextx = nextx.sibling;
        }
      }
      x.parent = null;
      x.sibling = prevx;
      const H: IndexBinomialMinPQ<Key> = <any>new IndexBinomialMinPQ<Key>();
      H.head = x;
      this.head = this.union(H).head;
    }
  }

  /**
   * General helper functions
   * @param  n
   * @param  m
   * @return
   * @private
   */
  greater(n: Key, m: Key): boolean {
    if (n == null) return false;
    if (m == null) return true;
    return this.comparator(n, m) > 0;
  }

  exchange(x: IndexBinomialMinPQ.Node<Key>, y: IndexBinomialMinPQ.Node<Key>) {
    const tempKey: Key = x.key;
    x.key = y.key;
    y.key = tempKey;
    const tempInt: number = x.index;
    x.index = y.index;
    y.index = tempInt;
    this.nodes[x.index] = x;
    this.nodes[y.index] = y;
  }

  link(
    root1: IndexBinomialMinPQ.Node<Key>,
    root2: IndexBinomialMinPQ.Node<Key>
  ) {
    root1.sibling = root2.child;
    root1.parent = root2;
    root2.child = root1;
    root2.order++;
  }

  /**
   * Functions for moving upward
   * @param  i
   * @private
   */
  swim(i: number) {
    const x: IndexBinomialMinPQ.Node<Key> = this.nodes[i];
    const { parent } = x;
    if (parent != null && this.greater(parent.key, x.key)) {
      this.exchange(x, parent);
      this.swim(i);
    }
  }

  toTheRoot(i: number) {
    const x: IndexBinomialMinPQ.Node<Key> = this.nodes[i];
    const { parent } = x;
    if (parent != null) {
      this.exchange(x, parent);
      this.toTheRoot(i);
    }
  }

  /**
   * Functions for deleting a key
   * @param  i
   * @return {IndexBinomialMinPQ.Node}
   * @private
   */
  erase(i: number): IndexBinomialMinPQ.Node<Key> {
    const reference: IndexBinomialMinPQ.Node<Key> = this.nodes[i];
    let x: IndexBinomialMinPQ.Node<Key> = this.head;
    let previous: IndexBinomialMinPQ.Node<Key> = null;
    while (x !== reference) {
      {
        previous = x;
        x = x.sibling;
      }
    }
    previous.sibling = x.sibling;
    if (x === this.head) this.head = this.head.sibling;
    this.nodes[i] = null;
    return x;
  }

  eraseMin(): IndexBinomialMinPQ.Node<Key> {
    let min: IndexBinomialMinPQ.Node<Key> = this.head;
    let previous: IndexBinomialMinPQ.Node<Key> = null;
    let current: IndexBinomialMinPQ.Node<Key> = this.head;
    while (current.sibling != null) {
      {
        if (this.greater(min.key, current.sibling.key)) {
          previous = current;
          min = current.sibling;
        }
        current = current.sibling;
      }
    }
    previous.sibling = min.sibling;
    if (min === this.head) this.head = min.sibling;
    this.nodes[min.index] = null;
    return min;
  }

  /**
   * Functions for inserting a key in the heap
   * @param {IndexBinomialMinPQ.Node} h
   * @param {IndexBinomialMinPQ.Node} x
   * @param {IndexBinomialMinPQ.Node} y
   * @return {IndexBinomialMinPQ.Node}
   * @private
   */
  merge(
    h: IndexBinomialMinPQ.Node<Key>,
    x: IndexBinomialMinPQ.Node<Key>,
    y: IndexBinomialMinPQ.Node<Key>
  ): IndexBinomialMinPQ.Node<Key> {
    if (x == null && y == null) return h;
    if (x == null) h.sibling = this.merge(y, null, y.sibling);
    else if (y == null) h.sibling = this.merge(x, x.sibling, null);
    else if (x.order < y.order) h.sibling = this.merge(x, x.sibling, y);
    else h.sibling = this.merge(y, x, y.sibling);
    return h;
  }

  union(heap: IndexBinomialMinPQ<Key>): IndexBinomialMinPQ<Key> {
    this.head = this.merge(
      <any>new IndexBinomialMinPQ.Node<Key>(this),
      this.head,
      heap.head
    ).sibling;
    let x: IndexBinomialMinPQ.Node<Key> = this.head;
    let prevx: IndexBinomialMinPQ.Node<Key> = null;
    let nextx: IndexBinomialMinPQ.Node<Key> = x.sibling;
    while (nextx != null) {
      {
        if (
          x.order < nextx.order ||
          (nextx.sibling != null && nextx.sibling.order === x.order)
        ) {
          prevx = x;
          x = nextx;
        } else if (this.greater(nextx.key, x.key)) {
          x.sibling = nextx.sibling;
          this.link(nextx, x);
        } else {
          if (prevx == null) {
            this.head = nextx;
          } else {
            prevx.sibling = nextx;
          }
          this.link(x, nextx);
          x = nextx;
        }
        nextx = x.sibling;
      }
    }
    return this;
  }

  /**
   * Gets an Iterator over the indexes in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(log(n))
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the indexes in the priority queue in ascending order
   */
  public iterator(): Iterator<number> {
    return new IndexBinomialMinPQ.MyIterator(this);
  }
}
IndexBinomialMinPQ.__class = 'edu.princeton.cs.algs4.IndexBinomialMinPQ';
IndexBinomialMinPQ.__interfaces = ['Iterable'];

export namespace IndexBinomialMinPQ {
  export class Node<Key> {
    public __parent: any;
    key: Key;

    order: number;

    index: number;

    parent: IndexBinomialMinPQ.Node<Key>;

    child: IndexBinomialMinPQ.Node<Key>;

    sibling: IndexBinomialMinPQ.Node<Key>;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.order === undefined) this.order = 0;
      if (this.index === undefined) this.index = 0;
      if (this.parent === undefined) this.parent = null;
      if (this.child === undefined) this.child = null;
      if (this.sibling === undefined) this.sibling = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.IndexBinomialMinPQ.Node';

  export class MyIterator implements Iterator<number> {
    public __parent: any;
    data: IndexBinomialMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.data === undefined) this.data = null;
      this.data = <any>(
        new IndexBinomialMinPQ<any>(__parent.n, <any>__parent.comparator)
      );
      this.data.head = this.clone(__parent.head, null);
    }

    clone(
      x: IndexBinomialMinPQ.Node<any>,
      parent: IndexBinomialMinPQ.Node<any>
    ): IndexBinomialMinPQ.Node<any> {
      if (x == null) return null;
      const node: IndexBinomialMinPQ.Node<any> = <any>(
        new IndexBinomialMinPQ.Node<any>(this.__parent)
      );
      node.index = x.index;
      node.key = x.key;
      this.data.nodes[node.index] = node;
      node.parent = parent;
      node.sibling = this.clone(x.sibling, parent);
      node.child = this.clone(x.child, node);
      return node;
    }

    public hasNext(): boolean {
      return !this.data.isEmpty();
    }

    public next(): number {
      if (!this.hasNext()) throw new Error();
      return this.data.delMin();
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }
  }
  MyIterator.__class = 'edu.princeton.cs.algs4.IndexBinomialMinPQ.MyIterator';
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
    'edu.princeton.cs.algs4.IndexBinomialMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
