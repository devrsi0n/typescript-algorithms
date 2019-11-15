import { StdOut } from './StdOut';

/**
 * Initializes an empty B-tree.
 * @class
 */
export class BTree<Key extends java.lang.Comparable<Key>, Value> {
  static M = 4;

  private root: BTree.Node;

  private __height: number;

  private n: number;

  public constructor() {
    if (this.root === undefined) this.root = null;
    if (this.__height === undefined) this.__height = 0;
    if (this.n === undefined) this.n = 0;
    this.root = new BTree.Node(0);
  }

  /**
   * Returns true if this symbol table is empty.
   * @return  `true` if this symbol table is empty; `false` otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   * @return  the number of key-value pairs in this symbol table
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns the height of this B-tree (for debugging).
   *
   * @return  the height of this B-tree
   */
  public height(): number {
    return this.__height;
  }

  /**
   * Returns the value associated with the given key.
   *
   * @param   key the key
   * @return  the value associated with the given key if the key is in the symbol table
   * and `null` if the key is not in the symbol table
   * @throws IllegalArgumentException if `key` is `null`
   */
  public get(key: Key): Value {
    if (key == null) throw new Error('argument to get() is null');
    return this.search(this.root, key, this.__height);
  }

  search(x: BTree.Node, key: Key, ht: number): Value {
    const { children } = x;
    if (ht === 0) {
      for (let j = 0; j < x.m; j++) {
        {
          if (this.eq(key, children[j].key))
            return <Value>(<any>children[j].val);
        }
      }
    } else {
      for (let j = 0; j < x.m; j++) {
        {
          if (j + 1 === x.m || this.less(key, children[j + 1].key))
            return this.search(children[j].next, key, ht - 1);
        }
      }
    }
    return null;
  }

  /**
   * Inserts the key-value pair into the symbol table, overwriting the old value
   * with the new value if the key is already in the symbol table.
   * If the value is `null`, this effectively deletes the key from the symbol table.
   *
   * @param   key the key
   * @param   val the value
   * @throws IllegalArgumentException if `key` is `null`
   */
  public put(key: Key, val: Value) {
    if (key == null) throw new Error('argument key to put() is null');
    const u: BTree.Node = this.insert(this.root, key, val, this.__height);
    this.n++;
    if (u == null) return;
    const t: BTree.Node = new BTree.Node(2);
    t.children[0] = new BTree.Entry(this.root.children[0].key, null, this.root);
    t.children[1] = new BTree.Entry(u.children[0].key, null, u);
    this.root = t;
    this.__height++;
  }

  insert(h: BTree.Node, key: Key, val: Value, ht: number): BTree.Node {
    let j: number;
    const t: BTree.Entry = new BTree.Entry(key, val, null);
    if (ht === 0) {
      for (j = 0; j < h.m; j++) {
        {
          if (this.less(key, h.children[j].key)) break;
        }
      }
    } else {
      for (j = 0; j < h.m; j++) {
        {
          if (j + 1 === h.m || this.less(key, h.children[j + 1].key)) {
            const u: BTree.Node = this.insert(
              h.children[j++].next,
              key,
              val,
              ht - 1
            );
            if (u == null) return null;
            t.key = u.children[0].key;
            t.next = u;
            break;
          }
        }
      }
    }
    for (let i: number = h.m; i > j; i--) {
      h.children[i] = h.children[i - 1];
    }
    h.children[j] = t;
    h.m++;
    if (h.m < BTree.M) return null;
    return this.split(h);
  }

  split(h: BTree.Node): BTree.Node {
    const t: BTree.Node = new BTree.Node((BTree.M / 2) | 0);
    h.m = (BTree.M / 2) | 0;
    for (let j = 0; j < ((BTree.M / 2) | 0); j++) {
      t.children[j] = h.children[((BTree.M / 2) | 0) + j];
    }
    return t;
  }

  public toString$(): string {
    return `${this.toString$edu_princeton_cs_algs4_BTree_Node$int$java_lang_String(
      this.root,
      this.__height,
      ''
    )}\n`;
  }

  public toString$edu_princeton_cs_algs4_BTree_Node$int$java_lang_String(
    h: BTree.Node,
    ht: number,
    indent: string
  ): string {
    const s = new String();
    const { children } = h;
    if (ht === 0) {
      for (let j = 0; j < h.m; j++) {
        {
          s.append(`${indent + children[j].key} ${children[j].val}\n`);
        }
      }
    } else {
      for (let j = 0; j < h.m; j++) {
        {
          if (j > 0) s.append(`${indent}(${children[j].key})\n`);
          s.append(
            this.toString$edu_princeton_cs_algs4_BTree_Node$int$java_lang_String(
              children[j].next,
              ht - 1,
              `${indent}     `
            )
          );
        }
      }
    }
    return s.toString();
  }

  public toString(h?: any, ht?: any, indent?: any): any {
    if (
      ((h != null && h instanceof <any>BTree.Node) || h === null) &&
      (typeof ht === 'number' || ht === null) &&
      (typeof indent === 'string' || indent === null)
    ) {
      return <any>(
        this.toString$edu_princeton_cs_algs4_BTree_Node$int$java_lang_String(
          h,
          ht,
          indent
        )
      );
    }
    if (h === undefined && ht === undefined && indent === undefined) {
      return <any>this.toString$();
    }
    throw new Error('invalid overload');
  }

  less(k1: java.lang.Comparable<any>, k2: java.lang.Comparable<any>): boolean {
    return k1.compareTo(k2) < 0;
  }

  eq(k1: java.lang.Comparable<any>, k2: java.lang.Comparable<any>): boolean {
    return k1.compareTo(k2) === 0;
  }

  /**
   * Unit tests the `BTree` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: BTree<string, string> = <any>new BTree<string, string>();
    st.put('www.cs.princeton.edu', '128.112.136.12');
    st.put('www.cs.princeton.edu', '128.112.136.11');
    st.put('www.princeton.edu', '128.112.128.15');
    st.put('www.yale.edu', '130.132.143.21');
    st.put('www.simpsons.com', '209.052.165.60');
    st.put('www.apple.com', '17.112.152.32');
    st.put('www.amazon.com', '207.171.182.16');
    st.put('www.ebay.com', '66.135.192.87');
    st.put('www.cnn.com', '64.236.16.20');
    st.put('www.google.com', '216.239.41.99');
    st.put('www.nytimes.com', '199.239.136.200');
    st.put('www.microsoft.com', '207.126.99.140');
    st.put('www.dell.com', '143.166.224.230');
    st.put('www.slashdot.org', '66.35.250.151');
    st.put('www.espn.com', '199.181.135.201');
    st.put('www.weather.com', '63.111.66.11');
    st.put('www.yahoo.com', '216.109.118.65');
    StdOut.println$java_lang_Object(
      `cs.princeton.edu:  ${st.get('www.cs.princeton.edu')}`
    );
    StdOut.println$java_lang_Object(
      `hardvardsucks.com: ${st.get('www.harvardsucks.com')}`
    );
    StdOut.println$java_lang_Object(
      `simpsons.com:      ${st.get('www.simpsons.com')}`
    );
    StdOut.println$java_lang_Object(
      `apple.com:         ${st.get('www.apple.com')}`
    );
    StdOut.println$java_lang_Object(
      `ebay.com:          ${st.get('www.ebay.com')}`
    );
    StdOut.println$java_lang_Object(
      `dell.com:          ${st.get('www.dell.com')}`
    );
    StdOut.println();
    StdOut.println$java_lang_Object(`size:    ${st.size()}`);
    StdOut.println$java_lang_Object(`height:  ${st.height()}`);
    StdOut.println$java_lang_Object(st);
    StdOut.println();
  }
}
BTree.__class = 'edu.princeton.cs.algs4.BTree';

export namespace BTree {
  export class Node {
    m: number;

    children: BTree.Entry[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(BTree.M);

    constructor(k: number) {
      if (this.m === undefined) this.m = 0;
      this.m = k;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.BTree.Node';

  export class Entry {
    key: java.lang.Comparable<any>;

    val: any;

    next: BTree.Node;

    public constructor(
      key: java.lang.Comparable<any>,
      val: any,
      next: BTree.Node
    ) {
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.next === undefined) this.next = null;
      this.key = key;
      this.val = val;
      this.next = next;
    }
  }
  Entry.__class = 'edu.princeton.cs.algs4.BTree.Entry';
}

BTree.main(null);
