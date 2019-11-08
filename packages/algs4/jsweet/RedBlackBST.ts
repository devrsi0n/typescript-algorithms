import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * Initializes an empty symbol table.
 * @class
 * @author Robert Sedgewick
 */
export class RedBlackBST<Key extends java.lang.Comparable<Key>, Value> {
  static RED = true;

  static BLACK = false;

  private root: RedBlackBST.Node;

  public constructor() {
    if (this.root === undefined) this.root = null;
  }

  /**
   * Node helper methods.
   * @param {RedBlackBST.Node} x
   * @return
   * @private
   */
  isRed(x: RedBlackBST.Node): boolean {
    if (x == null) return false;
    return x.color === RedBlackBST.RED;
  }

  size$edu_princeton_cs_algs4_RedBlackBST_Node(x: RedBlackBST.Node): number {
    if (x == null) return 0;
    return x.size;
  }

  public size$(): number {
    return this.size$edu_princeton_cs_algs4_RedBlackBST_Node(this.root);
  }

  /**
   * Is this symbol table empty?
   * @return  {@code true} if this symbol table is empty and {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.root == null;
  }

  public get$java_lang_Comparable(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    return this.get(this.root, key);
  }

  public get$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
    x: RedBlackBST.Node,
    key: Key
  ): Value {
    while (x != null) {
      {
        const cmp: number = key.compareTo(x.key);
        if (cmp < 0) x = x.left;
        else if (cmp > 0) x = x.right;
        else return x.val;
      }
    }
    return null;
  }

  public get(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.get$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
          x,
          key
        )
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.get$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  /**
   * Does this symbol table contain the given key?
   * @param {*} key the key
   * @return  {@code true} if this symbol table contains {@code key} and
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public contains(key: Key): boolean {
    return this.get(key) != null;
  }

  public put$java_lang_Comparable$java_lang_Object(key: Key, val: Value) {
    if (key == null) throw new Error('first argument to put() is null');
    if (val == null) {
      this.delete(key);
      return;
    }
    this.root = this.put(this.root, key, val);
    this.root.color = RedBlackBST.BLACK;
  }

  public put$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable$java_lang_Object(
    h: RedBlackBST.Node,
    key: Key,
    val: Value
  ): RedBlackBST.Node {
    if (h == null)
      return new RedBlackBST.Node(this, key, val, RedBlackBST.RED, 1);
    const cmp: number = key.compareTo(h.key);
    if (cmp < 0) h.left = this.put(h.left, key, val);
    else if (cmp > 0) h.right = this.put(h.right, key, val);
    else h.val = val;
    if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);
    h.size =
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.left) +
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.right) +
      1;
    return h;
  }

  public put(h?: any, key?: any, val?: any): any {
    if (
      ((h != null && h instanceof <any>RedBlackBST.Node) || h === null) &&
      (key != null || key === null) &&
      (val != null || val === null)
    ) {
      return <any>(
        this.put$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable$java_lang_Object(
          h,
          key,
          val
        )
      );
    }
    if (
      (h != null || h === null) &&
      (key != null || key === null) &&
      val === undefined
    ) {
      return <any>this.put$java_lang_Comparable$java_lang_Object(h, key);
    }
    throw new Error('invalid overload');
  }

  public deleteMin$() {
    if (this.isEmpty()) throw new Error('BST underflow');
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.deleteMin$edu_princeton_cs_algs4_RedBlackBST_Node(
      this.root
    );
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
  }

  public deleteMin$edu_princeton_cs_algs4_RedBlackBST_Node(
    h: RedBlackBST.Node
  ): RedBlackBST.Node {
    if (h.left == null) return null;
    if (!this.isRed(h.left) && !this.isRed(h.left.left))
      h = this.moveRedLeft(h);
    h.left = this.deleteMin$edu_princeton_cs_algs4_RedBlackBST_Node(h.left);
    return this.balance(h);
  }

  public deleteMin(h?: any): any {
    if ((h != null && h instanceof <any>RedBlackBST.Node) || h === null) {
      return <any>this.deleteMin$edu_princeton_cs_algs4_RedBlackBST_Node(h);
    }
    if (h === undefined) {
      return <any>this.deleteMin$();
    }
    throw new Error('invalid overload');
  }

  public deleteMax$() {
    if (this.isEmpty()) throw new Error('BST underflow');
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.deleteMax$edu_princeton_cs_algs4_RedBlackBST_Node(
      this.root
    );
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
  }

  public deleteMax$edu_princeton_cs_algs4_RedBlackBST_Node(
    h: RedBlackBST.Node
  ): RedBlackBST.Node {
    if (this.isRed(h.left)) h = this.rotateRight(h);
    if (h.right == null) return null;
    if (!this.isRed(h.right) && !this.isRed(h.right.left))
      h = this.moveRedRight(h);
    h.right = this.deleteMax$edu_princeton_cs_algs4_RedBlackBST_Node(h.right);
    return this.balance(h);
  }

  public deleteMax(h?: any): any {
    if ((h != null && h instanceof <any>RedBlackBST.Node) || h === null) {
      return <any>this.deleteMax$edu_princeton_cs_algs4_RedBlackBST_Node(h);
    }
    if (h === undefined) {
      return <any>this.deleteMax$();
    }
    throw new Error('invalid overload');
  }

  public delete$java_lang_Comparable(key: Key) {
    if (key == null) throw new Error('argument to delete() is null');
    if (!this.contains(key)) return;
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.delete(this.root, key);
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
  }

  public delete$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
    h: RedBlackBST.Node,
    key: Key
  ): RedBlackBST.Node {
    if (key.compareTo(h.key) < 0) {
      if (!this.isRed(h.left) && !this.isRed(h.left.left))
        h = this.moveRedLeft(h);
      h.left = this.delete(h.left, key);
    } else {
      if (this.isRed(h.left)) h = this.rotateRight(h);
      if (key.compareTo(h.key) === 0 && h.right == null) return null;
      if (!this.isRed(h.right) && !this.isRed(h.right.left))
        h = this.moveRedRight(h);
      if (key.compareTo(h.key) === 0) {
        const x: RedBlackBST.Node = this.min$edu_princeton_cs_algs4_RedBlackBST_Node(
          h.right
        );
        h.key = x.key;
        h.val = x.val;
        h.right = this.deleteMin$edu_princeton_cs_algs4_RedBlackBST_Node(
          h.right
        );
      } else h.right = this.delete(h.right, key);
    }
    return this.balance(h);
  }

  public delete(h?: any, key?: any): any {
    if (
      ((h != null && h instanceof <any>RedBlackBST.Node) || h === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
          h,
          key
        )
      );
    }
    if ((h != null || h === null) && key === undefined) {
      return <any>this.delete$java_lang_Comparable(h);
    }
    throw new Error('invalid overload');
  }

  /**
   * Red-black tree helper functions.
   * @param {RedBlackBST.Node} h
   * @return {RedBlackBST.Node}
   * @private
   */
  rotateRight(h: RedBlackBST.Node): RedBlackBST.Node {
    const x: RedBlackBST.Node = h.left;
    h.left = x.right;
    x.right = h;
    x.color = x.right.color;
    x.right.color = RedBlackBST.RED;
    x.size = h.size;
    h.size =
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.left) +
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.right) +
      1;
    return x;
  }

  rotateLeft(h: RedBlackBST.Node): RedBlackBST.Node {
    const x: RedBlackBST.Node = h.right;
    h.right = x.left;
    x.left = h;
    x.color = x.left.color;
    x.left.color = RedBlackBST.RED;
    x.size = h.size;
    h.size =
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.left) +
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.right) +
      1;
    return x;
  }

  flipColors(h: RedBlackBST.Node) {
    h.color = !h.color;
    h.left.color = !h.left.color;
    h.right.color = !h.right.color;
  }

  moveRedLeft(h: RedBlackBST.Node): RedBlackBST.Node {
    this.flipColors(h);
    if (this.isRed(h.right.left)) {
      h.right = this.rotateRight(h.right);
      h = this.rotateLeft(h);
      this.flipColors(h);
    }
    return h;
  }

  moveRedRight(h: RedBlackBST.Node): RedBlackBST.Node {
    this.flipColors(h);
    if (this.isRed(h.left.left)) {
      h = this.rotateRight(h);
      this.flipColors(h);
    }
    return h;
  }

  balance(h: RedBlackBST.Node): RedBlackBST.Node {
    if (this.isRed(h.right)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);
    h.size =
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.left) +
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(h.right) +
      1;
    return h;
  }

  public height$(): number {
    return this.height$edu_princeton_cs_algs4_RedBlackBST_Node(this.root);
  }

  public height$edu_princeton_cs_algs4_RedBlackBST_Node(
    x: RedBlackBST.Node
  ): number {
    if (x == null) return -1;
    return (
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_RedBlackBST_Node(x.left),
        this.height$edu_princeton_cs_algs4_RedBlackBST_Node(x.right)
      )
    );
  }

  public height(x?: any): any {
    if ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) {
      return <any>this.height$edu_princeton_cs_algs4_RedBlackBST_Node(x);
    }
    if (x === undefined) {
      return <any>this.height$();
    }
    throw new Error('invalid overload');
  }

  public min$(): Key {
    if (this.isEmpty())
      throw new Error('calls min() with empty symbol table');
    return this.min$edu_princeton_cs_algs4_RedBlackBST_Node(this.root).key;
  }

  public min$edu_princeton_cs_algs4_RedBlackBST_Node(
    x: RedBlackBST.Node
  ): RedBlackBST.Node {
    if (x.left == null) return x;
    return this.min$edu_princeton_cs_algs4_RedBlackBST_Node(x.left);
  }

  public min(x?: any): any {
    if ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) {
      return <any>this.min$edu_princeton_cs_algs4_RedBlackBST_Node(x);
    }
    if (x === undefined) {
      return <any>this.min$();
    }
    throw new Error('invalid overload');
  }

  public max$(): Key {
    if (this.isEmpty())
      throw new Error('calls max() with empty symbol table');
    return this.max$edu_princeton_cs_algs4_RedBlackBST_Node(this.root).key;
  }

  public max$edu_princeton_cs_algs4_RedBlackBST_Node(
    x: RedBlackBST.Node
  ): RedBlackBST.Node {
    if (x.right == null) return x;
    return this.max$edu_princeton_cs_algs4_RedBlackBST_Node(x.right);
  }

  public max(x?: any): any {
    if ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) {
      return <any>this.max$edu_princeton_cs_algs4_RedBlackBST_Node(x);
    }
    if (x === undefined) {
      return <any>this.max$();
    }
    throw new Error('invalid overload');
  }

  public floor$java_lang_Comparable(key: Key): Key {
    if (key == null) throw new Error('argument to floor() is null');
    if (this.isEmpty())
      throw new Error('calls floor() with empty symbol table');
    const x: RedBlackBST.Node = this.floor(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public floor$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
    x: RedBlackBST.Node,
    key: Key
  ): RedBlackBST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp < 0) return this.floor(x.left, key);
    const t: RedBlackBST.Node = this.floor(x.right, key);
    if (t != null) return t;
    return x;
  }

  public floor(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.floor$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
          x,
          key
        )
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.floor$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public ceiling$java_lang_Comparable(key: Key): Key {
    if (key == null) throw new Error('argument to ceiling() is null');
    if (this.isEmpty())
      throw new Error(
        'calls ceiling() with empty symbol table'
      );
    const x: RedBlackBST.Node = this.ceiling(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public ceiling$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
    x: RedBlackBST.Node,
    key: Key
  ): RedBlackBST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp > 0) return this.ceiling(x.right, key);
    const t: RedBlackBST.Node = this.ceiling(x.left, key);
    if (t != null) return t;
    return x;
  }

  public ceiling(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.ceiling$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable(
          x,
          key
        )
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.ceiling$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public select$int(k: number): Key {
    if (k < 0 || k >= this.size()) {
      throw new Error(`argument to select() is invalid: ${k}`);
    }
    const x: RedBlackBST.Node = this.select$edu_princeton_cs_algs4_RedBlackBST_Node$int(
      this.root,
      k
    );
    return x.key;
  }

  public select$edu_princeton_cs_algs4_RedBlackBST_Node$int(
    x: RedBlackBST.Node,
    k: number
  ): RedBlackBST.Node {
    const t: number = this.size$edu_princeton_cs_algs4_RedBlackBST_Node(x.left);
    if (t > k)
      return this.select$edu_princeton_cs_algs4_RedBlackBST_Node$int(x.left, k);
    if (t < k)
      return this.select$edu_princeton_cs_algs4_RedBlackBST_Node$int(
        x.right,
        k - t - 1
      );
    return x;
  }

  public select(x?: any, k?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (typeof k === 'number' || k === null)
    ) {
      return <any>this.select$edu_princeton_cs_algs4_RedBlackBST_Node$int(x, k);
    }
    if ((typeof x === 'number' || x === null) && k === undefined) {
      return <any>this.select$int(x);
    }
    throw new Error('invalid overload');
  }

  public rank$java_lang_Comparable(key: Key): number {
    if (key == null) throw new Error('argument to rank() is null');
    return this.rank(key, this.root);
  }

  public rank$java_lang_Comparable$edu_princeton_cs_algs4_RedBlackBST_Node(
    key: Key,
    x: RedBlackBST.Node
  ): number {
    if (x == null) return 0;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.rank(key, x.left);
    if (cmp > 0)
      return (
        1 +
        this.size$edu_princeton_cs_algs4_RedBlackBST_Node(x.left) +
        this.rank(key, x.right)
      );
    return this.size$edu_princeton_cs_algs4_RedBlackBST_Node(x.left);
  }

  public rank(key?: any, x?: any): any {
    if (
      (key != null || key === null) &&
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null)
    ) {
      return <any>(
        this.rank$java_lang_Comparable$edu_princeton_cs_algs4_RedBlackBST_Node(
          key,
          x
        )
      );
    }
    if ((key != null || key === null) && x === undefined) {
      return <any>this.rank$java_lang_Comparable(key);
    }
    throw new Error('invalid overload');
  }

  public keys$(): Iterable<Key> {
    if (this.isEmpty()) return <any>new Queue<Key>();
    return this.keys(this.min(), this.max());
  }

  public keys$java_lang_Comparable$java_lang_Comparable(
    lo: Key,
    hi: Key
  ): Iterable<Key> {
    if (lo == null) throw new Error('first argument to keys() is null');
    if (hi == null) throw new Error('second argument to keys() is null');
    const queue: Queue<Key> = <any>new Queue<Key>();
    this.keys(this.root, queue, lo, hi);
    return queue;
  }

  public keys$edu_princeton_cs_algs4_RedBlackBST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
    x: RedBlackBST.Node,
    queue: Queue<Key>,
    lo: Key,
    hi: Key
  ) {
    if (x == null) return;
    const cmplo: number = lo.compareTo(x.key);
    const cmphi: number = hi.compareTo(x.key);
    if (cmplo < 0) this.keys(x.left, queue, lo, hi);
    if (cmplo <= 0 && cmphi >= 0) queue.enqueue(x.key);
    if (cmphi > 0) this.keys(x.right, queue, lo, hi);
  }

  public keys(x?: any, queue?: any, lo?: any, hi?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null) &&
      (lo != null || lo === null) &&
      (hi != null || hi === null)
    ) {
      return <any>(
        this.keys$edu_princeton_cs_algs4_RedBlackBST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
          x,
          queue,
          lo,
          hi
        )
      );
    }
    if (
      (x != null || x === null) &&
      (queue != null || queue === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>this.keys$java_lang_Comparable$java_lang_Comparable(x, queue);
    }
    if (
      x === undefined &&
      queue === undefined &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>this.keys$();
    }
    throw new Error('invalid overload');
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
   * Returns the number of keys in the symbol table in the given range.
   *
   * @param  {*} lo minimum endpoint
   * @param  {*} hi maximum endpoint
   * @return  the number of keys in the symbol table between {@code lo}
   * (inclusive) and {@code hi} (inclusive)
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   * is {@code null}
   */
  public size(lo?: any, hi?: any): any {
    if ((lo != null || lo === null) && (hi != null || hi === null)) {
      return <any>this.size$java_lang_Comparable$java_lang_Comparable(lo, hi);
    }
    if (
      ((lo != null && lo instanceof <any>RedBlackBST.Node) || lo === null) &&
      hi === undefined
    ) {
      return <any>this.size$edu_princeton_cs_algs4_RedBlackBST_Node(lo);
    }
    if (lo === undefined && hi === undefined) {
      return <any>this.size$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Check integrity of red-black tree data structure.
   * @return
   * @private
   */
  check(): boolean {
    if (!this.isBST())
      StdOut.println$java_lang_Object('Not in symmetric order');
    if (!this.isSizeConsistent())
      StdOut.println$java_lang_Object('Subtree counts not consistent');
    if (!this.isRankConsistent())
      StdOut.println$java_lang_Object('Ranks not consistent');
    if (!this.is23()) StdOut.println$java_lang_Object('Not a 2-3 tree');
    if (!this.isBalanced()) StdOut.println$java_lang_Object('Not balanced');
    return (
      this.isBST() &&
      this.isSizeConsistent() &&
      this.isRankConsistent() &&
      this.is23() &&
      this.isBalanced()
    );
  }

  isBST$(): boolean {
    return this.isBST(this.root, null, null);
  }

  public isBST$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable$java_lang_Comparable(
    x: RedBlackBST.Node,
    min: Key,
    max: Key
  ): boolean {
    if (x == null) return true;
    if (min != null && x.key.compareTo(min) <= 0) return false;
    if (max != null && x.key.compareTo(max) >= 0) return false;
    return this.isBST(x.left, min, x.key) && this.isBST(x.right, x.key, max);
  }

  public isBST(x?: any, min?: any, max?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (min != null || min === null) &&
      (max != null || max === null)
    ) {
      return <any>(
        this.isBST$edu_princeton_cs_algs4_RedBlackBST_Node$java_lang_Comparable$java_lang_Comparable(
          x,
          min,
          max
        )
      );
    }
    if (x === undefined && min === undefined && max === undefined) {
      return <any>this.isBST$();
    }
    throw new Error('invalid overload');
  }

  isSizeConsistent$(): boolean {
    return this.isSizeConsistent$edu_princeton_cs_algs4_RedBlackBST_Node(
      this.root
    );
  }

  public isSizeConsistent$edu_princeton_cs_algs4_RedBlackBST_Node(
    x: RedBlackBST.Node
  ): boolean {
    if (x == null) return true;
    if (
      x.size !==
      this.size$edu_princeton_cs_algs4_RedBlackBST_Node(x.left) +
        this.size$edu_princeton_cs_algs4_RedBlackBST_Node(x.right) +
        1
    )
      return false;
    return (
      this.isSizeConsistent$edu_princeton_cs_algs4_RedBlackBST_Node(x.left) &&
      this.isSizeConsistent$edu_princeton_cs_algs4_RedBlackBST_Node(x.right)
    );
  }

  public isSizeConsistent(x?: any): any {
    if ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) {
      return <any>(
        this.isSizeConsistent$edu_princeton_cs_algs4_RedBlackBST_Node(x)
      );
    }
    if (x === undefined) {
      return <any>this.isSizeConsistent$();
    }
    throw new Error('invalid overload');
  }

  isRankConsistent(): boolean {
    for (let i = 0; i < this.size(); i++) {
      if (i !== this.rank(this.select$int(i))) return false;
    }
    for (let index336 = this.keys().iterator(); index336.hasNext(); ) {
      const key = index336.next();
      if (key.compareTo(this.select$int(this.rank(key))) !== 0) return false;
    }
    return true;
  }

  is23$(): boolean {
    return this.is23$edu_princeton_cs_algs4_RedBlackBST_Node(this.root);
  }

  public is23$edu_princeton_cs_algs4_RedBlackBST_Node(
    x: RedBlackBST.Node
  ): boolean {
    if (x == null) return true;
    if (this.isRed(x.right)) return false;
    if (x !== this.root && this.isRed(x) && this.isRed(x.left)) return false;
    return (
      this.is23$edu_princeton_cs_algs4_RedBlackBST_Node(x.left) &&
      this.is23$edu_princeton_cs_algs4_RedBlackBST_Node(x.right)
    );
  }

  public is23(x?: any): any {
    if ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) {
      return <any>this.is23$edu_princeton_cs_algs4_RedBlackBST_Node(x);
    }
    if (x === undefined) {
      return <any>this.is23$();
    }
    throw new Error('invalid overload');
  }

  isBalanced$(): boolean {
    let black = 0;
    let x: RedBlackBST.Node = this.root;
    while (x != null) {
      {
        if (!this.isRed(x)) black++;
        x = x.left;
      }
    }
    return this.isBalanced$edu_princeton_cs_algs4_RedBlackBST_Node$int(
      this.root,
      black
    );
  }

  public isBalanced$edu_princeton_cs_algs4_RedBlackBST_Node$int(
    x: RedBlackBST.Node,
    black: number
  ): boolean {
    if (x == null) return black === 0;
    if (!this.isRed(x)) black--;
    return (
      this.isBalanced$edu_princeton_cs_algs4_RedBlackBST_Node$int(
        x.left,
        black
      ) &&
      this.isBalanced$edu_princeton_cs_algs4_RedBlackBST_Node$int(
        x.right,
        black
      )
    );
  }

  public isBalanced(x?: any, black?: any): any {
    if (
      ((x != null && x instanceof <any>RedBlackBST.Node) || x === null) &&
      (typeof black === 'number' || black === null)
    ) {
      return <any>(
        this.isBalanced$edu_princeton_cs_algs4_RedBlackBST_Node$int(x, black)
      );
    }
    if (x === undefined && black === undefined) {
      return <any>this.isBalanced$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Unit tests the {@code RedBlackBST} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const st: RedBlackBST<string, number> = <any>(
      new RedBlackBST<string, number>()
    );
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index337 = st.keys().iterator(); index337.hasNext(); ) {
      const s = index337.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
    StdOut.println();
  }
}
RedBlackBST.__class = 'edu.princeton.cs.algs4.RedBlackBST';

export namespace RedBlackBST {
  export class Node {
    public __parent: any;
    key: any;

    val: any;

    left: RedBlackBST.Node;

    right: RedBlackBST.Node;

    color: boolean;

    size: number;

    public constructor(
      __parent: any,
      key: any,
      val: any,
      color: boolean,
      size: number
    ) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.color === undefined) this.color = false;
      if (this.size === undefined) this.size = 0;
      this.key = key;
      this.val = val;
      this.color = color;
      this.size = size;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.RedBlackBST.Node';
}

RedBlackBST.main(null);
