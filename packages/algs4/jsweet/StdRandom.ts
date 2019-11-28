import { StdOut } from './StdOut';

/**
 * The `StdRandom` class provides static methods for generating
 * random number from various discrete and continuous distributions,
 * including uniform, Bernoulli, geometric, Gaussian, exponential, Pareto,
 * Poisson, and Cauchy. It also provides method for shuffling an
 * array or subarray and generating random permutations.
 * <p>
 * By convention, all intervals are half open. For example,
 * <code>uniform(-1.0, 1.0)</code> returns a random number between
 * <code>-1.0</code> (inclusive) and <code>1.0</code> (exclusive).
 * Similarly, <code>shuffle(a, lo, hi)</code> shuffles the <code>hi - lo</code>
 * elements in the array <code>a[]</code>, starting at index <code>lo</code>
 * (inclusive) and ending at index <code>hi</code> (exclusive).
 * <p>
 * For additional documentation,
 * see <a href="https://introcs.cs.princeton.edu/22library">Section 2.2</a> of
 * <i>Computer Science: An Interdisciplinary Approach</i>
 * by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class StdRandom {
  static __static_initialized = false;
  static __static_initialize() {
    if (!StdRandom.__static_initialized) {
      StdRandom.__static_initialized = true;
      StdRandom.__static_initializer_0();
    }
  }

  static __random: Random;
  public static __random_$LI$(): Random {
    StdRandom.__static_initialize();
    return StdRandom.__random;
  }

  static seed: number;
  public static seed_$LI$(): number {
    StdRandom.__static_initialize();
    return StdRandom.seed;
  }

  static __static_initializer_0() {
    StdRandom.seed = java.lang.System.currentTimeMillis();
    StdRandom.__random = new Random(StdRandom.seed);
  }

  /**
   * Sets the seed of the pseudo-random number generator.
   * This method enables you to produce the same sequence of "random"
   * number for each execution of the program.
   * Ordinarily, you should call this method at most once per program.
   *
   * @param  s the seed
   */
  public static setSeed(s: number) {
    StdRandom.seed = s;
    StdRandom.__random = new Random(StdRandom.seed);
  }

  /**
   * Returns the seed of the pseudo-random number generator.
   *
   * @return  the seed
   */
  public static getSeed(): number {
    return StdRandom.seed_$LI$();
  }

  public static uniform$(): number {
    return StdRandom.__random_$LI$().nextDouble();
  }

  public static uniform$int(n: number): number {
    if (n <= 0) throw new Error(`argument must be positive: ${n}`);
    return StdRandom.__random_$LI$().nextInt(n);
  }

  public static uniform$long(n: number): number {
    if (n <= 0) throw new Error(`argument must be positive: ${n}`);
    let r: number = StdRandom.__random_$LI$().nextLong();
    const m: number = n - 1;
    if ((n & m) === 0) {
      return r & m;
    }
    let u: number = r >>> 1;
    while (u + m - (r = u % n) < 0) {
      {
        u = StdRandom.__random_$LI$().nextLong() >>> 1;
      }
    }
    return r;
  }

  /**
   * Returns a random real number uniformly in [0, 1).
   *
   * @return      a random real number uniformly in [0, 1)
   * @deprecated Replaced by {@link #uniform()}.
   */
  public static random(): number {
    return StdRandom.uniform();
  }

  public static uniform$int$int(a: number, b: number): number {
    if (
      b <= a ||
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>b) - a >=
        Number.MAX_VALUE
    ) {
      throw new Error(`invalid range: [${a}, ${b})`);
    }
    return a + StdRandom.uniform$int(b - a);
  }

  /**
   * Returns a random integer uniformly in [a, b).
   *
   * @param   a the left endpoint
   * @param   b the right endpoint
   * @return  a random integer uniformly in [a, b)
   * @throws IllegalArgumentException if `b <= a`
   * @throws IllegalArgumentException if `b - a >= Integer.MAX_VALUE`
   */
  public static uniform(a?: any, b?: any): any {
    if (
      (typeof a === 'number' || a === null) &&
      (typeof b === 'number' || b === null)
    ) {
      return <any>StdRandom.uniform$int$int(a, b);
    }
    if (
      (typeof a === 'number' || a === null) &&
      (typeof b === 'number' || b === null)
    ) {
      return <any>StdRandom.uniform$double$double(a, b);
    }
    if ((typeof a === 'number' || a === null) && b === undefined) {
      return <any>StdRandom.uniform$int(a);
    }
    if ((typeof a === 'number' || a === null) && b === undefined) {
      return <any>StdRandom.uniform$long(a);
    }
    if (a === undefined && b === undefined) {
      return <any>StdRandom.uniform$();
    }
    throw new Error('invalid overload');
  }

  public static uniform$double$double(a: number, b: number): number {
    if (!(a < b)) {
      throw new Error(`invalid range: [${a}, ${b})`);
    }
    return a + StdRandom.uniform() * (b - a);
  }

  public static bernoulli$double(p: number): boolean {
    if (!(p >= 0.0 && p <= 1.0))
      throw new Error(`probability p must be between 0.0 and 1.0: ${p}`);
    return StdRandom.uniform() < p;
  }

  /**
   * Returns a random boolean from a Bernoulli distribution with success
   * probability <em>p</em>.
   *
   * @param   p the probability of returning `true`
   * @return  `true` with probability `p` and
   * `false` with probability `1 - p`
   * @throws IllegalArgumentException unless `0` &le; `p` &le; `1.0`
   */
  public static bernoulli(p?: any): any {
    if (typeof p === 'number' || p === null) {
      return <any>StdRandom.bernoulli$double(p);
    }
    if (p === undefined) {
      return <any>StdRandom.bernoulli$();
    }
    throw new Error('invalid overload');
  }

  public static bernoulli$(): boolean {
    return StdRandom.bernoulli$double(0.5);
  }

  public static gaussian$(): number {
    let r: number;
    let x: number;
    let y: number;
    do {
      {
        x = StdRandom.uniform$double$double(-1.0, 1.0);
        y = StdRandom.uniform$double$double(-1.0, 1.0);
        r = x * x + y * y;
      }
    } while (r >= 1 || r === 0);
    return x * Math.sqrt((-2 * Math.log(r)) / r);
  }

  public static gaussian$double$double(mu: number, sigma: number): number {
    return mu + sigma * StdRandom.gaussian();
  }

  /**
   * Returns a random real number from a Gaussian distribution with mean &mu;
   * and standard deviation &sigma;.
   *
   * @param   mu the mean
   * @param   sigma the standard deviation
   * @return  a real number distributed according to the Gaussian distribution
   * with mean `mu` and standard deviation `sigma`
   */
  public static gaussian(mu?: any, sigma?: any): any {
    if (
      (typeof mu === 'number' || mu === null) &&
      (typeof sigma === 'number' || sigma === null)
    ) {
      return <any>StdRandom.gaussian$double$double(mu, sigma);
    }
    if (mu === undefined && sigma === undefined) {
      return <any>StdRandom.gaussian$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns a random integer from a geometric distribution with success
   * probability <em>p</em>.
   * The integer represents the number of independent trials
   * before the first success.
   *
   * @param   p the parameter of the geometric distribution
   * @return  a random integer from a geometric distribution with success
   * probability `p`; or `Integer.MAX_VALUE` if
   * `p` is (nearly) equal to `1.0`.
   * @throws IllegalArgumentException unless `p >= 0.0` and `p <= 1.0`
   */
  public static geometric(p: number): number {
    if (!(p >= 0)) {
      throw new Error(`probability p must be greater than 0: ${p}`);
    }
    if (!(p <= 1.0)) {
      throw new Error(`probability p must not be larger than 1: ${p}`);
    }
    return (
      (<number>Math.ceil(Math.log(StdRandom.uniform()) / Math.log(1.0 - p))) | 0
    );
  }

  /**
   * Returns a random integer from a Poisson distribution with mean &lambda;.
   *
   * @param   lambda the mean of the Poisson distribution
   * @return  a random integer from a Poisson distribution with mean `lambda`
   * @throws IllegalArgumentException unless `lambda > 0.0` and not infinite
   */
  public static poisson(lambda: number): number {
    if (!(lambda > 0.0)) throw new Error(`lambda must be positive: ${lambda}`);
    if (
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(lambda)
    )
      throw new Error(`lambda must not be infinite: ${lambda}`);
    let k = 0;
    let p = 1.0;
    const expLambda: number = Math.exp(-lambda);
    do {
      {
        k++;
        p *= StdRandom.uniform();
      }
    } while (p >= expLambda);
    return k - 1;
  }

  public static pareto$(): number {
    return StdRandom.pareto$double(1.0);
  }

  public static pareto$double(alpha: number): number {
    if (!(alpha > 0.0)) throw new Error(`alpha must be positive: ${alpha}`);
    return Math.pow(1 - StdRandom.uniform(), -1.0 / alpha) - 1.0;
  }

  /**
   * Returns a random real number from a Pareto distribution with
   * shape parameter &alpha;.
   *
   * @param   alpha shape parameter
   * @return  a random real number from a Pareto distribution with shape
   * parameter `alpha`
   * @throws IllegalArgumentException unless `alpha > 0.0`
   */
  public static pareto(alpha?: any): any {
    if (typeof alpha === 'number' || alpha === null) {
      return <any>StdRandom.pareto$double(alpha);
    }
    if (alpha === undefined) {
      return <any>StdRandom.pareto$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns a random real number from the Cauchy distribution.
   *
   * @return  a random real number from the Cauchy distribution.
   */
  public static cauchy(): number {
    return Math.tan(Math.PI * (StdRandom.uniform() - 0.5));
  }

  public static discrete$double_A(probabilities: number[]): number {
    if (probabilities == null) throw new Error('argument array is null');
    const EPSILON = 1.0e-14;
    let sum = 0.0;
    for (let i = 0; i < probabilities.length; i++) {
      {
        if (!(probabilities[i] >= 0.0))
          throw new Error(
            `array entry ${i} must be nonnegative: ${probabilities[i]}`
          );
        sum += probabilities[i];
      }
    }
    if (sum > 1.0 + EPSILON || sum < 1.0 - EPSILON)
      throw new Error(
        `sum of array entries does not approximately equal 1.0: ${sum}`
      );
    while (true) {
      {
        const r: number = StdRandom.uniform();
        sum = 0.0;
        for (let i = 0; i < probabilities.length; i++) {
          {
            sum += probabilities[i];
            if (sum > r) return i;
          }
        }
      }
    }
  }

  /**
   * Returns a random integer from the specified discrete distribution.
   *
   * @param   probabilities the probability of occurrence of each integer
   * @return  a random integer from a discrete distribution:
   * `i` with probability `probabilities[i]`
   * @throws IllegalArgumentException if `probabilities` is `null`
   * @throws IllegalArgumentException if sum of array entries is not (very nearly) equal to `1.0`
   * @throws IllegalArgumentException unless `probabilities[i] >= 0.0` for each index `i`
   */
  public static discrete(probabilities?: any): any {
    if (
      (probabilities != null &&
        probabilities instanceof <any>Array &&
        (probabilities.length == 0 ||
          probabilities[0] == null ||
          typeof probabilities[0] === 'number')) ||
      probabilities === null
    ) {
      return <any>StdRandom.discrete$double_A(probabilities);
    }
    if (
      (probabilities != null &&
        probabilities instanceof <any>Array &&
        (probabilities.length == 0 ||
          probabilities[0] == null ||
          typeof probabilities[0] === 'number')) ||
      probabilities === null
    ) {
      return <any>StdRandom.discrete$int_A(probabilities);
    }
    throw new Error('invalid overload');
  }

  public static discrete$int_A(frequencies: number[]): number {
    if (frequencies == null) throw new Error('argument array is null');
    let sum = 0;
    for (let i = 0; i < frequencies.length; i++) {
      {
        if (frequencies[i] < 0)
          throw new Error(
            `array entry ${i} must be nonnegative: ${frequencies[i]}`
          );
        sum += frequencies[i];
      }
    }
    if (sum === 0) throw new Error('at least one array entry must be positive');
    if (sum >= Number.MAX_VALUE)
      throw new Error('sum of frequencies overflows an int');
    const r: number = StdRandom.uniform$int((<number>sum) | 0);
    sum = 0;
    for (let i = 0; i < frequencies.length; i++) {
      {
        sum += frequencies[i];
        if (sum > r) return i;
      }
    }
    return -1;
  }

  /**
   * Returns a random real number from an exponential distribution
   * with rate &lambda;.
   *
   * @param   lambda the rate of the exponential distribution
   * @return  a random real number from an exponential distribution with
   * rate `lambda`
   * @throws IllegalArgumentException unless `lambda > 0.0`
   */
  public static exp(lambda: number): number {
    if (!(lambda > 0.0)) throw new Error(`lambda must be positive: ${lambda}`);
    return -Math.log(1 - StdRandom.uniform()) / lambda;
  }

  public static shuffle$java_lang_Object_A(a: any[]) {
    StdRandom.validateNotNull(a);
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = i + StdRandom.uniform$int(n - i);
        const temp: any = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static shuffle$double_A(a: number[]) {
    StdRandom.validateNotNull(a);
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = i + StdRandom.uniform$int(n - i);
        const temp: number = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static shuffle$int_A(a: number[]) {
    StdRandom.validateNotNull(a);
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = i + StdRandom.uniform$int(n - i);
        const temp: number = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static shuffle$char_A(a: string[]) {
    StdRandom.validateNotNull(a);
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = i + StdRandom.uniform$int(n - i);
        const temp: string = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static shuffle$java_lang_Object_A$int$int(
    a: any[],
    lo: number,
    hi: number
  ) {
    StdRandom.validateNotNull(a);
    StdRandom.validateSubarrayIndices(lo, hi, a.length);
    for (let i: number = lo; i < hi; i++) {
      {
        const r: number = i + StdRandom.uniform$int(hi - i);
        const temp: any = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  /**
   * Rearranges the elements of the specified subarray in uniformly random order.
   *
   * @param   a the array to shuffle
   * @param   lo the left endpoint (inclusive)
   * @param   hi the right endpoint (exclusive)
   * @throws IllegalArgumentException if `a` is `null`
   * @throws IllegalArgumentException unless `(0 <= lo) && (lo < hi) && (hi <= a.length)`
   *
   */
  public static shuffle(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdRandom.shuffle$java_lang_Object_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdRandom.shuffle$double_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>StdRandom.shuffle$int_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdRandom.shuffle$java_lang_Object_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdRandom.shuffle$double_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdRandom.shuffle$int_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>StdRandom.shuffle$char_A(a);
    }
    throw new Error('invalid overload');
  }

  public static shuffle$double_A$int$int(a: number[], lo: number, hi: number) {
    StdRandom.validateNotNull(a);
    StdRandom.validateSubarrayIndices(lo, hi, a.length);
    for (let i: number = lo; i < hi; i++) {
      {
        const r: number = i + StdRandom.uniform$int(hi - i);
        const temp: number = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static shuffle$int_A$int$int(a: number[], lo: number, hi: number) {
    StdRandom.validateNotNull(a);
    StdRandom.validateSubarrayIndices(lo, hi, a.length);
    for (let i: number = lo; i < hi; i++) {
      {
        const r: number = i + StdRandom.uniform$int(hi - i);
        const temp: number = a[i];
        a[i] = a[r];
        a[r] = temp;
      }
    }
  }

  public static permutation$int(n: number): number[] {
    if (n < 0) throw new Error('argument is negative');
    const perm: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      perm[i] = i;
    }
    StdRandom.shuffle$int_A(perm);
    return perm;
  }

  public static permutation$int$int(n: number, k: number): number[] {
    if (n < 0) throw new Error('argument is negative');
    if (k < 0 || k > n) throw new Error('k must be between 0 and n');
    const perm: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(k);
    for (let i = 0; i < k; i++) {
      {
        const r: number = StdRandom.uniform$int(i + 1);
        perm[i] = perm[r];
        perm[r] = i;
      }
    }
    for (let i: number = k; i < n; i++) {
      {
        const r: number = StdRandom.uniform$int(i + 1);
        if (r < k) perm[r] = i;
      }
    }
    return perm;
  }

  /**
   * Returns a uniformly random permutation of <em>k</em> of <em>n</em> elements.
   *
   * @param   n number of elements
   * @param   k number of elements to select
   * @throws IllegalArgumentException if `n` is negative
   * @throws IllegalArgumentException unless `0 <= k <= n`
   * @return  an array of length `k` that is a uniformly random permutation
   * of `k` of the elements from `0`, `1`, ..., `n-1`
   */
  public static permutation(n?: any, k?: any): any {
    if (
      (typeof n === 'number' || n === null) &&
      (typeof k === 'number' || k === null)
    ) {
      return <any>StdRandom.permutation$int$int(n, k);
    }
    if ((typeof n === 'number' || n === null) && k === undefined) {
      return <any>StdRandom.permutation$int(n);
    }
    throw new Error('invalid overload');
  }

  private static validateNotNull(x: any) {
    if (x == null) {
      throw new Error('argument is null');
    }
  }

  private static validateSubarrayIndices(
    lo: number,
    hi: number,
    length: number
  ) {
    if (lo < 0 || hi > length || lo > hi) {
      throw new Error(`subarray indices out of bounds: [${lo}, ${hi})`);
    }
  }

  /**
   * Unit tests the methods in this class.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const n: number = parseInt(args[0]);
    if (args.length === 2) StdRandom.setSeed(Number.parseInt(args[1]));
    const probabilities: number[] = [0.5, 0.3, 0.1, 0.1];
    const frequencies: number[] = [5, 3, 1, 1];
    const a: string[] = 'A B C D E F G'.split(' ');
    StdOut.println$java_lang_Object(`seed = ${StdRandom.getSeed()}`);
    for (let i = 0; i < n; i++) {
      {
        StdOut.printf('%2d ', StdRandom.uniform$int(100));
        StdOut.printf('%8.5f ', StdRandom.uniform$double$double(10.0, 99.0));
        StdOut.printf('%5b ', StdRandom.bernoulli$double(0.5));
        StdOut.printf('%7.5f ', StdRandom.gaussian$double$double(9.0, 0.2));
        StdOut.printf('%1d ', StdRandom.discrete$double_A(probabilities));
        StdOut.printf('%1d ', StdRandom.discrete$int_A(frequencies));
        StdOut.printf('%11d ', StdRandom.uniform$long(100000000000));
        StdRandom.shuffle$java_lang_Object_A(a);
        for (let index357 = 0; index357 < a.length; index357++) {
          const s = a[index357];
          StdOut.print$java_lang_Object(s);
        }
        StdOut.println();
      }
    }
  }
}
StdRandom.__class = 'edu.princeton.cs.algs4.StdRandom';

StdRandom.seed_$LI$();

StdRandom.__random_$LI$();

StdRandom.__static_initialize();

StdRandom.main(null);
