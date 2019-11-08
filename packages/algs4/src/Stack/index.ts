export class Node<Item> {
  item: Item;
  next: Node<Item>;
}

/**
 *  The {@code Stack} class represents a last-in-first-out (LIFO) stack of generic items.
 *  It supports the usual <em>push</em> and <em>pop</em> operations, along with methods
 *  for peeking at the top item, testing if the stack is empty, and iterating through
 *  the items in LIFO order.
 *  <p>
 *  This implementation uses a singly linked list with a static nested class for
 *  linked-list nodes. See {@link LinkedStack} for the version from the
 *  textbook that uses a non-static nested class.
 *  See {@link ResizingArrayStack} for a version that uses a resizing array.
 *  The <em>push</em>, <em>pop</em>, <em>peek</em>, <em>size</em>, and <em>is-empty</em>
 *  operations all take constant time in the worst case.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/13stacks">Section 1.3</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @param <Item> the generic type of an item in this stack
 */
export default class Stack<Item> implements Iterable<Item> {
  private first: Node<Item>;

  private n: number;

  public constructor() {
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
    const oldfirst = this.first;
    this.first = new Node<Item>();
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
    let str = '';
    for (const node of this) {
      str += `${node.toString()}, `;
    }
    return `Stack [${str}]`;
  }

  /**
   * Returns an iterator to this stack that iterates through the items in LIFO order.
   *
   * @return  an iterator to this stack that iterates through the items in LIFO order
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
