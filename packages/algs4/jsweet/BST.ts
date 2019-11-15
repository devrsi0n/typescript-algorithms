import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * Initializes an empty symbol table.
 * @class
 * @author Robert Sedgewick
 */
export class BST<Key extends java.lang.Comparable<Key>, Value> {
  private root: BST.Node;

  public constructor() {
    if (this.root === undefined) this.root = null;
  }

  /**
   * Returns true if this symbol table is empty.
   * @return  `true` if this symbol table is empty; `false` otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public size$(): number {
    return this.size$edu_princeton_cs_algs4_BST_Node(this.root);
  }

  size$edu_princeton_cs_algs4_BST_Node(x: BST.Node): number {
    if (x == null) return 0;
    return x.size;
  }

  /**
   * Does this symbol table contain the given key?
   *
   * @param   key the key
   * @return  `true` if this symbol table contains `key` and
   * `false` otherwise
   * @throws IllegalArgumentException if `key` is `null`
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    return this.get(key) != null;
  }

  public get$java_lang_Comparable(key: Key): Value {
    return this.get(this.root, key);
  }

  public get$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(
    x: BST.Node,
    key: Key
  ): Value {
    if (key == null) throw new Error('calls get() with a null key');
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.get(x.left, key);
    if (cmp > 0) return this.get(x.right, key);
    return x.val;
  }

  public get(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.get$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(x, key)
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.get$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public put$java_lang_Comparable$java_lang_Object(key: Key, val: Value) {
    if (key == null) throw new Error('calls put() with a null key');
    if (val == null) {
      this.delete(key);
      return;
    }
    this.root = this.put(this.root, key, val);
  }

  public put$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Object(
    x: BST.Node,
    key: Key,
    val: Value
  ): BST.Node {
    if (x == null) return new BST.Node(this, key, val, 1);
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) x.left = this.put(x.left, key, val);
    else if (cmp > 0) x.right = this.put(x.right, key, val);
    else x.val = val;
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_BST_Node(x.right);
    return x;
  }

  public put(x?: any, key?: any, val?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null) &&
      (val != null || val === null)
    ) {
      return <any>(
        this.put$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Object(
          x,
          key,
          val
        )
      );
    }
    if (
      (x != null || x === null) &&
      (key != null || key === null) &&
      val === undefined
    ) {
      return <any>this.put$java_lang_Comparable$java_lang_Object(x, key);
    }
    throw new Error('invalid overload');
  }

  public deleteMin$() {
    if (this.isEmpty()) throw new Error('Symbol table underflow');
    this.root = this.deleteMin$edu_princeton_cs_algs4_BST_Node(this.root);
  }

  public deleteMin$edu_princeton_cs_algs4_BST_Node(x: BST.Node): BST.Node {
    if (x.left == null) return x.right;
    x.left = this.deleteMin$edu_princeton_cs_algs4_BST_Node(x.left);
    x.size =
      this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_BST_Node(x.right) +
      1;
    return x;
  }

  public deleteMin(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.deleteMin$edu_princeton_cs_algs4_BST_Node(x);
    }
    if (x === undefined) {
      return <any>this.deleteMin$();
    }
    throw new Error('invalid overload');
  }

  public deleteMax$() {
    if (this.isEmpty()) throw new Error('Symbol table underflow');
    this.root = this.deleteMax$edu_princeton_cs_algs4_BST_Node(this.root);
  }

  public deleteMax$edu_princeton_cs_algs4_BST_Node(x: BST.Node): BST.Node {
    if (x.right == null) return x.left;
    x.right = this.deleteMax$edu_princeton_cs_algs4_BST_Node(x.right);
    x.size =
      this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_BST_Node(x.right) +
      1;
    return x;
  }

  public deleteMax(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.deleteMax$edu_princeton_cs_algs4_BST_Node(x);
    }
    if (x === undefined) {
      return <any>this.deleteMax$();
    }
    throw new Error('invalid overload');
  }

  public delete$java_lang_Comparable(key: Key) {
    if (key == null) throw new Error('calls delete() with a null key');
    this.root = this.delete(this.root, key);
  }

  public delete$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(
    x: BST.Node,
    key: Key
  ): BST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) x.left = this.delete(x.left, key);
    else if (cmp > 0) x.right = this.delete(x.right, key);
    else {
      if (x.right == null) return x.left;
      if (x.left == null) return x.right;
      const t: BST.Node = x;
      x = this.min$edu_princeton_cs_algs4_BST_Node(t.right);
      x.right = this.deleteMin$edu_princeton_cs_algs4_BST_Node(t.right);
      x.left = t.left;
    }
    x.size =
      this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_BST_Node(x.right) +
      1;
    return x;
  }

  public delete(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(x, key)
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.delete$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public min$(): Key {
    if (this.isEmpty()) throw new Error('calls min() with empty symbol table');
    return this.min$edu_princeton_cs_algs4_BST_Node(this.root).key;
  }

  public min$edu_princeton_cs_algs4_BST_Node(x: BST.Node): BST.Node {
    if (x.left == null) return x;
    return this.min$edu_princeton_cs_algs4_BST_Node(x.left);
  }

  public min(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.min$edu_princeton_cs_algs4_BST_Node(x);
    }
    if (x === undefined) {
      return <any>this.min$();
    }
    throw new Error('invalid overload');
  }

  public max$(): Key {
    if (this.isEmpty()) throw new Error('calls max() with empty symbol table');
    return this.max$edu_princeton_cs_algs4_BST_Node(this.root).key;
  }

  public max$edu_princeton_cs_algs4_BST_Node(x: BST.Node): BST.Node {
    if (x.right == null) return x;
    return this.max$edu_princeton_cs_algs4_BST_Node(x.right);
  }

  public max(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.max$edu_princeton_cs_algs4_BST_Node(x);
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
    const x: BST.Node = this.floor(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public floor$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(
    x: BST.Node,
    key: Key
  ): BST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp < 0) return this.floor(x.left, key);
    const t: BST.Node = this.floor(x.right, key);
    if (t != null) return t;
    return x;
  }

  public floor(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.floor$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(x, key)
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.floor$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public floor2$java_lang_Comparable(key: Key): Key {
    return this.floor2(this.root, key, null);
  }

  public floor2$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Comparable(
    x: BST.Node,
    key: Key,
    best: Key
  ): Key {
    if (x == null) return best;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.floor2(x.left, key, best);
    if (cmp > 0) return this.floor2(x.right, key, x.key);
    return x.key;
  }

  public floor2(x?: any, key?: any, best?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null) &&
      (best != null || best === null)
    ) {
      return <any>(
        this.floor2$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Comparable(
          x,
          key,
          best
        )
      );
    }
    if ((x != null || x === null) && key === undefined && best === undefined) {
      return <any>this.floor2$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public ceiling$java_lang_Comparable(key: Key): Key {
    if (key == null) throw new Error('argument to ceiling() is null');
    if (this.isEmpty())
      throw new Error('calls ceiling() with empty symbol table');
    const x: BST.Node = this.ceiling(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public ceiling$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(
    x: BST.Node,
    key: Key
  ): BST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp < 0) {
      const t: BST.Node = this.ceiling(x.left, key);
      if (t != null) return t;
      return x;
    }
    return this.ceiling(x.right, key);
  }

  public ceiling(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.ceiling$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable(
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
    const x: BST.Node = this.select$edu_princeton_cs_algs4_BST_Node$int(
      this.root,
      k
    );
    return x.key;
  }

  public select$edu_princeton_cs_algs4_BST_Node$int(
    x: BST.Node,
    k: number
  ): BST.Node {
    if (x == null) return null;
    const t: number = this.size$edu_princeton_cs_algs4_BST_Node(x.left);
    if (t > k)
      return this.select$edu_princeton_cs_algs4_BST_Node$int(x.left, k);
    if (t < k)
      return this.select$edu_princeton_cs_algs4_BST_Node$int(
        x.right,
        k - t - 1
      );
    return x;
  }

  public select(x?: any, k?: any): any {
    if (
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (typeof k === 'number' || k === null)
    ) {
      return <any>this.select$edu_princeton_cs_algs4_BST_Node$int(x, k);
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

  public rank$java_lang_Comparable$edu_princeton_cs_algs4_BST_Node(
    key: Key,
    x: BST.Node
  ): number {
    if (x == null) return 0;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.rank(key, x.left);
    if (cmp > 0)
      return (
        1 +
        this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
        this.rank(key, x.right)
      );
    return this.size$edu_princeton_cs_algs4_BST_Node(x.left);
  }

  public rank(key?: any, x?: any): any {
    if (
      (key != null || key === null) &&
      ((x != null && x instanceof <any>BST.Node) || x === null)
    ) {
      return <any>(
        this.rank$java_lang_Comparable$edu_princeton_cs_algs4_BST_Node(key, x)
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

  public keys$edu_princeton_cs_algs4_BST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
    x: BST.Node,
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
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null) &&
      (lo != null || lo === null) &&
      (hi != null || hi === null)
    ) {
      return <any>(
        this.keys$edu_princeton_cs_algs4_BST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
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
   * @param   lo minimum endpoint
   * @param   hi maximum endpoint
   * @return  the number of keys in the symbol table between `lo`
   * (inclusive) and `hi` (inclusive)
   * @throws IllegalArgumentException if either `lo` or `hi`
   * is `null`
   */
  public size(lo?: any, hi?: any): any {
    if ((lo != null || lo === null) && (hi != null || hi === null)) {
      return <any>this.size$java_lang_Comparable$java_lang_Comparable(lo, hi);
    }
    if (
      ((lo != null && lo instanceof <any>BST.Node) || lo === null) &&
      hi === undefined
    ) {
      return <any>this.size$edu_princeton_cs_algs4_BST_Node(lo);
    }
    if (lo === undefined && hi === undefined) {
      return <any>this.size$();
    }
    throw new Error('invalid overload');
  }

  public height$(): number {
    return this.height$edu_princeton_cs_algs4_BST_Node(this.root);
  }

  public height$edu_princeton_cs_algs4_BST_Node(x: BST.Node): number {
    if (x == null) return -1;
    return (
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_BST_Node(x.left),
        this.height$edu_princeton_cs_algs4_BST_Node(x.right)
      )
    );
  }

  public height(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.height$edu_princeton_cs_algs4_BST_Node(x);
    }
    if (x === undefined) {
      return <any>this.height$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the keys in the BST in level order (for debugging).
   *
   * @return  the keys in the BST in level order traversal
   */
  public levelOrder(): Iterable<Key> {
    const keys: Queue<Key> = <any>new Queue<Key>();
    const queue: Queue<BST.Node> = <any>new Queue<BST.Node>();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      {
        const x: BST.Node = queue.dequeue();
        if (x == null) continue;
        keys.enqueue(x.key);
        queue.enqueue(x.left);
        queue.enqueue(x.right);
      }
    }
    return keys;
  }

  /**
   * Check integrity of BST data structure.
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
    return this.isBST() && this.isSizeConsistent() && this.isRankConsistent();
  }

  isBST$(): boolean {
    return this.isBST(this.root, null, null);
  }

  public isBST$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Comparable(
    x: BST.Node,
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
      ((x != null && x instanceof <any>BST.Node) || x === null) &&
      (min != null || min === null) &&
      (max != null || max === null)
    ) {
      return <any>(
        this.isBST$edu_princeton_cs_algs4_BST_Node$java_lang_Comparable$java_lang_Comparable(
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
    return this.isSizeConsistent$edu_princeton_cs_algs4_BST_Node(this.root);
  }

  public isSizeConsistent$edu_princeton_cs_algs4_BST_Node(
    x: BST.Node
  ): boolean {
    if (x == null) return true;
    if (
      x.size !==
      this.size$edu_princeton_cs_algs4_BST_Node(x.left) +
        this.size$edu_princeton_cs_algs4_BST_Node(x.right) +
        1
    )
      return false;
    return (
      this.isSizeConsistent$edu_princeton_cs_algs4_BST_Node(x.left) &&
      this.isSizeConsistent$edu_princeton_cs_algs4_BST_Node(x.right)
    );
  }

  public isSizeConsistent(x?: any): any {
    if ((x != null && x instanceof <any>BST.Node) || x === null) {
      return <any>this.isSizeConsistent$edu_princeton_cs_algs4_BST_Node(x);
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
    for (let index171 = this.keys().iterator(); index171.hasNext(); ) {
      const key = index171.next();
      if (key.compareTo(this.select$int(this.rank(key))) !== 0) return false;
    }
    return true;
  }

  /**
   * Unit tests the `BST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: BST<string, number> = <any>new BST<string, number>();
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        if (st.size() > 1 && st.floor(key) !== st.floor2(key))
          throw new java.lang.RuntimeException('floor() function inconsistent');
        st.put(key, i);
      }
    }
    for (let index172 = st.levelOrder().iterator(); index172.hasNext(); ) {
      const s = index172.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
    StdOut.println();
    for (let index173 = st.keys().iterator(); index173.hasNext(); ) {
      const s = index173.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
BST.__class = 'edu.princeton.cs.algs4.BST';

export namespace BST {
  export class Node {
    public __parent: any;
    key: any;

    val: any;

    left: BST.Node;

    right: BST.Node;

    size: number;

    public constructor(__parent: any, key: any, val: any, size: number) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.size === undefined) this.size = 0;
      this.key = key;
      this.val = val;
      this.size = size;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.BST.Node';
}

BST.main(null);
