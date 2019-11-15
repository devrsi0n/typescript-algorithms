import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty stack.
 * @class
 * @author Robert Sedgewick
 */
export class Stack<Item> implements Iterable<Item> {
  private first: Stack.Node<Item>;

  private n: number;

  public constructor() {
    if (this.first === undefined) this.first = null;
    if (this.n === undefined) this.n = 0;
    this.first = null;
    this.n = 0;
  }

  /**
   * Returns true if this stack is empty.
   *
   * @return  true if this stack is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in this stack.
   *
   * @return  the number of items in this stack
   */
  public size(): number {
    return this.n;
  }

  /**
   * Adds the item to this stack.
   *
   * @param   item the item to add
   */
  public push(item: Item) {
    const oldfirst: Stack.Node<Item> = this.first;
    this.first = <any>new Stack.Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  /**
   * Removes and returns the item most recently added to this stack.
   *
   * @return  the item most recently added
   * @throws Error if this stack is empty
   */
  public pop(): Item {
    if (this.isEmpty()) throw new Error('Stack underflow');
    const { item } = this.first;
    this.first = this.first.next;
    this.n--;
    return item;
  }

  /**
   * Returns (but does not remove) the item most recently added to this stack.
   *
   * @return  the item most recently added to this stack
   * @throws Error if this stack is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.first.item;
  }

  /**
   * Returns a string representation of this stack.
   *
   * @return  the sequence of items in this stack in LIFO order, separated by spaces
   */
  public toString(): string {
    const s = new String();
    for (let index356 = this.iterator(); index356.hasNext(); ) {
      const item = index356.next();
      {
        s.append(item);
        s.append(' ');
      }
    }
    return s.toString();
  }

  /**
   * Returns an iterator to this stack that iterates through the items in LIFO order.
   *
   * @return  an iterator to this stack that iterates through the items in LIFO order
   */
  public iterator(): Iterator<Item> {
    return new Stack.ListIterator(this, this.first);
  }

  /**
   * Unit tests the `Stack` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const stack: Stack<string> = <any>new Stack<string>();
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
Stack.__class = 'edu.princeton.cs.algs4.Stack';
Stack.__interfaces = ['Iterable'];

export namespace Stack {
  export class Node<Item> {
    item: Item;

    next: Stack.Node<Item>;

    constructor() {
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.Stack.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: Stack.Node<any>;

    public constructor(__parent: any, first: Stack.Node<any>) {
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
  ListIterator.__class = 'edu.princeton.cs.algs4.Stack.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

Stack.main(null);
