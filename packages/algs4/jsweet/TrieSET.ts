import { Queue } from './Queue';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty set of strings.
 * @class
 * @author Robert Sedgewick
 */
export class TrieSET implements Iterable<string> {
  static R = 256;

  private root: TrieSET.Node;

  private n: number;

  public constructor() {
    if (this.root === undefined) this.root = null;
    if (this.n === undefined) this.n = 0;
  }

  /**
   * Does the set contain the given key?
   * @param {string} key the key
   * @return  {@code true} if the set contains {@code key} and
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public contains(key: string): boolean {
    if (key == null) throw new Error('argument to contains() is null');
    const x: TrieSET.Node = this.get(this.root, key, 0);
    if (x == null) return false;
    return x.isString;
  }

  get(x: TrieSET.Node, key: string, d: number): TrieSET.Node {
    if (x == null) return null;
    if (d === key.length) return x;
    const c: string = key.charAt(d);
    return this.get(x.next[c.charCodeAt(0)], key, d + 1);
  }

  public add$java_lang_String(key: string) {
    if (key == null) throw new Error('argument to add() is null');
    this.root = this.add$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
      this.root,
      key,
      0
    );
  }

  public add$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
    x: TrieSET.Node,
    key: string,
    d: number
  ): TrieSET.Node {
    if (x == null) x = new TrieSET.Node();
    if (d === key.length) {
      if (!x.isString) this.n++;
      x.isString = true;
    } else {
      const c: string = key.charAt(d);
      x.next[
        c.charCodeAt(0)
      ] = this.add$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
        x.next[c.charCodeAt(0)],
        key,
        d + 1
      );
    }
    return x;
  }

  public add(x?: any, key?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TrieSET.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.add$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
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
      return <any>this.add$java_lang_String(x);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the number of strings in the set.
   * @return  the number of strings in the set
   */
  public size(): number {
    return this.n;
  }

  /**
   * Is the set empty?
   * @return  {@code true} if the set is empty, and {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns all of the keys in the set, as an iterator.
   * To iterate over all of the keys in a set named {@code set}, use the
   * foreach notation: {@code for (Key key : set)}.
   * @return  an iterator to all of the keys in the set
   */
  public iterator(): Iterator<string> {
    return this.keysWithPrefix('').iterator();
  }

  /**
   * Returns all of the keys in the set that start with {@code prefix}.
   * @param {string} prefix the prefix
   * @return  all of the keys in the set that start with {@code prefix},
   * as an iterable
   */
  public keysWithPrefix(prefix: string): Iterable<string> {
    const results: Queue<string> = <any>new Queue<string>();
    const x: TrieSET.Node = this.get(this.root, prefix, 0);
    this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
      x,
      new java.lang.StringBuilder(prefix),
      results
    );
    return results;
  }

  collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
    x: TrieSET.Node,
    prefix: java.lang.StringBuilder,
    results: Queue<string>
  ) {
    if (x == null) return;
    if (x.isString) results.enqueue(prefix.toString());
    for (
      let c: string = String.fromCharCode(0);
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) < TrieSET.R;
      c++
    ) {
      {
        prefix.append(c);
        this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
          x.next[c.charCodeAt(0)],
          prefix,
          results
        );
        prefix.deleteCharAt(prefix.length() - 1);
      }
    }
  }

  /**
   * Returns all of the keys in the set that match {@code pattern},
   * where . symbol is treated as a wildcard character.
   * @param {string} pattern the pattern
   * @return  all of the keys in the set that match {@code pattern},
   * as an iterable, where . is treated as a wildcard character.
   */
  public keysThatMatch(pattern: string): Iterable<string> {
    const results: Queue<string> = <any>new Queue<string>();
    const prefix= new String();
    this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
      this.root,
      prefix,
      pattern,
      results
    );
    return results;
  }

  public collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
    x: TrieSET.Node,
    prefix: java.lang.StringBuilder,
    pattern: string,
    results: Queue<string>
  ) {
    if (x == null) return;
    const d: number = prefix.length();
    if (d === pattern.length && x.isString) results.enqueue(prefix.toString());
    if (d === pattern.length) return;
    const c: string = pattern.charAt(d);
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) ==
      '.'.charCodeAt(0)
    ) {
      for (
        let ch: string = String.fromCharCode(0);
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(ch) <
        TrieSET.R;
        ch++
      ) {
        {
          prefix.append(ch);
          this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
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
      this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
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
      ((x != null && x instanceof <any>TrieSET.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      (typeof pattern === 'string' || pattern === null) &&
      ((results != null && results instanceof <any>Queue) || results === null)
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$java_lang_String$edu_princeton_cs_algs4_Queue(
          x,
          prefix,
          pattern,
          results
        )
      );
    }
    if (
      ((x != null && x instanceof <any>TrieSET.Node) || x === null) &&
      ((prefix != null && prefix instanceof <any>StringBuilder) ||
        prefix === null) &&
      ((pattern != null && pattern instanceof <any>Queue) ||
        pattern === null) &&
      results === undefined
    ) {
      return <any>(
        this.collect$edu_princeton_cs_algs4_TrieSET_Node$java_lang_StringBuilder$edu_princeton_cs_algs4_Queue(
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
    const length: number = this.longestPrefixOf$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int$int(
      this.root,
      query,
      0,
      -1
    );
    if (length === -1) return null;
    return query.substring(0, length);
  }

  public longestPrefixOf$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int$int(
    x: TrieSET.Node,
    query: string,
    d: number,
    length: number
  ): number {
    if (x == null) return length;
    if (x.isString) length = d;
    if (d === query.length) return length;
    const c: string = query.charAt(d);
    return this.longestPrefixOf$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int$int(
      x.next[c.charCodeAt(0)],
      query,
      d + 1,
      length
    );
  }

  public longestPrefixOf(x?: any, query?: any, d?: any, length?: any): any {
    if (
      ((x != null && x instanceof <any>TrieSET.Node) || x === null) &&
      (typeof query === 'string' || query === null) &&
      (typeof d === 'number' || d === null) &&
      (typeof length === 'number' || length === null)
    ) {
      return <any>(
        this.longestPrefixOf$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int$int(
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
    this.root = this.delete$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
      this.root,
      key,
      0
    );
  }

  public delete$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
    x: TrieSET.Node,
    key: string,
    d: number
  ): TrieSET.Node {
    if (x == null) return null;
    if (d === key.length) {
      if (x.isString) this.n--;
      x.isString = false;
    } else {
      const c: string = key.charAt(d);
      x.next[
        c.charCodeAt(0)
      ] = this.delete$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
        x.next[c.charCodeAt(0)],
        key,
        d + 1
      );
    }
    if (x.isString) return x;
    for (let c = 0; c < TrieSET.R; c++) {
      if (x.next[c] != null) return x;
    }
    return null;
  }

  public delete(x?: any, key?: any, d?: any): any {
    if (
      ((x != null && x instanceof <any>TrieSET.Node) || x === null) &&
      (typeof key === 'string' || key === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        this.delete$edu_princeton_cs_algs4_TrieSET_Node$java_lang_String$int(
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
   * Unit tests the {@code TrieSET} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const set: TrieSET = new TrieSET();
    while (!StdIn.isEmpty()) {
      {
        const key: string = StdIn.readString();
        set.add$java_lang_String(key);
      }
    }
    if (set.size() < 100) {
      StdOut.println$java_lang_Object('keys(""):');
      for (let index377 = set.iterator(); index377.hasNext(); ) {
        const key = index377.next();
        {
          StdOut.println$java_lang_Object(key);
        }
      }
      StdOut.println();
    }
    StdOut.println$java_lang_Object('longestPrefixOf("shellsort"):');
    StdOut.println$java_lang_Object(
      set.longestPrefixOf$java_lang_String('shellsort')
    );
    StdOut.println();
    StdOut.println$java_lang_Object('longestPrefixOf("xshellsort"):');
    StdOut.println$java_lang_Object(
      set.longestPrefixOf$java_lang_String('xshellsort')
    );
    StdOut.println();
    StdOut.println$java_lang_Object('keysWithPrefix("shor"):');
    for (
      let index378 = set.keysWithPrefix('shor').iterator();
      index378.hasNext();

    ) {
      const s = index378.next();
      StdOut.println$java_lang_Object(s);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('keysWithPrefix("shortening"):');
    for (
      let index379 = set.keysWithPrefix('shortening').iterator();
      index379.hasNext();

    ) {
      const s = index379.next();
      StdOut.println$java_lang_Object(s);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('keysThatMatch(".he.l."):');
    for (
      let index380 = set.keysThatMatch('.he.l.').iterator();
      index380.hasNext();

    ) {
      const s = index380.next();
      StdOut.println$java_lang_Object(s);
    }
  }
}
TrieSET.__class = 'edu.princeton.cs.algs4.TrieSET';
TrieSET.__interfaces = ['Iterable'];

export namespace TrieSET {
  export class Node {
    next: TrieSET.Node[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(TrieSET.R);

    isString: boolean;

    constructor() {
      if (this.isString === undefined) this.isString = false;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.TrieSET.Node';
}

TrieSET.main(null);
