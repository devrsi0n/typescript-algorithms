import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty bag.
 * @class
 * @author Robert Sedgewick
 */
export class LinkedBag<Item> implements Iterable<Item> {
  private first: LinkedBag.Node;

  private n: number;

  public constructor() {
    if (this.first === undefined) this.first = null;
    if (this.n === undefined) this.n = 0;
    this.first = null;
    this.n = 0;
  }

  /**
   * Is this bag empty?
   * @return  true if this bag is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in this bag.
   * @return  the number of items in this bag
   */
  public size(): number {
    return this.n;
  }

  /**
   * Adds the item to this bag.
   * @param  item the item to add to this bag
   */
  public add(item: Item) {
    const oldfirst: LinkedBag.Node = this.first;
    this.first = new LinkedBag.Node(this);
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  /**
   * Returns an iterator that iterates over the items in the bag.
   * @return
   */
  public iterator(): Iterator<Item> {
    return new LinkedBag.ListIterator(this);
  }

  /**
   * Unit tests the {@code LinkedBag} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const bag: LinkedBag<string> = <any>new LinkedBag<string>();
    while (!StdIn.isEmpty()) {
      {
        const item: string = StdIn.readString();
        bag.add(item);
      }
    }
    StdOut.println$java_lang_Object(`size of bag = ${bag.size()}`);
    for (let index312 = bag.iterator(); index312.hasNext(); ) {
      const s = index312.next();
      {
        StdOut.println$java_lang_Object(s);
      }
    }
  }
}
LinkedBag.__class = 'edu.princeton.cs.algs4.LinkedBag';
LinkedBag.__interfaces = ['Iterable'];

export namespace LinkedBag {
  export class Node {
    public __parent: any;
    item: any;

    next: LinkedBag.Node;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.LinkedBag.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: LinkedBag.Node;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.current === undefined) this.current = null;
      this.current = __parent.first;
    }

    public hasNext(): boolean {
      return this.current != null;
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      const { item } = this.current;
      this.current = this.current.next;
      return item;
    }
  }
  ListIterator.__class = 'edu.princeton.cs.algs4.LinkedBag.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

LinkedBag.main(null);
