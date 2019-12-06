import { performance } from 'perf_hooks';
import ms from 'ms';

export default class StopWatch {
  private start: number;

  constructor() {
    this.start = this.getCurrentMs();
  }

  /**
   * Returns the elapsed CPU time (in seconds) since the stopwatch was created.
   *
   * @return elapsed CPU time (in seconds) since the stopwatch was created
   */
  elapsedTime() {
    return (this.getCurrentMs() - this.start) / 1000;
  }

  private getCurrentMs() {
    return performance.now();
    // return Date.now();
  }

  toString() {
    console.log(`Elapse ${this.getReadableStr(this.elapsedTime())} ms`);
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
