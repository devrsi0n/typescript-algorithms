export interface Comparable<T> {
  compareTo(o: T): number;
}

export interface Comparator<T> {
  compare(o1: T, o2: T): number;
  equals(o: Comparator<any>): boolean;
}

export class StringComparator implements Comparator<string> {
  compare(a: string, b: string): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  equals(o: Comparator<any>): boolean {
    return this === o;
  }
}

export class NumberComparator implements Comparator<string> {
  compare(a: string, b: string): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  equals(o: Comparator<any>): boolean {
    return this === o;
  }
}
