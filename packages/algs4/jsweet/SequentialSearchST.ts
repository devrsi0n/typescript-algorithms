import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty symbol table.
 * @class
 * @author Robert Sedgewick
 */
export class SequentialSearchST<Key, Value> {
  private n: number;

  private first: SequentialSearchST.Node;

  public constructor() {
    if (this.n === undefined) this.n = 0;
    if (this.first === undefined) this.first = null;
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   *
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns true if this symbol table is empty.
   *
   * @return  {@code true} if this symbol table is empty;
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns true if this symbol table contains the specified key.
   *
   * @param  {*} key the key
   * @return  {@code true} if this symbol table contains {@code key};
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    return this.get(key) != null;
  }

  /**
   * Returns the value associated with the given key in this symbol table.
   *
   * @param  {*} key the key
   * @return  the value associated with the given key if the key is in the symbol table
   * and {@code null} if the key is not in the symbol table
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    for (let x: SequentialSearchST.Node = this.first; x != null; x = x.next) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(key, x.key)) return x.val;
      }
    }
    return null;
  }

  /**
   * Inserts the specified key-value pair into the symbol table, overwriting the old
   * value with the new value if the symbol table already contains the specified key.
   * Deletes the specified key (and its associated value) from this symbol table
   * if the specified value is {@code null}.
   *
   * @param  {*} key the key
   * @param  {*} val the value
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public put(key: Key, val: Value) {
    if (key == null) throw new Error('first argument to put() is null');
    if (val == null) {
      this.delete(key);
      return;
    }
    for (let x: SequentialSearchST.Node = this.first; x != null; x = x.next) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(key, x.key)) {
          x.val = val;
          return;
        }
      }
    }
    this.first = new SequentialSearchST.Node(this, key, val, this.first);
    this.n++;
  }

  public delete$java_lang_Object(key: Key) {
    if (key == null) throw new Error('argument to delete() is null');
    this.first = this.delete(this.first, key);
  }

  public delete$edu_princeton_cs_algs4_SequentialSearchST_Node$java_lang_Object(
    x: SequentialSearchST.Node,
    key: Key
  ): SequentialSearchST.Node {
    if (x == null) return null;
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(key, x.key)) {
      this.n--;
      return x.next;
    }
    x.next = this.delete(x.next, key);
    return x;
  }

  public delete(x?: any, key?: any): any {
    if (
      ((x != null && x instanceof <any>SequentialSearchST.Node) ||
        x === null) &&
      (key != null || key === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_SequentialSearchST_Node$java_lang_Object(
          x,
          key
        )
      );
    }
    if ((x != null || x === null) && key === undefined) {
      return <any>this.delete$java_lang_Object(x);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns all keys in the symbol table as an {@code Iterable}.
   * To iterate over all of the keys in the symbol table named {@code st},
   * use the foreach notation: {@code for (Key key : st.keys())}.
   *
   * @return  all keys in the symbol table
   */
  public keys(): Iterable<Key> {
    const queue: Queue<Key> = <any>new Queue<Key>();
    for (let x: SequentialSearchST.Node = this.first; x != null; x = x.next) {
      queue.enqueue(x.key);
    }
    return queue;
  }

  /**
   * Unit tests the {@code SequentialSearchST} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const st: SequentialSearchST<string, number> = <any>(
      new SequentialSearchST<string, number>()
    );
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    for (let index342 = st.keys().iterator(); index342.hasNext(); ) {
      const s = index342.next();
      StdOut.println$java_lang_Object(`${s} ${st.get(s)}`);
    }
  }
}
SequentialSearchST.__class = 'edu.princeton.cs.algs4.SequentialSearchST';

export namespace SequentialSearchST {
  export class Node {
    public __parent: any;
    key: any;

    val: any;

    next: SequentialSearchST.Node;

    public constructor(
      __parent: any,
      key: any,
      val: any,
      next: SequentialSearchST.Node
    ) {
      this.__parent = __parent;
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.next === undefined) this.next = null;
      this.key = key;
      this.val = val;
      this.next = next;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.SequentialSearchST.Node';
}

SequentialSearchST.main(null);
