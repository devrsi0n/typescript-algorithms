import { Date } from './Date';
import { StdOut } from './StdOut';

/**
 * Initializes a new transaction from the given arguments.
 *
 * @param   who the person involved in this transaction
 * @param  {Date} when the date of this transaction
 * @param   amount the amount of this transaction
 * @throws IllegalArgumentException if `amount`
 * is `Double.NaN`, `Double.POSITIVE_INFINITY`,
 * or `Double.NEGATIVE_INFINITY`
 * @class
 * @author Robert Sedgewick
 */
export class Transaction implements java.lang.Comparable<Transaction> {
  private __who: string;

  private __when: Date;

  private __amount: number;

  public constructor(who?: any, when?: any, amount?: any) {
    if (
      (typeof who === 'string' || who === null) &&
      ((when != null && when instanceof <any>Date) || when === null) &&
      (typeof amount === 'number' || amount === null)
    ) {
      const __args = arguments;
      if (this.__who === undefined) this.__who = null;
      if (this.__when === undefined) this.__when = null;
      if (this.__amount === undefined) this.__amount = 0;
      if (this.__who === undefined) this.__who = null;
      if (this.__when === undefined) this.__when = null;
      if (this.__amount === undefined) this.__amount = 0;
      (() => {
        if (
          /* isNaN */ isNaN(amount) ||
          /* isInfinite */ ((value) =>
            Number.NEGATIVE_INFINITY === value ||
            Number.POSITIVE_INFINITY === value)(amount)
        )
          throw new Error('Amount cannot be NaN or infinite');
        this.__who = who;
        this.__when = when;
        this.__amount = amount;
      })();
    } else if (
      (typeof who === 'string' || who === null) &&
      when === undefined &&
      amount === undefined
    ) {
      const __args = arguments;
      const transaction: any = __args[0];
      if (this.__who === undefined) this.__who = null;
      if (this.__when === undefined) this.__when = null;
      if (this.__amount === undefined) this.__amount = 0;
      if (this.__who === undefined) this.__who = null;
      if (this.__when === undefined) this.__when = null;
      if (this.__amount === undefined) this.__amount = 0;
      (() => {
        const a: string[] = transaction.split('\\s+');
        this.__who = a[0];
        this.__when = new Date(a[1]);
        this.__amount = Number.parseFloat(a[2]);
        if (
          /* isNaN */ isNaN(this.__amount) ||
          /* isInfinite */ ((value) =>
            Number.NEGATIVE_INFINITY === value ||
            Number.POSITIVE_INFINITY === value)(this.__amount)
        )
          throw new Error('Amount cannot be NaN or infinite');
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the name of the customer involved in this transaction.
   *
   * @return  the name of the customer involved in this transaction
   */
  public who(): string {
    return this.__who;
  }

  /**
   * Returns the date of this transaction.
   *
   * @return {Date} the date of this transaction
   */
  public when(): Date {
    return this.__when;
  }

  /**
   * Returns the amount of this transaction.
   *
   * @return  the amount of this transaction
   */
  public amount(): number {
    return this.__amount;
  }

  /**
   * Returns a string representation of this transaction.
   *
   * @return  a string representation of this transaction
   */
  public toString(): string {
    return printf('%-10s %10s %8.2f', this.__who, this.__when, this.__amount);
  }

  /**
   * Compares two transactions by amount.
   *
   * @param  {Transaction} that the other transaction
   * @return  { a negative integer, zero, a positive integer}, depending
   * on whether the amount of this transaction is { less than,
   * equal to, or greater than } the amount of that transaction
   */
  public compareTo(that: Transaction): number {
    return /* compare */ this.__amount - that.__amount;
  }

  /**
   * Compares this transaction to the specified object.
   *
   * @param   other the other transaction
   * @return  true if this transaction is equal to `other`; false otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Transaction = <Transaction>other;
    return this.__amount === that.__amount && /* equals */ <any>((
        o1: any,
        o2: any
      ) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(this.__who, that.__who) && this.__when.equals(that.__when);
  }

  /**
   * Returns a hash code for this transaction.
   *
   * @return  a hash code for this transaction
   */
  public hashCode(): number {
    let hash = 1;
    hash = 31 * hash + /* hashCode */ <any>((o: any) => {
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
      })(this.__who);
    hash = 31 * hash + /* hashCode */ <any>((o: any) => {
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
      })(this.__when);
    hash = 31 * hash + /* hashCode */ <any>((o: any) => {
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
      })(<number>this.__amount);
    return hash;
  }

  /**
   * Unit tests the `Transaction` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: Transaction[] = [null, null, null, null];
    a[0] = new Transaction('Turing   6/17/1990  644.08');
    a[1] = new Transaction('Tarjan   3/26/2002 4121.85');
    a[2] = new Transaction('Knuth    6/14/1999  288.34');
    a[3] = new Transaction('Dijkstra 8/22/2007 2678.40');
    StdOut.println$java_lang_Object('Unsorted');
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by date');
    Arrays.sort<any>(a, (arg0, arg1) => {
      return new Transaction.WhenOrder().compare(arg0, arg1);
    });
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by customer');
    Arrays.sort<any>(a, (arg0, arg1) => {
      return new Transaction.WhoOrder().compare(arg0, arg1);
    });
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
    StdOut.println();
    StdOut.println$java_lang_Object('Sort by amount');
    Arrays.sort<any>(a, (arg0, arg1) => {
      return new Transaction.HowMuchOrder().compare(arg0, arg1);
    });
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
    StdOut.println();
  }
}
Transaction.__class = 'edu.princeton.cs.algs4.Transaction';
Transaction.__interfaces = ['java.lang.Comparable'];

export namespace Transaction {
  /**
   * Compares two transactions by customer name.
   * @class
   */
  export class WhoOrder {
    /**
     *
     * @param {Transaction} v
     * @param {Transaction} w
     * @return
     */
    public compare(v: Transaction, w: Transaction): number {
      return /* compareTo */ v.__who.localeCompare(w.__who);
    }
  }
  WhoOrder.__class = 'edu.princeton.cs.algs4.Transaction.WhoOrder';
  WhoOrder.__interfaces = ['java.util.Comparator'];

  /**
   * Compares two transactions by date.
   * @class
   */
  export class WhenOrder {
    /**
     *
     * @param {Transaction} v
     * @param {Transaction} w
     * @return
     */
    public compare(v: Transaction, w: Transaction): number {
      return v.__when.compareTo(w.__when);
    }
  }
  WhenOrder.__class = 'edu.princeton.cs.algs4.Transaction.WhenOrder';
  WhenOrder.__interfaces = ['java.util.Comparator'];

  /**
   * Compares two transactions by amount.
   * @class
   */
  export class HowMuchOrder {
    /**
     *
     * @param {Transaction} v
     * @param {Transaction} w
     * @return
     */
    public compare(v: Transaction, w: Transaction): number {
      return /* compare */ v.__amount - w.__amount;
    }
  }
  HowMuchOrder.__class = 'edu.princeton.cs.algs4.Transaction.HowMuchOrder';
  HowMuchOrder.__interfaces = ['java.util.Comparator'];
}

Transaction.main(null);
