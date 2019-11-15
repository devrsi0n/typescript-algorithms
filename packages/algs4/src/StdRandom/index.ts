import seedRandom, { prng } from 'seedrandom';

export default class StdRandom {
  static _seed = Date.now();
  static _random: prng = seedRandom(String(StdRandom._seed));

  /**
   * Sets the seed of the pseudo-random number generator.
   * This method enables you to produce the same sequence of "random"
   * number for each execution of the program.
   * Ordinarily, you should call this method at most once per program.
   *
   * @param seed the seed
   */
  static setSeed(seed: number): void {
    StdRandom._seed = seed;
    StdRandom._random = seedRandom(String(StdRandom._seed));
  }

  /**
   * Returns a random real number uniformly in [0, 1).
   *
   * @return     a random real number uniformly in [0, 1)
   */
  static random() {
    return StdRandom._random.double();
  }

  /**
   * Get random number from a to b(not included), [a, b).
   * If b is omitted, the range is [0, a)
   * @param a
   * @param b
   */
  static uniform(a?: number, b?: number): number {
    if (a && b && (b <= a || b - a >= Number.MAX_VALUE)) {
      throw new Error(`invalid range: [${a}, ${b})`);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a + StdRandom.random() * (b - a);
    }
    if (typeof a === 'number') {
      return StdRandom.random() * a;
    }
    return StdRandom.random();
  }

  /**
   * Returns a random boolean from a Bernoulli distribution with success
   *   probability **p**.
   * @param p probability， 0 ~ 1， e.g. 0.25
   */
  static bernoulli(p: number): boolean {
    if (p < 0 || p > 1) {
      throw new Error(`probability p must be between 0.0 and 1.0: ${p}`);
    }
    return StdRandom.uniform() < p;
  }

  /**
   * Returns a random real number from a Gaussian distribution with mean &mu;
   * and standard deviation &sigma;.
   *
   * @param  mu the mean
   * @param  sigma the standard deviation
   * @return a real number distributed according to the Gaussian distribution
   */
  static gaussian(mu?: number, sigma?: number): number {
    let r: number;
    let x: number;
    let y: number;
    do {
      x = StdRandom.uniform(-1.0, 1.0);
      y = StdRandom.uniform(-1.0, 1.0);
      r = x * x + y * y;
    } while (r >= 1 || r === 0);
    const result = x * Math.sqrt((-2 * Math.log(r)) / r);
    if (typeof mu === 'number' && typeof sigma === 'number') {
      return mu + sigma * result;
    }
    return result;
  }

  /**
   * Returns a random integer from the specified discrete distribution.
   *
   * @param  probabilities the probability of occurrence of each integer
   * @return a random integer from a discrete distribution:
   *         i with probability probabilities[i]
   * @throws Error if probabilities is null
   * @throws Error if sum of array entries is not (very nearly) equal to 1.0
   * @throws Error unless probabilities[i] >= 0.0 for each index i
   */
  static discrete(probabilities: number[]) {
    if (!probabilities) throw new Error('argument array is null or undefined');
    const EPSILON = 1.0e-14;
    let sum = 0.0;
    for (let i = 0; i < probabilities.length; i++) {
      if (!(probabilities[i] >= 0.0))
        throw new Error(
          `array entry ${i} must be nonnegative: ${probabilities[i]}`
        );
      sum += probabilities[i];
    }
    if (sum > 1.0 + EPSILON || sum < 1.0 - EPSILON)
      throw new Error(
        `sum of array entries does not approximately equal 1.0: ${sum}`
      );

    // the for loop may not return a value when both r is (nearly) 1.0 and when the
    // cumulative sum is less than 1.0 (as a result of floating-point roundoff error)
    while (true) {
      const r = StdRandom.uniform();
      sum = 0.0;
      for (let i = 0; i < probabilities.length; i++) {
        sum += probabilities[i];
        if (sum > r) return i;
      }
    }
  }

  /**
   * Shuffle array
   * @param arr
   */
  static shuffle(arr: Array<any>): void {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      const targetIndex = i + StdRandom.uniform(length - i);
      const temp = arr[targetIndex];
      arr[targetIndex] = arr[i];
      arr[i] = temp;
    }
  }
}
