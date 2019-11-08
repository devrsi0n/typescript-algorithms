import printf from 'printf';

/* eslint-disable no-console */

export default class StdOut {
  static print(s: any) {
    console.log(s);
  }

  static println(s?: any) {
    console.log(`${s}`);
  }

  static printf(format: string, ...args: any[]) {
    console.log(printf(format, ...args));
  }
}
