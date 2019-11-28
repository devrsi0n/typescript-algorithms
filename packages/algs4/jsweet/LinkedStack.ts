import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty stack.
 * @class
 * @author Robert Sedgewick
 */
export class LinkedStack<Item> implements Iterable<Item> {
  private n: number;

  private first: LinkedStack.Node;

  public constructor() {
    if (this.n === undefined) this.n = 0;
    if (this.first === undefined) this.first = null;
    this.first = null;
    this.n = 0;
  }

  /**
   * Is this stack empty?
   * @return  true if this stack is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in the stack.
   * @return  the number of items in the stack
   */
  public size(): number {
    return this.n;
  }

  /**
   * Adds the item to this stack.
   * @param  item the item to add
   */
  public push(item: Item) {
    const oldfirst: LinkedStack.Node = this.first;
    this.first = new LinkedStack.Node(this);
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  /**
   * Removes and returns the item most recently added to this stack.
   * @return  the item most recently added
   * @throws java.util.Error if this stack is empty
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
   * @return  the item most recently added to this stack
   * @throws java.util.Error if this stack is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.first.item;
  }

  /**
   * Returns a string representation of this stack.
   * @return  the sequence of items in the stack in LIFO order, separated by spaces
   */
  public toString(): string {
    const s = new String();
    for (let index314 = this.iterator(); index314.hasNext(); ) {
      const item = index314.next();
      s.append(`${item} `);
    }
    return s.toString();
  }

  /**
   * Returns an iterator to this stack that iterates through the items in LIFO order.
   * @return  an iterator to this stack that iterates through the items in LIFO order.
   */
  public iterator(): Iterator<Item> {
    return new LinkedStack.ListIterator(this);
  }

  check(): boolean {
    if (this.n < 0) {
      return false;
    }
    if (this.n === 0) {
      if (this.first != null) return false;
    } else if (this.n === 1) {
      if (this.first == null) return false;
      if (this.first.next != null) return false;
    } else {
      if (this.first == null) return false;
      if (this.first.next == null) return false;
    }
    let numberOfNodes = 0;
    for (
      let x: LinkedStack.Node = this.first;
      x != null && numberOfNodes <= this.n;
      x = x.next
    ) {
      {
        numberOfNodes++;
      }
    }
    if (numberOfNodes !== this.n) return false;
    return true;
  }

  /**
   * Unit tests the `LinkedStack` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const stack: LinkedStack<string> = <any>new LinkedStack<string>();
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
LinkedStack.__class = 'edu.princeton.cs.algs4.LinkedStack';
LinkedStack.__interfaces = ['Iterable'];

export namespace LinkedStack {
  export class Node {
    public __parent: any;
    item: any;

    next: LinkedStack.Node;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.LinkedStack.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: LinkedStack.Node;

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

    constructor(__parent: any) {
      this.__parent = __parent;
      this.current = this.__parent.first;
    }
  }
  ListIterator.__class = 'edu.princeton.cs.algs4.LinkedStack.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

LinkedStack.main(null);
