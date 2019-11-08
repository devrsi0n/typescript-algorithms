import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty string symbol table.
 * @class
 */
export class TST<Value> {
  private n: number;

  private root: TST.Node<Value>;

  public constructor() {
    if (this.n === undefined) this.n = 0;
    if (this.root === undefined) this.root = null;
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.n;
  }

  /**
   * Does this symbol table contain the given key?
   * @param {string} key the key
   * @return  {@code true} if this symbol table contains {@code key} and
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public contains(key: string): boolean {
    if (key == null) {
      throw new Error('argument to contains() is null');
    }
    return this.get$java_lang_String(key) != null;
  }

  public get$java_lang_String(key: string): Value {
    if (key == null) {
      throw new Error('calls get() with null argument');
    }
    if (key.length === 0) throw new Error('key must have length >= 1');
    const x: TST.Node<
      Value
    > = this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
      this.root,
      key,
      0
    );
    if (x == null) return null;
    return x.val;
  }

  public get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
    x: TST.Node<Value>,
    key: string,
    d: number
  ): TST.Node<Value> {
    if (x == null) return null;
    if (key.length === 0) throw new Error('key must have length >= 1');
    const c: string = key.charAt(d);
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      return this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
        x.left,
        key,
        d
      );
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      return this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
        x.right,
        key,
        d
      );
    if (d < key.length - 1)
      return this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
        x.mid,
        key,
        d + 1
      );
    return x;
  }

  public get(x?: any, key?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TST.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(x, key, d)
      );
    }
    if (
      (typeof x === 'string' || x === null) &&
      key === undefined &&
      d === undefined
    ) {
      return <any>this.get$java_lang_String(x);
    }
    throw new Error('invalid overload');
  }

  public put$java_lang_String$java_lang_Object(key: string, val: Value) {
    if (key == null) {
      throw new Error('calls put() with null key');
    }
    if (!this.contains(key)) this.n++;
    else if (val == null) this.n--;
    this.root = this.put(this.root, key, val, 0);
  }

  public put$edu_princeton_cs_algs4_TST_Node$java_lang_String$java_lang_Object$int(
    x: TST.Node<Value>,
    key: string,
    val: Value,
    d: number
  ): TST.Node<Value> {
    const c: string = key.charAt(d);
    if (x == null) {
      x = <any>new TST.Node<Value>();
      x.c = c;
    }
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      x.left = this.put(x.left, key, val, d);
    else if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      x.right = this.put(x.right, key, val, d);
    else if (d < key.length - 1) x.mid = this.put(x.mid, key, val, d + 1);
    else x.val = val;
    return x;
  }

  public put(x?: any, key?: any, val?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TST.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (val != null || val === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.put$edu_princeton_cs_algs4_TST_Node$java_lang_String$java_lang_Object$int(
          x,
          key,
          val,
          d
        )
      );
    }
    if (
      (typeof x === 'string' || x === null) &&
      (key != null || key === null) &&
      val === undefined &&
      d === undefined
    ) {
      return <any>this.put$java_lang_String$java_lang_Object(x, key);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the string in the symbol table that is the longest prefix of {@code query},
   * or {@code null}, if no such string.
   * @param {string} query the query string
   * @return  the string in the symbol table that is the longest prefix of {@code query},
   * or {@code null} if no such string
   * @throws IllegalArgumentException if {@code query} is {@code null}
   */
  public longestPrefixOf(query: string): string {
    if (query == null) {
      throw new Error('calls longestPrefixOf() with null argument');
    }
    if (query.length === 0) return null;
    let length = 0;
    let x: TST.Node<Value> = this.root;
    let i = 0;
    while (x != null && i < query.length) {
      {
        const c: string = query.charAt(i);
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
        )
          x = x.left;
        else if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
        )
          x = x.right;
        else {
          i++;
          if (x.val != null) length = i;
          x = x.mid;
        }
      }
    }
    return query.substring(0, length);
  }

  /**
   * Returns all keys in the symbol table as an {@code Iterable}.
   * To iterate over all of the keys in the symbol table named {@code st},
   * use the foreach notation: {@code for (Key key : st.keys())}.
   * @return  all keys in the symbol table as an {@code Iterable}
   */
  public keys(): Iterable<string> {
    const queue: Queue<string> = <any>new Queue<string>();
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      this.root,
      new String(),
      queue
    );
    return queue;
  }

  /**
   * Returns all of the keys in the set that start with {@code prefix}.
   * @param {string} prefix the prefix
   * @return  all of the keys in the set that start with {@code prefix},
   * as an iterable
   * @throws IllegalArgumentException if {@code prefix} is {@code null}
   */
  public keysWithPrefix(prefix: string): Iterable<string> {
    if (prefix == null) {
      throw new Error('calls keysWithPrefix() with null argument');
    }
    const queue: Queue<string> = <any>new Queue<string>();
    const x: TST.Node<
      Value
    > = this.get$edu_princeton_cs_algs4_TST_Node$java_lang_String$int(
      this.root,
      prefix,
      0
    );
    if (x == null) return queue;
    if (x.val != null) queue.enqueue(prefix);
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x.mid,
      new java.lang.StringBuilder(prefix),
      queue
    );
    return queue;
  }

  collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
    x: TST.Node<Value>,
    prefix: java.lang.StringBuilder,
    queue: Queue<string>
  ) {
    if (x == null) return;
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x.left,
      prefix,
      queue
    );
    if (x.val != null) queue.enqueue(prefix.toString() + x.c);
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x.mid,
      prefix.append(x.c),
      queue
    );
    prefix.deleteCharAt(prefix.length() - 1);
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x.right,
      prefix,
      queue
    );
  }

  /**
   * Returns all of the keys in the symbol table that match {@code pattern},
   * where . symbol is treated as a wildcard character.
   * @param {string} pattern the pattern
   * @return  all of the keys in the symbol table that match {@code pattern},
   * as an iterable, where . is treated as a wildcard character.
   */
  public keysThatMatch(pattern: string): Iterable<string> {
    const queue: Queue<string> = <any>new Queue<string>();
    this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
      this.root,
      new String(),
      0,
      pattern,
      queue
    );
    return queue;
  }

  public collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
    x: TST.Node<Value>,
    prefix: java.lang.StringBuilder,
    i: number,
    pattern: string,
    queue: Queue<string>
  ) {
    if (x == null) return;
    const c: string = pattern.charAt(i);
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
        '.'.charCodeAt(0) ||
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
        x.left,
        prefix,
        i,
        pattern,
        queue
      );
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
        '.'.charCodeAt(0) ||
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    ) {
      if (i === pattern.length - 1 && x.val != null)
        queue.enqueue(prefix.toString() + x.c);
      if (i < pattern.length - 1) {
        this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
          x.mid,
          prefix.append(x.c),
          i + 1,
          pattern,
          queue
        );
        prefix.deleteCharAt(prefix.length() - 1);
      }
    }
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
        '.'.charCodeAt(0) ||
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(x.c)
    )
      this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
        x.right,
        prefix,
        i,
        pattern,
        queue
      );
  }

  public collect(
    x?: any,
    prefix?: any,
    i?: any,
    pattern?: any,
    queue?: any
  ): any {
    if (
      ((x != null && x instanceof <any>TST.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof pattern === 'string' || pattern === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null)
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$int$java_lang_String$edu_princeton_cs_algs4_Queue(
          x,
          prefix,
          i,
          pattern,
          queue
        )
      );
    }
    if (
      ((x != null && x instanceof <any>TST.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      ((i != null && i instanceof <any>Queue) || i === null) &&
      pattern === undefined &&
      queue === undefined
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
          x,
          prefix,
          i
        )
      );
    }
    throw new Error('invalid overload');
  }

  /**
   * Unit tests the {@code TST} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const st: TST<number> = <any>new TST<number>();
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    if (st.size() < 100) {
      StdOut.println$java_lang_Object('keys(""):');
      for (let index384 = st.keys().iterator(); index384.hasNext(); ) {
        const key = index384.next();
        {
          StdOut.println$java_lang_Object(
            `${key} ${st.get$java_lang_String(key)}`
          );
        }
      }
      StdOut.println();
    }
    StdOut.println$java_lang_Object('longestPrefixOf("shellsort"):');
    StdOut.println$java_lang_Object(st.longestPrefixOf('shellsort'));
    StdOut.println();
    StdOut.println$java_lang_Object('longestPrefixOf("shell"):');
    StdOut.println$java_lang_Object(st.longestPrefixOf('shell'));
    StdOut.println();
    StdOut.println$java_lang_Object('keysWithPrefix("shor"):');
    for (
      let index385 = st.keysWithPrefix('shor').iterator();
      index385.hasNext();

    ) {
      const s = index385.next();
      StdOut.println$java_lang_Object(s);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('keysThatMatch(".he.l."):');
    for (
      let index386 = st.keysThatMatch('.he.l.').iterator();
      index386.hasNext();

    ) {
      const s = index386.next();
      StdOut.println$java_lang_Object(s);
    }
  }
}
TST.__class = 'edu.princeton.cs.algs4.TST';

export namespace TST {
  export class Node<Value> {
    c: string;

    left: TST.Node<Value>;

    mid: TST.Node<Value>;

    right: TST.Node<Value>;

    val: Value;

    constructor() {
      if (this.c === undefined) this.c = null;
      if (this.left === undefined) this.left = null;
      if (this.mid === undefined) this.mid = null;
      if (this.right === undefined) this.right = null;
      if (this.val === undefined) this.val = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.TST.Node';
}

TST.main(null);
