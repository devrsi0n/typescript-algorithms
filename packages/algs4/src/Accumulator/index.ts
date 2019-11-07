import printf from 'printf';
/**
 *  The `Accumulator` class is a data type for computing the running
 *  mean, sample standard deviation, and sample variance of a stream of real
 *  numbers. It provides an example of a mutable data type and a streaming
 *  algorithm.
 *  <p>
 *  This implementation uses a one-pass algorithm that is less susceptible
 *  to floating-point roundoff error than the more straightforward
 *  implementation based on saving the sum of the squares of the numbers.
 *  This technique is due to
 *  <a href = "https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm">B. P. Welford</a>.
 *  Each operation takes constant time in the worst case.
 *  The amount of memory is constant - the data values are not stored.
 *  <p>
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Accumulator {
  private n = 0;
  private sum = 0;
  private mu = 0;

  /**
   * Adds the specified data value to the accumulator.
   * @param  x the data value
   */
  public addDataValue(val: number) {
    this.n++;
    const delta = val - this.mu;
    this.mu += delta / this.n;
    this.sum += ((this.n - 1) / this.n) * delta * delta;
  }

  /**
   * Returns the mean of the data values.
   * @return the mean of the data values
   */
  public mean() {
    return this.mu;
  }

  /**
   * Returns the sample variance of the data values.
   * @return the sample variance of the data values
   */
  public var() {
    if (this.n <= 1) return Number.NaN;
    return this.sum / (this.n - 1);
  }

  /**
   * Returns the sample standard deviation of the data values.
   * @return the sample standard deviation of the data values
   */
  public stddev() {
    return Math.sqrt(this.var());
  }

  /**
   * Returns the number of data values.
   * @return the number of data values
   */
  public count() {
    return this.n;
  }

  public toString() {
    return `Mean (${this.n} values): ${printf(
      '%7.5f',
      this.mean()
    )}, stddev = ${this.stddev()}`;
  }
}
