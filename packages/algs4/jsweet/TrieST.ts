import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty string symbol table.
 * @class
 */
export class TrieST<Value> {
  static R = 256;

  private root: TrieST.Node;

  private n: number;

  public constructor() {
    if (this.root === undefined) this.root = null;
    if (this.n === undefined) this.n = 0;
  }

  public get$java_lang_String(key: string): Value {
    if (key == null) throw new Error('argument to get() is null');
    const x: TrieST.Node = this.get$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
      this.root,
      key,
      0
    );
    if (x == null) return null;
    return <Value>(<any>x.val);
  }

  /**
   * Does this symbol table contain the given key?
   * @param  key the key
   * @return  `true` if this symbol table contains `key` and
   * `false` otherwise
   * @throws IllegalArgumentException if `key` is `null`
   */
  public contains(key: string): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    return this.get$java_lang_String(key) != null;
  }

  public get$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
    x: TrieST.Node,
    key: string,
    d: number
  ): TrieST.Node {
    if (x == null) return null;
    if (d === key.length) return x;
    const c: string = key.charAt(d);
    return this.get$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
      x.next[c.charCodeAt(0)],
      key,
      d + 1
    );
  }

  public get(x?: any, key?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.get$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
          x,
          key,
          d
        )
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
    if (key == null) throw new Error('first argument to put() is null');
    if (val == null) this.delete$java_lang_String(key);
    else this.root = this.put(this.root, key, val, 0);
  }

  public put$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$java_lang_Object$int(
    x: TrieST.Node,
    key: string,
    val: Value,
    d: number
  ): TrieST.Node {
    if (x == null) x = new TrieST.Node();
    if (d === key.length) {
      if (x.val == null) this.n++;
      x.val = val;
      return x;
    }
    const c: string = key.charAt(d);
    x.next[c.charCodeAt(0)] = this.put(
      x.next[c.charCodeAt(0)],
      key,
      val,
      d + 1
    );
    return x;
  }

  public put(x?: any, key?: any, val?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (val != null || val === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.put$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$java_lang_Object$int(
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
   * Returns the number of key-value pairs in this symbol table.
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.n;
  }

  /**
   * Is this symbol table empty?
   * @return  `true` if this symbol table is empty and `false` otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns all keys in the symbol table as an `Iterable`.
   * To iterate over all of the keys in the symbol table named `st`,
   * use the foreach notation: `for (Key key : st.keys())`.
   * @return  all keys in the symbol table as an `Iterable`
   */
  public keys(): Iterable<string> {
    return this.keysWithPrefix('');
  }

  /**
   * Returns all of the keys in the set that start with `prefix`.
   * @param  prefix the prefix
   * @return  all of the keys in the set that start with `prefix`,
   * as an iterable
   */
  public keysWithPrefix(prefix: string): Iterable<string> {
    const results: Queue<string> = <any>new Queue<string>();
    const x: TrieST.Node = this.get$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
      this.root,
      prefix,
      0
    );
    this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x,
      new java.lang.StringBuilder(prefix),
      results
    );
    return results;
  }

  collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
    x: TrieST.Node,
    prefix: java.lang.StringBuilder,
    results: Queue<string>
  ) {
    if (x == null) return;
    if (x.val != null) results.enqueue(prefix.toString());
    for (
      let c: string = String.fromCharCode(0);
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) < TrieST.R;
      c++
    ) {
      {
        prefix.append(c);
        this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
          x.next[c.charCodeAt(0)],
          prefix,
          results
        );
        prefix.deleteCharAt(prefix.length() - 1);
      }
    }
  }

  /**
   * Returns all of the keys in the symbol table that match `pattern`,
   * where . symbol is treated as a wildcard character.
   * @param  pattern the pattern
   * @return  all of the keys in the symbol table that match `pattern`,
   * as an iterable, where . is treated as a wildcard character.
   */
  public keysThatMatch(pattern: string): Iterable<string> {
    const results: Queue<string> = <any>new Queue<string>();
    this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
      this.root,
      new String(),
      pattern,
      results
    );
    return results;
  }

  public collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
    x: TrieST.Node,
    prefix: java.lang.StringBuilder,
    pattern: string,
    results: Queue<string>
  ) {
    if (x == null) return;
    const d: number = prefix.length();
    if (d === pattern.length && x.val != null)
      results.enqueue(prefix.toString());
    if (d === pattern.length) return;
    const c: string = pattern.charAt(d);
    if (
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
      '.'.charCodeAt(0)
    ) {
      for (
        let ch: string = String.fromCharCode(0);
        ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(ch) <
        TrieST.R;
        ch++
      ) {
        {
          prefix.append(ch);
          this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
            x.next[ch.charCodeAt(0)],
            prefix,
            pattern,
            results
          );
          prefix.deleteCharAt(prefix.length() - 1);
        }
      }
    } else {
      prefix.append(c);
      this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
        x.next[c.charCodeAt(0)],
        prefix,
        pattern,
        results
      );
      prefix.deleteCharAt(prefix.length() - 1);
    }
  }

  public collect(x?: any, prefix?: any, pattern?: any, results?: any): any {
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      (typeof pattern === 'string' || pattern === null) &&
      ((results != null && results instanceof <any>Queue) || results === null)
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
          x,
          prefix,
          pattern,
          results
        )
      );
    }
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      ((pattern != null && pattern instanceof <any>Queue) ||
        pattern === null) &&
      results === undefined
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TrieST_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
          x,
          prefix,
          pattern
        )
      );
    }
    throw new Error('invalid overload');
  }

  public longestPrefixOf$java_lang_String(query: string): string {
    if (query == null) throw new Error('argument to longestPrefixOf() is null');
    const length: number = this.longestPrefixOf$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int$int(
      this.root,
      query,
      0,
      -1
    );
    if (length === -1) return null;
    return query.substring(0, length);
  }

  public longestPrefixOf$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int$int(
    x: TrieST.Node,
    query: string,
    d: number,
    length: number
  ): number {
    if (x == null) return length;
    if (x.val != null) length = d;
    if (d === query.length) return length;
    const c: string = query.charAt(d);
    return this.longestPrefixOf$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int$int(
      x.next[c.charCodeAt(0)],
      query,
      d + 1,
      length
    );
  }

  public longestPrefixOf(x?: any, query?: any, d?: any, length?: any): any {
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      (typeof query === 'string' || query === null) &&
      (typeof d === 'number' || d === null) &&
      (typeof length === 'number' || length === null)
    ) {
      return <any>(
        this.longestPrefixOf$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int$int(
          x,
          query,
          d,
          length
        )
      );
    }
    if (
      (typeof x === 'string' || x === null) &&
      query === undefined &&
      d === undefined &&
      length === undefined
    ) {
      return <any>this.longestPrefixOf$java_lang_String(x);
    }
    throw new Error('invalid overload');
  }

  public delete$java_lang_String(key: string) {
    if (key == null) throw new Error('argument to delete() is null');
    this.root = this.delete$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
      this.root,
      key,
      0
    );
  }

  public delete$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
    x: TrieST.Node,
    key: string,
    d: number
  ): TrieST.Node {
    if (x == null) return null;
    if (d === key.length) {
      if (x.val != null) this.n--;
      x.val = null;
    } else {
      const c: string = key.charAt(d);
      x.next[
        c.charCodeAt(0)
      ] = this.delete$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
        x.next[c.charCodeAt(0)],
        key,
        d + 1
      );
    }
    if (x.val != null) return x;
    for (let c = 0; c < TrieST.R; c++) {
      if (x.next[c] != null) return x;
    }
    return null;
  }

  public delete(x?: any, key?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TrieST.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_TrieST_Node$java_lang_String$int(
          x,
          key,
          d
        )
      );
    }
    if (
      (typeof x === 'string' || x === null) &&
      key === undefined &&
      d === undefined
    ) {
      return <any>this.delete$java_lang_String(x);
    }
    throw new Error('invalid overload');
  }

  /**
   * Unit tests the `TrieST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const st: TrieST<number> = <any>new TrieST<number>();
    for (let i = 0; !StdIn.isEmpty(); i++) {
      {
        const key: string = StdIn.readString();
        st.put(key, i);
      }
    }
    if (st.size() < 100) {
      StdOut.println$java_lang_Object('keys(""):');
      for (let index381 = st.keys().iterator(); index381.hasNext(); ) {
        const key = index381.next();
        {
          StdOut.println$java_lang_Object(
            `${key} ${st.get$java_lang_String(key)}`
          );
        }
      }
      StdOut.println();
    }
    StdOut.println$java_lang_Object('longestPrefixOf("shellsort"):');
    StdOut.println$java_lang_Object(
      st.longestPrefixOf$java_lang_String('shellsort')
    );
    StdOut.println();
    StdOut.println$java_lang_Object('longestPrefixOf("quicksort"):');
    StdOut.println$java_lang_Object(
      st.longestPrefixOf$java_lang_String('quicksort')
    );
    StdOut.println();
    StdOut.println$java_lang_Object('keysWithPrefix("shor"):');
    for (
      let index382 = st.keysWithPrefix('shor').iterator();
      index382.hasNext();

    ) {
      const s = index382.next();
      StdOut.println$java_lang_Object(s);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('keysThatMatch(".he.l."):');
    for (
      let index383 = st.keysThatMatch('.he.l.').iterator();
      index383.hasNext();

    ) {
      const s = index383.next();
      StdOut.println$java_lang_Object(s);
    }
  }
}
TrieST.__class = 'edu.princeton.cs.algs4.TrieST';

export namespace TrieST {
  export class Node {
    val: any;

    next: TrieST.Node[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(TrieST.R);

    constructor() {
      if (this.val === undefined) this.val = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.TrieST.Node';
}

TrieST.main(null);
