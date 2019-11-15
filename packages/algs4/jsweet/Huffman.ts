import { BinaryStdIn } from './BinaryStdIn';
import { BinaryStdOut } from './BinaryStdOut';
import { MinPQ } from './MinPQ';

/**
 * The `Huffman` class provides static methods for compressing
 * and expanding a binary input using Huffman codes over the 8-bit extended
 * ASCII alphabet.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Huffman {
  static R = 256;

  /**
   * Reads a sequence of 8-bit bytes from standard input; compresses them
   * using Huffman codes with an 8-bit alphabet; and writes the results
   * to standard output.
   */
  public static compress() {
    const s: string = BinaryStdIn.readString();
    const input: string[] = /* toCharArray */ s.split('');
    const freq: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(Huffman.R);
    for (let i = 0; i < input.length; i++) {
      freq[input[i].charCodeAt(0)]++;
    }
    const root: Huffman.Node = Huffman.buildTrie(freq);
    const st: string[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(Huffman.R);
    Huffman.buildCode(st, root, '');
    Huffman.writeTrie(root);
    BinaryStdOut.write$int(input.length);
    for (let i = 0; i < input.length; i++) {
      {
        const code: string = st[input[i].charCodeAt(0)];
        for (let j = 0; j < code.length; j++) {
          {
            if (
              ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                code.charAt(j)
              ) == '0'.charCodeAt(0)
            ) {
              BinaryStdOut.write$boolean(false);
            } else if (
              ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                code.charAt(j)
              ) == '1'.charCodeAt(0)
            ) {
              BinaryStdOut.write$boolean(true);
            } else throw new Error('Illegal state');
          }
        }
      }
    }
    BinaryStdOut.close();
  }

  static buildTrie(freq: number[]): Huffman.Node {
    const pq: MinPQ<Huffman.Node> = <any>new MinPQ<Huffman.Node>();
    for (
      let i: string = String.fromCharCode(0);
      ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(i) < Huffman.R;
      i++
    ) {
      if (freq[i.charCodeAt(0)] > 0)
        pq.insert(new Huffman.Node(i, freq[i.charCodeAt(0)], null, null));
    }
    if (pq.size() === 1) {
      if (freq['\u0000'.charCodeAt(0)] === 0)
        pq.insert(new Huffman.Node('\u0000', 0, null, null));
      else pq.insert(new Huffman.Node('\u0001', 0, null, null));
    }
    while (pq.size() > 1) {
      {
        const left: Huffman.Node = pq.delMin();
        const right: Huffman.Node = pq.delMin();
        const parent: Huffman.Node = new Huffman.Node(
          '\u0000',
          left.freq + right.freq,
          left,
          right
        );
        pq.insert(parent);
      }
    }
    return pq.delMin();
  }

  static writeTrie(x: Huffman.Node) {
    if (x.isLeaf()) {
      BinaryStdOut.write$boolean(true);
      BinaryStdOut.write$char$int(x.ch, 8);
      return;
    }
    BinaryStdOut.write$boolean(false);
    Huffman.writeTrie(x.left);
    Huffman.writeTrie(x.right);
  }

  static buildCode(st: string[], x: Huffman.Node, s: string) {
    if (!x.isLeaf()) {
      Huffman.buildCode(st, x.left, `${s}0`);
      Huffman.buildCode(st, x.right, `${s}1`);
    } else {
      st[x.ch.charCodeAt(0)] = s;
    }
  }

  /**
   * Reads a sequence of bits that represents a Huffman-compressed message from
   * standard input; expands them; and writes the results to standard output.
   */
  public static expand() {
    const root: Huffman.Node = Huffman.readTrie();
    const length: number = BinaryStdIn.readInt();
    for (let i = 0; i < length; i++) {
      {
        let x: Huffman.Node = root;
        while (!x.isLeaf()) {
          {
            const bit: boolean = BinaryStdIn.readBoolean();
            if (bit) x = x.right;
            else x = x.left;
          }
        }
        BinaryStdOut.write$char$int(x.ch, 8);
      }
    }
    BinaryStdOut.close();
  }

  static readTrie(): Huffman.Node {
    const isLeaf: boolean = BinaryStdIn.readBoolean();
    if (isLeaf) {
      return new Huffman.Node(BinaryStdIn.readChar(), -1, null, null);
    }
    return new Huffman.Node(
      '\u0000',
      -1,
      Huffman.readTrie(),
      Huffman.readTrie()
    );
  }

  /**
   * Sample client that calls `compress()` if the command-line
   * argument is "-" an `expand()` if it is "+".
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '-')) Huffman.compress();
    else if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '+')) Huffman.expand();
    else throw new Error('Illegal command line argument');
  }
}
Huffman.__class = 'edu.princeton.cs.algs4.Huffman';

export namespace Huffman {
  export class Node implements java.lang.Comparable<Huffman.Node> {
    ch: string;

    freq: number;

    left: Huffman.Node;

    right: Huffman.Node;

    constructor(
      ch: string,
      freq: number,
      left: Huffman.Node,
      right: Huffman.Node
    ) {
      if (this.ch === undefined) this.ch = null;
      if (this.freq === undefined) this.freq = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      this.ch = ch;
      this.freq = freq;
      this.left = left;
      this.right = right;
    }

    isLeaf(): boolean {
      return this.left == null && this.right == null;
    }

    public compareTo(that: Huffman.Node): number {
      return this.freq - that.freq;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.Huffman.Node';
  Node.__interfaces = ['java.lang.Comparable'];
}

Huffman.main(null);
