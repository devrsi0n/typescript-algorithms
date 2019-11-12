import ms from 'ms';

export default class StopWatch {
  private start: number = Date.now();

  elapseTime() {
    return Date.now() - this.start;
  }

  toString() {
    console.log(`Elapse ${this.getReadableStr(this.elapseTime())} ms`);
  }

  private getReadableStr(time: number) {
    if (time < 1000) {
      return `${time} ms`;
    }
    if (time >= 1000 && time < 6000) {
      return `${time / 1000} s`;
    }
    return ms(time, { long: true });
  }
}
