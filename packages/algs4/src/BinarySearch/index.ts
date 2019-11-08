export default class BinarySearch {
  /**
   * Returns the index of the specified key in the specified array.
   *
   * @param  a the array of integers, must be sorted in ascending order
   * @param  target the search target
   * @return index of key in array a if present; -1 otherwise
   */
  public static indexOf(a: number[], target: number) {
    let lo = 0;
    let hi = a.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.round((hi - lo) / 2);
      const val = a[mid];
      if (val > target) {
        hi = mid - 1;
      } else if (val < target) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
}