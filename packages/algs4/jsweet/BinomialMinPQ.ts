/**
 * Initializes a priority queue with given keys using the given Comparator
 * Worst case is O(n*log(n))
 * @param  C a comparator over the keys
 * @param  a an array of keys
 * @class
 * @author Tristan Claverie
 */
export class BinomialMinPQ<Key> implements Iterable<Key> {
  private head: BinomialMinPQ.Node;

  private comp: Comparator<Key>;

  public constructor(C?: any, a?: any) {
    if (
      ((typeof C === 'function' && (<any>C).length == 2) || C === null) &&
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null)
    ) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = <any>C;
        for (let index139 = 0; index139 < a.length; index139++) {
          const k = a[index139];
          this.insert(k);
        }
      })();
    } else if (
      ((typeof C === 'function' && (<any>C).length == 2) || C === null) &&
      a === undefined
    ) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = <any>C;
      })();
    } else if (
      ((C != null &&
        C instanceof <any>Array &&
        (C.length == 0 || C[0] == null || C[0] != null)) ||
        C === null) &&
      a === undefined
    ) {
      const __args = arguments;
      const a: any = __args[0];
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = (arg0, arg1) => {
          return new BinomialMinPQ.MyComparator().compare(arg0, arg1);
        };
        for (let index140 = 0; index140 < a.length; index140++) {
          const k = a[index140];
          this.insert(k);
        }
      })();
    } else if (C === undefined && a === undefined) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      if (this.head === undefined) this.head = null;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = (arg0, arg1) => {
          return new BinomialMinPQ.MyComparator().compare(arg0, arg1);
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
    return this.head == null;
  }

  /**
   * Number of elements currently on the priority queue
   * Worst case is O(log(n))
   * @throws Error if there are more than 2^63-1 elements in the queue
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    let result = 0;
    let tmp: number;
    for (
      let node: BinomialMinPQ.Node = this.head;
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
   * Puts a Key in the heap
   * Worst case is O(log(n))
   * @param  key a Key
   */
  public insert(key: Key) {
    const x: BinomialMinPQ.Node = new BinomialMinPQ.Node(this);
    x.key = key;
    x.order = 0;
    const H: BinomialMinPQ<Key> = <any>new BinomialMinPQ<Key>();
    H.head = x;
    this.head = this.union(H).head;
  }

  /**
   * Get the minimum key currently in the queue
   * Worst case is O(log(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key currently in the priority queue
   */
  public minKey(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    let min: BinomialMinPQ.Node = this.head;
    let current: BinomialMinPQ.Node = this.head;
    while (current.sibling != null) {
      {
        min = this.greater(min.key, current.sibling.key) ? current : min;
        current = current.sibling;
      }
    }
    return min.key;
  }

  /**
   * Deletes the minimum key
   * Worst case is O(log(n))
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key
   */
  public delMin(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    const min: BinomialMinPQ.Node = this.eraseMin();
    let x: BinomialMinPQ.Node = min.child == null ? min : min.child;
    if (min.child != null) {
      min.child = null;
      let prevx: BinomialMinPQ.Node = null;
      let nextx: BinomialMinPQ.Node = x.sibling;
      while (nextx != null) {
        {
          x.sibling = prevx;
          prevx = x;
          x = nextx;
          nextx = nextx.sibling;
        }
      }
      x.sibling = prevx;
      const H: BinomialMinPQ<Key> = <any>new BinomialMinPQ<Key>();
      H.head = x;
      this.head = this.union(H).head;
    }
    return min.key;
  }

  /**
   * Merges two Binomial heaps together
   * This operation is destructive
   * Worst case is O(log(n))
   * @param {BinomialMinPQ} heap a Binomial Heap to be merged with the current heap
   * @throws Error if the heap in parameter is null
   * @return {BinomialMinPQ} the union of two heaps
   */
  public union(heap: BinomialMinPQ<Key>): BinomialMinPQ<Key> {
    if (heap == null) throw new Error('Cannot merge a Binomial Heap with null');
    this.head = this.merge(
      new BinomialMinPQ.Node(this),
      this.head,
      heap.head
    ).sibling;
    let x: BinomialMinPQ.Node = this.head;
    let prevx: BinomialMinPQ.Node = null;
    let nextx: BinomialMinPQ.Node = x.sibling;
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
   * General helper functions
   * @param  n
   * @param  m
   * @return
   * @private
   */
  greater(n: Key, m: Key): boolean {
    if (n == null) return false;
    if (m == null) return true;
    return this.comp(n, m) > 0;
  }

  link(root1: BinomialMinPQ.Node, root2: BinomialMinPQ.Node) {
    root1.sibling = root2.child;
    root2.child = root1;
    root2.order++;
  }

  eraseMin(): BinomialMinPQ.Node {
    let min: BinomialMinPQ.Node = this.head;
    let previous: BinomialMinPQ.Node = null;
    let current: BinomialMinPQ.Node = this.head;
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
    return min;
  }

  /**
   * Functions for inserting a key in the heap
   * @param {BinomialMinPQ.Node} h
   * @param {BinomialMinPQ.Node} x
   * @param {BinomialMinPQ.Node} y
   * @return {BinomialMinPQ.Node}
   * @private
   */
  merge(
    h: BinomialMinPQ.Node,
    x: BinomialMinPQ.Node,
    y: BinomialMinPQ.Node
  ): BinomialMinPQ.Node {
    if (x == null && y == null) return h;
    if (x == null) h.sibling = this.merge(y, null, y.sibling);
    else if (y == null) h.sibling = this.merge(x, x.sibling, null);
    else if (x.order < y.order) h.sibling = this.merge(x, x.sibling, y);
    else h.sibling = this.merge(y, x, y.sibling);
    return h;
  }

  /**
   * Gets an Iterator over the keys in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(log(n))
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the keys in the priority queue in ascending order
   */
  public iterator(): Iterator<Key> {
    return new BinomialMinPQ.MyIterator(this);
  }
}
BinomialMinPQ.__class = 'edu.princeton.cs.algs4.BinomialMinPQ';
BinomialMinPQ.__interfaces = ['Iterable'];

export namespace BinomialMinPQ {
  export class Node {
    public __parent: any;
    key: any;

    order: number;

    child: BinomialMinPQ.Node;

    sibling: BinomialMinPQ.Node;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.order === undefined) this.order = 0;
      if (this.child === undefined) this.child = null;
      if (this.sibling === undefined) this.sibling = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.BinomialMinPQ.Node';

  export class MyIterator implements Iterator<any> {
    public __parent: any;
    data: BinomialMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.data === undefined) this.data = null;
      this.data = <any>new BinomialMinPQ<any>(<any>__parent.comp);
      this.data.head = this.clone(__parent.head, null);
    }

    clone(
      x: BinomialMinPQ.Node,
      parent: BinomialMinPQ.Node
    ): BinomialMinPQ.Node {
      if (x == null) return null;
      const node: BinomialMinPQ.Node = new BinomialMinPQ.Node(this.__parent);
      node.key = x.key;
      node.sibling = this.clone(x.sibling, parent);
      node.child = this.clone(x.child, node);
      return node;
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
  MyIterator.__class = 'edu.princeton.cs.algs4.BinomialMinPQ.MyIterator';
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
  MyComparator.__class = 'edu.princeton.cs.algs4.BinomialMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
