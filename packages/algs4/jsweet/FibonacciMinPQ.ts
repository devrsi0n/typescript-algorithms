/**
 * Initializes a priority queue with given keys
 * Worst case is O(n)
 * @param  C a comparator over the keys
 * @param  a an array of keys
 * @class
 */
export class FibonacciMinPQ<Key> implements Iterable<Key> {
  private head: FibonacciMinPQ.Node;

  private min: FibonacciMinPQ.Node;

  private __size: number;

  private comp: Comparator<Key>;

  private table: HashMap<number, FibonacciMinPQ.Node> = <any>(
    new HashMap<number, FibonacciMinPQ.Node>()
  );

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
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, FibonacciMinPQ.Node>();
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = <any>C;
        for (let index254 = 0; index254 < a.length; index254++) {
          const k = a[index254];
          this.insert(k);
        }
      })();
    } else if (
      ((typeof C === 'function' && (<any>C).length == 2) || C === null) &&
      a === undefined
    ) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, FibonacciMinPQ.Node>();
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
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
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, FibonacciMinPQ.Node>();
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = (arg0, arg1) => {
          return new FibonacciMinPQ.MyComparator().compare(arg0, arg1);
        };
        for (let index255 = 0; index255 < a.length; index255++) {
          const k = a[index255];
          this.insert(k);
        }
      })();
    } else if (C === undefined && a === undefined) {
      const __args = arguments;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, FibonacciMinPQ.Node>();
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.comp === undefined) this.comp = null;
      (() => {
        this.comp = (arg0, arg1) => {
          return new FibonacciMinPQ.MyComparator().compare(arg0, arg1);
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
    return this.__size === 0;
  }

  /**
   * Number of elements currently on the priority queue
   * Worst case is O(1)
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    return this.__size;
  }

  public insert$java_lang_Object(key: Key) {
    const x: FibonacciMinPQ.Node = new FibonacciMinPQ.Node(this);
    x.key = key;
    this.__size++;
    this.head = this.insert$edu_princeton_cs_algs4_FibonacciMinPQ_Node$edu_princeton_cs_algs4_FibonacciMinPQ_Node(
      x,
      this.head
    );
    if (this.min == null) this.min = this.head;
    else this.min = this.greater(this.min.key, key) ? this.head : this.min;
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
    return this.min.key;
  }

  /**
   * Deletes the minimum key
   * Worst case is O(log(n)) (amortized)
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key
   */
  public delMin(): Key {
    if (this.isEmpty())
      throw new Error('Priority queue is empty');
    this.head = this.cut(this.min, this.head);
    const x: FibonacciMinPQ.Node = this.min.child;
    const { key } = this.min;
    this.min.key = null;
    if (x != null) {
      this.head = this.meld(this.head, x);
      this.min.child = null;
    }
    this.__size--;
    if (!this.isEmpty()) this.consolidate();
    else this.min = null;
    return key;
  }

  /**
   * Merges two heaps together
   * This operation is destructive
   * Worst case is O(1)
   * @param {FibonacciMinPQ} that a Fibonacci heap
   * @return {FibonacciMinPQ} the union of the two heaps
   */
  public union(that: FibonacciMinPQ<Key>): FibonacciMinPQ<Key> {
    this.head = this.meld(this.head, that.head);
    this.min = this.greater(this.min.key, that.min.key) ? that.min : this.min;
    this.__size = this.__size + that.__size;
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

  link(root1: FibonacciMinPQ.Node, root2: FibonacciMinPQ.Node) {
    root2.child = this.insert$edu_princeton_cs_algs4_FibonacciMinPQ_Node$edu_princeton_cs_algs4_FibonacciMinPQ_Node(
      root1,
      root2.child
    );
    root2.order++;
  }

  /**
   * Function for consolidating all trees in the root list
   * @private
   */
  consolidate() {
    this.table.clear();
    let x: FibonacciMinPQ.Node = this.head;
    let maxOrder = 0;
    this.min = this.head;
    let y: FibonacciMinPQ.Node = null;
    let z: FibonacciMinPQ.Node = null;
    do {
      {
        y = x;
        x = x.next;
        z = this.table.get(y.order);
        while (z != null) {
          {
            this.table.remove(y.order);
            if (this.greater(y.key, z.key)) {
              this.link(y, z);
              y = z;
            } else {
              this.link(z, y);
            }
            z = this.table.get(y.order);
          }
        }
        this.table.put(y.order, y);
        if (y.order > maxOrder) maxOrder = y.order;
      }
    } while (x !== this.head);
    this.head = null;
    for (let index256 = this.table.values().iterator(); index256.hasNext(); ) {
      const n = index256.next();
      {
        if (n != null) {
          this.min = this.greater(this.min.key, n.key) ? n : this.min;
          this.head = this.insert$edu_princeton_cs_algs4_FibonacciMinPQ_Node$edu_princeton_cs_algs4_FibonacciMinPQ_Node(
            n,
            this.head
          );
        }
      }
    }
  }

  public insert$edu_princeton_cs_algs4_FibonacciMinPQ_Node$edu_princeton_cs_algs4_FibonacciMinPQ_Node(
    x: FibonacciMinPQ.Node,
    head: FibonacciMinPQ.Node
  ): FibonacciMinPQ.Node {
    if (head == null) {
      x.prev = x;
      x.next = x;
    } else {
      head.prev.next = x;
      x.next = head;
      x.prev = head.prev;
      head.prev = x;
    }
    return x;
  }

  /**
   * General helper functions for manipulating circular lists
   * @param {FibonacciMinPQ.Node} x
   * @param {FibonacciMinPQ.Node} head
   * @return {FibonacciMinPQ.Node}
   * @private
   */
  public insert(x?: any, head?: any): any {
    if (
      ((x != null && x instanceof <any>FibonacciMinPQ.Node) || x === null) &&
      ((head != null && head instanceof <any>FibonacciMinPQ.Node) ||
        head === null)
    ) {
      return <any>(
        this.insert$edu_princeton_cs_algs4_FibonacciMinPQ_Node$edu_princeton_cs_algs4_FibonacciMinPQ_Node(
          x,
          head
        )
      );
    }
    if ((x != null || x === null) && head === undefined) {
      return <any>this.insert$java_lang_Object(x);
    }
    throw new Error('invalid overload');
  }

  cut(x: FibonacciMinPQ.Node, head: FibonacciMinPQ.Node): FibonacciMinPQ.Node {
    if (x.next === x) {
      x.next = null;
      x.prev = null;
      return null;
    }
    x.next.prev = x.prev;
    x.prev.next = x.next;
    const res: FibonacciMinPQ.Node = x.next;
    x.next = null;
    x.prev = null;
    if (head === x) return res;
    return head;
  }

  meld(x: FibonacciMinPQ.Node, y: FibonacciMinPQ.Node): FibonacciMinPQ.Node {
    if (x == null) return y;
    if (y == null) return x;
    x.prev.next = y.next;
    y.next.prev = x.prev;
    x.prev = y;
    y.next = x;
    return x;
  }

  /**
   * Gets an Iterator over the Keys in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(log(n)) (amortized)
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the Keys in the priority queue in ascending order
   */
  public iterator(): Iterator<Key> {
    return new FibonacciMinPQ.MyIterator(this);
  }
}
FibonacciMinPQ.__class = 'edu.princeton.cs.algs4.FibonacciMinPQ';
FibonacciMinPQ.__interfaces = ['Iterable'];

export namespace FibonacciMinPQ {
  export class Node {
    public __parent: any;
    key: any;

    order: number;

    prev: FibonacciMinPQ.Node;

    next: FibonacciMinPQ.Node;

    child: FibonacciMinPQ.Node;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.order === undefined) this.order = 0;
      if (this.prev === undefined) this.prev = null;
      if (this.next === undefined) this.next = null;
      if (this.child === undefined) this.child = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.FibonacciMinPQ.Node';

  export class MyIterator implements Iterator<any> {
    public __parent: any;
    copy: FibonacciMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.copy === undefined) this.copy = null;
      this.copy = <any>new FibonacciMinPQ<any>(<any>__parent.comp);
      this.insertAll(__parent.head);
    }

    insertAll(head: FibonacciMinPQ.Node) {
      if (head == null) return;
      let x: FibonacciMinPQ.Node = head;
      do {
        {
          this.copy.insert(x.key);
          this.insertAll(x.child);
          x = x.next;
        }
      } while (x !== head);
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public hasNext(): boolean {
      return !this.copy.isEmpty();
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      return this.copy.delMin();
    }
  }
  MyIterator.__class = 'edu.princeton.cs.algs4.FibonacciMinPQ.MyIterator';
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
  MyComparator.__class = 'edu.princeton.cs.algs4.FibonacciMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
