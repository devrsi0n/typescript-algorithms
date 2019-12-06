import debug from 'debug';
import StopWatch from '../StopWatch';
import Selection from '../Selection';
import Insertion from '../Insertion';
import StdRandom from '../StdRandom';
import StdOut from '../StdOut';

const d = debug('algs4:SortCompare');

export default class SortCompare {
  // constructor(parameters) {
  // }
  static time(alg: string, a: any[]) {
    const sw = new StopWatch();
    if (alg === 'Selection') {
      Selection.sortNumber(a);
    } else if (alg === 'Insertion') {
      Insertion.sortNumber(a);
    }
    return sw.elapsedTime();
  }

  static timeRandomInput(alg: string, N: number, T: number) {
    let total = 0;
    const a = new Array<number>(N);
    for (let t = 0; t < T; t++) {
      for (let i = 0; i < N; i++) {
        a[i] = StdRandom.uniform();
      }
      total += SortCompare.time(alg, a);
      StdOut.println(`${alg}(${N}, ${t}): ${total}`);
    }
    return total;
  }

  static main() {
    const { argv } = process;
    const alg1 = argv[1];
    const alg2 = argv[2];
    const N = parseInt(argv[3], 10);
    const T = parseInt(argv[4], 10);
    const t1 = SortCompare.timeRandomInput(alg1, N, T);
    const t2 = SortCompare.timeRandomInput(alg2, N, T);
    d(`t1: ${t1}`);
    d(`t2: ${t2}`);
    StdOut.println(`t1: ${t1}`);
    StdOut.println(`t2: ${t2}`);
    StdOut.printf('For %d random Doubles\n   %s is', N, alg1);
    StdOut.printf(' %.1f times faster than %s\n', t2 / t1, alg2);
  }
}
