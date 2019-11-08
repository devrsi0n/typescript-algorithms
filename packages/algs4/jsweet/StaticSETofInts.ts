/**
 * Initializes a set of integers specified by the integer array.
 * @param {Array} keys the array of integers
 * @throws IllegalArgumentException if the array contains duplicate integers
 * @class
 * @author Robert Sedgewick
 */
export class StaticSETofInts {
  private a: number[];

  public constructor(keys: number[]) {
    if (this.a === undefined) this.a = null;
    this.a = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(keys.length);
    for (let i = 0; i < keys.length; i++) {
      this.a[i] = keys[i];
    }
    Arrays.sort(this.a);
    for (let i = 1; i < this.a.length; i++) {
      if (this.a[i] === this.a[i - 1])
        throw new Error('Argument arrays contains duplicate keys.');
    }
  }

  /**
   * Is the key in this set of integers?
   * @param {number} key the search key
   * @return  true if the set of integers contains the key; false otherwise
   */
  public contains(key: number): boolean {
    return this.rank(key) !== -1;
  }

  /**
   * Returns either the index of the search key in the sorted array
   * (if the key is in the set) or -1 (if the key is not in the set).
   * @param {number} key the search key
   * @return  the number of keys in this set less than the key (if the key is in the set)
   * or -1 (if the key is not in the set).
   */
  public rank(key: number): number {
    let lo = 0;
    let hi: number = this.a.length - 1;
    while (lo <= hi) {
      {
        const mid: number = lo + (((hi - lo) / 2) | 0);
        if (key < this.a[mid]) hi = mid - 1;
        else if (key > this.a[mid]) lo = mid + 1;
        else return mid;
      }
    }
    return -1;
  }
}
StaticSETofInts.__class = 'edu.princeton.cs.algs4.StaticSETofInts';
