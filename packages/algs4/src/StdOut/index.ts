import printf from 'printf';

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
