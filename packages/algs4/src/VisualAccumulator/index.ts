import StdDraw from '../StdDraw';

export default class VisualAccumulator {
  private total = 0;
  private n = 0;

  // constructor(trials: number, max: number) {
  // StdDraw.setXscale(0, trials);
  // StdDraw.setYscale(0, max);
  // StdDraw.setPenRadius(0.005);
  // }

  public addDataValue(value: number) {
    this.n++;
    this.total += value;
    StdDraw.setPenColor(StdDraw.DARK_GRAY);
    StdDraw.point(this.n, value);
    StdDraw.setPenColor(StdDraw.RED);
    StdDraw.point(this.n, this.mean());
  }

  public mean() {
    return this.total / this.n;
  }

  public toString() {
    return `n = ${this.n}, mean = ${this.mean()}`;
  }
}
