/**
 * Performs a linear regression on the data points {@code (y[i], x[i])}.
 *
 * @param  {Array} x the values of the predictor variable
 * @param  {Array} y the corresponding values of the response variable
 * @throws IllegalArgumentException if the lengths of the two arrays are not equal
 * @class
 * @author Robert Sedgewick
 */
export class LinearRegression {
  private __intercept: number;

  private __slope: number;

  private r2: number;

  private svar0: number;

  private svar1: number;

  public constructor(x: number[], y: number[]) {
    if (this.__intercept === undefined) this.__intercept = 0;
    if (this.__slope === undefined) this.__slope = 0;
    if (this.r2 === undefined) this.r2 = 0;
    if (this.svar0 === undefined) this.svar0 = 0;
    if (this.svar1 === undefined) this.svar1 = 0;
    if (x.length !== y.length) {
      throw new Error('array lengths are not equal');
    }
    const n: number = x.length;
    let sumx = 0.0;
    let sumy = 0.0;
    let sumx2 = 0.0;
    for (let i = 0; i < n; i++) {
      {
        sumx += x[i];
        sumx2 += x[i] * x[i];
        sumy += y[i];
      }
    }
    const xbar: number = sumx / n;
    const ybar: number = sumy / n;
    let xxbar = 0.0;
    let yybar = 0.0;
    let xybar = 0.0;
    for (let i = 0; i < n; i++) {
      {
        xxbar += (x[i] - xbar) * (x[i] - xbar);
        yybar += (y[i] - ybar) * (y[i] - ybar);
        xybar += (x[i] - xbar) * (y[i] - ybar);
      }
    }
    this.__slope = xybar / xxbar;
    this.__intercept = ybar - this.__slope * xbar;
    let rss = 0.0;
    let ssr = 0.0;
    for (let i = 0; i < n; i++) {
      {
        const fit: number = this.__slope * x[i] + this.__intercept;
        rss += (fit - y[i]) * (fit - y[i]);
        ssr += (fit - ybar) * (fit - ybar);
      }
    }
    const degreesOfFreedom: number = n - 2;
    this.r2 = ssr / yybar;
    const svar: number = rss / degreesOfFreedom;
    this.svar1 = svar / xxbar;
    this.svar0 = svar / n + xbar * xbar * this.svar1;
  }

  /**
   * Returns the <em>y</em>-intercept &alpha; of the best of the best-fit line <em>y</em> = &alpha; + &beta; <em>x</em>.
   *
   * @return  the <em>y</em>-intercept &alpha; of the best-fit line <em>y = &alpha; + &beta; x</em>
   */
  public intercept(): number {
    return this.__intercept;
  }

  /**
   * Returns the slope &beta; of the best of the best-fit line <em>y</em> = &alpha; + &beta; <em>x</em>.
   *
   * @return  the slope &beta; of the best-fit line <em>y</em> = &alpha; + &beta; <em>x</em>
   */
  public slope(): number {
    return this.__slope;
  }

  /**
   * Returns the coefficient of determination <em>R</em><sup>2</sup>.
   *
   * @return  the coefficient of determination <em>R</em><sup>2</sup>,
   * which is a real number between 0 and 1
   */
  public R2(): number {
    return this.r2;
  }

  /**
   * Returns the standard error of the estimate for the intercept.
   *
   * @return  the standard error of the estimate for the intercept
   */
  public interceptStdErr(): number {
    return Math.sqrt(this.svar0);
  }

  /**
   * Returns the standard error of the estimate for the slope.
   *
   * @return  the standard error of the estimate for the slope
   */
  public slopeStdErr(): number {
    return Math.sqrt(this.svar1);
  }

  /**
   * Returns the expected response {@code y} given the value of the predictor
   * variable {@code x}.
   *
   * @param  {number} x the value of the predictor variable
   * @return  the expected response {@code y} given the value of the predictor
   * variable {@code x}
   */
  public predict(x: number): number {
    return this.__slope * x + this.__intercept;
  }

  /**
   * Returns a string representation of the simple linear regression model.
   *
   * @return  a string representation of the simple linear regression model,
   * including the best-fit line and the coefficient of determination
   * <em>R</em><sup>2</sup>
   */
  public toString(): string {
    const s= new String();
    s.append(
      printf(
        '%.2f n + %.2f',
        this.slope(),
        this.intercept()
      )
    );
    s.append(
      `  (R^2 = ${printf('%.3f', this.R2())})`
    );
    return s.toString();
  }
}
LinearRegression.__class = 'edu.princeton.cs.algs4.LinearRegression';
