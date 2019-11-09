export class Node<Item> {
  item: Item = null;

  next: Node<Item> = null;
}

/**
 *  The {@code Queue} class represents a first-in-first-out (FIFO)
 *  queue of generic items.
 *  It supports the usual <em>enqueue</em> and <em>dequeue</em>
 *  operations, along with methods for peeking at the first item,
 *  testing if the queue is empty, and iterating through
 *  the items in FIFO order.
 *  <p>
 *  This implementation uses a singly linked list with a static nested class for
 *  linked-list nodes. See {@link LinkedQueue} for the version from the
 *  textbook that uses a non-static nested class.
 *  See {@link ResizingArrayQueue} for a version that uses a resizing array.
 *  The <em>enqueue</em>, <em>dequeue</em>, <em>peek</em>, <em>size</em>, and <em>is-empty</em>
 *  operations all take constant time in the worst case.
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/13stacks">Section 1.3</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @param <Item> the generic type of an item in this queue
 */
export default class Queue<Item> implements Iterable<Item> {
  private first: Node<Item>;

  private last: Node<Item>;

  private n: number;

  public constructor() {
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
   * @return the number of items in this queue
   */
  public size(): number {
    return this.n;
  }

  /**
   * Returns the item least recently added to this queue.
   *
   * @return the item least recently added to this queue
   * @throws Error if this queue is empty
   */
  public peek(): Item {
    if (this.isEmpty()) throw new Error('Queue underflow');
    return this.first.item;
  }

  /**
   * Adds the item to this queue.
   *
   * @param tem the item to add
   */
  public enqueue(item: Item) {
    const oldlast: Node<Item> = this.last;
    this.last = new Node<Item>();
    this.last.item = item;
    this.last.next = null;
    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      oldlast.next = this.last;
    }
    this.n++;
  }

  /**
   * Removes and returns the item on this queue that was least recently added.
   *
   * @return the item on this queue that was least recently added
   * @throws Error if this queue is empty
   */
  public dequeue(): Item {
    if (this.isEmpty()) {
      throw new Error('Queue underflow');
    }
    const { item } = this.first;
    this.first = this.first.next;
    this.n--;
    if (this.isEmpty()) this.last = null;
    return item;
  }

  /**
   * Returns a string representation of this queue.
   *
   * @return the sequence of items in FIFO order, separated by spaces
   */
  public toString(): string {
    let str = '';
    for (const node of this) {
      str += `${node}, `;
    }
    return `Queue [${str}]`;
  }

  /**
   * Returns an iterator that iterates over the items in this queue in FIFO order.
   *
   * @return an iterator that iterates over the items in this queue in FIFO order
   */
  [Symbol.iterator]() {
    const { first } = this;
    let current = first;
    return {
      next(): IteratorResult<Item> {
        if (current !== null) {
          const result = {
            done: false,
            value: current.item,
          };
          current = current.next;
          return result;
        }
        return {
          done: true,
          value: null,
        };
      },
    };
  }
}
