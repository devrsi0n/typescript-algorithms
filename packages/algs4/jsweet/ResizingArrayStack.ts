import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty stack.
 * @class
 * @author Robert Sedgewick
 */
export class ResizingArrayStack<Item> implements Iterable<Item> {
  private a: Item[];

  private n: number;

  public constructor() {
    if (this.a === undefined) this.a = null;
    if (this.n === undefined) this.n = 0;
    this.a = <Item[]>[null, null];
    this.n = 0;
  }

  /**
   * Is this stack empty?
   * @return  true if this stack is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.n === 0;
  }

  /**
   * Returns the number of items in the stack.
   * @return  the number of items in the stack
   */
  public size(): number {
    return this.n;
  }

  resize(capacity: number) {
    const temp: Item[] = <Item[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(capacity);
    for (let i = 0; i < this.n; i++) {
      {
        temp[i] = this.a[i];
      }
    }
    this.a = temp;
  }

  /**
   * Adds the item to this stack.
   * @param  item the item to add
   */
  public push(item: Item) {
    if (this.n === this.a.length) this.resize(2 * this.a.length);
    this.a[this.n++] = item;
  }

  /**
   * Removes and returns the item most recently added to this stack.
   * @return  the item most recently added
   * @throws java.util.Error if this stack is empty
   */
  public pop(): Item {
    if (this.isEmpty()) throw new Error('Stack underflow');
    const item: Item = this.a[this.n - 1];
    this.a[this.n - 1] = null;
    this.n--;
    if (this.n > 0 && this.n === ((this.a.length / 4) | 0))
      this.resize((this.a.length / 2) | 0);
    return item;
  }

  /**
   * Returns (but does not remove) the item most recently added to this stack.
   * @return  the item most recently added to this stack
   * @throws java.util.Error if this stack is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.a[this.n - 1];
  }

  /**
   * Returns an iterator to this stack that iterates through the items in LIFO order.
   * @return  an iterator to this stack that iterates through the items in LIFO order.
   */
  public iterator(): Iterator<Item> {
    return new ResizingArrayStack.ReverseArrayIterator(this);
  }

  /**
   * Unit tests the {@code Stack} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const stack: ResizingArrayStack<string> = <any>(
      new ResizingArrayStack<string>()
    );
    while (!StdIn.isEmpty()) {
      {
        const item: string = StdIn.readString();
        if (!/* equals */ (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(item, '-'))) stack.push(item);
        else if (!stack.isEmpty())
          StdOut.print$java_lang_Object(`${stack.pop()} `);
      }
    }
    StdOut.println$java_lang_Object(`(${stack.size()} left on stack)`);
  }
}
ResizingArrayStack.__class = 'edu.princeton.cs.algs4.ResizingArrayStack';
ResizingArrayStack.__interfaces = ['Iterable'];

export namespace ResizingArrayStack {
  export class ReverseArrayIterator implements Iterator<any> {
    public __parent: any;
    i: number;

    public constructor(__parent: any) {
      this.__parent = __parent;
      if (this.i === undefined) this.i = 0;
      this.i = __parent.n - 1;
    }

    public hasNext(): boolean {
      return this.i >= 0;
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }

    public next(): any {
      if (!this.hasNext()) throw new Error();
      return this.__parent.a[this.i--];
    }
  }
  ReverseArrayIterator.__class =
    'edu.princeton.cs.algs4.ResizingArrayStack.ReverseArrayIterator';
  ReverseArrayIterator.__interfaces = ['java.util.Iterator'];
}

ResizingArrayStack.main(null);
