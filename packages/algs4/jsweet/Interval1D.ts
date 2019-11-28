import { StdOut } from './StdOut';

/**
 * Initializes a closed interval [min, max].
 *
 * @param   min the smaller endpoint
 * @param   max the larger endpoint
 * @throws IllegalArgumentException if the min endpoint is greater than the max endpoint
 * @throws IllegalArgumentException if either `min` or `max`
 * is `Double.NaN`, `Double.POSITIVE_INFINITY` or
 * `Double.NEGATIVE_INFINITY`
 * @class
 * @author Robert Sedgewick
 */
export class Interval1D {
  /**
   * Compares two intervals by min endpoint.
   */
  public static MIN_ENDPOINT_ORDER: Comparator<Interval1D>;
  public static MIN_ENDPOINT_ORDER_$LI$(): Comparator<Interval1D> {
    if (Interval1D.MIN_ENDPOINT_ORDER == null)
      Interval1D.MIN_ENDPOINT_ORDER = (arg0, arg1) => {
        return new Interval1D.MinEndpointComparator().compare(arg0, arg1);
      };
    return Interval1D.MIN_ENDPOINT_ORDER;
  }

  /**
   * Compares two intervals by max endpoint.
   */
  public static MAX_ENDPOINT_ORDER: Comparator<Interval1D>;
  public static MAX_ENDPOINT_ORDER_$LI$(): Comparator<Interval1D> {
    if (Interval1D.MAX_ENDPOINT_ORDER == null)
      Interval1D.MAX_ENDPOINT_ORDER = (arg0, arg1) => {
        return new Interval1D.MaxEndpointComparator().compare(arg0, arg1);
      };
    return Interval1D.MAX_ENDPOINT_ORDER;
  }

  /**
   * Compares two intervals by length.
   */
  public static LENGTH_ORDER: Comparator<Interval1D>;
  public static LENGTH_ORDER_$LI$(): Comparator<Interval1D> {
    if (Interval1D.LENGTH_ORDER == null)
      Interval1D.LENGTH_ORDER = (arg0, arg1) => {
        return new Interval1D.LengthComparator().compare(arg0, arg1);
      };
    return Interval1D.LENGTH_ORDER;
  }

  private __min: number;

  private __max: number;

  public constructor(min: number, max: number) {
    if (this.__min === undefined) this.__min = 0;
    if (this.__max === undefined) this.__max = 0;
    if (
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(min) ||
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(max)
    )
      throw new Error('Endpoints must be finite');
    if (/* isNaN */ isNaN(min) || /* isNaN */ isNaN(max))
      throw new Error('Endpoints cannot be NaN');
    if (min === 0.0) min = 0.0;
    if (max === 0.0) max = 0.0;
    if (min <= max) {
      this.__min = min;
      this.__max = max;
    } else throw new Error('Illegal interval');
  }

  /**
   * Returns the left endpoint of this interval.
   *
   * @return  the left endpoint of this interval
   * @deprecated Replaced by {@link #min()}.
   */
  public left(): number {
    return this.__min;
  }

  /**
   * Returns the right endpoint of this interval.
   * @return  the right endpoint of this interval
   * @deprecated Replaced by {@link #max()}.
   */
  public right(): number {
    return this.__max;
  }

  /**
   * Returns the min endpoint of this interval.
   *
   * @return  the min endpoint of this interval
   */
  public min(): number {
    return this.__min;
  }

  /**
   * Returns the max endpoint of this interval.
   *
   * @return  the max endpoint of this interval
   */
  public max(): number {
    return this.__max;
  }

  /**
   * Returns true if this interval intersects the specified interval.
   *
   * @param  {Interval1D} that the other interval
   * @return  `true` if this interval intersects the argument interval;
   * `false` otherwise
   */
  public intersects(that: Interval1D): boolean {
    if (this.__max < that.__min) return false;
    if (that.__max < this.__min) return false;
    return true;
  }

  /**
   * Returns true if this interval contains the specified value.
   *
   * @param  x the value
   * @return  `true` if this interval contains the value `x`;
   * `false` otherwise
   */
  public contains(x: number): boolean {
    return this.__min <= x && x <= this.__max;
  }

  /**
   * Returns the length of this interval.
   *
   * @return  the length of this interval (max - min)
   */
  public length(): number {
    return this.__max - this.__min;
  }

  /**
   * Returns a string representation of this interval.
   *
   * @return  a string representation of this interval in the form [min, max]
   */
  public toString(): string {
    return `[${this.__min}, ${this.__max}]`;
  }

  /**
   * Compares this transaction to the specified object.
   *
   * @param   other the other interval
   * @return  `true` if this interval equals the other interval;
   * `false` otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Interval1D = <Interval1D>other;
    return this.__min === that.__min && this.__max === that.__max;
  }

  /**
   * Returns an integer hash code for this interval.
   *
   * @return  an integer hash code for this interval
   */
  public hashCode(): number {
    const hash1: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__min);
    const hash2: number = /* hashCode */ <any>((o: any) => {
      if (o.hashCode) {
        return o.hashCode();
      }
      return o
        .toString()
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    })(<number>this.__max);
    return 31 * hash1 + hash2;
  }

  /**
   * Unit tests the `Interval1D` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const intervals: Interval1D[] = [null, null, null, null];
    intervals[0] = new Interval1D(15.0, 33.0);
    intervals[1] = new Interval1D(45.0, 60.0);
    intervals[2] = new Interval1D(20.0, 70.0);
    intervals[3] = new Interval1D(46.0, 55.0);
    StdOut.println$java_lang_Object('Unsorted');
    for (let i = 0; i < intervals.length; i++) {
      StdOut.println$java_lang_Object(intervals[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by min endpoint');
    Arrays.sort<any>(intervals, <any>Interval1D.MIN_ENDPOINT_ORDER_$LI$());
    for (let i = 0; i < intervals.length; i++) {
      StdOut.println$java_lang_Object(intervals[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by max endpoint');
    Arrays.sort<any>(intervals, <any>Interval1D.MAX_ENDPOINT_ORDER_$LI$());
    for (let i = 0; i < intervals.length; i++) {
      StdOut.println$java_lang_Object(intervals[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by length');
    Arrays.sort<any>(intervals, <any>Interval1D.LENGTH_ORDER_$LI$());
    for (let i = 0; i < intervals.length; i++) {
      StdOut.println$java_lang_Object(intervals[i]);
    }
    StdOut.println();
  }
}
Interval1D.__class = 'edu.princeton.cs.algs4.Interval1D';

export namespace Interval1D {
  export class MinEndpointComparator {
    public compare(a: Interval1D, b: Interval1D): number {
      if (a.__min < b.__min) return -1;
      if (a.__min > b.__min) return +1;
      if (a.__max < b.__max) return -1;
      if (a.__max > b.__max) return +1;
      return 0;
    }
  }
  MinEndpointComparator.__class =
    'edu.princeton.cs.algs4.Interval1D.MinEndpointComparator';
  MinEndpointComparator.__interfaces = ['java.util.Comparator'];

  export class MaxEndpointComparator {
    public compare(a: Interval1D, b: Interval1D): number {
      if (a.__max < b.__max) return -1;
      if (a.__max > b.__max) return +1;
      if (a.__min < b.__min) return -1;
      if (a.__min > b.__min) return +1;
      return 0;
    }
  }
  MaxEndpointComparator.__class =
    'edu.princeton.cs.algs4.Interval1D.MaxEndpointComparator';
  MaxEndpointComparator.__interfaces = ['java.util.Comparator'];

  export class LengthComparator {
    public compare(a: Interval1D, b: Interval1D): number {
      const alen: number = a.length();
      const blen: number = b.length();
      if (alen < blen) return -1;
      if (alen > blen) return +1;
      return 0;
    }
  }
  LengthComparator.__class =
    'edu.princeton.cs.algs4.Interval1D.LengthComparator';
  LengthComparator.__interfaces = ['java.util.Comparator'];
}

Interval1D.LENGTH_ORDER_$LI$();

Interval1D.MAX_ENDPOINT_ORDER_$LI$();

Interval1D.MIN_ENDPOINT_ORDER_$LI$();

Interval1D.main(null);
