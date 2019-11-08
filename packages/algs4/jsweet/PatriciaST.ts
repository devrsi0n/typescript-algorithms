import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Initializes an empty PATRICIA-based symbol table.
 * @class
 * @author John Hentosh (based on an implementation by Robert Sedgewick)
 */
export class PatriciaST<Value> {
  private head: PatriciaST.Node;

  private count: number;

  public constructor() {
    if (this.head === undefined) this.head = null;
    if (this.count === undefined) this.count = 0;
    this.head = new PatriciaST.Node(this, '', null, 0);
    this.head.left = this.head;
    this.head.right = this.head;
    this.count = 0;
  }

  /**
   * Places a key-value pair into the symbol table. If the table already
   * contains the specified key, then its associated value becomes updated.
   * If the value provided is {@code null}, then the key becomes removed
   * from the symbol table.
   * @param  key the key
   * @param  val the value
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public put(key: string, val: Value) {
    if (key == null) throw new Error('called put(null)');
    if (key.length === 0) throw new Error('invalid key');
    if (val == null) this.delete(key);
    let p: PatriciaST.Node;
    let x: PatriciaST.Node = this.head;
    do {
      {
        p = x;
        if (PatriciaST.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    if (!/* equals */ (<any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(x.key, key))) {
      const b: number = PatriciaST.firstDifferingBit(x.key, key);
      x = this.head;
      do {
        {
          p = x;
          if (PatriciaST.safeBitTest(key, x.b)) x = x.right;
          else x = x.left;
        }
      } while (p.b < x.b && x.b < b);
      const t: PatriciaST.Node = new PatriciaST.Node(this, key, val, b);
      if (PatriciaST.safeBitTest(key, b)) {
        t.left = x;
        t.right = t;
      } else {
        t.left = t;
        t.right = x;
      }
      if (PatriciaST.safeBitTest(key, p.b)) p.right = t;
      else p.left = t;
      this.count++;
    } else x.val = val;
  }

  /**
   * Retrieves the value associated with the given key.
   * @param  key the key
   * @return  the value associated with the given key if the key is in the
   * symbol table and {@code null} if the key is not in the symbol table
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public get(key: string): Value {
    if (key == null) throw new Error('called get(null)');
    if (key.length === 0) throw new Error('invalid key');
    let p: PatriciaST.Node;
    let x: PatriciaST.Node = this.head;
    do {
      {
        p = x;
        if (PatriciaST.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(x.key, key)) return x.val;
    return null;
  }

  /**
   * Removes a key and its associated value from the symbol table, if it
   * exists.
   * @param  key the key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public delete(key: string) {
    if (key == null) throw new Error('called delete(null)');
    if (key.length === 0) throw new Error('invalid key');
    let g: PatriciaST.Node;
    let p: PatriciaST.Node = this.head;
    let x: PatriciaST.Node = this.head;
    do {
      {
        g = p;
        p = x;
        if (PatriciaST.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(x.key, key)) {
      let z: PatriciaST.Node;
      let y: PatriciaST.Node = this.head;
      do {
        {
          z = y;
          if (PatriciaST.safeBitTest(key, y.b)) y = y.right;
          else y = y.left;
        }
      } while (y !== x);
      if (x === p) {
        let c: PatriciaST.Node;
        if (PatriciaST.safeBitTest(key, x.b)) c = x.left;
        else c = x.right;
        if (PatriciaST.safeBitTest(key, z.b)) z.right = c;
        else z.left = c;
      } else {
        let c: PatriciaST.Node;
        if (PatriciaST.safeBitTest(key, p.b)) c = p.left;
        else c = p.right;
        if (PatriciaST.safeBitTest(key, g.b)) g.right = c;
        else g.left = c;
        if (PatriciaST.safeBitTest(key, z.b)) z.right = p;
        else z.left = p;
        p.left = x.left;
        p.right = x.right;
        p.b = x.b;
      }
      this.count--;
    }
  }

  /**
   * Returns {@code true} if the key-value pair, specified by the given
   * key, exists within the symbol table.
   * @param  key the key
   * @return  {@code true} if this symbol table contains the given
   * {@code key} and {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public contains(key: string): boolean {
    return this.get(key) != null;
  }

  /**
   * Returns {@code true} if the symbol table is empty.
   * @return  {@code true} if this symbol table is empty and
   * {@code false} otherwise
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of key-value pairs within the symbol table.
   * @return  the number of key-value pairs within this symbol table
   */
  size(): number {
    return this.count;
  }

  public keys$(): Iterable<string> {
    const queue: Queue<string> = <any>new Queue<string>();
    if (this.head.left !== this.head)
      this.keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
        this.head.left,
        0,
        queue
      );
    if (this.head.right !== this.head)
      this.keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
        this.head.right,
        0,
        queue
      );
    return queue;
  }

  public keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
    x: PatriciaST.Node,
    b: number,
    queue: Queue<string>
  ) {
    if (x.b > b) {
      this.keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
        x.left,
        x.b,
        queue
      );
      queue.enqueue(x.key);
      this.keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
        x.right,
        x.b,
        queue
      );
    }
  }

  public keys(x?: any, b?: any, queue?: any): any {
    if (
      ((x != null && x instanceof <any>PatriciaST.Node) || x === null) &&
      (typeof b === 'number' || b === null) &&
      ((queue != null && queue instanceof <any>Queue) || queue === null)
    ) {
      return <any>(
        this.keys$edu_princeton_cs_algs4_PatriciaST_Node$int$edu_princeton_cs_algs4_Queue(
          x,
          b,
          queue
        )
      );
    }
    if (x === undefined && b === undefined && queue === undefined) {
      return <any>this.keys$();
    }
    throw new Error('invalid overload');
  }

  static safeBitTest(key: string, b: number): boolean {
    if (b < key.length * 16) return PatriciaST.bitTest(key, b) !== 0;
    if (b > key.length * 16 + 15) return false;
    return true;
  }

  static bitTest(key: string, b: number): number {
    return (key.charAt(b >>> 4) >>> (b & 15)) & 1;
  }

  static safeCharAt(key: string, i: number): number {
    if (i < key.length) return key.charAt(i).charCodeAt(0);
    if (i > key.length) return 0;
    return 65535;
  }

  static firstDifferingBit(k1: string, k2: string): number {
    let i = 0;
    let c1: number = PatriciaST.safeCharAt(k1, 0) & ~1;
    let c2: number = PatriciaST.safeCharAt(k2, 0) & ~1;
    if (c1 === c2) {
      i = 1;
      while (PatriciaST.safeCharAt(k1, i) === PatriciaST.safeCharAt(k2, i)) {
        i++;
      }
      c1 = PatriciaST.safeCharAt(k1, i);
      c2 = PatriciaST.safeCharAt(k2, i);
    }
    let b = 0;
    while (((c1 >>> b) & 1) === ((c2 >>> b) & 1)) {
      b++;
    }
    return i * 16 + b;
  }

  /**
   * Unit tests the {@code PatriciaST} data type.
   * This test fixture runs a series of tests on a randomly generated dataset.
   * You may specify up to two integer parameters on the command line. The
   * first parameter indicates the size of the dataset. The second parameter
   * controls the number of passes (a new random dataset becomes generated at
   * the start of each pass).
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const st: PatriciaST<number> = <any>new PatriciaST<number>();
    let limitItem = 1000000;
    let limitPass = 1;
    let countPass = 0;
    let ok = true;
    if (args.length > 0)
      limitItem = parseInt(args[0]);
    if (args.length > 1)
      limitPass = parseInt(args[1]);
    do {
      {
        const a: string[] = (s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(limitItem);
        const v: number[] = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(limitItem);
        StdOut.printf('Creating dataset (%d items)...\n', limitItem);
        for (let i = 0; i < limitItem; i++) {
          {
            a[i] = /* toString */ `${i}`;
            v[i] = i;
          }
        }
        StdOut.printf('Shuffling...\n');
        StdRandom.shuffle$int_A(v);
        StdOut.printf('Adding (%d items)...\n', limitItem);
        for (let i = 0; i < limitItem; i++) {
          st.put(a[v[i]], v[i]);
        }
        let countKeys = 0;
        StdOut.printf('Iterating...\n');
        for (let index324 = st.keys().iterator(); index324.hasNext(); ) {
          const key = index324.next();
          countKeys++;
        }
        StdOut.printf('%d items iterated\n', countKeys);
        if (countKeys !== limitItem) ok = false;
        if (countKeys !== st.size()) ok = false;
        StdOut.printf('Shuffling...\n');
        StdRandom.shuffle$int_A(v);
        const limitDelete: number = (limitItem / 2) | 0;
        StdOut.printf('Deleting (%d items)...\n', limitDelete);
        for (let i = 0; i < limitDelete; i++) {
          st.delete(a[v[i]]);
        }
        countKeys = 0;
        StdOut.printf('Iterating...\n');
        for (let index325 = st.keys().iterator(); index325.hasNext(); ) {
          const key = index325.next();
          countKeys++;
        }
        StdOut.printf('%d items iterated\n', countKeys);
        if (countKeys !== limitItem - limitDelete) ok = false;
        if (countKeys !== st.size()) ok = false;
        let countDelete = 0;
        let countRemain = 0;
        StdOut.printf('Checking...\n');
        for (let i = 0; i < limitItem; i++) {
          {
            if (i < limitDelete) {
              if (!st.contains(a[v[i]])) countDelete++;
            } else {
              const val: number = st.get(a[v[i]]);
              if (val === v[i]) countRemain++;
            }
          }
        }
        StdOut.printf(
          '%d items found and %d (deleted) items missing\n',
          countRemain,
          countDelete
        );
        if (countRemain + countDelete !== limitItem) ok = false;
        if (countRemain !== st.size()) ok = false;
        if (st.isEmpty()) ok = false;
        StdOut.printf(
          'Deleting the rest (%d items)...\n',
          limitItem - countDelete
        );
        for (let i: number = countDelete; i < limitItem; i++) {
          st.delete(a[v[i]]);
        }
        if (!st.isEmpty()) ok = false;
        countPass++;
        if (ok) StdOut.printf('PASS %d TESTS SUCCEEDED\n', countPass);
        else StdOut.printf('PASS %d TESTS FAILED\n', countPass);
      }
    } while (ok && countPass < limitPass);
    if (!ok) throw new java.lang.RuntimeException('TESTS FAILED');
  }
}
PatriciaST.__class = 'edu.princeton.cs.algs4.PatriciaST';

export namespace PatriciaST {
  export class Node {
    public __parent: any;
    left: PatriciaST.Node;

    right: PatriciaST.Node;

    key: string;

    val: any;

    b: number;

    public constructor(__parent: any, key: string, val: any, b: number) {
      this.__parent = __parent;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.key === undefined) this.key = null;
      if (this.val === undefined) this.val = null;
      if (this.b === undefined) this.b = 0;
      this.key = key;
      this.val = val;
      this.b = b;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.PatriciaST.Node';
}

PatriciaST.main(null);
