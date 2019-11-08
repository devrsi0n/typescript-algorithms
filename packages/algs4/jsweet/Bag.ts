import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty bag.
 * @class
 * @author Robert Sedgewick
 */
export class Bag<Item> implements Iterable<Item> {
  private first: Bag.Node<Item>;

  private n: number;

  public constructor() {
    if (this.first === undefined) this.first = null;
    if (this.n === undefined) this.n = 0;
    this.first = null;
    this.n = 0;
  }

  /**
   * Returns true if this bag is empty.
   *
   * @return  {@code true} if this bag is empty;
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in this bag.
   *
   * @return  the number of items in this bag
   */
  public size(): number {
    return this.n;
  }

  /**
   * Adds the item to this bag.
   *
   * @param   item the item to add to this bag
   */
  public add(item: Item) {
    const oldfirst: Bag.Node<Item> = this.first;
    this.first = <any>new Bag.Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  /**
   * Returns an iterator that iterates over the items in this bag in arbitrary order.
   *
   * @return  an iterator that iterates over the items in this bag in arbitrary order
   */
  public iterator(): Iterator<Item> {
    return new Bag.ListIterator(this, this.first);
  }

  /**
   * Unit tests the {@code Bag} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const bag: Bag<string> = <any>new Bag<string>();
    while (!StdIn.isEmpty()) {
      {
        const item: string = StdIn.readString();
        bag.add(item);
      }
    }
    StdOut.println$java_lang_Object(`size of bag = ${bag.size()}`);
    for (let index132 = bag.iterator(); index132.hasNext(); ) {
      const s = index132.next();
      {
        StdOut.println$java_lang_Object(s);
      }
    }
  }
}
Bag.__class = 'edu.princeton.cs.algs4.Bag';
Bag.__interfaces = ['Iterable'];

export namespace Bag {
  export class Node<Item> {
    item: Item;

    next: Bag.Node<Item>;

    constructor() {
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.Bag.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: Bag.Node<any>;

    public constructor(__parent: any, first: Bag.Node<any>) {
      this.__parent = __parent;
      if (this.current === undefined) this.current = null;
      this.current = first;
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
  ListIterator.__class = 'edu.princeton.cs.algs4.Bag.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

Bag.main(null);
