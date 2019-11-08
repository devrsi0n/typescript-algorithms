import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * Initializes an empty symbol table.
 * @class
 * @author Marcelo Silva
 */
export class AVLTreeST<Key extends Comparable<Key>, Value> {
  /**
   * The root node.
   */
  private root: AVLTreeST.Node;

  public constructor() {
    if (this.root === undefined) this.root = null;
  }

  /**
   * Checks if the symbol table is empty.
   *
   * @return  {@code true} if the symbol table is empty.
   */
  public isEmpty(): boolean {
    return this.root == null;
  }

  public size$(): number {
    return this.size$edu_princeton_cs_algs4_AVLTreeST_Node(this.root);
  }

  size$edu_princeton_cs_algs4_AVLTreeST_Node(x: AVLTreeST.Node): number {
    if (x == null) return 0;
    return x.size;
  }

  public height$(): number {
    return this.height$edu_princeton_cs_algs4_AVLTreeST_Node(this.root);
  }

  public height$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): number {
    if (x == null) return -1;
    return x.height;
  }

  /**
   * Returns the height of the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   *
   * @return  the height of the subtree.
   * @private
   */
  public height(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.height$();
    }
    throw new Error('invalid overload');
  }

  public get$java_lang_Comparable(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    const x: AVLTreeST.Node = this.get(this.root, key);
    if (x == null) return null;
    return x.val;
  }

  public get$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
    x: AVLTreeST.Node,
    key: Key
  ): AVLTreeST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.get(x.left, key);
    if (cmp > 0) return this.get(x.right, key);
    return x;
  }

  /**
   * Returns value associated with the given key in the subtree or
   * {@code null} if no such key.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} key the key
   * @return {AVLTreeST.Node} value associated with the given key in the subtree or
   * {@code null} if no such key
   * @private
   */
  public get(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.get$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
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
   * Checks if the symbol table contains the given key.
   *
   * @param {*} key the key
   * @return  {@code true} if the symbol table contains {@code key}
   * and {@code false} otherwise
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
  }

  public put$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable$java_lang_Object(
    x: AVLTreeST.Node,
    key: Key,
    val: Value
  ): AVLTreeST.Node {
    if (x == null) return new AVLTreeST.Node(this, key, val, 0, 1);
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) {
      x.left = this.put(x.left, key, val);
    } else if (cmp > 0) {
      x.right = this.put(x.right, key, val);
    } else {
      x.val = val;
      return x;
    }
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    return this.balance(x);
  }

  /**
   * Inserts the key-value pair in the subtree. It overrides the old value
   * with the new value if the symbol table already contains the specified key
   * and deletes the specified key (and its associated value) from this symbol
   * table if the specified value is {@code null}.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} key the key
   * @param {*} val the value
   * @return {AVLTreeST.Node} the subtree
   * @private
   */
  public put(x?: any, key?: any, val?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (key != null || key === null) &&
      (val != null || val === null)
    ) {
      return <any>(
        this.put$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable$java_lang_Object(
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

  /**
   * Restores the AVL tree property of the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the subtree with restored AVL property
   * @private
   */
  balance(x: AVLTreeST.Node): AVLTreeST.Node {
    if (this.balanceFactor(x) < -1) {
      if (this.balanceFactor(x.right) > 0) {
        x.right = this.rotateRight(x.right);
      }
      x = this.rotateLeft(x);
    } else if (this.balanceFactor(x) > 1) {
      if (this.balanceFactor(x.left) < 0) {
        x.left = this.rotateLeft(x.left);
      }
      x = this.rotateRight(x);
    }
    return x;
  }

  /**
   * Returns the balance factor of the subtree. The balance factor is defined
   * as the difference in height of the left subtree and right subtree, in
   * this order. Therefore, a subtree with a balance factor of -1, 0 or 1 has
   * the AVL property since the heights of the two child subtrees differ by at
   * most one.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return  the balance factor of the subtree
   * @private
   */
  balanceFactor(x: AVLTreeST.Node): number {
    return (
      this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) -
      this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
    );
  }

  /**
   * Rotates the given subtree to the right.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the right rotated subtree
   * @private
   */
  rotateRight(x: AVLTreeST.Node): AVLTreeST.Node {
    const y: AVLTreeST.Node = x.left;
    x.left = y.right;
    y.right = x;
    y.size = x.size;
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    y.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(y.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(y.right)
      );
    return y;
  }

  /**
   * Rotates the given subtree to the left.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the left rotated subtree
   * @private
   */
  rotateLeft(x: AVLTreeST.Node): AVLTreeST.Node {
    const y: AVLTreeST.Node = x.right;
    x.right = y.left;
    y.left = x;
    y.size = x.size;
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    y.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(y.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(y.right)
      );
    return y;
  }

  public delete$java_lang_Comparable(key: Key) {
    if (key == null) throw new Error('argument to delete() is null');
    if (!this.contains(key)) return;
    this.root = this.delete(this.root, key);
  }

  public delete$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
    x: AVLTreeST.Node,
    key: Key
  ): AVLTreeST.Node {
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) {
      x.left = this.delete(x.left, key);
    } else if (cmp > 0) {
      x.right = this.delete(x.right, key);
    } else if (x.left == null) {
      return x.right;
    } else if (x.right == null) {
      return x.left;
    } else {
      const y: AVLTreeST.Node = x;
      x = this.min$edu_princeton_cs_algs4_AVLTreeST_Node(y.right);
      x.right = this.deleteMin$edu_princeton_cs_algs4_AVLTreeST_Node(y.right);
      x.left = y.left;
    }
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    return this.balance(x);
  }

  /**
   * Removes the specified key and its associated value from the given
   * subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} key the key
   * @return {AVLTreeST.Node} the updated subtree
   * @private
   */
  public delete(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
          x,
          key
        )
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.delete$java_lang_Comparable(x);
    }
    throw new Error('invalid overload');
  }

  public deleteMin$() {
    if (this.isEmpty())
      throw new Error(
        'called deleteMin() with empty symbol table'
      );
    this.root = this.deleteMin$edu_princeton_cs_algs4_AVLTreeST_Node(this.root);
  }

  public deleteMin$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): AVLTreeST.Node {
    if (x.left == null) return x.right;
    x.left = this.deleteMin$edu_princeton_cs_algs4_AVLTreeST_Node(x.left);
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    return this.balance(x);
  }

  /**
   * Removes the smallest key and associated value from the given subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the updated subtree
   * @private
   */
  public deleteMin(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.deleteMin$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.deleteMin$();
    }
    throw new Error('invalid overload');
  }

  public deleteMax$() {
    if (this.isEmpty())
      throw new Error(
        'called deleteMax() with empty symbol table'
      );
    this.root = this.deleteMax$edu_princeton_cs_algs4_AVLTreeST_Node(this.root);
  }

  public deleteMax$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): AVLTreeST.Node {
    if (x.right == null) return x.left;
    x.right = this.deleteMax$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.size =
      1 +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
    x.height =
      1 +
      Math.max(
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.left),
        this.height$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
      );
    return this.balance(x);
  }

  /**
   * Removes the largest key and associated value from the given subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the updated subtree
   * @private
   */
  public deleteMax(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.deleteMax$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.deleteMax$();
    }
    throw new Error('invalid overload');
  }

  public min$(): Key {
    if (this.isEmpty())
      throw new Error('called min() with empty symbol table');
    return this.min$edu_princeton_cs_algs4_AVLTreeST_Node(this.root).key;
  }

  public min$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): AVLTreeST.Node {
    if (x.left == null) return x;
    return this.min$edu_princeton_cs_algs4_AVLTreeST_Node(x.left);
  }

  /**
   * Returns the node with the smallest key in the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the node with the smallest key in the subtree
   * @private
   */
  public min(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.min$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.min$();
    }
    throw new Error('invalid overload');
  }

  public max$(): Key {
    if (this.isEmpty())
      throw new Error('called max() with empty symbol table');
    return this.max$edu_princeton_cs_algs4_AVLTreeST_Node(this.root).key;
  }

  public max$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): AVLTreeST.Node {
    if (x.right == null) return x;
    return this.max$edu_princeton_cs_algs4_AVLTreeST_Node(x.right);
  }

  /**
   * Returns the node with the largest key in the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return {AVLTreeST.Node} the node with the largest key in the subtree
   * @private
   */
  public max(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.max$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.max$();
    }
    throw new Error('invalid overload');
  }

  public floor$java_lang_Comparable(key: Key): Key {
    if (key == null) throw new Error('argument to floor() is null');
    if (this.isEmpty())
      throw new Error(
        'called floor() with empty symbol table'
      );
    const x: AVLTreeST.Node = this.floor(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public floor$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
    x: AVLTreeST.Node,
    key: Key
  ): AVLTreeST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp < 0) return this.floor(x.left, key);
    const y: AVLTreeST.Node = this.floor(x.right, key);
    if (y != null) return y;
    return x;
  }

  /**
   * Returns the node in the subtree with the largest key less than or equal
   * to the given key.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} key the key
   * @return {AVLTreeST.Node} the node in the subtree with the largest key less than or equal
   * to the given key
   * @private
   */
  public floor(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.floor$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
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
        'called ceiling() with empty symbol table'
      );
    const x: AVLTreeST.Node = this.ceiling(this.root, key);
    if (x == null) return null;
    return x.key;
  }

  public ceiling$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
    x: AVLTreeST.Node,
    key: Key
  ): AVLTreeST.Node {
    if (x == null) return null;
    const cmp: number = key.compareTo(x.key);
    if (cmp === 0) return x;
    if (cmp > 0) return this.ceiling(x.right, key);
    const y: AVLTreeST.Node = this.ceiling(x.left, key);
    if (y != null) return y;
    return x;
  }

  /**
   * Returns the node in the subtree with the smallest key greater than or
   * equal to the given key.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} key the key
   * @return {AVLTreeST.Node} the node in the subtree with the smallest key greater than or
   * equal to the given key
   * @private
   */
  public ceiling(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.ceiling$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable(
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
    if (k < 0 || k >= this.size())
      throw new Error(`k is not in range 0-${this.size() - 1}`);
    const x: AVLTreeST.Node = this.select$edu_princeton_cs_algs4_AVLTreeST_Node$int(
      this.root,
      k
    );
    return x.key;
  }

  public select$edu_princeton_cs_algs4_AVLTreeST_Node$int(
    x: AVLTreeST.Node,
    k: number
  ): AVLTreeST.Node {
    if (x == null) return null;
    const t: number = this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left);
    if (t > k)
      return this.select$edu_princeton_cs_algs4_AVLTreeST_Node$int(x.left, k);
    if (t < k)
      return this.select$edu_princeton_cs_algs4_AVLTreeST_Node$int(
        x.right,
        k - t - 1
      );
    return x;
  }

  /**
   * Returns the node with key the kth smallest key in the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {number} k the kth smallest key in the subtree
   * @return {AVLTreeST.Node} the node with key the kth smallest key in the subtree
   * @private
   */
  public select(x?: any, k?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (typeof k === 'number' || k === null)
    ) {
      return <any>this.select$edu_princeton_cs_algs4_AVLTreeST_Node$int(x, k);
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

  public rank$java_lang_Comparable$edu_princeton_cs_algs4_AVLTreeST_Node(
    key: Key,
    x: AVLTreeST.Node
  ): number {
    if (x == null) return 0;
    const cmp: number = key.compareTo(x.key);
    if (cmp < 0) return this.rank(key, x.left);
    if (cmp > 0)
      return (
        1 +
        this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
        this.rank(key, x.right)
      );
    return this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left);
  }

  /**
   * Returns the number of keys in the subtree less than key.
   *
   * @param {*} key the key
   * @param {AVLTreeST.Node} x the subtree
   * @return  the number of keys in the subtree less than key
   * @private
   */
  public rank(key?: any, x?: any): any {
    if (
      (key != null || key === null) &&
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null)
    ) {
      return <any>(
        this.rank$java_lang_Comparable$edu_princeton_cs_algs4_AVLTreeST_Node(
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
    return this.keysInOrder();
  }

  public keysInOrder$(): Iterable<Key> {
    const queue: Queue<Key> = <any>new Queue<Key>();
    this.keysInOrder$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue(
      this.root,
      queue
    );
    return queue;
  }

  public keysInOrder$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue(
    x: AVLTreeST.Node,
    queue: Queue<Key>
  ) {
    if (x == null) return;
    this.keysInOrder$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue(
      x.left,
      queue
    );
    queue.enqueue(x.key);
    this.keysInOrder$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue(
      x.right,
      queue
    );
  }

  /**
   * Adds the keys in the subtree to queue following an in-order traversal.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {Queue} queue the queue
   * @private
   */
  public keysInOrder(x?: any, queue?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null)
    ) {
      return <any>(
        this.keysInOrder$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue(
          x,
          queue
        )
      );
    }
    if (x === undefined && queue === undefined) {
      return <any>this.keysInOrder$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns all keys in the symbol table following a level-order traversal.
   *
   * @return  all keys in the symbol table following a level-order traversal.
   */
  public keysLevelOrder(): Iterable<Key> {
    const queue: Queue<Key> = <any>new Queue<Key>();
    if (!this.isEmpty()) {
      const queue2: Queue<AVLTreeST.Node> = <any>new Queue<AVLTreeST.Node>();
      queue2.enqueue(this.root);
      while (!queue2.isEmpty()) {
        {
          const x: AVLTreeST.Node = queue2.dequeue();
          queue.enqueue(x.key);
          if (x.left != null) {
            queue2.enqueue(x.left);
          }
          if (x.right != null) {
            queue2.enqueue(x.right);
          }
        }
      }
    }
    return queue;
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

  public keys$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
    x: AVLTreeST.Node,
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

  /**
   * Adds the keys between {@code lo} and {@code hi} in the subtree
   * to the {@code queue}.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {Queue} queue the queue
   * @param {*} lo the lowest key
   * @param {*} hi the highest key
   * @private
   */
  public keys(x?: any, queue?: any, lo?: any, hi?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null) &&
      (lo != null || lo === null) &&
      (hi != null || hi === null)
    ) {
      return <any>(
        this.keys$edu_princeton_cs_algs4_AVLTreeST_Node$edu_princeton_cs_algs4_Queue$java_lang_Comparable$java_lang_Comparable(
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
   * @param {*} lo minimum endpoint
   * @param {*} hi maximum endpoint
   * @return  the number of keys in the symbol table between {@code lo}
   * (inclusive) and {@code hi} (exclusive)
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   * is {@code null}
   */
  public size(lo?: any, hi?: any): any {
    if ((lo != null || lo === null) && (hi != null || hi === null)) {
      return <any>this.size$java_lang_Comparable$java_lang_Comparable(lo, hi);
    }
    if (
      ((lo != null && lo instanceof <any>AVLTreeST.Node) || lo === null) &&
      hi === undefined
    ) {
      return <any>this.size$edu_princeton_cs_algs4_AVLTreeST_Node(lo);
    }
    if (lo === undefined && hi === undefined) {
      return <any>this.size$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Checks if the AVL tree invariants are fine.
   *
   * @return  {@code true} if the AVL tree invariants are fine
   * @private
   */
  check(): boolean {
    if (!this.isBST())
      StdOut.println$java_lang_Object('Symmetric order not consistent');
    if (!this.isAVL())
      StdOut.println$java_lang_Object('AVL property not consistent');
    if (!this.isSizeConsistent())
      StdOut.println$java_lang_Object('Subtree counts not consistent');
    if (!this.isRankConsistent())
      StdOut.println$java_lang_Object('Ranks not consistent');
    return (
      this.isBST() &&
      this.isAVL() &&
      this.isSizeConsistent() &&
      this.isRankConsistent()
    );
  }

  isAVL$(): boolean {
    return this.isAVL$edu_princeton_cs_algs4_AVLTreeST_Node(this.root);
  }

  public isAVL$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): boolean {
    if (x == null) return true;
    const bf: number = this.balanceFactor(x);
    if (bf > 1 || bf < -1) return false;
    return (
      this.isAVL$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) &&
      this.isAVL$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
    );
  }

  /**
   * Checks if AVL property is consistent in the subtree.
   *
   * @param {AVLTreeST.Node} x the subtree
   * @return  {@code true} if AVL property is consistent in the subtree
   * @private
   */
  public isAVL(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>this.isAVL$edu_princeton_cs_algs4_AVLTreeST_Node(x);
    }
    if (x === undefined) {
      return <any>this.isAVL$();
    }
    throw new Error('invalid overload');
  }

  isBST$(): boolean {
    return this.isBST(this.root, null, null);
  }

  public isBST$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable$java_lang_Comparable(
    x: AVLTreeST.Node,
    min: Key,
    max: Key
  ): boolean {
    if (x == null) return true;
    if (min != null && x.key.compareTo(min) <= 0) return false;
    if (max != null && x.key.compareTo(max) >= 0) return false;
    return this.isBST(x.left, min, x.key) && this.isBST(x.right, x.key, max);
  }

  /**
   * Checks if the tree rooted at x is a BST with all keys strictly between
   * min and max (if min or max is null, treat as empty constraint) Credit:
   * Bob Dondero's elegant solution
   *
   * @param {AVLTreeST.Node} x the subtree
   * @param {*} min the minimum key in subtree
   * @param {*} max the maximum key in subtree
   * @return  {@code true} if if the symmetric order is consistent
   * @private
   */
  public isBST(x?: any, min?: any, max?: any): any {
    if (
      ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) &&
      (min != null || min === null) &&
      (max != null || max === null)
    ) {
      return <any>(
        this.isBST$edu_princeton_cs_algs4_AVLTreeST_Node$java_lang_Comparable$java_lang_Comparable(
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
    return this.isSizeConsistent$edu_princeton_cs_algs4_AVLTreeST_Node(
      this.root
    );
  }

  public isSizeConsistent$edu_princeton_cs_algs4_AVLTreeST_Node(
    x: AVLTreeST.Node
  ): boolean {
    if (x == null) return true;
    if (
      x.size !==
      this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) +
        this.size$edu_princeton_cs_algs4_AVLTreeST_Node(x.right) +
        1
    )
      return false;
    return (
      this.isSizeConsistent$edu_princeton_cs_algs4_AVLTreeST_Node(x.left) &&
      this.isSizeConsistent$edu_princeton_cs_algs4_AVLTreeST_Node(x.right)
    );
  }

  /**
   * Checks if the size of the subtree is consistent.
   *
   * @return  {@code true} if the size of the subtree is consistent
   * @param {AVLTreeST.Node} x
   * @private
   */
  public isSizeConsistent(x?: any): any {
    if ((x != null && x instanceof <any>AVLTreeST.Node) || x === null) {
      return <any>(
        this.isSizeConsistent$edu_princeton_cs_algs4_AVLTreeST_Node(x)
      );
    }
    if (x === undefined) {
      return <any>this.isSizeConsistent$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Checks if rank is consistent.
   *
   * @return  {@code true} if rank is consistent
   * @private
   */
  isRankConsistent(): boolean {
    for (let i = 0; i < this.size(); i++) {
      if (i !== this.rank(this.select$int(i))) return false;
    }
    for (let index130 = this.keys().iterator(); index130.hasNext(); ) {
      const key = index130.next();
      if (key.compareTo(this.select$int(this.rank(key))) !== 0) return false;
    }
    return true;
  }

  /**
   * Unit tests the {@code AVLTreeST} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const st: AVLTreeST<string, number> = <any>new AVLTreeST<string, number>();
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index131 = st.keys().iterator(); index131.hasNext(); ) {
      const s = index131.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
    StdOut.println();
  }
}
AVLTreeST.__class = 'edu.princeton.cs.algs4.AVLTreeST';

export namespace AVLTreeST {
  /**
   * This class represents an inner node of the AVL tree.
   * @param {*} key
   * @param {*} val
   * @param {number} height
   * @param {number} size
   * @class
   */
  export class Node {
    public __parent: any;
    key: any;

    val: any;

    height: number;

    size: number;

    left: AVLTreeST.Node;

    right: AVLTreeST.Node;

    public constructor(
      __parent: any,
      key: any,
      val: any,
      height: number,
      size: number
    ) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.height === undefined) this.height = 0;
      if (this.size === undefined) this.size = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      this.key = key;
      this.val = val;
      this.size = size;
      this.height = height;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.AVLTreeST.Node';
}

AVLTreeST.main(null);
