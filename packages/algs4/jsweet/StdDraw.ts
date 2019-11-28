/**
 * The `StdDraw` class provides a basic capability for
 * creating drawings with your programs. It uses a simple graphics model that
 * allows you to create drawings consisting of points, lines, squares,
 * circles, and other geometric shapes in a window on your computer and
 * to save the drawings to a file. Standard drawing also includes
 * facilities for text, color, pictures, and animation, along with
 * user interaction via the keyboard and mouse.
 * <p>
 * <b>Getting started.</b>
 * To use this class, you must have `StdDraw.class` in your
 * Java classpath. If you used our autoinstaller, you should be all set.
 * Otherwise, either download
 * <a href = "https://introcs.cs.princeton.edu/java/code/stdlib.jar">stdlib.jar</a>
 * and add to your Java classpath or download
 * <a href = "https://introcs.cs.princeton.edu/java/stdlib/StdDraw.java">StdDraw.java</a>
 * and put a copy in your working directory.
 * <p>
 * Now, type the following short program into your editor:
 * <pre>
 * public class TestStdDraw {
 * public static void main(String[] args) {
 * StdDraw.setPenRadius(0.05);
 * StdDraw.setPenColor(StdDraw.BLUE);
 * StdDraw.point(0.5, 0.5);
 * StdDraw.setPenColor(StdDraw.MAGENTA);
 * StdDraw.line(0.2, 0.2, 0.8, 0.2);
 * }
 * }
 * </pre>
 * If you compile and execute the program, you should see a window
 * appear with a thick magenta line and a blue point.
 * This program illustrates the two main types of methods in standard
 * drawing��methods that draw geometric shapes and methods that
 * control drawing parameters.
 * The methods `StdDraw.line()} and `StdDraw.point()`
 * draw lines and points; the methods `StdDraw.setPenRadius()`
 * and `StdDraw.setPenColor()` control the line thickness and color.
 * <p>
 * <b>Points and lines.</b>
 * You can draw points and line segments with the following methods:
 * <ul>
 * <li> {@link #point(double x, double y)}
 * <li> {@link #line(double x1, double y1, double x2, double y2)}
 * </ul>
 * <p>
 * The <em>x</em>- and <em>y</em>-coordinates must be in the drawing area
 * (between 0 and 1 and by default) or the points and lines will not be visible.
 * <p>
 * <b>Squares, circles, rectangles, and ellipses.</b>
 * You can draw squares, circles, rectangles, and ellipses using
 * the following methods:
 * <ul>
 * <li> {@link #circle(double x, double y, double radius)}
 * <li> {@link #ellipse(double x, double y, double semiMajorAxis, double semiMinorAxis)}
 * <li> {@link #square(double x, double y, double halfLength)}
 * <li> {@link #rectangle(double x, double y, double halfWidth, double halfHeight)}
 * </ul>
 * <p>
 * All of these methods take as arguments the location and size of the shape.
 * The location is always specified by the <em>x</em>- and <em>y</em>-coordinates
 * of its <em>center</em>.
 * The size of a circle is specified by its radius and the size of an ellipse is
 * specified by the lengths of its semi-major and semi-minor axes.
 * The size of a square or rectangle is specified by its half-width or half-height.
 * The convention for drawing squares and rectangles is parallel to those for
 * drawing circles and ellipses, but may be unexpected to the uninitiated.
 * <p>
 * The methods above trace outlines of the given shapes. The following methods
 * draw filled versions:
 * <ul>
 * <li> {@link #filledCircle(double x, double y, double radius)}
 * <li> {@link #filledEllipse(double x, double y, double semiMajorAxis, double semiMinorAxis)}
 * <li> {@link #filledSquare(double x, double y, double radius)}
 * <li> {@link #filledRectangle(double x, double y, double halfWidth, double halfHeight)}
 * </ul>
 * <p>
 * <b>Circular arcs.</b>
 * You can draw circular arcs with the following method:
 * <ul>
 * <li> {@link #arc(double x, double y, double radius, double angle1, double angle2)}
 * </ul>
 * <p>
 * The arc is from the circle centered at (<em>x</em>, <em>y</em>) of the specified radius.
 * The arc extends from angle1 to angle2. By convention, the angles are
 * <em>polar</em> (counterclockwise angle from the <em>x</em>-axis)
 * and represented in degrees. For example, `StdDraw.arc(0.0, 0.0, 1.0, 0, 90)`
 * draws the arc of the unit circle from 3 o'clock (0 degrees) to 12 o'clock (90 degrees).
 * <p>
 * <b>Polygons.</b>
 * You can draw polygons with the following methods:
 * <ul>
 * <li> {@link #polygon(double[] x, double[] y)}
 * <li> {@link #filledPolygon(double[] x, double[] y)}
 * </ul>
 * <p>
 * The points in the polygon are (`x[i]`, `y[i]`).
 * For example, the following code fragment draws a filled diamond
 * with vertices (0.1, 0.2), (0.2, 0.3), (0.3, 0.2), and (0.2, 0.1):
 * <pre>
 * double[] x = { 0.1, 0.2, 0.3, 0.2 };
 * double[] y = { 0.2, 0.3, 0.2, 0.1 };
 * StdDraw.filledPolygon(x, y);
 * </pre>
 * <p>
 * <b>Pen size.</b>
 * The pen is circular, so that when you set the pen radius to <em>r</em>
 * and draw a point, you get a circle of radius <em>r</em>. Also, lines are
 * of thickness 2<em>r</em> and have rounded ends. The default pen radius
 * is 0.005 and is not affected by coordinate scaling. This default pen
 * radius is about 1/200 the width of the default canvas, so that if
 * you draw 100 points equally spaced along a horizontal or vertical line,
 * you will be able to see individual circles, but if you draw 200 such
 * points, the result will look like a line.
 * <ul>
 * <li> {@link #setPenRadius(double radius)}
 * </ul>
 * <p>
 * For example, `StdDraw.setPenRadius(0.025)` makes
 * the thickness of the lines and the size of the points to be five times
 * the 0.005 default.
 * To draw points with the minimum possible radius (one pixel on typical
 * displays), set the pen radius to 0.0.
 * <p>
 * <b>Pen color.</b>
 * All geometric shapes (such as points, lines, and circles) are drawn using
 * the current pen color. By default, it is black.
 * You can change the pen color with the following methods:
 * <ul>
 * <li> {@link #setPenColor(int red, int green, int blue)}
 * <li> {@link #setPenColor(Color color)}
 * </ul>
 * <p>
 * The first method allows you to specify colors using the RGB color system.
 * This <a href = "http://johndyer.name/lab/colorpicker/">color picker</a>
 * is a convenient way to find a desired color.
 * The second method allows you to specify colors using the
 * {@link Color} data type that is discussed in Chapter 3. Until then,
 * you can use this method with one of these predefined colors in standard drawing:
 * {@link #BLACK}, {@link #BLUE}, {@link #CYAN}, {@link #DARK_GRAY}, {@link #GRAY},
 * {@link #GREEN}, {@link #LIGHT_GRAY}, {@link #MAGENTA}, {@link #ORANGE},
 * {@link #PINK}, {@link #RED}, {@link #WHITE}, {@link #YELLOW},
 * {@link #BOOK_BLUE}, {@link #BOOK_LIGHT_BLUE}, {@link #BOOK_RED}, and
 * {@link #PRINCETON_ORANGE}.
 * For example, `StdDraw.setPenColor(StdDraw.MAGENTA)` sets the
 * pen color to magenta.
 * <p>
 * <b>Canvas size.</b>
 * By default, all drawing takes places in a 512-by-512 canvas.
 * The canvas does not include the window title or window border.
 * You can change the size of the canvas with the following method:
 * <ul>
 * <li> {@link #setCanvasSize(int width, int height)}
 * </ul>
 * <p>
 * This sets the canvas size to be <em>width</em>-by-<em>height</em> pixels.
 * It also erases the current drawing and resets the coordinate system,
 * pen radius, pen color, and font back to their default values.
 * Ordinarly, this method is called once, at the very beginning of a program.
 * For example, `StdDraw.setCanvasSize(800, 800)`
 * sets the canvas size to be 800-by-800 pixels.
 * <p>
 * <b>Canvas scale and coordinate system.</b>
 * By default, all drawing takes places in the unit square, with (0, 0) at
 * lower left and (1, 1) at upper right. You can change the default
 * coordinate system with the following methods:
 * <ul>
 * <li> {@link #setXscale(double xmin, double xmax)}
 * <li> {@link #setYscale(double ymin, double ymax)}
 * <li> {@link #setScale(double min, double max)}
 * </ul>
 * <p>
 * The arguments are the coordinates of the minimum and maximum
 * <em>x</em>- or <em>y</em>-coordinates that will appear in the canvas.
 * For example, if you  wish to use the default coordinate system but
 * leave a small margin, you can call `StdDraw.setScale(-.05, 1.05)`.
 * <p>
 * These methods change the coordinate system for subsequent drawing
 * commands; they do not affect previous drawings.
 * These methods do not change the canvas size; so, if the <em>x</em>-
 * and <em>y</em>-scales are different, squares will become rectangles
 * and circles will become ellipses.
 * <p>
 * <b>Text.</b>
 * You can use the following methods to annotate your drawings with text:
 * <ul>
 * <li> {@link #text(double x, double y, String text)}
 * <li> {@link #text(double x, double y, String text, double degrees)}
 * <li> {@link #textLeft(double x, double y, String text)}
 * <li> {@link #textRight(double x, double y, String text)}
 * </ul>
 * <p>
 * The first two methods write the specified text in the current font,
 * centered at (<em>x</em>, <em>y</em>).
 * The second method allows you to rotate the text.
 * The last two methods either left- or right-align the text at (<em>x</em>, <em>y</em>).
 * <p>
 * The default font is a Sans Serif font with point size 16.
 * You can use the following method to change the font:
 * <ul>
 * <li> {@link #setFont(Font font)}
 * </ul>
 * <p>
 * You use the {@link Font} data type to specify the font. This allows you to
 * choose the face, size, and style of the font. For example, the following
 * code fragment sets the font to Arial Bold, 60 point.
 * <pre>
 * Font font = new Font("Arial", Font.BOLD, 60);
 * StdDraw.setFont(font);
 * StdDraw.text(0.5, 0.5, "Hello, World");
 * </pre>
 * <p>
 * <b>Images.</b>
 * You can use the following methods to add images to your drawings:
 * <ul>
 * <li> {@link #picture(double x, double y, String filename)}
 * <li> {@link #picture(double x, double y, String filename, double degrees)}
 * <li> {@link #picture(double x, double y, String filename, double scaledWidth, double scaledHeight)}
 * <li> {@link #picture(double x, double y, String filename, double scaledWidth, double scaledHeight, double degrees)}
 * </ul>
 * <p>
 * These methods draw the specified image, centered at (<em>x</em>, <em>y</em>).
 * The supported image formats are JPEG, PNG, and GIF.
 * The image will display at its native size, independent of the coordinate system.
 * Optionally, you can rotate the image a specified number of degrees counterclockwise
 * or rescale it to fit snugly inside a width-by-height bounding box.
 * <p>
 * <b>Saving to a file.</b>
 * You save your image to a file using the <em>File �� Save</em> menu option.
 * You can also save a file programatically using the following method:
 * <ul>
 * <li> {@link #save(String filename)}
 * </ul>
 * <p>
 * The supported image formats are JPEG and PNG. The filename must have either the
 * extension .jpg or .png.
 * We recommend using PNG for drawing that consist solely of geometric shapes and JPEG
 * for drawings that contains pictures.
 * <p>
 * <b>Clearing the canvas.</b>
 * To clear the entire drawing canvas, you can use the following methods:
 * <ul>
 * <li> {@link #clear()}
 * <li> {@link #clear(Color color)}
 * </ul>
 * <p>
 * The first method clears the canvas to white; the second method
 * allows you to specify a color of your choice. For example,
 * `StdDraw.clear(StdDraw.LIGHT_GRAY)` clears the canvas to a shade
 * of gray.
 * <p>
 * <b>Computer animations and double buffering.</b>
 * Double buffering is one of the most powerful features of standard drawing,
 * enabling computer animations.
 * The following methods control the way in which objects are drawn:
 * <ul>
 * <li> {@link #enableDoubleBuffering()}
 * <li> {@link #disableDoubleBuffering()}
 * <li> {@link #show()}
 * <li> {@link #pause(int t)}
 * </ul>
 * <p>
 * By default, double buffering is disabled, which means that as soon as you
 * call a drawing
 * method��such as `point()} or `line()`��the
 * results appear on the screen.
 * <p>
 * When double buffering is enabled by calling {@link #enableDoubleBuffering()},
 * all drawing takes place on the <em>offscreen canvas</em>. The offscreen canvas
 * is not displayed. Only when you call
 * {@link #show()} does your drawing get copied from the offscreen canvas to
 * the onscreen canvas, where it is displayed in the standard drawing window. You
 * can think of double buffering as collecting all of the lines, points, shapes,
 * and text that you tell it to draw, and then drawing them all
 * <em>simultaneously</em>, upon request.
 * <p>
 * The most important use of double buffering is to produce computer
 * animations, creating the illusion of motion by rapidly
 * displaying static drawings. To produce an animation, repeat
 * the following four steps:
 * <ul>
 * <li> Clear the offscreen canvas.
 * <li> Draw objects on the offscreen canvas.
 * <li> Copy the offscreen canvas to the onscreen canvas.
 * <li> Wait for a short while.
 * </ul>
 * <p>
 * The {@link #clear()}, {@link #show()}, and {@link #pause(int t)} methods
 * support the first, third, and fourth of these steps, respectively.
 * <p>
 * For example, this code fragment animates two balls moving in a circle.
 * <pre>
 * StdDraw.setScale(-2, +2);
 * StdDraw.enableDoubleBuffering();
 *
 * for (double t = 0.0; true; t += 0.02) {
 * double x = Math.sin(t);
 * double y = Math.cos(t);
 * StdDraw.clear();
 * StdDraw.filledCircle(x, y, 0.05);
 * StdDraw.filledCircle(-x, -y, 0.05);
 * StdDraw.show();
 * StdDraw.pause(20);
 * }
 * </pre>
 * <p>
 * <b>Keyboard and mouse inputs.</b>
 * Standard drawing has very basic support for keyboard and mouse input.
 * It is much less powerful than most user interface libraries provide, but also much simpler.
 * You can use the following methods to intercept mouse events:
 * <ul>
 * <li> {@link #isMousePressed()}
 * <li> {@link #mouseX()}
 * <li> {@link #mouseY()}
 * </ul>
 * <p>
 * The first method tells you whether a mouse button is currently being pressed.
 * The last two methods tells you the <em>x</em>- and <em>y</em>-coordinates of the mouse's
 * current position, using the same coordinate system as the canvas (the unit square, by default).
 * You should use these methods in an animation loop that waits a short while before trying
 * to poll the mouse for its current state.
 * You can use the following methods to intercept keyboard events:
 * <ul>
 * <li> {@link #hasNextKeyTyped()}
 * <li> {@link #nextKeyTyped()}
 * <li> {@link #isKeyPressed(int keycode)}
 * </ul>
 * <p>
 * If the user types lots of keys, they will be saved in a list until you process them.
 * The first method tells you whether the user has typed a key (that your program has
 * not yet processed).
 * The second method returns the next key that the user typed (that your program has
 * not yet processed) and removes it from the list of saved keystrokes.
 * The third method tells you whether a key is currently being pressed.
 * <p>
 * <b>Accessing control parameters.</b>
 * You can use the following methods to access the current pen color, pen radius,
 * and font:
 * <ul>
 * <li> {@link #getPenColor()}
 * <li> {@link #getPenRadius()}
 * <li> {@link #getFont()}
 * </ul>
 * <p>
 * These methods are useful when you want to temporarily change a
 * control parameter and reset it back to its original value.
 * <p>
 * <b>Corner cases.</b>
 * Here are some corner cases.
 * <ul>
 * <li> Drawing an object outside (or partly outside) the canvas is permitted.
 * However, only the part of the object that appears inside the canvas
 * will be visible.
 * <li> Any method that is passed a `null` argument will throw an
 * {@link IllegalArgumentException}.
 * <li> Any method that is passed a {@link Double#NaN},
 * {@link Double#POSITIVE_INFINITY}, or {@link Double#NEGATIVE_INFINITY}
 * argument will throw an {@link IllegalArgumentException}.
 * <li> Due to floating-point issues, an object drawn with an <em>x</em>- or
 * <em>y</em>-coordinate that is way outside the canvas (such as the line segment
 * from (0.5, �C10^308) to (0.5, 10^308) may not be visible even in the
 * part of the canvas where it should be.
 * </ul>
 * <p>
 * <b>Performance tricks.</b>
 * Standard drawing is capable of drawing large amounts of data.
 * Here are a few tricks and tips:
 * <ul>
 * <li> Use <em>double buffering</em> for static drawing with a large
 * number of objects.
 * That is, call {@link #enableDoubleBuffering()} before
 * the sequence of drawing commands and call {@link #show()} afterwards.
 * Incrementally displaying a complex drawing while it is being
 * created can be intolerably inefficient on many computer systems.
 * <li> When drawing computer animations, call `show()`
 * only once per frame, not after drawing each individual object.
 * <li> If you call `picture()` multiple times with the same filename,
 * Java will cache the image, so you do not incur the cost of reading
 * from a file each time.
 * </ul>
 * <p>
 * <b>Known bugs and issues.</b>
 * <ul>
 * <li> The `picture()` methods may not draw the portion of the image that is
 * inside the canvas if the center point (<em>x</em>, <em>y</em>) is outside the
 * canvas.
 * This bug appears only on some systems.
 * </ul>
 * <p>
 * <b>Reference.</b>
 * For additional documentation,
 * see <a href="https://introcs.cs.princeton.edu/15inout">Section 1.5</a> of
 * <em>Computer Science: An Interdisciplinary Approach</em>
 * by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class StdDraw
  implements ActionListener, MouseListener, MouseMotionListener, KeyListener {
  static __static_initialized = false;
  static __static_initialize() {
    if (!StdDraw.__static_initialized) {
      StdDraw.__static_initialized = true;
      StdDraw.__static_initializer_0();
    }
  }

  /**
   * The color black.
   */
  public static BLACK: Color;
  public static BLACK_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.BLACK == null) StdDraw.BLACK = Color.BLACK;
    return StdDraw.BLACK;
  }

  /**
   * The color blue.
   */
  public static BLUE: Color;
  public static BLUE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.BLUE == null) StdDraw.BLUE = Color.BLUE;
    return StdDraw.BLUE;
  }

  /**
   * The color cyan.
   */
  public static CYAN: Color;
  public static CYAN_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.CYAN == null) StdDraw.CYAN = Color.CYAN;
    return StdDraw.CYAN;
  }

  /**
   * The color dark gray.
   */
  public static DARK_GRAY: Color;
  public static DARK_GRAY_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.DARK_GRAY == null) StdDraw.DARK_GRAY = Color.DARK_GRAY;
    return StdDraw.DARK_GRAY;
  }

  /**
   * The color gray.
   */
  public static GRAY: Color;
  public static GRAY_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.GRAY == null) StdDraw.GRAY = Color.GRAY;
    return StdDraw.GRAY;
  }

  /**
   * The color green.
   */
  public static GREEN: Color;
  public static GREEN_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.GREEN == null) StdDraw.GREEN = Color.GREEN;
    return StdDraw.GREEN;
  }

  /**
   * The color light gray.
   */
  public static LIGHT_GRAY: Color;
  public static LIGHT_GRAY_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.LIGHT_GRAY == null) StdDraw.LIGHT_GRAY = Color.LIGHT_GRAY;
    return StdDraw.LIGHT_GRAY;
  }

  /**
   * The color magenta.
   */
  public static MAGENTA: Color;
  public static MAGENTA_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.MAGENTA == null) StdDraw.MAGENTA = Color.MAGENTA;
    return StdDraw.MAGENTA;
  }

  /**
   * The color orange.
   */
  public static ORANGE: Color;
  public static ORANGE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.ORANGE == null) StdDraw.ORANGE = Color.ORANGE;
    return StdDraw.ORANGE;
  }

  /**
   * The color pink.
   */
  public static PINK: Color;
  public static PINK_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.PINK == null) StdDraw.PINK = Color.PINK;
    return StdDraw.PINK;
  }

  /**
   * The color red.
   */
  public static RED: Color;
  public static RED_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.RED == null) StdDraw.RED = Color.RED;
    return StdDraw.RED;
  }

  /**
   * The color white.
   */
  public static WHITE: Color;
  public static WHITE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.WHITE == null) StdDraw.WHITE = Color.WHITE;
    return StdDraw.WHITE;
  }

  /**
   * The color yellow.
   */
  public static YELLOW: Color;
  public static YELLOW_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.YELLOW == null) StdDraw.YELLOW = Color.YELLOW;
    return StdDraw.YELLOW;
  }

  /**
   * Shade of blue used in <em>Introduction to Programming in Java</em>.
   * It is Pantone 300U. The RGB values are approximately (9, 90, 166).
   */
  public static BOOK_BLUE: Color;
  public static BOOK_BLUE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.BOOK_BLUE == null) StdDraw.BOOK_BLUE = new Color(9, 90, 166);
    return StdDraw.BOOK_BLUE;
  }

  /**
   * Shade of light blue used in <em>Introduction to Programming in Java</em>.
   * The RGB values are approximately (103, 198, 243).
   */
  public static BOOK_LIGHT_BLUE: Color;
  public static BOOK_LIGHT_BLUE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.BOOK_LIGHT_BLUE == null)
      StdDraw.BOOK_LIGHT_BLUE = new Color(103, 198, 243);
    return StdDraw.BOOK_LIGHT_BLUE;
  }

  /**
   * Shade of red used in <em>Algorithms, 4th edition</em>.
   * It is Pantone 1805U. The RGB values are approximately (150, 35, 31).
   */
  public static BOOK_RED: Color;
  public static BOOK_RED_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.BOOK_RED == null) StdDraw.BOOK_RED = new Color(150, 35, 31);
    return StdDraw.BOOK_RED;
  }

  /**
   * Shade of orange used in Princeton University's identity.
   * It is PMS 158. The RGB values are approximately (245, 128, 37).
   */
  public static PRINCETON_ORANGE: Color;
  public static PRINCETON_ORANGE_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.PRINCETON_ORANGE == null)
      StdDraw.PRINCETON_ORANGE = new Color(245, 128, 37);
    return StdDraw.PRINCETON_ORANGE;
  }

  static DEFAULT_PEN_COLOR: Color;
  public static DEFAULT_PEN_COLOR_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.DEFAULT_PEN_COLOR == null)
      StdDraw.DEFAULT_PEN_COLOR = StdDraw.BLACK_$LI$();
    return StdDraw.DEFAULT_PEN_COLOR;
  }

  static DEFAULT_CLEAR_COLOR: Color;
  public static DEFAULT_CLEAR_COLOR_$LI$(): Color {
    StdDraw.__static_initialize();
    if (StdDraw.DEFAULT_CLEAR_COLOR == null)
      StdDraw.DEFAULT_CLEAR_COLOR = StdDraw.WHITE_$LI$();
    return StdDraw.DEFAULT_CLEAR_COLOR;
  }

  static penColor: Color;
  public static penColor_$LI$(): Color {
    StdDraw.__static_initialize();
    return StdDraw.penColor;
  }

  static DEFAULT_SIZE = 512;

  static width: number;
  public static width_$LI$(): number {
    StdDraw.__static_initialize();
    if (StdDraw.width == null) StdDraw.width = StdDraw.DEFAULT_SIZE;
    return StdDraw.width;
  }

  static height: number;
  public static height_$LI$(): number {
    StdDraw.__static_initialize();
    if (StdDraw.height == null) StdDraw.height = StdDraw.DEFAULT_SIZE;
    return StdDraw.height;
  }

  static DEFAULT_PEN_RADIUS = 0.002;

  static penRadius: number;
  public static penRadius_$LI$(): number {
    StdDraw.__static_initialize();
    return StdDraw.penRadius;
  }

  static defer = false;

  static BORDER = 0.0;

  static DEFAULT_XMIN = 0.0;

  static DEFAULT_XMAX = 1.0;

  static DEFAULT_YMIN = 0.0;

  static DEFAULT_YMAX = 1.0;

  static xmin: number;
  public static xmin_$LI$(): number {
    StdDraw.__static_initialize();
    return StdDraw.xmin;
  }

  static ymin: number;
  public static ymin_$LI$(): number {
    StdDraw.__static_initialize();
    return StdDraw.ymin;
  }

  static xmax: number;
  public static xmax_$LI$(): number {
    StdDraw.__static_initialize();
    return StdDraw.xmax;
  }

  static ymax: number;
  public static ymax_$LI$(): number {
    StdDraw.__static_initialize();
    return StdDraw.ymax;
  }

  static mouseLock: any;
  public static mouseLock_$LI$(): any {
    StdDraw.__static_initialize();
    if (StdDraw.mouseLock == null) StdDraw.mouseLock = <any>new Object();
    return StdDraw.mouseLock;
  }

  static keyLock: any;
  public static keyLock_$LI$(): any {
    StdDraw.__static_initialize();
    if (StdDraw.keyLock == null) StdDraw.keyLock = <any>new Object();
    return StdDraw.keyLock;
  }

  static DEFAULT_FONT: Font;
  public static DEFAULT_FONT_$LI$(): Font {
    StdDraw.__static_initialize();
    if (StdDraw.DEFAULT_FONT == null)
      StdDraw.DEFAULT_FONT = new Font('SansSerif', Font.PLAIN, 16);
    return StdDraw.DEFAULT_FONT;
  }

  static font: Font;
  public static font_$LI$(): Font {
    StdDraw.__static_initialize();
    return StdDraw.font;
  }

  static offscreenImage: BufferedImage;
  public static offscreenImage_$LI$(): BufferedImage {
    StdDraw.__static_initialize();
    return StdDraw.offscreenImage;
  }

  static onscreenImage: BufferedImage;
  public static onscreenImage_$LI$(): BufferedImage {
    StdDraw.__static_initialize();
    return StdDraw.onscreenImage;
  }

  static offscreen: Graphics2D;
  public static offscreen_$LI$(): Graphics2D {
    StdDraw.__static_initialize();
    return StdDraw.offscreen;
  }

  static onscreen: Graphics2D;
  public static onscreen_$LI$(): Graphics2D {
    StdDraw.__static_initialize();
    return StdDraw.onscreen;
  }

  static std: StdDraw;
  public static std_$LI$(): StdDraw {
    StdDraw.__static_initialize();
    if (StdDraw.std == null) StdDraw.std = new StdDraw();
    return StdDraw.std;
  }

  static frame: JFrame;
  public static frame_$LI$(): JFrame {
    StdDraw.__static_initialize();
    return StdDraw.frame;
  }

  static __isMousePressed = false;

  static __mouseX = 0;

  static __mouseY = 0;

  static keysTyped: LinkedList<string>;
  public static keysTyped_$LI$(): LinkedList<string> {
    StdDraw.__static_initialize();
    if (StdDraw.keysTyped == null)
      StdDraw.keysTyped = <any>new LinkedList<string>();
    return StdDraw.keysTyped;
  }

  static keysDown: TreeSet<number>;
  public static keysDown_$LI$(): TreeSet<number> {
    StdDraw.__static_initialize();
    if (StdDraw.keysDown == null) StdDraw.keysDown = <any>new TreeSet<number>();
    return StdDraw.keysDown;
  }

  static __static_initializer_0() {
    StdDraw.init();
  }

  public static setCanvasSize$() {
    StdDraw.setCanvasSize$int$int(StdDraw.DEFAULT_SIZE, StdDraw.DEFAULT_SIZE);
  }

  public static setCanvasSize$int$int(
    canvasWidth: number,
    canvasHeight: number
  ) {
    if (canvasWidth <= 0) throw new Error('width must be positive');
    if (canvasHeight <= 0) throw new Error('height must be positive');
    StdDraw.width = canvasWidth;
    StdDraw.height = canvasHeight;
    StdDraw.init();
  }

  /**
   * Sets the canvas (drawing area) to be <em>width</em>-by-<em>height</em> pixels.
   * This also erases the current drawing and resets the coordinate system,
   * pen radius, pen color, and font back to their default values.
   * Ordinarly, this method is called once, at the very beginning
   * of a program.
   *
   * @param   canvasWidth the width as a number of pixels
   * @param   canvasHeight the height as a number of pixels
   * @throws IllegalArgumentException unless both `canvasWidth` and
   * `canvasHeight` are positive
   */
  public static setCanvasSize(canvasWidth?: any, canvasHeight?: any): any {
    if (
      (typeof canvasWidth === 'number' || canvasWidth === null) &&
      (typeof canvasHeight === 'number' || canvasHeight === null)
    ) {
      return <any>StdDraw.setCanvasSize$int$int(canvasWidth, canvasHeight);
    }
    if (canvasWidth === undefined && canvasHeight === undefined) {
      return <any>StdDraw.setCanvasSize$();
    }
    throw new Error('invalid overload');
  }

  static init() {
    if (StdDraw.frame_$LI$() != null) StdDraw.frame_$LI$().setVisible(false);
    StdDraw.frame = new JFrame();
    StdDraw.offscreenImage = new BufferedImage(
      2 * StdDraw.width,
      2 * StdDraw.height,
      BufferedImage.TYPE_INT_ARGB
    );
    StdDraw.onscreenImage = new BufferedImage(
      2 * StdDraw.width,
      2 * StdDraw.height,
      BufferedImage.TYPE_INT_ARGB
    );
    StdDraw.offscreen = StdDraw.offscreenImage.createGraphics();
    StdDraw.onscreen = StdDraw.onscreenImage.createGraphics();
    StdDraw.offscreen_$LI$().scale(2.0, 2.0);
    StdDraw.setXscale();
    StdDraw.setYscale();
    StdDraw.offscreen_$LI$().setColor(StdDraw.DEFAULT_CLEAR_COLOR_$LI$());
    StdDraw.offscreen_$LI$().fillRect(
      0,
      0,
      StdDraw.width_$LI$(),
      StdDraw.height_$LI$()
    );
    StdDraw.setPenColor();
    StdDraw.setPenRadius();
    StdDraw.setFont();
    StdDraw.clear();
    const hints: RenderingHints = new RenderingHints(
      RenderingHints.KEY_ANTIALIASING,
      RenderingHints.VALUE_ANTIALIAS_ON
    );
    hints.put(
      RenderingHints.KEY_RENDERING,
      RenderingHints.VALUE_RENDER_QUALITY
    );
    StdDraw.offscreen_$LI$().addRenderingHints(hints);
    const icon: StdDraw.RetinaImageIcon = new StdDraw.RetinaImageIcon(
      StdDraw.onscreenImage_$LI$()
    );
    const draw: JLabel = new JLabel(icon);
    draw.addMouseListener(StdDraw.std_$LI$());
    draw.addMouseMotionListener(StdDraw.std_$LI$());
    StdDraw.frame_$LI$().setContentPane(draw);
    StdDraw.frame_$LI$().addKeyListener(StdDraw.std_$LI$());
    StdDraw.frame_$LI$().setFocusTraversalKeysEnabled(false);
    StdDraw.frame_$LI$().setResizable(false);
    StdDraw.frame_$LI$().setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    StdDraw.frame_$LI$().setTitle('Standard Draw');
    StdDraw.frame_$LI$().setJMenuBar(StdDraw.createMenuBar());
    StdDraw.frame_$LI$().pack();
    StdDraw.frame_$LI$().requestFocusInWindow();
    StdDraw.frame_$LI$().setVisible(true);
  }

  static createMenuBar(): JMenuBar {
    const menuBar: JMenuBar = new JMenuBar();
    const menu: JMenu = new JMenu('File');
    menuBar.add(menu);
    const menuItem1: JMenuItem = new JMenuItem(' Save...   ');
    menuItem1.addActionListener(StdDraw.std_$LI$());
    menuItem1.setAccelerator(
      KeyStroke.getKeyStroke(
        KeyEvent.VK_S,
        Toolkit.getDefaultToolkit().getMenuShortcutKeyMask()
      )
    );
    menu.add(menuItem1);
    return menuBar;
  }

  /**
   * User and screen coordinate systems.
   * @param  x
   * @param  name
   * @private
   */
  static validate(x: number, name: string) {
    if (/* isNaN */ isNaN(x)) throw new Error(`${name} is NaN`);
    if (
      /* isInfinite */ ((value) =>
        Number.NEGATIVE_INFINITY === value ||
        Number.POSITIVE_INFINITY === value)(x)
    )
      throw new Error(`${name} is infinite`);
  }

  static validateNonnegative(x: number, name: string) {
    if (x < 0) throw new Error(`${name} negative`);
  }

  static validateNotNull(x: any, name: string) {
    if (x == null) throw new Error(`${name} is null`);
  }

  public static setXscale$() {
    StdDraw.setXscale$double$double(StdDraw.DEFAULT_XMIN, StdDraw.DEFAULT_XMAX);
  }

  public static setYscale$() {
    StdDraw.setYscale$double$double(StdDraw.DEFAULT_YMIN, StdDraw.DEFAULT_YMAX);
  }

  public static setScale$() {
    StdDraw.setXscale();
    StdDraw.setYscale();
  }

  public static setXscale$double$double(min: number, max: number) {
    StdDraw.validate(min, 'min');
    StdDraw.validate(max, 'max');
    const size: number = max - min;
    if (size === 0.0) throw new Error('the min and max are the same');
    {
      StdDraw.xmin = min - StdDraw.BORDER * size;
      StdDraw.xmax = max + StdDraw.BORDER * size;
    }
  }

  /**
   * Sets the <em>x</em>-scale to the specified range.
   *
   * @param   min the minimum value of the <em>x</em>-scale
   * @param   max the maximum value of the <em>x</em>-scale
   * @throws IllegalArgumentException if `(max == min)`
   * @throws IllegalArgumentException if either `min` or `max` is either NaN or infinite
   */
  public static setXscale(min?: any, max?: any): any {
    if (
      (typeof min === 'number' || min === null) &&
      (typeof max === 'number' || max === null)
    ) {
      return <any>StdDraw.setXscale$double$double(min, max);
    }
    if (min === undefined && max === undefined) {
      return <any>StdDraw.setXscale$();
    }
    throw new Error('invalid overload');
  }

  public static setYscale$double$double(min: number, max: number) {
    StdDraw.validate(min, 'min');
    StdDraw.validate(max, 'max');
    const size: number = max - min;
    if (size === 0.0) throw new Error('the min and max are the same');
    {
      StdDraw.ymin = min - StdDraw.BORDER * size;
      StdDraw.ymax = max + StdDraw.BORDER * size;
    }
  }

  /**
   * Sets the <em>y</em>-scale to the specified range.
   *
   * @param   min the minimum value of the <em>y</em>-scale
   * @param   max the maximum value of the <em>y</em>-scale
   * @throws IllegalArgumentException if `(max == min)`
   * @throws IllegalArgumentException if either `min` or `max` is either NaN or infinite
   */
  public static setYscale(min?: any, max?: any): any {
    if (
      (typeof min === 'number' || min === null) &&
      (typeof max === 'number' || max === null)
    ) {
      return <any>StdDraw.setYscale$double$double(min, max);
    }
    if (min === undefined && max === undefined) {
      return <any>StdDraw.setYscale$();
    }
    throw new Error('invalid overload');
  }

  public static setScale$double$double(min: number, max: number) {
    StdDraw.validate(min, 'min');
    StdDraw.validate(max, 'max');
    const size: number = max - min;
    if (size === 0.0) throw new Error('the min and max are the same');
    {
      StdDraw.xmin = min - StdDraw.BORDER * size;
      StdDraw.xmax = max + StdDraw.BORDER * size;
      StdDraw.ymin = min - StdDraw.BORDER * size;
      StdDraw.ymax = max + StdDraw.BORDER * size;
    }
  }

  /**
   * Sets both the <em>x</em>-scale and <em>y</em>-scale to the (same) specified range.
   *
   * @param   min the minimum value of the <em>x</em>- and <em>y</em>-scales
   * @param   max the maximum value of the <em>x</em>- and <em>y</em>-scales
   * @throws IllegalArgumentException if `(max == min)`
   * @throws IllegalArgumentException if either `min` or `max` is either NaN or infinite
   */
  public static setScale(min?: any, max?: any): any {
    if (
      (typeof min === 'number' || min === null) &&
      (typeof max === 'number' || max === null)
    ) {
      return <any>StdDraw.setScale$double$double(min, max);
    }
    if (min === undefined && max === undefined) {
      return <any>StdDraw.setScale$();
    }
    throw new Error('invalid overload');
  }

  static scaleX(x: number): number {
    return (
      (StdDraw.width_$LI$() * (x - StdDraw.xmin_$LI$())) /
      (StdDraw.xmax_$LI$() - StdDraw.xmin_$LI$())
    );
  }

  static scaleY(y: number): number {
    return (
      (StdDraw.height_$LI$() * (StdDraw.ymax_$LI$() - y)) /
      (StdDraw.ymax_$LI$() - StdDraw.ymin_$LI$())
    );
  }

  static factorX(w: number): number {
    return (
      (w * StdDraw.width_$LI$()) /
      Math.abs(StdDraw.xmax_$LI$() - StdDraw.xmin_$LI$())
    );
  }

  static factorY(h: number): number {
    return (
      (h * StdDraw.height_$LI$()) /
      Math.abs(StdDraw.ymax_$LI$() - StdDraw.ymin_$LI$())
    );
  }

  static userX(x: number): number {
    return (
      StdDraw.xmin_$LI$() +
      (x * (StdDraw.xmax_$LI$() - StdDraw.xmin_$LI$())) / StdDraw.width_$LI$()
    );
  }

  static userY(y: number): number {
    return (
      StdDraw.ymax_$LI$() -
      (y * (StdDraw.ymax_$LI$() - StdDraw.ymin_$LI$())) / StdDraw.height_$LI$()
    );
  }

  public static clear$() {
    StdDraw.clear$java_awt_Color(StdDraw.DEFAULT_CLEAR_COLOR_$LI$());
  }

  public static clear$java_awt_Color(color: Color) {
    StdDraw.validateNotNull(color, 'color');
    StdDraw.offscreen_$LI$().setColor(color);
    StdDraw.offscreen_$LI$().fillRect(
      0,
      0,
      StdDraw.width_$LI$(),
      StdDraw.height_$LI$()
    );
    StdDraw.offscreen_$LI$().setColor(StdDraw.penColor_$LI$());
    StdDraw.draw();
  }

  /**
   * Clears the screen to the specified color.
   *
   * @param {Color} color the color to make the background
   * @throws IllegalArgumentException if `color` is `null`
   */
  public static clear(color?: any): any {
    if ((color != null && color instanceof <any>Color) || color === null) {
      return <any>StdDraw.clear$java_awt_Color(color);
    }
    if (color === undefined) {
      return <any>StdDraw.clear$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the current pen radius.
   *
   * @return  the current value of the pen radius
   */
  public static getPenRadius(): number {
    return StdDraw.penRadius_$LI$();
  }

  public static setPenRadius$() {
    StdDraw.setPenRadius$double(StdDraw.DEFAULT_PEN_RADIUS);
  }

  public static setPenRadius$double(radius: number) {
    StdDraw.validate(radius, 'pen radius');
    StdDraw.validateNonnegative(radius, 'pen radius');
    StdDraw.penRadius = radius;
    const scaledPenRadius: number = (<any>Math).fround(
      radius * StdDraw.DEFAULT_SIZE
    );
    const stroke: BasicStroke = new BasicStroke(
      scaledPenRadius,
      BasicStroke.CAP_ROUND,
      BasicStroke.JOIN_ROUND
    );
    StdDraw.offscreen_$LI$().setStroke(stroke);
  }

  /**
   * Sets the radius of the pen to the specified size.
   * The pen is circular, so that lines have rounded ends, and when you set the
   * pen radius and draw a point, you get a circle of the specified radius.
   * The pen radius is not affected by coordinate scaling.
   *
   * @param   radius the radius of the pen
   * @throws IllegalArgumentException if `radius` is negative, NaN, or infinite
   */
  public static setPenRadius(radius?: any): any {
    if (typeof radius === 'number' || radius === null) {
      return <any>StdDraw.setPenRadius$double(radius);
    }
    if (radius === undefined) {
      return <any>StdDraw.setPenRadius$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the current pen color.
   *
   * @return {Color} the current pen color
   */
  public static getPenColor(): Color {
    return StdDraw.penColor_$LI$();
  }

  public static setPenColor$() {
    StdDraw.setPenColor$java_awt_Color(StdDraw.DEFAULT_PEN_COLOR_$LI$());
  }

  public static setPenColor$java_awt_Color(color: Color) {
    StdDraw.validateNotNull(color, 'color');
    StdDraw.penColor = color;
    StdDraw.offscreen_$LI$().setColor(StdDraw.penColor_$LI$());
  }

  public static setPenColor$int$int$int(
    red: number,
    green: number,
    blue: number
  ) {
    if (red < 0 || red >= 256) throw new Error('red must be between 0 and 255');
    if (green < 0 || green >= 256)
      throw new Error('green must be between 0 and 255');
    if (blue < 0 || blue >= 256)
      throw new Error('blue must be between 0 and 255');
    StdDraw.setPenColor$java_awt_Color(new Color(red, green, blue));
  }

  /**
   * Sets the pen color to the specified RGB color.
   *
   * @param   red the amount of red (between 0 and 255)
   * @param   green the amount of green (between 0 and 255)
   * @param   blue the amount of blue (between 0 and 255)
   * @throws IllegalArgumentException if `red`, `green`,
   * or `blue` is outside its prescribed range
   */
  public static setPenColor(red?: any, green?: any, blue?: any): any {
    if (
      (typeof red === 'number' || red === null) &&
      (typeof green === 'number' || green === null) &&
      (typeof blue === 'number' || blue === null)
    ) {
      return <any>StdDraw.setPenColor$int$int$int(red, green, blue);
    }
    if (
      ((red != null && red instanceof <any>Color) || red === null) &&
      green === undefined &&
      blue === undefined
    ) {
      return <any>StdDraw.setPenColor$java_awt_Color(red);
    }
    if (red === undefined && green === undefined && blue === undefined) {
      return <any>StdDraw.setPenColor$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns the current font.
   *
   * @return {Font} the current font
   */
  public static getFont(): Font {
    return StdDraw.font_$LI$();
  }

  public static setFont$() {
    StdDraw.setFont$java_awt_Font(StdDraw.DEFAULT_FONT_$LI$());
  }

  public static setFont$java_awt_Font(font: Font) {
    StdDraw.validateNotNull(font, 'font');
    StdDraw.font = font;
  }

  /**
   * Sets the font to the specified value.
   *
   * @param {Font} font the font
   * @throws IllegalArgumentException if `font` is `null`
   */
  public static setFont(font?: any): any {
    if ((font != null && font instanceof <any>Font) || font === null) {
      return <any>StdDraw.setFont$java_awt_Font(font);
    }
    if (font === undefined) {
      return <any>StdDraw.setFont$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Draws a line segment between (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>) and
   * (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>).
   *
   * @param   x0 the <em>x</em>-coordinate of one endpoint
   * @param   y0 the <em>y</em>-coordinate of one endpoint
   * @param   x1 the <em>x</em>-coordinate of the other endpoint
   * @param   y1 the <em>y</em>-coordinate of the other endpoint
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   */
  public static line(x0: number, y0: number, x1: number, y1: number) {
    StdDraw.validate(x0, 'x0');
    StdDraw.validate(y0, 'y0');
    StdDraw.validate(x1, 'x1');
    StdDraw.validate(y1, 'y1');
    StdDraw.offscreen_$LI$().draw(
      new Line2D.Double(
        StdDraw.scaleX(x0),
        StdDraw.scaleY(y0),
        StdDraw.scaleX(x1),
        StdDraw.scaleY(y1)
      )
    );
    StdDraw.draw();
  }

  /**
   * Draws one pixel at (<em>x</em>, <em>y</em>).
   * This method is private because pixels depend on the display.
   * To achieve the same effect, set the pen radius to 0 and call `point()`.
   *
   * @param   x the <em>x</em>-coordinate of the pixel
   * @param   y the <em>y</em>-coordinate of the pixel
   * @throws IllegalArgumentException if `x` or `y` is either NaN or infinite
   * @private
   */
  static pixel(x: number, y: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.offscreen_$LI$().fillRect(
      (<number>Math.round(StdDraw.scaleX(x))) | 0,
      (<number>Math.round(StdDraw.scaleY(y))) | 0,
      1,
      1
    );
  }

  /**
   * Draws a point centered at (<em>x</em>, <em>y</em>).
   * The point is a filled circle whose radius is equal to the pen radius.
   * To draw a single-pixel point, first set the pen radius to 0.
   *
   * @param  x the <em>x</em>-coordinate of the point
   * @param  y the <em>y</em>-coordinate of the point
   * @throws IllegalArgumentException if either `x` or `y` is either NaN or infinite
   */
  public static point(x: number, y: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const r: number = StdDraw.penRadius_$LI$();
    const scaledPenRadius: number = (<any>Math).fround(
      r * StdDraw.DEFAULT_SIZE
    );
    if (scaledPenRadius <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().fill(
        new Ellipse2D.Double(
          xs - (<any>Math).fround(scaledPenRadius / 2),
          ys - (<any>Math).fround(scaledPenRadius / 2),
          scaledPenRadius,
          scaledPenRadius
        )
      );
    StdDraw.draw();
  }

  /**
   * Draws a circle of the specified radius, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the circle
   * @param   y the <em>y</em>-coordinate of the center of the circle
   * @param   radius the radius of the circle
   * @throws IllegalArgumentException if `radius` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static circle(x: number, y: number, radius: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(radius, 'radius');
    StdDraw.validateNonnegative(radius, 'radius');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * radius);
    const hs: number = StdDraw.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().draw(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a filled circle of the specified radius, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the circle
   * @param   y the <em>y</em>-coordinate of the center of the circle
   * @param   radius the radius of the circle
   * @throws IllegalArgumentException if `radius` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static filledCircle(x: number, y: number, radius: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(radius, 'radius');
    StdDraw.validateNonnegative(radius, 'radius');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * radius);
    const hs: number = StdDraw.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().fill(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws an ellipse with the specified semimajor and semiminor axes,
   * centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the ellipse
   * @param   y the <em>y</em>-coordinate of the center of the ellipse
   * @param   semiMajorAxis is the semimajor axis of the ellipse
   * @param   semiMinorAxis is the semiminor axis of the ellipse
   * @throws IllegalArgumentException if either `semiMajorAxis`
   * or `semiMinorAxis` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static ellipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(semiMajorAxis, 'semimajor axis');
    StdDraw.validate(semiMinorAxis, 'semiminor axis');
    StdDraw.validateNonnegative(semiMajorAxis, 'semimajor axis');
    StdDraw.validateNonnegative(semiMinorAxis, 'semiminor axis');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * semiMajorAxis);
    const hs: number = StdDraw.factorY(2 * semiMinorAxis);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().draw(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a filled ellipse with the specified semimajor and semiminor axes,
   * centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the ellipse
   * @param   y the <em>y</em>-coordinate of the center of the ellipse
   * @param   semiMajorAxis is the semimajor axis of the ellipse
   * @param   semiMinorAxis is the semiminor axis of the ellipse
   * @throws IllegalArgumentException if either `semiMajorAxis`
   * or `semiMinorAxis` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static filledEllipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(semiMajorAxis, 'semimajor axis');
    StdDraw.validate(semiMinorAxis, 'semiminor axis');
    StdDraw.validateNonnegative(semiMajorAxis, 'semimajor axis');
    StdDraw.validateNonnegative(semiMinorAxis, 'semiminor axis');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * semiMajorAxis);
    const hs: number = StdDraw.factorY(2 * semiMinorAxis);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().fill(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a circular arc of the specified radius,
   * centered at (<em>x</em>, <em>y</em>), from angle1 to angle2 (in degrees).
   *
   * @param   x the <em>x</em>-coordinate of the center of the circle
   * @param   y the <em>y</em>-coordinate of the center of the circle
   * @param   radius the radius of the circle
   * @param   angle1 the starting angle. 0 would mean an arc beginning at 3 o'clock.
   * @param   angle2 the angle at the end of the arc. For example, if
   * you want a 90 degree arc, then angle2 should be angle1 + 90.
   * @throws IllegalArgumentException if `radius` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static arc(
    x: number,
    y: number,
    radius: number,
    angle1: number,
    angle2: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(radius, 'arc radius');
    StdDraw.validate(angle1, 'angle1');
    StdDraw.validate(angle2, 'angle2');
    StdDraw.validateNonnegative(radius, 'arc radius');
    while (angle2 < angle1) {
      angle2 += 360;
    }
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * radius);
    const hs: number = StdDraw.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().draw(
        new Arc2D.Double(
          xs - ws / 2,
          ys - hs / 2,
          ws,
          hs,
          angle1,
          angle2 - angle1,
          Arc2D.OPEN
        )
      );
    StdDraw.draw();
  }

  /**
   * Draws a square of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the square
   * @param   y the <em>y</em>-coordinate of the center of the square
   * @param   halfLength one half the length of any side of the square
   * @throws IllegalArgumentException if `halfLength` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static square(x: number, y: number, halfLength: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(halfLength, 'halfLength');
    StdDraw.validateNonnegative(halfLength, 'half length');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * halfLength);
    const hs: number = StdDraw.factorY(2 * halfLength);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().draw(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a filled square of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the square
   * @param   y the <em>y</em>-coordinate of the center of the square
   * @param   halfLength one half the length of any side of the square
   * @throws IllegalArgumentException if `halfLength` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static filledSquare(x: number, y: number, halfLength: number) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(halfLength, 'halfLength');
    StdDraw.validateNonnegative(halfLength, 'half length');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * halfLength);
    const hs: number = StdDraw.factorY(2 * halfLength);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().fill(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a rectangle of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the rectangle
   * @param   y the <em>y</em>-coordinate of the center of the rectangle
   * @param   halfWidth one half the width of the rectangle
   * @param   halfHeight one half the height of the rectangle
   * @throws IllegalArgumentException if either `halfWidth` or `halfHeight` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static rectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(halfWidth, 'halfWidth');
    StdDraw.validate(halfHeight, 'halfHeight');
    StdDraw.validateNonnegative(halfWidth, 'half width');
    StdDraw.validateNonnegative(halfHeight, 'half height');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * halfWidth);
    const hs: number = StdDraw.factorY(2 * halfHeight);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().draw(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a filled rectangle of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the rectangle
   * @param   y the <em>y</em>-coordinate of the center of the rectangle
   * @param   halfWidth one half the width of the rectangle
   * @param   halfHeight one half the height of the rectangle
   * @throws IllegalArgumentException if either `halfWidth` or `halfHeight` is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public static filledRectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(halfWidth, 'halfWidth');
    StdDraw.validate(halfHeight, 'halfHeight');
    StdDraw.validateNonnegative(halfWidth, 'half width');
    StdDraw.validateNonnegative(halfHeight, 'half height');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(2 * halfWidth);
    const hs: number = StdDraw.factorY(2 * halfHeight);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else
      StdDraw.offscreen_$LI$().fill(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    StdDraw.draw();
  }

  /**
   * Draws a polygon with the vertices
   * (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>),
   * (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>), ...,
   * (<em>x</em><sub><em>n</em>�C1</sub>, <em>y</em><sub><em>n</em>�C1</sub>).
   *
   * @param   x an array of all the <em>x</em>-coordinates of the polygon
   * @param   y an array of all the <em>y</em>-coordinates of the polygon
   * @throws IllegalArgumentException unless `x[]` and `y[]`
   * are of the same length
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   * @throws IllegalArgumentException if either `x[]` or `y[]` is `null`
   */
  public static polygon(x: number[], y: number[]) {
    StdDraw.validateNotNull(x, 'x-coordinate array');
    StdDraw.validateNotNull(y, 'y-coordinate array');
    for (let i = 0; i < x.length; i++) {
      StdDraw.validate(x[i], `x[${i}]`);
    }
    for (let i = 0; i < y.length; i++) {
      StdDraw.validate(y[i], `y[${i}]`);
    }
    const n1: number = x.length;
    const n2: number = y.length;
    if (n1 !== n2) throw new Error('arrays must be of the same length');
    const n: number = n1;
    if (n === 0) return;
    const path: GeneralPath = new GeneralPath();
    path.moveTo(
      (<any>Math).fround(StdDraw.scaleX(x[0])),
      (<any>Math).fround(StdDraw.scaleY(y[0]))
    );
    for (let i = 0; i < n; i++) {
      path.lineTo(
        (<any>Math).fround(StdDraw.scaleX(x[i])),
        (<any>Math).fround(StdDraw.scaleY(y[i]))
      );
    }
    path.closePath();
    StdDraw.offscreen_$LI$().draw(path);
    StdDraw.draw();
  }

  /**
   * Draws a filled polygon with the vertices
   * (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>),
   * (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>), ...,
   * (<em>x</em><sub><em>n</em>�C1</sub>, <em>y</em><sub><em>n</em>�C1</sub>).
   *
   * @param   x an array of all the <em>x</em>-coordinates of the polygon
   * @param   y an array of all the <em>y</em>-coordinates of the polygon
   * @throws IllegalArgumentException unless `x[]` and `y[]`
   * are of the same length
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   * @throws IllegalArgumentException if either `x[]` or `y[]` is `null`
   */
  public static filledPolygon(x: number[], y: number[]) {
    StdDraw.validateNotNull(x, 'x-coordinate array');
    StdDraw.validateNotNull(y, 'y-coordinate array');
    for (let i = 0; i < x.length; i++) {
      StdDraw.validate(x[i], `x[${i}]`);
    }
    for (let i = 0; i < y.length; i++) {
      StdDraw.validate(y[i], `y[${i}]`);
    }
    const n1: number = x.length;
    const n2: number = y.length;
    if (n1 !== n2) throw new Error('arrays must be of the same length');
    const n: number = n1;
    if (n === 0) return;
    const path: GeneralPath = new GeneralPath();
    path.moveTo(
      (<any>Math).fround(StdDraw.scaleX(x[0])),
      (<any>Math).fround(StdDraw.scaleY(y[0]))
    );
    for (let i = 0; i < n; i++) {
      path.lineTo(
        (<any>Math).fround(StdDraw.scaleX(x[i])),
        (<any>Math).fround(StdDraw.scaleY(y[i]))
      );
    }
    path.closePath();
    StdDraw.offscreen_$LI$().fill(path);
    StdDraw.draw();
  }

  /**
   * Drawing images.
   * @param  filename
   * @return {Image}
   * @private
   */
  static getImage(filename: string): Image {
    if (filename == null) throw new Error();
    let icon: ImageIcon = new ImageIcon(filename);
    if (icon == null || icon.getImageLoadStatus() !== MediaTracker.COMPLETE) {
      try {
        const url: URL = <URL>new URL(filename);
        icon = new ImageIcon(url);
      } catch (e) {}
    }
    if (icon == null || icon.getImageLoadStatus() !== MediaTracker.COMPLETE) {
      const url: URL = StdDraw.getResource(filename);
      if (url != null) icon = new ImageIcon(url);
    }
    if (icon == null || icon.getImageLoadStatus() !== MediaTracker.COMPLETE) {
      const url: URL = StdDraw.getResource(`/${filename}`);
      if (url == null) throw new Error(`image ${filename} not found`);
      icon = new ImageIcon(url);
    }
    return icon.getImage();
  }

  public static picture$double$double$java_lang_String(
    x: number,
    y: number,
    filename: string
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validateNotNull(filename, 'filename');
    const image: Image = StdDraw.getImage(filename);
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = image.getWidth(null);
    const hs: number = image.getHeight(null);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    StdDraw.offscreen_$LI$().drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      null
    );
    StdDraw.draw();
  }

  public static picture$double$double$java_lang_String$double(
    x: number,
    y: number,
    filename: string,
    degrees: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(degrees, 'degrees');
    StdDraw.validateNotNull(filename, 'filename');
    const image: Image = StdDraw.getImage(filename);
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = image.getWidth(null);
    const hs: number = image.getHeight(null);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    StdDraw.offscreen_$LI$().drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      null
    );
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(+degrees),
      xs,
      ys
    );
    StdDraw.draw();
  }

  public static picture$double$double$java_lang_String$double$double(
    x: number,
    y: number,
    filename: string,
    scaledWidth: number,
    scaledHeight: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(scaledWidth, 'scaled width');
    StdDraw.validate(scaledHeight, 'scaled height');
    StdDraw.validateNotNull(filename, 'filename');
    StdDraw.validateNonnegative(scaledWidth, 'scaled width');
    StdDraw.validateNonnegative(scaledHeight, 'scaled height');
    const image: Image = StdDraw.getImage(filename);
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(scaledWidth);
    const hs: number = StdDraw.factorY(scaledHeight);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    else {
      StdDraw.offscreen_$LI$().drawImage(
        image,
        (<number>Math.round(xs - ws / 2.0)) | 0,
        (<number>Math.round(ys - hs / 2.0)) | 0,
        (<number>Math.round(ws)) | 0,
        (<number>Math.round(hs)) | 0,
        null
      );
    }
    StdDraw.draw();
  }

  public static picture$double$double$java_lang_String$double$double$double(
    x: number,
    y: number,
    filename: string,
    scaledWidth: number,
    scaledHeight: number,
    degrees: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(scaledWidth, 'scaled width');
    StdDraw.validate(scaledHeight, 'scaled height');
    StdDraw.validate(degrees, 'degrees');
    StdDraw.validateNotNull(filename, 'filename');
    StdDraw.validateNonnegative(scaledWidth, 'scaled width');
    StdDraw.validateNonnegative(scaledHeight, 'scaled height');
    const image: Image = StdDraw.getImage(filename);
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = StdDraw.factorX(scaledWidth);
    const hs: number = StdDraw.factorY(scaledHeight);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    if (ws <= 1 && hs <= 1) StdDraw.pixel(x, y);
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    StdDraw.offscreen_$LI$().drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      (<number>Math.round(ws)) | 0,
      (<number>Math.round(hs)) | 0,
      null
    );
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(+degrees),
      xs,
      ys
    );
    StdDraw.draw();
  }

  /**
   * Draws the specified image centered at (<em>x</em>, <em>y</em>), rotated
   * given number of degrees, and rescaled to the specified bounding box.
   * The supported image formats are JPEG, PNG, and GIF.
   *
   * @param   x the center <em>x</em>-coordinate of the image
   * @param   y the center <em>y</em>-coordinate of the image
   * @param   filename the name of the image/picture, e.g., "ball.gif"
   * @param   scaledWidth the width of the scaled image (in screen coordinates)
   * @param   scaledHeight the height of the scaled image (in screen coordinates)
   * @param   degrees is the number of degrees to rotate counterclockwise
   * @throws IllegalArgumentException if either `scaledWidth`
   * or `scaledHeight` is negative
   * @throws IllegalArgumentException if the image filename is invalid
   */
  public static picture(
    x?: any,
    y?: any,
    filename?: any,
    scaledWidth?: any,
    scaledHeight?: any,
    degrees?: any
  ): any {
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof filename === 'string' || filename === null) &&
      (typeof scaledWidth === 'number' || scaledWidth === null) &&
      (typeof scaledHeight === 'number' || scaledHeight === null) &&
      (typeof degrees === 'number' || degrees === null)
    ) {
      return <any>(
        StdDraw.picture$double$double$java_lang_String$double$double$double(
          x,
          y,
          filename,
          scaledWidth,
          scaledHeight,
          degrees
        )
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof filename === 'string' || filename === null) &&
      (typeof scaledWidth === 'number' || scaledWidth === null) &&
      (typeof scaledHeight === 'number' || scaledHeight === null) &&
      degrees === undefined
    ) {
      return <any>(
        StdDraw.picture$double$double$java_lang_String$double$double(
          x,
          y,
          filename,
          scaledWidth,
          scaledHeight
        )
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof filename === 'string' || filename === null) &&
      (typeof scaledWidth === 'number' || scaledWidth === null) &&
      scaledHeight === undefined &&
      degrees === undefined
    ) {
      return <any>(
        StdDraw.picture$double$double$java_lang_String$double(
          x,
          y,
          filename,
          scaledWidth
        )
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof filename === 'string' || filename === null) &&
      scaledWidth === undefined &&
      scaledHeight === undefined &&
      degrees === undefined
    ) {
      return <any>(
        StdDraw.picture$double$double$java_lang_String(x, y, filename)
      );
    }
    throw new Error('invalid overload');
  }

  public static text$double$double$java_lang_String(
    x: number,
    y: number,
    text: string
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validateNotNull(text, 'text');
    StdDraw.offscreen_$LI$().setFont(StdDraw.font_$LI$());
    const metrics: FontMetrics = StdDraw.offscreen_$LI$().getFontMetrics();
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = metrics.stringWidth(text);
    const hs: number = metrics.getDescent();
    StdDraw.offscreen_$LI$().drawString(
      text,
      (<any>Math).fround(xs - ws / 2.0),
      (<any>Math).fround(ys + hs)
    );
    StdDraw.draw();
  }

  public static text$double$double$java_lang_String$double(
    x: number,
    y: number,
    text: string,
    degrees: number
  ) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validate(degrees, 'degrees');
    StdDraw.validateNotNull(text, 'text');
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    StdDraw.text$double$double$java_lang_String(x, y, text);
    StdDraw.offscreen_$LI$().rotate(
      /* toRadians */ ((x) => (x * Math.PI) / 180)(+degrees),
      xs,
      ys
    );
  }

  /**
   * Writes the given text string in the current font, centered at (<em>x</em>, <em>y</em>) and
   * rotated by the specified number of degrees.
   * @param   x the center <em>x</em>-coordinate of the text
   * @param   y the center <em>y</em>-coordinate of the text
   * @param   text the text to write
   * @param   degrees is the number of degrees to rotate counterclockwise
   * @throws IllegalArgumentException if `text` is `null`
   * @throws IllegalArgumentException if `x`, `y`, or `degrees` is either NaN or infinite
   */
  public static text(x?: any, y?: any, text?: any, degrees?: any): any {
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof text === 'string' || text === null) &&
      (typeof degrees === 'number' || degrees === null)
    ) {
      return <any>(
        StdDraw.text$double$double$java_lang_String$double(x, y, text, degrees)
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof text === 'string' || text === null) &&
      degrees === undefined
    ) {
      return <any>StdDraw.text$double$double$java_lang_String(x, y, text);
    }
    throw new Error('invalid overload');
  }

  /**
   * Writes the given text string in the current font, left-aligned at (<em>x</em>, <em>y</em>).
   * @param   x the <em>x</em>-coordinate of the text
   * @param   y the <em>y</em>-coordinate of the text
   * @param   text the text
   * @throws IllegalArgumentException if `text` is `null`
   * @throws IllegalArgumentException if `x` or `y` is either NaN or infinite
   */
  public static textLeft(x: number, y: number, text: string) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validateNotNull(text, 'text');
    StdDraw.offscreen_$LI$().setFont(StdDraw.font_$LI$());
    const metrics: FontMetrics = StdDraw.offscreen_$LI$().getFontMetrics();
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const hs: number = metrics.getDescent();
    StdDraw.offscreen_$LI$().drawString(
      text,
      (<any>Math).fround(xs),
      (<any>Math).fround(ys + hs)
    );
    StdDraw.draw();
  }

  /**
   * Writes the given text string in the current font, right-aligned at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the text
   * @param   y the <em>y</em>-coordinate of the text
   * @param   text the text to write
   * @throws IllegalArgumentException if `text` is `null`
   * @throws IllegalArgumentException if `x` or `y` is either NaN or infinite
   */
  public static textRight(x: number, y: number, text: string) {
    StdDraw.validate(x, 'x');
    StdDraw.validate(y, 'y');
    StdDraw.validateNotNull(text, 'text');
    StdDraw.offscreen_$LI$().setFont(StdDraw.font_$LI$());
    const metrics: FontMetrics = StdDraw.offscreen_$LI$().getFontMetrics();
    const xs: number = StdDraw.scaleX(x);
    const ys: number = StdDraw.scaleY(y);
    const ws: number = metrics.stringWidth(text);
    const hs: number = metrics.getDescent();
    StdDraw.offscreen_$LI$().drawString(
      text,
      (<any>Math).fround(xs - ws),
      (<any>Math).fround(ys + hs)
    );
    StdDraw.draw();
  }

  public static show$int(t: number) {
    StdDraw.validateNonnegative(t, 't');
    StdDraw.show();
    StdDraw.pause(t);
    StdDraw.enableDoubleBuffering();
  }

  /**
   * Copies the offscreen buffer to the onscreen buffer, pauses for t milliseconds
   * and enables double buffering.
   * @param  t number of milliseconds
   * @deprecated replaced by {@link #enableDoubleBuffering()}, {@link #show()}, and {@link #pause(int t)}
   */
  public static show(t?: any): any {
    if (typeof t === 'number' || t === null) {
      return <any>StdDraw.show$int(t);
    }
    if (t === undefined) {
      return <any>StdDraw.show$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Pauses for t milliseconds. This method is intended to support computer animations.
   * @param  t number of milliseconds
   */
  public static pause(t: number) {
    StdDraw.validateNonnegative(t, 't');
    try {
      java.lang.Thread.sleep(t);
    } catch (e) {
      console.info('Error sleeping');
    }
  }

  public static show$() {
    StdDraw.onscreen_$LI$().drawImage(
      StdDraw.offscreenImage_$LI$(),
      0,
      0,
      null
    );
    StdDraw.frame_$LI$().repaint();
  }

  static draw() {
    if (!StdDraw.defer) StdDraw.show();
  }

  /**
   * Enables double buffering. All subsequent calls to
   * drawing methods such as `line()}, `circle()`,
   * and `square()` will be deferred until the next call
   * to show(). Useful for animations.
   */
  public static enableDoubleBuffering() {
    StdDraw.defer = true;
  }

  /**
   * Disables double buffering. All subsequent calls to
   * drawing methods such as `line()}, `circle()`,
   * and `square()` will be displayed on screen when called.
   * This is the default.
   */
  public static disableDoubleBuffering() {
    StdDraw.defer = false;
  }

  /**
   * Saves the drawing to using the specified filename.
   * The supported image formats are JPEG and PNG;
   * the filename suffix must be `.jpg` or `.png`.
   *
   * @param   filename the name of the file with one of the required suffixes
   * @throws IllegalArgumentException if `filename` is `null`
   */
  public static save(filename: string) {
    StdDraw.validateNotNull(filename, 'filename');
    const file: File = new File(filename);
    const suffix: string = filename.substring(filename.lastIndexOf('.') + 1);
    if (
      /* equalsIgnoreCase */ ((o1, o2) =>
        o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
        'png',
        suffix
      )
    ) {
      try {
        ImageIO.write(StdDraw.onscreenImage_$LI$(), suffix, file);
      } catch (e) {
        console.error(e.message, e);
      }
    } else if (
      /* equalsIgnoreCase */ ((o1, o2) =>
        o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
        'jpg',
        suffix
      )
    ) {
      const raster: WritableRaster = StdDraw.onscreenImage_$LI$().getRaster();
      let newRaster: WritableRaster;
      newRaster = raster.createWritableChild(
        0,
        0,
        StdDraw.width_$LI$(),
        StdDraw.height_$LI$(),
        0,
        0,
        [0, 1, 2]
      );
      const cm: DirectColorModel = <DirectColorModel>(
        StdDraw.onscreenImage_$LI$().getColorModel()
      );
      const newCM: DirectColorModel = new DirectColorModel(
        cm.getPixelSize(),
        cm.getRedMask(),
        cm.getGreenMask(),
        cm.getBlueMask()
      );
      const rgbBuffer: BufferedImage = new BufferedImage(
        newCM,
        newRaster,
        false,
        null
      );
      try {
        ImageIO.write(rgbBuffer, suffix, file);
      } catch (e) {
        console.error(e.message, e);
      }
    } else {
      console.info(`Invalid image file type: ${suffix}`);
    }
  }

  /**
   * This method cannot be called directly.
   * @param {ActionEvent} e
   */
  public actionPerformed(e: ActionEvent) {
    const chooser: FileDialog = new FileDialog(
      StdDraw.frame_$LI$(),
      'Use a .png or .jpg extension',
      FileDialog.SAVE
    );
    chooser.setVisible(true);
    const filename: string = chooser.getFile();
    if (filename != null) {
      StdDraw.save(chooser.getDirectory() + File.separator + chooser.getFile());
    }
  }

  /**
   * Returns true if the mouse is being pressed.
   *
   * @return  `true` if the mouse is being pressed; `false` otherwise
   */
  public static isMousePressed(): boolean {
    {
      return StdDraw.__isMousePressed;
    }
  }

  /**
   * Returns true if the mouse is being pressed.
   *
   * @return  `true` if the mouse is being pressed; `false` otherwise
   * @deprecated replaced by {@link #isMousePressed()}
   */
  public static mousePressed(): boolean {
    {
      return StdDraw.__isMousePressed;
    }
  }

  /**
   * Returns the <em>x</em>-coordinate of the mouse.
   *
   * @return  the <em>x</em>-coordinate of the mouse
   */
  public static mouseX(): number {
    {
      return StdDraw.__mouseX;
    }
  }

  /**
   * Returns the <em>y</em>-coordinate of the mouse.
   *
   * @return  <em>y</em>-coordinate of the mouse
   */
  public static mouseY(): number {
    {
      return StdDraw.__mouseY;
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseClicked(e: MouseEvent) {}

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseEntered(e: MouseEvent) {}

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseExited(e: MouseEvent) {}

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mousePressed(e: MouseEvent) {
    {
      StdDraw.__mouseX = StdDraw.userX(e.getX());
      StdDraw.__mouseY = StdDraw.userY(e.getY());
      StdDraw.__isMousePressed = true;
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseReleased(e: MouseEvent) {
    {
      StdDraw.__isMousePressed = false;
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseDragged(e: MouseEvent) {
    {
      StdDraw.__mouseX = StdDraw.userX(e.getX());
      StdDraw.__mouseY = StdDraw.userY(e.getY());
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseMoved(e: MouseEvent) {
    {
      StdDraw.__mouseX = StdDraw.userX(e.getX());
      StdDraw.__mouseY = StdDraw.userY(e.getY());
    }
  }

  /**
   * Returns true if the user has typed a key (that has not yet been processed).
   *
   * @return  `true` if the user has typed a key (that has not yet been processed
   * by {@link #nextKeyTyped()}; `false` otherwise
   */
  public static hasNextKeyTyped(): boolean {
    {
      return !StdDraw.keysTyped_$LI$().isEmpty();
    }
  }

  /**
   * Returns the next key that was typed by the user (that your program has not already processed).
   * This method should be preceded by a call to {@link #hasNextKeyTyped()} to ensure
   * that there is a next key to process.
   * This method returns a Unicode character corresponding to the key
   * typed (such as `'a'} or `'A'`).
   * It cannot identify action keys (such as F1 and arrow keys)
   * or modifier keys (such as control).
   *
   * @return  the next key typed by the user (that your program has not already processed).
   * @throws Error if there is no remaining key
   */
  public static nextKeyTyped(): string {
    {
      if (StdDraw.keysTyped_$LI$().isEmpty()) {
        throw new Error('your program has already processed all keystrokes');
      }
      return String.fromCharCode(
        StdDraw.keysTyped_$LI$().remove(StdDraw.keysTyped_$LI$().size() - 1)
      );
    }
  }

  /**
   * Returns true if the given key is being pressed.
   * <p>
   * This method takes the keycode (corresponding to a physical key)
   * as an argument. It can handle action keys
   * (such as F1 and arrow keys) and modifier keys (such as shift and control).
   * See {@link KeyEvent} for a description of key codes.
   *
   * @param   keycode the key to check if it is being pressed
   * @return  `true` if `keycode` is currently being pressed;
   * `false` otherwise
   */
  public static isKeyPressed(keycode: number): boolean {
    {
      return StdDraw.keysDown_$LI$().contains(keycode);
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyTyped(e: KeyEvent) {
    {
      StdDraw.keysTyped_$LI$().addFirst(e.getKeyChar());
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyPressed(e: KeyEvent) {
    {
      StdDraw.keysDown_$LI$().add(e.getKeyCode());
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyReleased(e: KeyEvent) {
    {
      StdDraw.keysDown_$LI$().remove(e.getKeyCode());
    }
  }

  /**
   * Test client.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    StdDraw.square(0.2, 0.8, 0.1);
    StdDraw.filledSquare(0.8, 0.8, 0.2);
    StdDraw.circle(0.8, 0.2, 0.2);
    StdDraw.setPenColor$java_awt_Color(StdDraw.BOOK_RED_$LI$());
    StdDraw.setPenRadius$double(0.02);
    StdDraw.arc(0.8, 0.2, 0.1, 200, 45);
    StdDraw.setPenRadius();
    StdDraw.setPenColor$java_awt_Color(StdDraw.BOOK_BLUE_$LI$());
    const x: number[] = [0.1, 0.2, 0.3, 0.2];
    const y: number[] = [0.2, 0.3, 0.2, 0.1];
    StdDraw.filledPolygon(x, y);
    StdDraw.setPenColor$java_awt_Color(StdDraw.BLACK_$LI$());
    StdDraw.text$double$double$java_lang_String(0.2, 0.5, 'black text');
    StdDraw.setPenColor$java_awt_Color(StdDraw.WHITE_$LI$());
    StdDraw.text$double$double$java_lang_String(0.8, 0.8, 'white text');
  }
}
StdDraw.__class = 'edu.princeton.cs.algs4.StdDraw';
StdDraw.__interfaces = [
  'java.util.EventListener',
  'java.awt.event.KeyListener',
  'java.awt.event.ActionListener',
  'java.awt.event.MouseMotionListener',
  'java.awt.event.MouseListener',
];

export namespace StdDraw {
  /**
   * For improved resolution on Mac Retina displays.
   * @param {Image} image
   * @class
   * @extends ImageIcon
   */
  export class RetinaImageIcon extends ImageIcon {
    public constructor(image: Image) {
      super(image);
    }

    public getIconWidth(): number {
      return (super.getIconWidth() / 2) | 0;
    }

    /**
     * Gets the height of the icon.
     *
     * @return  the height in pixels of this icon
     */
    public getIconHeight(): number {
      return (super.getIconHeight() / 2) | 0;
    }

    public paintIcon(c: Component, g: Graphics, x: number, y: number) {
      const g2: Graphics2D = <Graphics2D>g.create();
      g2.setRenderingHint(
        RenderingHints.KEY_INTERPOLATION,
        RenderingHints.VALUE_INTERPOLATION_BICUBIC
      );
      g2.setRenderingHint(
        RenderingHints.KEY_RENDERING,
        RenderingHints.VALUE_RENDER_QUALITY
      );
      g2.setRenderingHint(
        RenderingHints.KEY_ANTIALIASING,
        RenderingHints.VALUE_ANTIALIAS_ON
      );
      g2.scale(0.5, 0.5);
      super.paintIcon(c, g2, x * 2, y * 2);
      g2.dispose();
    }
  }
  RetinaImageIcon.__class = 'edu.princeton.cs.algs4.StdDraw.RetinaImageIcon';
  RetinaImageIcon.__interfaces = [
    'javax.swing.Icon',
    'javax.accessibility.Accessible',
    'java.io.Serializable',
  ];
}

StdDraw.keysDown_$LI$();

StdDraw.keysTyped_$LI$();

StdDraw.frame_$LI$();

StdDraw.std_$LI$();

StdDraw.onscreen_$LI$();

StdDraw.offscreen_$LI$();

StdDraw.onscreenImage_$LI$();

StdDraw.offscreenImage_$LI$();

StdDraw.font_$LI$();

StdDraw.DEFAULT_FONT_$LI$();

StdDraw.keyLock_$LI$();

StdDraw.mouseLock_$LI$();

StdDraw.ymax_$LI$();

StdDraw.xmax_$LI$();

StdDraw.ymin_$LI$();

StdDraw.xmin_$LI$();

StdDraw.penRadius_$LI$();

StdDraw.height_$LI$();

StdDraw.width_$LI$();

StdDraw.penColor_$LI$();

StdDraw.DEFAULT_CLEAR_COLOR_$LI$();

StdDraw.DEFAULT_PEN_COLOR_$LI$();

StdDraw.PRINCETON_ORANGE_$LI$();

StdDraw.BOOK_RED_$LI$();

StdDraw.BOOK_LIGHT_BLUE_$LI$();

StdDraw.BOOK_BLUE_$LI$();

StdDraw.YELLOW_$LI$();

StdDraw.WHITE_$LI$();

StdDraw.RED_$LI$();

StdDraw.PINK_$LI$();

StdDraw.ORANGE_$LI$();

StdDraw.MAGENTA_$LI$();

StdDraw.LIGHT_GRAY_$LI$();

StdDraw.GREEN_$LI$();

StdDraw.GRAY_$LI$();

StdDraw.DARK_GRAY_$LI$();

StdDraw.CYAN_$LI$();

StdDraw.BLUE_$LI$();

StdDraw.BLACK_$LI$();

StdDraw.__static_initialize();

StdDraw.main(null);
