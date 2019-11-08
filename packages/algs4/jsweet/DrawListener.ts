/**
 * <i>DrawListener</i>. This interface provides a basic capability for
 * responding to keyboard in mouse events from {@link Draw} via callbacks.
 * You can see some examples in
 * <a href="https://introcs.cs.princeton.edu/java/36inheritance">Section 3.6</a>.
 *
 * <p>
 * For additional documentation, see
 * <a href="https://introcs.cs.princeton.edu/31datatype">Section 3.1</a> of
 * <i>Computer Science: An Interdisciplinary Approach</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export interface DrawListener {
  /**
   * Invoked when the mouse has been pressed.
   *
   * @param {number} x the x-coordinate of the mouse
   * @param {number} y the y-coordinate of the mouse
   */
  mousePressed(x: number, y: number);

  /**
   * Invoked when the mouse has been dragged.
   *
   * @param {number} x the x-coordinate of the mouse
   * @param {number} y the y-coordinate of the mouse
   */
  mouseDragged(x: number, y: number);

  /**
   * Invoked when the mouse has been released.
   *
   * @param {number} x the x-coordinate of the mouse
   * @param {number} y the y-coordinate of the mouse
   */
  mouseReleased(x: number, y: number);

  /**
   * Invoked when the mouse has been clicked (pressed and released).
   *
   * @param {number} x the x-coordinate of the mouse
   * @param {number} y the y-coordinate of the mouse
   */
  mouseClicked(x: number, y: number);

  /**
   * Invoked when a key has been typed.
   *
   * @param {string} c the character typed
   */
  keyTyped(c: string);

  /**
   * Invoked when a key has been pressed.
   *
   * @param {number} keycode the key combination pressed
   */
  keyPressed(keycode: number);

  /**
   * Invoked when a key has been released.
   *
   * @param {number} keycode the key combination released
   */
  keyReleased(keycode: number);
}
