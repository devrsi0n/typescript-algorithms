/**
 *  The Counter class is a mutable data type to encapsulate a counter.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Counter {
  private readonly name: string;
  private count: number;

  constructor(id: string) {
    this.name = id;
    this.count = 0;
  }

  /**
   * Increments the counter by 1.
   */
  increment() {
    this.count++;
  }

  /**
   * Returns the current value of this counter.
   *
   * @return the current value of this counter
   */
  tally() {
    return this.count;
  }

  /**
   * Returns a string representation of this counter.
   *
   * @return a string representation of this counter
   */
  toString() {
    return `${this.count} ${this.name}`;
  }
}
