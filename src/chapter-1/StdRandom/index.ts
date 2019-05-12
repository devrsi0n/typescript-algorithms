import seedRandom from 'seedrandom';

export default class StdRandom {
  static _seed: string | number;

  static setSeed(seed: any) {
    StdRandom._seed = seed;
  }

  static random() {
    return seedRandom(StdRandom._seed as string)();
  }

  /**
   * Get random number from a to b(not included), [a, b).
   * If b is omitted, the range is [0, a)
   * @param a
   * @param b
   */
  static uniform(a: number, b?: number): number {
    if (typeof b === 'number') {
      return a + StdRandom.random() * (b - a);
    } else {
      return StdRandom.random() * a;
    }
  }

  /**
   *
   * @param arr An array of probability
   */
  discreate(arr: Array<number>): number {
    const randomNum = StdRandom.random();
    let sum = 0;
    for (const { item, index } of arr.map((item, index) => ({
      item,
      index,
    }))) {
      sum += item;
      if (sum >= randomNum) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Shuffle array
   * @param arr
   */
  shuffle(arr: Array<any>): void {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      const targetIndex = StdRandom.uniform(i, length - i);
      const temp = arr[targetIndex];
      arr[targetIndex] = arr[i];
      arr[i] = temp;
    }
  }
}
