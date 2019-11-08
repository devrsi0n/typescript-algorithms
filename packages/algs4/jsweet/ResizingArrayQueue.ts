import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty queue.
 * @class
 * @author Robert Sedgewick
 */
export class ResizingArrayQueue<Item> implements Iterable<Item> {
  private q: Item[];

  private n: number;

  private first: number;

  private last: number;

  public constructor() {
    if (this.q === undefined) this.q = null;
    if (this.n === undefined) this.n = 0;
    if (this.first === undefined) this.first = 0;
    if (this.last === undefined) this.last = 0;
    this.q = <Item[]>[null, null];
    this.n = 0;
    this.first = 0;
    this.last = 0;
  }

  /**
   * Is this queue empty?
   * @return  true if this queue is empty; false otherwise
   */
  public isEmpty(): boolean {
    return this.n === 0;
  }

  /**
   * Returns the number of items in this queue.
   * @return  the number of items in this queue
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
        temp[i] = this.q[(this.first + i) % this.q.length];
      }
    }
    this.q = temp;
    this.first = 0;
    this.last = this.n;
  }

  /**
   * Adds the item to this queue.
   * @param {*} item the item to add
   */
  public enqueue(item: Item) {
    if (this.n === this.q.length) this.resize(2 * this.q.length);
    this.q[this.last++] = item;
    if (this.last === this.q.length) this.last = 0;
    this.n++;
  }

  /**
   * Removes and returns the item on this queue that was least recently added.
   * @return  the item on this queue that was least recently added
   * @throws java.util.Error if this queue is empty
   */
  public dequeue(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    const item: Item = this.q[this.first];
    this.q[this.first] = null;
    this.n--;
    this.first++;
    if (this.first === this.q.length) this.first = 0;
    if (this.n > 0 && this.n === ((this.q.length / 4) | 0))
      this.resize((this.q.length / 2) | 0);
    return item;
  }

  /**
   * Returns the item least recently added to this queue.
   * @return  the item least recently added to this queue
   * @throws java.util.Error if this queue is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    return this.q[this.first];
  }

  /**
   * Returns an iterator that iterates over the items in this queue in FIFO order.
   * @return  an iterator that iterates over the items in this queue in FIFO order
   */
  public iterator(): Iterator<Item> {
    return new ResizingArrayQueue.ArrayIterator(this);
  }

  /**
   * Unit tests the {@code ResizingArrayQueue} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const queue: ResizingArrayQueue<string> = <any>(
      new ResizingArrayQueue<string>()
    );
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
ResizingArrayQueue.__class = 'edu.princeton.cs.algs4.ResizingArrayQueue';
ResizingArrayQueue.__interfaces = ['Iterable'];

export namespace ResizingArrayQueue {
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
      const item: any = this.__parent.q[
        (this.i + this.__parent.first) % this.__parent.q.length
      ];
      this.i++;
      return item;
    }

    constructor(__parent: any) {
      this.__parent = __parent;
      this.i = 0;
    }
  }
  ArrayIterator.__class =
    'edu.princeton.cs.algs4.ResizingArrayQueue.ArrayIterator';
  ArrayIterator.__interfaces = ['java.util.Iterator'];
}

ResizingArrayQueue.main(null);
