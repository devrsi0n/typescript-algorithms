// helper linked list class
export class Node<Item> {
  public item: Item = null;
  public next: Node<Item> = null;
}

/**
 *  The Bag class represents a bag (or multiset) of
 *  generic items. It supports insertion and iterating over the
 *  items in arbitrary order.
 *  <p>
 *  This implementation uses a singly linked list with a static nested class Node.
 *  See {@link LinkedBag} for the version from the
 *  textbook that uses a non-static nested class.
 *  See {@link ResizingArrayBag} for a version that uses a resizing array.
 *  The <em>add</em>, <em>isEmpty</em>, and <em>size</em> operations
 *  take constant time. Iteration takes time proportional to the number of items.
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/13stacks">Section 1.3</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @param <Item> the generic type of an item in this bag
 */
export default class Bag<Item> implements Iterable<Item> {
  private first: Node<Item>; // beginning of bag
  private n: number; // number of elements in bag

  /**
   * Initializes an empty bag.
   */
  public constructor() {
    this.first = null;
    this.n = 0;
  }

  /**
   * Returns true if this bag is empty.
   *
   * @return `true` if this bag is empty;
   *         `false` otherwise
   */
  public isEmpty() {
    return this.first == null;
  }

  /**
   * Returns the number of items in this bag.
   *
   * @return the number of items in this bag
   */
  public size() {
    return this.n;
  }

  /**
   * Adds the item to this bag.
   *
   * @param  item the item to add to this bag
   */
  public add(item: Item) {
    const oldfirst = this.first;
    this.first = new Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  /**
   * Returns an iterator that iterates over the items in this bag in arbitrary order.
   *
   * @return an iterator that iterates over the items in this bag in arbitrary order
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

  /**
   * Returns a string representation of this queue.
   *
   * @return the sequence of items in FIFO order, separated by spaces
   */
  public toString(): string {
    let str = '';
    for (const node of this) {
      str += `${node.toString()}, `;
    }
    return `Bag [${str}]`;
  }
}
