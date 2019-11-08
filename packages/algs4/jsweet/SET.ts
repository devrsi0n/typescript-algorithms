import { StdOut } from './StdOut';

/**
 * Initializes a new set that is an independent copy of the specified set.
 *
 * @param {SET} x the set to copy
 * @class
 * @author Robert Sedgewick
 */
export class SET<Key extends java.lang.Comparable<Key>>
  implements Iterable<Key> {
  private set: TreeSet<Key>;

  public constructor(x?: any) {
    if ((x != null && x instanceof <any>SET) || x === null) {
      const __args = arguments;
      if (this.set === undefined) this.set = null;
      if (this.set === undefined) this.set = null;
      (() => {
        this.set = <any>new TreeSet<Key>(x.set);
      })();
    } else if (x === undefined) {
      const __args = arguments;
      if (this.set === undefined) this.set = null;
      if (this.set === undefined) this.set = null;
      (() => {
        this.set = <any>new TreeSet<Key>();
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Adds the key to this set (if it is not already present).
   *
   * @param   key the key to add
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public add(key: Key) {
    if (key == null) throw new Error('called add() with a null key');
    this.set.add(key);
  }

  /**
   * Returns true if this set contains the given key.
   *
   * @param   key the key
   * @return  {@code true} if this set contains {@code key};
   * {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public contains(key: Key): boolean {
    if (key == null) throw new Error('called contains() with a null key');
    return this.set.contains(key);
  }

  /**
   * Removes the specified key from this set (if the set contains the specified key).
   *
   * @param   key the key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  public delete(key: Key) {
    if (key == null) throw new Error('called delete() with a null key');
    this.set.remove(key);
  }

  /**
   * Returns the number of keys in this set.
   *
   * @return  the number of keys in this set
   */
  public size(): number {
    return this.set.size();
  }

  /**
   * Returns true if this set is empty.
   *
   * @return  {@code true} if this set is empty;
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns all of the keys in this set, as an iterator.
   * To iterate over all of the keys in a set named {@code set}, use the
   * foreach notation: {@code for (Key key : set)}.
   *
   * @return  an iterator to all of the keys in this set
   */
  public iterator(): Iterator<Key> {
    return this.set.iterator();
  }

  /**
   * Returns the largest key in this set.
   *
   * @return  the largest key in this set
   * @throws Error if this set is empty
   */
  public max(): Key {
    if (this.isEmpty())
      throw new Error('called max() with empty set');
    return this.set.last();
  }

  /**
   * Returns the smallest key in this set.
   *
   * @return  the smallest key in this set
   * @throws Error if this set is empty
   */
  public min(): Key {
    if (this.isEmpty())
      throw new Error('called min() with empty set');
    return this.set.first();
  }

  /**
   * Returns the smallest key in this set greater than or equal to {@code key}.
   *
   * @param   key the key
   * @return  the smallest key in this set greater than or equal to {@code key}
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws Error if there is no such key
   */
  public ceiling(key: Key): Key {
    if (key == null) throw new Error('called ceiling() with a null key');
    const k: Key = this.set.ceiling(key);
    if (k == null)
      throw new Error(`all keys are less than ${key}`);
    return k;
  }

  /**
   * Returns the largest key in this set less than or equal to {@code key}.
   *
   * @param   key the key
   * @return  the largest key in this set table less than or equal to {@code key}
   * @throws IllegalArgumentException if {@code key} is {@code null}
   * @throws Error if there is no such key
   */
  public floor(key: Key): Key {
    if (key == null) throw new Error('called floor() with a null key');
    const k: Key = this.set.floor(key);
    if (k == null)
      throw new Error(`all keys are greater than ${key}`);
    return k;
  }

  /**
   * Returns the union of this set and that set.
   *
   * @param  {SET} that the other set
   * @return {SET} the union of this set and that set
   * @throws IllegalArgumentException if {@code that} is {@code null}
   */
  public union(that: SET<Key>): SET<Key> {
    if (that == null) throw new Error('called union() with a null argument');
    const c: SET<Key> = <any>new SET<Key>();
    for (let index343 = this.iterator(); index343.hasNext(); ) {
      const x = index343.next();
      {
        c.add(x);
      }
    }
    for (let index344 = that.iterator(); index344.hasNext(); ) {
      const x = index344.next();
      {
        c.add(x);
      }
    }
    return c;
  }

  /**
   * Returns the intersection of this set and that set.
   *
   * @param  {SET} that the other set
   * @return {SET} the intersection of this set and that set
   * @throws IllegalArgumentException if {@code that} is {@code null}
   */
  public intersects(that: SET<Key>): SET<Key> {
    if (that == null)
      throw new Error('called intersects() with a null argument');
    const c: SET<Key> = <any>new SET<Key>();
    if (this.size() < that.size()) {
      for (let index345 = this.iterator(); index345.hasNext(); ) {
        const x = index345.next();
        {
          if (that.contains(x)) c.add(x);
        }
      }
    } else {
      for (let index346 = that.iterator(); index346.hasNext(); ) {
        const x = index346.next();
        {
          if (this.contains(x)) c.add(x);
        }
      }
    }
    return c;
  }

  /**
   *
   * Compares this set to the specified set.
   * <p>
   * Note that this method declares two empty sets to be equal
   * even if they are parameterized by different generic types.
   * This is consistent with the behavior of {@code equals()}
   * within Java's Collections framework.
   *
   * @param   other the other set
   * @return  {@code true} if this set equals {@code other};
   * {@code false} otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: SET<any> = <SET<any>>other;
    return this.set.equals(that.set);
  }

  /**
   * This operation is not supported because sets are mutable.
   *
   * @return  does not return a value
   * @throws UnsupportedOperationException if called
   */
  public hashCode(): number {
    throw new java.lang.UnsupportedOperationException(
      'hashCode() is not supported because sets are mutable'
    );
  }

  /**
   * Returns a string representation of this set.
   *
   * @return  a string representation of this set, enclosed in curly braces,
   * with adjacent keys separated by a comma and a space
   */
  public toString(): string {
    const s: string = this.set.toString();
    return `{ ${s.substring(1, s.length - 1)} }`;
  }

  /**
   * Unit tests the {@code SET} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const set: SET<string> = <any>new SET<string>();
    StdOut.println$java_lang_Object(`set = ${set}`);
    set.add('www.cs.princeton.edu');
    set.add('www.cs.princeton.edu');
    set.add('www.princeton.edu');
    set.add('www.math.princeton.edu');
    set.add('www.yale.edu');
    set.add('www.amazon.com');
    set.add('www.simpsons.com');
    set.add('www.stanford.edu');
    set.add('www.google.com');
    set.add('www.ibm.com');
    set.add('www.apple.com');
    set.add('www.slashdot.com');
    set.add('www.whitehouse.gov');
    set.add('www.espn.com');
    set.add('www.snopes.com');
    set.add('www.movies.com');
    set.add('www.cnn.com');
    set.add('www.iitb.ac.in');
    StdOut.println$boolean(set.contains('www.cs.princeton.edu'));
    StdOut.println$boolean(!set.contains('www.harvardsucks.com'));
    StdOut.println$boolean(set.contains('www.simpsons.com'));
    StdOut.println();
    StdOut.println$java_lang_Object(
      `ceiling(www.simpsonr.com) = ${set.ceiling('www.simpsonr.com')}`
    );
    StdOut.println$java_lang_Object(
      `ceiling(www.simpsons.com) = ${set.ceiling('www.simpsons.com')}`
    );
    StdOut.println$java_lang_Object(
      `ceiling(www.simpsont.com) = ${set.ceiling('www.simpsont.com')}`
    );
    StdOut.println$java_lang_Object(
      `floor(www.simpsonr.com)   = ${set.floor('www.simpsonr.com')}`
    );
    StdOut.println$java_lang_Object(
      `floor(www.simpsons.com)   = ${set.floor('www.simpsons.com')}`
    );
    StdOut.println$java_lang_Object(
      `floor(www.simpsont.com)   = ${set.floor('www.simpsont.com')}`
    );
    StdOut.println();
    StdOut.println$java_lang_Object(`set = ${set}`);
    StdOut.println();
    for (let index347 = set.iterator(); index347.hasNext(); ) {
      const s = index347.next();
      {
        StdOut.println$java_lang_Object(s);
      }
    }
    StdOut.println();
    const set2: SET<string> = <any>new SET<string>(set);
    StdOut.println$boolean(set.equals(set2));
  }
}
SET.__class = 'edu.princeton.cs.algs4.SET';
SET.__interfaces = ['Iterable'];

SET.main(null);
