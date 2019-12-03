import printf from 'printf';

/* eslint-disable no-console */

export default class StdOut {
  /**
   * Print without newline
   * @param s
   */
  static print(s: any) {
    process.stdout.write(`${s}`);
  }

  static println(s = '') {
    console.log(`${s}`);
  }

  static printf(format: string, ...args: any[]) {
    printf(process.stdout, format, ...args);
  }
}
