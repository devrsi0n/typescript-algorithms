import { StdOut } from './StdOut';

/**
 * Initializes a new date from the month, day, and year.
 * @param  month the month (between 1 and 12)
 * @param  day the day (between 1 and 28-31, depending on the month)
 * @param  year the year
 * @throws IllegalArgumentException if this date is invalid
 * @class
 * @author Robert Sedgewick
 */
export class Date implements java.lang.Comparable<Date> {
  static DAYS: number[];
  public static DAYS_$LI$(): number[] {
    if (Date.DAYS == null)
      Date.DAYS = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return Date.DAYS;
  }

  private __month: number;

  private __day: number;

  private __year: number;

  public constructor(month?: any, day?: any, year?: any) {
    if (
      (typeof month === 'number' || month === null) &&
      (typeof day === 'number' || day === null) &&
      (typeof year === 'number' || year === null)
    ) {
      const __args = arguments;
      if (this.__month === undefined) this.__month = 0;
      if (this.__day === undefined) this.__day = 0;
      if (this.__year === undefined) this.__year = 0;
      if (this.__month === undefined) this.__month = 0;
      if (this.__day === undefined) this.__day = 0;
      if (this.__year === undefined) this.__year = 0;
      (() => {
        if (!Date.isValid(month, day, year)) throw new Error('Invalid date');
        this.__month = month;
        this.__day = day;
        this.__year = year;
      })();
    } else if (
      (typeof month === 'string' || month === null) &&
      day === undefined &&
      year === undefined
    ) {
      const __args = arguments;
      const date: any = __args[0];
      if (this.__month === undefined) this.__month = 0;
      if (this.__day === undefined) this.__day = 0;
      if (this.__year === undefined) this.__year = 0;
      if (this.__month === undefined) this.__month = 0;
      if (this.__day === undefined) this.__day = 0;
      if (this.__year === undefined) this.__year = 0;
      (() => {
        const fields: string[] = date.split('/');
        if (fields.length !== 3) {
          throw new Error('Invalid date');
        }
        this.__month = parseInt(fields[0]);
        this.__day = parseInt(fields[1]);
        this.__year = parseInt(fields[2]);
        if (!Date.isValid(this.__month, this.__day, this.__year))
          throw new Error('Invalid date');
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Return the month.
   * @return  the month (an integer between 1 and 12)
   */
  public month(): number {
    return this.__month;
  }

  /**
   * Returns the day.
   * @return  the day (an integer between 1 and 31)
   */
  public day(): number {
    return this.__day;
  }

  /**
   * Returns the year.
   * @return  the year
   */
  public year(): number {
    return this.__year;
  }

  private static isValid(m: number, d: number, y: number): boolean {
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > Date.DAYS_$LI$()[m]) return false;
    if (m === 2 && d === 29 && !Date.isLeapYear(y)) return false;
    return true;
  }

  private static isLeapYear(y: number): boolean {
    if (y % 400 === 0) return true;
    if (y % 100 === 0) return false;
    return y % 4 === 0;
  }

  /**
   * Returns the next date in the calendar.
   *
   * @return {Date} a date that represents the next day after this day
   */
  public next(): Date {
    if (Date.isValid(this.__month, this.__day + 1, this.__year))
      return new Date(this.__month, this.__day + 1, this.__year);
    if (Date.isValid(this.__month + 1, 1, this.__year))
      return new Date(this.__month + 1, 1, this.__year);
    return new Date(1, 1, this.__year + 1);
  }

  /**
   * Compares two dates chronologically.
   *
   * @param  {Date} that the other date
   * @return  {@code true} if this date is after that date; {@code false} otherwise
   */
  public isAfter(that: Date): boolean {
    return this.compareTo(that) > 0;
  }

  /**
   * Compares two dates chronologically.
   *
   * @param  {Date} that the other date
   * @return  {@code true} if this date is before that date; {@code false} otherwise
   */
  public isBefore(that: Date): boolean {
    return this.compareTo(that) < 0;
  }

  /**
   * Compares two dates chronologically.
   *
   * @return  the value {@code 0} if the argument date is equal to this date;
   * a negative integer if this date is chronologically less than
   * the argument date; and a positive ineger if this date is chronologically
   * after the argument date
   * @param {Date} that
   */
  public compareTo(that: Date): number {
    if (this.__year < that.__year) return -1;
    if (this.__year > that.__year) return +1;
    if (this.__month < that.__month) return -1;
    if (this.__month > that.__month) return +1;
    if (this.__day < that.__day) return -1;
    if (this.__day > that.__day) return +1;
    return 0;
  }

  /**
   * Returns a string representation of this date.
   *
   * @return  the string representation in the format MM/DD/YYYY
   */
  public toString(): string {
    return `${this.__month}/${this.__day}/${this.__year}`;
  }

  /**
   * Compares this date to the specified date.
   *
   * @param   other the other date
   * @return  {@code true} if this date equals {@code other}; {@code false} otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Date = <Date>other;
    return (
      this.__month === that.__month &&
      this.__day === that.__day &&
      this.__year === that.__year
    );
  }

  /**
   * Returns an integer hash code for this date.
   *
   * @return  an integer hash code for this date
   */
  public hashCode(): number {
    let hash = 17;
    hash = 31 * hash + this.__month;
    hash = 31 * hash + this.__day;
    hash = 31 * hash + this.__year;
    return hash;
  }

  /**
   * Unit tests the {@code Date} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    let today: Date = new Date(2, 25, 2004);
    StdOut.println$java_lang_Object(today);
    for (let i = 0; i < 10; i++) {
      {
        today = today.next();
        StdOut.println$java_lang_Object(today);
      }
    }
    StdOut.println$boolean(today.isAfter(today.next()));
    StdOut.println$boolean(today.isAfter(today));
    StdOut.println$boolean(today.next().isAfter(today));
    let birthday: Date = new Date(10, 16, 1971);
    StdOut.println$java_lang_Object(birthday);
    for (let i = 0; i < 10; i++) {
      {
        birthday = birthday.next();
        StdOut.println$java_lang_Object(birthday);
      }
    }
  }
}
Date.__class = 'edu.princeton.cs.algs4.Date';
Date.__interfaces = ['java.lang.Comparable'];

Date.DAYS_$LI$();

Date.main(null);
