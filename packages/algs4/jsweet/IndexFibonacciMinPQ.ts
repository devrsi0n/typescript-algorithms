/**
 * Initializes an empty indexed priority queue with indices between `0` and `N-1`
 * Worst case is O(n)
 * @param  N number of keys in the priority queue, index from `0` to `N-1`
 * @param  C a Comparator over the keys
 * @throws Error if `N < 0`
 * @class
 */
export class IndexFibonacciMinPQ<Key> implements Iterable<number> {
  private nodes: IndexFibonacciMinPQ.Node<Key>[];

  private head: IndexFibonacciMinPQ.Node<Key>;

  private min: IndexFibonacciMinPQ.Node<Key>;

  private __size: number;

  private n: number;

  private comp: Comparator<Key>;

  private table: HashMap<number, IndexFibonacciMinPQ.Node<Key>> = <any>(
    new HashMap<number, IndexFibonacciMinPQ.Node<Key>>()
  );

  public constructor(C?: any, N?: any) {
    if (
      ((typeof C === 'function' && (<any>C).length == 2) || C === null) &&
      (typeof N === 'number' || N === null)
    ) {
      const __args = arguments;
      if (this.nodes === undefined) this.nodes = null;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.n === undefined) this.n = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, IndexFibonacciMinPQ.Node<Key>>();
      if (this.nodes === undefined) this.nodes = null;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.n === undefined) this.n = 0;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (N < 0)
          throw new Error('Cannot create a priority queue of negative size');
        this.n = N;
        this.nodes = <IndexFibonacciMinPQ.Node<Key>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.n);
        this.comp = <any>C;
      })();
    } else if ((typeof C === 'number' || C === null) && N === undefined) {
      const __args = arguments;
      const N: any = __args[0];
      if (this.nodes === undefined) this.nodes = null;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.n === undefined) this.n = 0;
      if (this.comp === undefined) this.comp = null;
      this.table = <any>new HashMap<number, IndexFibonacciMinPQ.Node<Key>>();
      if (this.nodes === undefined) this.nodes = null;
      if (this.head === undefined) this.head = null;
      if (this.min === undefined) this.min = null;
      if (this.__size === undefined) this.__size = 0;
      if (this.n === undefined) this.n = 0;
      if (this.comp === undefined) this.comp = null;
      (() => {
        if (N < 0)
          throw new Error('Cannot create a priority queue of negative size');
        this.n = N;
        this.nodes = <IndexFibonacciMinPQ.Node<Key>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(this.n);
        this.comp = (arg0, arg1) => {
          return new IndexFibonacciMinPQ.MyComparator().compare(arg0, arg1);
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
   * Worst case is O(1)
   * @return  the number of elements on the priority queue
   */
  public size(): number {
    return this.__size;
  }

  public insert$int$java_lang_Object(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (this.contains(i))
      throw new Error('Specified index is already in the queue');
    const x: IndexFibonacciMinPQ.Node<Key> = <any>(
      new IndexFibonacciMinPQ.Node<Key>(this)
    );
    x.key = key;
    x.index = i;
    this.nodes[i] = x;
    this.__size++;
    this.head = this.insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      x,
      this.head
    );
    if (this.min == null) this.min = this.head;
    else this.min = this.greater(this.min.key, key) ? this.head : this.min;
  }

  /**
   * Get the index associated with the minimum key
   * Worst case is O(1)
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public minIndex(): number {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.min.index;
  }

  /**
   * Get the minimum key currently in the queue
   * Worst case is O(1)
   * @throws java.util.Error if the priority queue is empty
   * @return  the minimum key currently in the priority queue
   */
  public minKey(): Key {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.min.key;
  }

  /**
   * Delete the minimum key
   * Worst case is O(log(n)) (amortized)
   * @throws java.util.Error if the priority queue is empty
   * @return  the index associated with the minimum key
   */
  public delMin(): number {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    this.head = this.cut$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      this.min,
      this.head
    );
    let x: IndexFibonacciMinPQ.Node<Key> = this.min.child;
    const { index } = this.min;
    this.min.key = null;
    if (x != null) {
      do {
        {
          x.parent = null;
          x = x.next;
        }
      } while (x !== this.min.child);
      this.head = this.meld(this.head, x);
      this.min.child = null;
    }
    this.__size--;
    if (!this.isEmpty()) this.consolidate();
    else this.min = null;
    this.nodes[index] = null;
    return index;
  }

  /**
   * Get the key associated with index i
   * Worst case is O(1)
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index is not in the queue
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
   * If the given key is greater, Worst case is O(log(n))
   * If the given key is lower, Worst case is O(1) (amortized)
   * @param  i an index
   * @param  key the key to associate with i
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the index has no key associated with
   */
  public changeKey(i: number, key: Key) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    if (this.greater(key, this.nodes[i].key)) this.increaseKey(i, key);
    else this.decreaseKey(i, key);
  }

  /**
   * Decreases the key associated with index i to the given key
   * Worst case is O(1) (amortized).
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
    const x: IndexFibonacciMinPQ.Node<Key> = this.nodes[i];
    x.key = key;
    if (this.greater(this.min.key, key)) this.min = x;
    if (x.parent != null && this.greater(x.parent.key, key)) {
      this.cut$int(i);
    }
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
   * Worst case is O(log(n)) (amortized)
   * @param  i an index
   * @throws Error if the specified index is invalid
   * @throws java.util.Error if the given index has no key associated with
   */
  public delete(i: number) {
    if (i < 0 || i >= this.n) throw new Error();
    if (!this.contains(i))
      throw new Error('Specified index is not in the queue');
    let x: IndexFibonacciMinPQ.Node<Key> = this.nodes[i];
    x.key = null;
    if (x.parent != null) {
      this.cut$int(i);
    }
    this.head = this.cut$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      x,
      this.head
    );
    if (x.child != null) {
      let { child } = x;
      x.child = null;
      x = child;
      do {
        {
          child.parent = null;
          child = child.next;
        }
      } while (child !== x);
      this.head = this.meld(this.head, child);
    }
    if (!this.isEmpty()) this.consolidate();
    else this.min = null;
    this.nodes[i] = null;
    this.__size--;
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

  link(
    root1: IndexFibonacciMinPQ.Node<Key>,
    root2: IndexFibonacciMinPQ.Node<Key>
  ) {
    root1.parent = root2;
    root2.child = this.insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      root1,
      root2.child
    );
    root2.order++;
  }

  cut$int(i: number) {
    const x: IndexFibonacciMinPQ.Node<Key> = this.nodes[i];
    const { parent } = x;
    parent.child = this.cut$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      x,
      parent.child
    );
    x.parent = null;
    parent.order--;
    this.head = this.insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
      x,
      this.head
    );
    parent.mark = !parent.mark;
    if (!parent.mark && parent.parent != null) {
      this.cut$int(parent.index);
    }
  }

  /**
   * Function for consolidating all trees in the root list
   * @private
   */
  consolidate() {
    this.table.clear();
    let x: IndexFibonacciMinPQ.Node<Key> = this.head;
    let maxOrder = 0;
    this.min = this.head;
    let y: IndexFibonacciMinPQ.Node<Key> = null;
    let z: IndexFibonacciMinPQ.Node<Key> = null;
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
    for (let index288 = this.table.values().iterator(); index288.hasNext(); ) {
      const n = index288.next();
      {
        this.min = this.greater(this.min.key, n.key) ? n : this.min;
        this.head = this.insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
          n,
          this.head
        );
      }
    }
  }

  public insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
    x: IndexFibonacciMinPQ.Node<Key>,
    head: IndexFibonacciMinPQ.Node<Key>
  ): IndexFibonacciMinPQ.Node<Key> {
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
   * @param {IndexFibonacciMinPQ.Node} x
   * @param {IndexFibonacciMinPQ.Node} head
   * @return {IndexFibonacciMinPQ.Node}
   * @private
   */
  public insert(x?: any, head?: any): any {
    if (
      ((x != null && x instanceof <any>IndexFibonacciMinPQ.Node) ||
        x === null) &&
      ((head != null && head instanceof <any>IndexFibonacciMinPQ.Node) ||
        head === null)
    ) {
      return <any>(
        this.insert$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
          x,
          head
        )
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (head != null || head === null)
    ) {
      return <any>this.insert$int$java_lang_Object(x, head);
    }
    throw new Error('invalid overload');
  }

  public cut$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
    x: IndexFibonacciMinPQ.Node<Key>,
    head: IndexFibonacciMinPQ.Node<Key>
  ): IndexFibonacciMinPQ.Node<Key> {
    if (x.next === x) {
      x.next = null;
      x.prev = null;
      return null;
    }
    x.next.prev = x.prev;
    x.prev.next = x.next;
    const res: IndexFibonacciMinPQ.Node<Key> = x.next;
    x.next = null;
    x.prev = null;
    if (head === x) return res;
    return head;
  }

  public cut(x?: any, head?: any): any {
    if (
      ((x != null && x instanceof <any>IndexFibonacciMinPQ.Node) ||
        x === null) &&
      ((head != null && head instanceof <any>IndexFibonacciMinPQ.Node) ||
        head === null)
    ) {
      return <any>(
        this.cut$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node$edu_princeton_cs_algs4_IndexFibonacciMinPQ_Node(
          x,
          head
        )
      );
    }
    if ((typeof x === 'number' || x === null) && head === undefined) {
      return <any>this.cut$int(x);
    }
    throw new Error('invalid overload');
  }

  meld(
    x: IndexFibonacciMinPQ.Node<Key>,
    y: IndexFibonacciMinPQ.Node<Key>
  ): IndexFibonacciMinPQ.Node<Key> {
    if (x == null) return y;
    if (y == null) return x;
    x.prev.next = y.next;
    y.next.prev = x.prev;
    x.prev = y;
    y.next = x;
    return x;
  }

  /**
   * Get an Iterator over the indexes in the priority queue in ascending order
   * The Iterator does not implement the remove() method
   * iterator() : Worst case is O(n)
   * next() : 	Worst case is O(log(n)) (amortized)
   * hasNext() : 	Worst case is O(1)
   * @return  an Iterator over the indexes in the priority queue in ascending order
   */
  public iterator(): Iterator<number> {
    return new IndexFibonacciMinPQ.MyIterator(this);
  }
}
IndexFibonacciMinPQ.__class = 'edu.princeton.cs.algs4.IndexFibonacciMinPQ';
IndexFibonacciMinPQ.__interfaces = ['Iterable'];

export namespace IndexFibonacciMinPQ {
  export class Node<Key> {
    public __parent: any;
    key: Key;

    order: number;

    index: number;

    prev: IndexFibonacciMinPQ.Node<Key>;

    next: IndexFibonacciMinPQ.Node<Key>;

    parent: IndexFibonacciMinPQ.Node<Key>;

    child: IndexFibonacciMinPQ.Node<Key>;

    mark: boolean;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.order === undefined) this.order = 0;
      if (this.index === undefined) this.index = 0;
      if (this.prev === undefined) this.prev = null;
      if (this.next === undefined) this.next = null;
      if (this.parent === undefined) this.parent = null;
      if (this.child === undefined) this.child = null;
      if (this.mark === undefined) this.mark = false;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.IndexFibonacciMinPQ.Node';

  export class MyIterator implements Iterator<number> {
    public __parent: any;
    copy: IndexFibonacciMinPQ<any>;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.copy === undefined) this.copy = null;
      this.copy = <any>(
        new IndexFibonacciMinPQ<any>(<any>__parent.comp, __parent.n)
      );
      for (let index289 = 0; index289 < __parent.nodes.length; index289++) {
        const x = __parent.nodes[index289];
        {
          if (x != null) this.copy.insert(x.index, x.key);
        }
      }
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public hasNext(): boolean {
      return !this.copy.isEmpty();
    }

    public next(): number {
      if (!this.hasNext()) throw new Error();
      return this.copy.delMin();
    }
  }
  MyIterator.__class = 'edu.princeton.cs.algs4.IndexFibonacciMinPQ.MyIterator';
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
    'edu.princeton.cs.algs4.IndexFibonacciMinPQ.MyComparator';
  MyComparator.__interfaces = ['java.util.Comparator'];
}
