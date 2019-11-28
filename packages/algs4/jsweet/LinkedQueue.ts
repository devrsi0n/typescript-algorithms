import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty queue.
 * @class
 * @author Robert Sedgewick
 */
export class LinkedQueue<Item> implements Iterable<Item> {
  private n: number;

  private first: LinkedQueue.Node;

  private last: LinkedQueue.Node;

  public constructor() {
    if (this.n === undefined) this.n = 0;
    if (this.first === undefined) this.first = null;
    if (this.last === undefined) this.last = null;
    this.first = null;
    this.last = null;
    this.n = 0;
  }

  /**
   * Is this queue empty?
   * @return  true if this queue is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in this queue.
   * @return  the number of items in this queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns the item least recently added to this queue.
   * @return  the item least recently added to this queue
   * @throws java.util.Error if this queue is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    return this.first.item;
  }

  /**
   * Adds the item to this queue.
   * @param  item the item to add
   */
  public enqueue(item: Item) {
    const oldlast: LinkedQueue.Node = this.last;
    this.last = new LinkedQueue.Node(this);
    this.last.item = item;
    this.last.next = null;
    if (this.isEmpty()) this.first = this.last;
    else oldlast.next = this.last;
    this.n++;
  }

  /**
   * Removes and returns the item on this queue that was least recently added.
   * @return  the item on this queue that was least recently added
   * @throws java.util.Error if this queue is empty
   */
  public dequeue(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    const { item } = this.first;
    this.first = this.first.next;
    this.n--;
    if (this.isEmpty()) this.last = null;
    return item;
  }

  /**
   * Returns a string representation of this queue.
   * @return  the sequence of items in FIFO order, separated by spaces
   */
  public toString(): string {
    const s = new String();
    for (let index313 = this.iterator(); index313.hasNext(); ) {
      const item = index313.next();
      s.append(`${item} `);
    }
    return s.toString();
  }

  check(): boolean {
    if (this.n < 0) {
      return false;
    }
    if (this.n === 0) {
      if (this.first != null) return false;
      if (this.last != null) return false;
    } else if (this.n === 1) {
      if (this.first == null || this.last == null) return false;
      if (this.first !== this.last) return false;
      if (this.first.next != null) return false;
    } else {
      if (this.first == null || this.last == null) return false;
      if (this.first === this.last) return false;
      if (this.first.next == null) return false;
      if (this.last.next != null) return false;
      let numberOfNodes = 0;
      for (
        let x: LinkedQueue.Node = this.first;
        x != null && numberOfNodes <= this.n;
        x = x.next
      ) {
        {
          numberOfNodes++;
        }
      }
      if (numberOfNodes !== this.n) return false;
      let lastNode: LinkedQueue.Node = this.first;
      while (lastNode.next != null) {
        {
          lastNode = lastNode.next;
        }
      }
      if (this.last !== lastNode) return false;
    }
    return true;
  }

  /**
   * Returns an iterator that iterates over the items in this queue in FIFO order.
   * @return  an iterator that iterates over the items in this queue in FIFO order
   */
  public iterator(): Iterator<Item> {
    return new LinkedQueue.ListIterator(this);
  }

  /**
   * Unit tests the `LinkedQueue` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const queue: LinkedQueue<string> = <any>new LinkedQueue<string>();
    while (!StdIn.isEmpty()) {
      {
        const item: string = StdIn.readString();
        if (!/* equals */ (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            }
            return o1 === o2;
          })(item, '-'))) queue.enqueue(item);
        else if (!queue.isEmpty())
          StdOut.print$java_lang_Object(`${queue.dequeue()} `);
      }
    }
    StdOut.println$java_lang_Object(`(${queue.size()} left on queue)`);
  }
}
LinkedQueue.__class = 'edu.princeton.cs.algs4.LinkedQueue';
LinkedQueue.__interfaces = ['Iterable'];

export namespace LinkedQueue {
  export class Node {
    public __parent: any;
    item: any;

    next: LinkedQueue.Node;

    constructor(__parent: any) {
      this.__parent = __parent;
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.LinkedQueue.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: LinkedQueue.Node;

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
  ListIterator.__class = 'edu.princeton.cs.algs4.LinkedQueue.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

LinkedQueue.main(null);
