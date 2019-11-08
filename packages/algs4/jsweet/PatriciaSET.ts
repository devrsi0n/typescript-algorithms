import { Queue } from './Queue';
import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Initializes an empty PATRICIA-based set.
 * @class
 * @author John Hentosh (based on an implementation by Robert Sedgewick)
 */
export class PatriciaSET implements Iterable<string> {
  private head: PatriciaSET.Node;

  private count: number;

  public constructor() {
    if (this.head === undefined) this.head = null;
    if (this.count === undefined) this.count = 0;
    this.head = new PatriciaSET.Node(this, '', 0);
    this.head.left = this.head;
    this.head.right = this.head;
    this.count = 0;
  }

  /**
   * Adds the key to the set if it is not already present.
   * @param {string} key the key to add
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public add(key: string) {
    if (key == null) throw new Error('called add(null)');
    if (key.length === 0) throw new Error('invalid key');
    let p: PatriciaSET.Node;
    let x: PatriciaSET.Node = this.head;
    do {
      {
        p = x;
        if (PatriciaSET.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    if (!/* equals */ (<any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(x.key, key))) {
      const b: number = PatriciaSET.firstDifferingBit(x.key, key);
      x = this.head;
      do {
        {
          p = x;
          if (PatriciaSET.safeBitTest(key, x.b)) x = x.right;
          else x = x.left;
        }
      } while (p.b < x.b && x.b < b);
      const t: PatriciaSET.Node = new PatriciaSET.Node(this, key, b);
      if (PatriciaSET.safeBitTest(key, b)) {
        t.left = x;
        t.right = t;
      } else {
        t.left = t;
        t.right = x;
      }
      if (PatriciaSET.safeBitTest(key, p.b)) p.right = t;
      else p.left = t;
      this.count++;
    }
  }

  /**
   * Does the set contain the given key?
   * @param {string} key the key
   * @return  {@code true} if the set contains {@code key} and
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public contains(key: string): boolean {
    if (key == null) throw new Error('called contains(null)');
    if (key.length === 0) throw new Error('invalid key');
    let p: PatriciaSET.Node;
    let x: PatriciaSET.Node = this.head;
    do {
      {
        p = x;
        if (PatriciaSET.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    return /* equals */ <any>((o1: any, o2: any) => {
      if (o1 && o1.equals) {
        return o1.equals(o2);
      }
      return o1 === o2;
    })(x.key, key);
  }

  /**
   * Removes the key from the set if the key is present.
   * @param {string} key the key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws IllegalArgumentException if {@code key} is the empty string.
   */
  public delete(key: string) {
    if (key == null) throw new Error('called delete(null)');
    if (key.length === 0) throw new Error('invalid key');
    let g: PatriciaSET.Node;
    let p: PatriciaSET.Node = this.head;
    let x: PatriciaSET.Node = this.head;
    do {
      {
        g = p;
        p = x;
        if (PatriciaSET.safeBitTest(key, x.b)) x = x.right;
        else x = x.left;
      }
    } while (p.b < x.b);
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(x.key, key)) {
      let z: PatriciaSET.Node;
      let y: PatriciaSET.Node = this.head;
      do {
        {
          z = y;
          if (PatriciaSET.safeBitTest(key, y.b)) y = y.right;
          else y = y.left;
        }
      } while (y !== x);
      if (x === p) {
        let c: PatriciaSET.Node;
        if (PatriciaSET.safeBitTest(key, x.b)) c = x.left;
        else c = x.right;
        if (PatriciaSET.safeBitTest(key, z.b)) z.right = c;
        else z.left = c;
      } else {
        let c: PatriciaSET.Node;
        if (PatriciaSET.safeBitTest(key, p.b)) c = p.left;
        else c = p.right;
        if (PatriciaSET.safeBitTest(key, g.b)) g.right = c;
        else g.left = c;
        if (PatriciaSET.safeBitTest(key, z.b)) z.right = p;
        else z.left = p;
        p.left = x.left;
        p.right = x.right;
        p.b = x.b;
      }
      this.count--;
    }
  }

  /**
   * Is the set empty?
   * @return  {@code true} if the set is empty, and {@code false}
   * otherwise
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of keys in the set.
   * @return  the number of keys in the set
   */
  size(): number {
    return this.count;
  }

  /**
   * Returns all of the keys in the set, as an iterator.
   * To iterate over all of the keys in a set named {@code set}, use the
   * foreach notation: {@code for (Key key : set)}.
   * @return  an iterator to all of the keys in the set
   */
  public iterator(): Iterator<string> {
    const queue: Queue<string> = <any>new Queue<string>();
    if (this.head.left !== this.head) this.collect(this.head.left, 0, queue);
    if (this.head.right !== this.head) this.collect(this.head.right, 0, queue);
    return queue.iterator();
  }

  collect(x: PatriciaSET.Node, b: number, queue: Queue<string>) {
    if (x.b > b) {
      this.collect(x.left, x.b, queue);
      queue.enqueue(x.key);
      this.collect(x.right, x.b, queue);
    }
  }

  /**
   * Returns a string representation of this set.
   * @return  a string representation of this set, with the keys separated
   * by single spaces
   */
  public toString(): string {
    const s= new String();
    for (let index321 = this.iterator(); index321.hasNext(); ) {
      const key = index321.next();
      s.append(`${key} `);
    }
    if (s.length() > 0) s.deleteCharAt(s.length() - 1);
    return s.toString();
  }

  static safeBitTest(key: string, b: number): boolean {
    if (b < key.length * 16) return PatriciaSET.bitTest(key, b) !== 0;
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
    let c1: number = PatriciaSET.safeCharAt(k1, 0) & ~1;
    let c2: number = PatriciaSET.safeCharAt(k2, 0) & ~1;
    if (c1 === c2) {
      i = 1;
      while (PatriciaSET.safeCharAt(k1, i) === PatriciaSET.safeCharAt(k2, i)) {
        i++;
      }
      c1 = PatriciaSET.safeCharAt(k1, i);
      c2 = PatriciaSET.safeCharAt(k2, i);
    }
    let b = 0;
    while (((c1 >>> b) & 1) === ((c2 >>> b) & 1)) {
      b++;
    }
    return i * 16 + b;
  }

  /**
   * Unit tests the {@code PatriciaSET} data type.
   * This test fixture runs a series of tests on a randomly generated dataset.
   * You may specify up to two integer parameters on the command line. The
   * first parameter indicates the size of the dataset. The second parameter
   * controls the number of passes (a new random dataset becomes generated at
   * the start of each pass).
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const set: PatriciaSET = new PatriciaSET();
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
        StdOut.printf('Creating dataset (%d items)...\n', limitItem);
        for (let i = 0; i < limitItem; i++) {
          a[i] = /* toString */ `${i}`;
        }
        StdOut.printf('Shuffling...\n');
        StdRandom.shuffle$java_lang_Object_A(a);
        StdOut.printf('Adding (%d items)...\n', limitItem);
        for (let i = 0; i < limitItem; i++) {
          set.add(a[i]);
        }
        let countItems = 0;
        StdOut.printf('Iterating...\n');
        for (let index322 = set.iterator(); index322.hasNext(); ) {
          const key = index322.next();
          countItems++;
        }
        StdOut.printf('%d items iterated\n', countItems);
        if (countItems !== limitItem) ok = false;
        if (countItems !== set.size()) ok = false;
        StdOut.printf('Shuffling...\n');
        StdRandom.shuffle$java_lang_Object_A(a);
        const limitDelete: number = (limitItem / 2) | 0;
        StdOut.printf('Deleting (%d items)...\n', limitDelete);
        for (let i = 0; i < limitDelete; i++) {
          set.delete(a[i]);
        }
        countItems = 0;
        StdOut.printf('Iterating...\n');
        for (let index323 = set.iterator(); index323.hasNext(); ) {
          const key = index323.next();
          countItems++;
        }
        StdOut.printf('%d items iterated\n', countItems);
        if (countItems !== limitItem - limitDelete) ok = false;
        if (countItems !== set.size()) ok = false;
        let countDelete = 0;
        let countRemain = 0;
        StdOut.printf('Checking...\n');
        for (let i = 0; i < limitItem; i++) {
          {
            if (i < limitDelete) {
              if (!set.contains(a[i])) countDelete++;
            } else if (set.contains(a[i])) countRemain++;
          }
        }
        StdOut.printf(
          '%d items found and %d (deleted) items missing\n',
          countRemain,
          countDelete
        );
        if (countRemain + countDelete !== limitItem) ok = false;
        if (countRemain !== set.size()) ok = false;
        if (set.isEmpty()) ok = false;
        StdOut.printf(
          'Deleting the rest (%d items)...\n',
          limitItem - countDelete
        );
        for (let i: number = countDelete; i < limitItem; i++) {
          set.delete(a[i]);
        }
        if (!set.isEmpty()) ok = false;
        countPass++;
        if (ok) StdOut.printf('PASS %d TESTS SUCCEEDED\n', countPass);
        else StdOut.printf('PASS %d TESTS FAILED\n', countPass);
      }
    } while (ok && countPass < limitPass);
    if (!ok) throw new java.lang.RuntimeException('TESTS FAILED');
  }
}
PatriciaSET.__class = 'edu.princeton.cs.algs4.PatriciaSET';
PatriciaSET.__interfaces = ['Iterable'];

export namespace PatriciaSET {
  export class Node {
    public __parent: any;
    left: PatriciaSET.Node;

    right: PatriciaSET.Node;

    key: string;

    b: number;

    public constructor(__parent: any, key: string, b: number) {
      this.__parent = __parent;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.key === undefined) this.key = null;
      if (this.b === undefined) this.b = 0;
      this.key = key;
      this.b = b;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.PatriciaSET.Node';
}

PatriciaSET.main(null);
