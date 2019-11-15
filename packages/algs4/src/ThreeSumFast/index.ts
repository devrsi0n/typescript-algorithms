import BinarySearch from '../BinarySearch';

/**
 *  The `ThreeSumFast` class provides static methods for counting
 *  and printing the number of triples in an array of distinct integers that
 *  sum to 0 (ignoring integer overflow).
 *  <p>
 *  This implementation uses sorting and binary search and takes time
 *  proportional to n^2 log n, where n is the number of integers.
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class ThreeSumFast {
  public static count(a: number[], sum = 0) {
    const sortedA = a.sort();
    if (ThreeSumFast.containsDuplicates(sortedA)) {
      throw new Error('array contains duplicate integers');
    }
    const len = sortedA.length;
    let count = 0;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (BinarySearch.rank(sum - (sortedA[i] + sortedA[j]), sortedA) > j) {
          count += 1;
        }
      }
    }
    return count;
  }

  private static containsDuplicates(a: number[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (a[i] === a[i - 1]) return true;
    }
    return false;
  }
}
