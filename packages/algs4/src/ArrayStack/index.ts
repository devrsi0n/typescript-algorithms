/**
 * FixedCapacityStack and ResizingArrayStack.
 * JS array size can increase dynamically.
 */
export default class ArrayStack<Item> {
  private a: Item[] = [];

  push(item: Item) {
    this.a.push(item);
  }

  pop() {
    return this.a.pop();
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.a.length;
  }
}
