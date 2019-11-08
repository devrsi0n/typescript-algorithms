import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty queue.
 * @class
 * @author Robert Sedgewick
 */
export class Queue<Item> implements Iterable<Item> {
  private first: Queue.Node<Item>;

  private last: Queue.Node<Item>;

  private n: number;

  public constructor() {
    if (this.first === undefined) this.first = null;
    if (this.last === undefined) this.last = null;
    if (this.n === undefined) this.n = 0;
    this.first = null;
    this.last = null;
    this.n = 0;
  }

  /**
   * Returns true if this queue is empty.
   *
   * @return  {@code true} if this queue is empty; {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.first == null;
  }

  /**
   * Returns the number of items in this queue.
   *
   * @return  the number of items in this queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns the item least recently added to this queue.
   *
   * @return  the item least recently added to this queue
   * @throws Error if this queue is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    return this.first.item;
  }

  /**
   * Adds the item to this queue.
   *
   * @param  {*} item the item to add
   */
  public enqueue(item: Item) {
    const oldlast: Queue.Node<Item> = this.last;
    this.last = <any>new Queue.Node<Item>();
    this.last.item = item;
    this.last.next = null;
    if (this.isEmpty()) this.first = this.last;
    else oldlast.next = this.last;
    this.n++;
  }

  /**
   * Removes and returns the item on this queue that was least recently added.
   *
   * @return  the item on this queue that was least recently added
   * @throws Error if this queue is empty
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
   *
   * @return  the sequence of items in FIFO order, separated by spaces
   */
  public toString(): string {
    const s= new String();
    for (let index335 = this.iterator(); index335.hasNext(); ) {
      const item = index335.next();
      {
        s.append(item);
        s.append(' ');
      }
    }
    return s.toString();
  }

  /**
   * Returns an iterator that iterates over the items in this queue in FIFO order.
   *
   * @return  an iterator that iterates over the items in this queue in FIFO order
   */
  public iterator(): Iterator<Item> {
    return new Queue.ListIterator(this, this.first);
  }

  /**
   * Unit tests the {@code Queue} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const queue: Queue<string> = <any>new Queue<string>();
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
Queue.__class = 'edu.princeton.cs.algs4.Queue';
Queue.__interfaces = ['Iterable'];

export namespace Queue {
  export class Node<Item> {
    item: Item;

    next: Queue.Node<Item>;

    constructor() {
      if (this.item === undefined) this.item = null;
      if (this.next === undefined) this.next = null;
    }
  }
  Node.__class = 'edu.princeton.cs.algs4.Queue.Node';

  export class ListIterator implements Iterator<any> {
    public __parent: any;
    current: Queue.Node<any>;

    public constructor(__parent: any, first: Queue.Node<any>) {
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
  ListIterator.__class = 'edu.princeton.cs.algs4.Queue.ListIterator';
  ListIterator.__interfaces = ['java.util.Iterator'];
}

Queue.main(null);
