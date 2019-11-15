import { StdOut } from './StdOut';

/**
 * Initializes an empty bag.
 * @class
 * @author Robert Sedgewick
 */
export class ResizingArrayBag<Item> implements Iterable<Item> {
  private a: Item[];

  private n: number;

  public constructor() {
    if (this.a === undefined) this.a = null;
    if (this.n === undefined) this.n = 0;
    this.a = <Item[]>[null, null];
    this.n = 0;
  }

  /**
   * Is this bag empty?
   * @return  true if this bag is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.n === 0;
  }

  /**
   * Returns the number of items in this bag.
   * @return  the number of items in this bag
   */
  public size(): number {
    return this.n;
  }

  resize(capacity: number) {
    const temp: Item[] = <Item[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(capacity);
    for (let i = 0; i < this.n; i++) {
      temp[i] = this.a[i];
    }
    this.a = temp;
  }

  /**
   * Adds the item to this bag.
   * @param  item the item to add to this bag
   */
  public add(item: Item) {
    if (this.n === this.a.length) this.resize(2 * this.a.length);
    this.a[this.n++] = item;
  }

  /**
   * Returns an iterator that iterates over the items in the bag in arbitrary order.
   * @return  an iterator that iterates over the items in the bag in arbitrary order
   */
  public iterator(): Iterator<Item> {
    return new ResizingArrayBag.ArrayIterator(this);
  }

  /**
   * Unit tests the `ResizingArrayBag` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const bag: ResizingArrayBag<string> = <any>new ResizingArrayBag<string>();
    bag.add('Hello');
    bag.add('World');
    bag.add('how');
    bag.add('are');
    bag.add('you');
    for (let index338 = bag.iterator(); index338.hasNext(); ) {
      const s = index338.next();
      StdOut.println$java_lang_Object(s);
    }
  }
}
ResizingArrayBag.__class = 'edu.princeton.cs.algs4.ResizingArrayBag';
ResizingArrayBag.__interfaces = ['Iterable'];

export namespace ResizingArrayBag {
  export class ArrayIterator implements Iterator<any> {
    public __parent: any;
    i: number;

    public hasNext(): boolean {
      return this.i < this.__parent.n;
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      return this.__parent.a[this.i++];
    }

    constructor(__parent: any) {
      this.__parent = __parent;
      this.i = 0;
    }
  }
  ArrayIterator.__class =
    'edu.princeton.cs.algs4.ResizingArrayBag.ArrayIterator';
  ArrayIterator.__interfaces = ['java.util.Iterator'];
}

ResizingArrayBag.main(null);
