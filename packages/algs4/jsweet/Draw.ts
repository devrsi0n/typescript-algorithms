import { DrawListener } from './DrawListener';
import { StdDraw } from './StdDraw';

/**
 * Initializes an empty drawing object with the given name.
 *
 * @param  name the title of the drawing window.
 * @class
 * @author Robert Sedgewick
 */
export class Draw
  implements ActionListener, MouseListener, MouseMotionListener, KeyListener {
  /**
   * The color black.
   */
  public static BLACK: Color;
  public static BLACK_$LI$(): Color {
    if (Draw.BLACK == null) Draw.BLACK = Color.BLACK;
    return Draw.BLACK;
  }

  /**
   * The color blue.
   */
  public static BLUE: Color;
  public static BLUE_$LI$(): Color {
    if (Draw.BLUE == null) Draw.BLUE = Color.BLUE;
    return Draw.BLUE;
  }

  /**
   * The color cyan.
   */
  public static CYAN: Color;
  public static CYAN_$LI$(): Color {
    if (Draw.CYAN == null) Draw.CYAN = Color.CYAN;
    return Draw.CYAN;
  }

  /**
   * The color dark gray.
   */
  public static DARK_GRAY: Color;
  public static DARK_GRAY_$LI$(): Color {
    if (Draw.DARK_GRAY == null) Draw.DARK_GRAY = Color.DARK_GRAY;
    return Draw.DARK_GRAY;
  }

  /**
   * The color gray.
   */
  public static GRAY: Color;
  public static GRAY_$LI$(): Color {
    if (Draw.GRAY == null) Draw.GRAY = Color.GRAY;
    return Draw.GRAY;
  }

  /**
   * The color green.
   */
  public static GREEN: Color;
  public static GREEN_$LI$(): Color {
    if (Draw.GREEN == null) Draw.GREEN = Color.GREEN;
    return Draw.GREEN;
  }

  /**
   * The color light gray.
   */
  public static LIGHT_GRAY: Color;
  public static LIGHT_GRAY_$LI$(): Color {
    if (Draw.LIGHT_GRAY == null) Draw.LIGHT_GRAY = Color.LIGHT_GRAY;
    return Draw.LIGHT_GRAY;
  }

  /**
   * The color magenta.
   */
  public static MAGENTA: Color;
  public static MAGENTA_$LI$(): Color {
    if (Draw.MAGENTA == null) Draw.MAGENTA = Color.MAGENTA;
    return Draw.MAGENTA;
  }

  /**
   * The color orange.
   */
  public static ORANGE: Color;
  public static ORANGE_$LI$(): Color {
    if (Draw.ORANGE == null) Draw.ORANGE = Color.ORANGE;
    return Draw.ORANGE;
  }

  /**
   * The color pink.
   */
  public static PINK: Color;
  public static PINK_$LI$(): Color {
    if (Draw.PINK == null) Draw.PINK = Color.PINK;
    return Draw.PINK;
  }

  /**
   * The color red.
   */
  public static RED: Color;
  public static RED_$LI$(): Color {
    if (Draw.RED == null) Draw.RED = Color.RED;
    return Draw.RED;
  }

  /**
   * The color white.
   */
  public static WHITE: Color;
  public static WHITE_$LI$(): Color {
    if (Draw.WHITE == null) Draw.WHITE = Color.WHITE;
    return Draw.WHITE;
  }

  /**
   * The color yellow.
   */
  public static YELLOW: Color;
  public static YELLOW_$LI$(): Color {
    if (Draw.YELLOW == null) Draw.YELLOW = Color.YELLOW;
    return Draw.YELLOW;
  }

  /**
   * Shade of blue used in Introduction to Programming in Java.
   * It is Pantone 300U. The RGB values are approximately (9, 90, 166).
   */
  public static BOOK_BLUE: Color;
  public static BOOK_BLUE_$LI$(): Color {
    if (Draw.BOOK_BLUE == null) Draw.BOOK_BLUE = new Color(9, 90, 166);
    return Draw.BOOK_BLUE;
  }

  /**
   * Shade of light blue used in Introduction to Programming in Java.
   * The RGB values are approximately (103, 198, 243).
   */
  public static BOOK_LIGHT_BLUE: Color;
  public static BOOK_LIGHT_BLUE_$LI$(): Color {
    if (Draw.BOOK_LIGHT_BLUE == null)
      Draw.BOOK_LIGHT_BLUE = new Color(103, 198, 243);
    return Draw.BOOK_LIGHT_BLUE;
  }

  /**
   * Shade of red used in <em>Algorithms, 4th edition</em>.
   * It is Pantone 1805U. The RGB values are approximately (150, 35, 31).
   */
  public static BOOK_RED: Color;
  public static BOOK_RED_$LI$(): Color {
    if (Draw.BOOK_RED == null) Draw.BOOK_RED = new Color(150, 35, 31);
    return Draw.BOOK_RED;
  }

  /**
   * Shade of orange used in Princeton's identity.
   * It is PMS 158. The RGB values are approximately (245, 128, 37).
   */
  public static PRINCETON_ORANGE: Color;
  public static PRINCETON_ORANGE_$LI$(): Color {
    if (Draw.PRINCETON_ORANGE == null)
      Draw.PRINCETON_ORANGE = new Color(245, 128, 37);
    return Draw.PRINCETON_ORANGE;
  }

  static DEFAULT_PEN_COLOR: Color;
  public static DEFAULT_PEN_COLOR_$LI$(): Color {
    if (Draw.DEFAULT_PEN_COLOR == null)
      Draw.DEFAULT_PEN_COLOR = Draw.BLACK_$LI$();
    return Draw.DEFAULT_PEN_COLOR;
  }

  static DEFAULT_CLEAR_COLOR: Color;
  public static DEFAULT_CLEAR_COLOR_$LI$(): Color {
    if (Draw.DEFAULT_CLEAR_COLOR == null)
      Draw.DEFAULT_CLEAR_COLOR = Draw.WHITE_$LI$();
    return Draw.DEFAULT_CLEAR_COLOR;
  }

  static BORDER = 0.0;

  static DEFAULT_XMIN = 0.0;

  static DEFAULT_XMAX = 1.0;

  static DEFAULT_YMIN = 0.0;

  static DEFAULT_YMAX = 1.0;

  static DEFAULT_SIZE = 512;

  static DEFAULT_PEN_RADIUS = 0.002;

  static DEFAULT_FONT: Font;
  public static DEFAULT_FONT_$LI$(): Font {
    if (Draw.DEFAULT_FONT == null)
      Draw.DEFAULT_FONT = new Font('SansSerif', Font.PLAIN, 16);
    return Draw.DEFAULT_FONT;
  }

  private penColor: Color;

  private width: number = Draw.DEFAULT_SIZE;

  private height: number = Draw.DEFAULT_SIZE;

  private penRadius: number;

  private defer = false;

  private xmin: number;

  private ymin: number;

  private xmax: number;

  private ymax: number;

  private name = 'Draw';

  private mouseLock: any = <any>new Object();

  private keyLock: any = <any>new Object();

  private font: Font;

  private __draw: JLabel;

  private offscreenImage: BufferedImage;

  private onscreenImage: BufferedImage;

  private offscreen: Graphics2D;

  private onscreen: Graphics2D;

  private frame: JFrame = new JFrame();

  private __isMousePressed = false;

  private __mouseX = 0;

  private __mouseY = 0;

  private keysTyped: LinkedList<string> = <any>new LinkedList<string>();

  private keysDown: TreeSet<number> = <any>new TreeSet<number>();

  private listeners: ArrayList<DrawListener> = <any>(
    new ArrayList<DrawListener>()
  );

  public constructor(name?: any) {
    if (typeof name === 'string' || name === null) {
      const __args = arguments;
      if (this.penColor === undefined) this.penColor = null;
      if (this.penRadius === undefined) this.penRadius = 0;
      if (this.xmin === undefined) this.xmin = 0;
      if (this.ymin === undefined) this.ymin = 0;
      if (this.xmax === undefined) this.xmax = 0;
      if (this.ymax === undefined) this.ymax = 0;
      if (this.font === undefined) this.font = null;
      if (this.__draw === undefined) this.__draw = null;
      if (this.offscreenImage === undefined) this.offscreenImage = null;
      if (this.onscreenImage === undefined) this.onscreenImage = null;
      if (this.offscreen === undefined) this.offscreen = null;
      if (this.onscreen === undefined) this.onscreen = null;
      this.width = Draw.DEFAULT_SIZE;
      this.height = Draw.DEFAULT_SIZE;
      this.defer = false;
      this.name = 'Draw';
      this.mouseLock = <any>new Object();
      this.keyLock = <any>new Object();
      this.frame = new JFrame();
      this.__isMousePressed = false;
      this.__mouseX = 0;
      this.__mouseY = 0;
      this.keysTyped = <any>new LinkedList<string>();
      this.keysDown = <any>new TreeSet<number>();
      this.listeners = <any>new ArrayList<DrawListener>();
      if (this.penColor === undefined) this.penColor = null;
      if (this.penRadius === undefined) this.penRadius = 0;
      if (this.xmin === undefined) this.xmin = 0;
      if (this.ymin === undefined) this.ymin = 0;
      if (this.xmax === undefined) this.xmax = 0;
      if (this.ymax === undefined) this.ymax = 0;
      if (this.font === undefined) this.font = null;
      if (this.__draw === undefined) this.__draw = null;
      if (this.offscreenImage === undefined) this.offscreenImage = null;
      if (this.onscreenImage === undefined) this.onscreenImage = null;
      if (this.offscreen === undefined) this.offscreen = null;
      if (this.onscreen === undefined) this.onscreen = null;
      (() => {
        this.name = name;
        this.init();
      })();
    } else if (name === undefined) {
      const __args = arguments;
      if (this.penColor === undefined) this.penColor = null;
      if (this.penRadius === undefined) this.penRadius = 0;
      if (this.xmin === undefined) this.xmin = 0;
      if (this.ymin === undefined) this.ymin = 0;
      if (this.xmax === undefined) this.xmax = 0;
      if (this.ymax === undefined) this.ymax = 0;
      if (this.font === undefined) this.font = null;
      if (this.__draw === undefined) this.__draw = null;
      if (this.offscreenImage === undefined) this.offscreenImage = null;
      if (this.onscreenImage === undefined) this.onscreenImage = null;
      if (this.offscreen === undefined) this.offscreen = null;
      if (this.onscreen === undefined) this.onscreen = null;
      this.width = Draw.DEFAULT_SIZE;
      this.height = Draw.DEFAULT_SIZE;
      this.defer = false;
      this.name = 'Draw';
      this.mouseLock = <any>new Object();
      this.keyLock = <any>new Object();
      this.frame = new JFrame();
      this.__isMousePressed = false;
      this.__mouseX = 0;
      this.__mouseY = 0;
      this.keysTyped = <any>new LinkedList<string>();
      this.keysDown = <any>new TreeSet<number>();
      this.listeners = <any>new ArrayList<DrawListener>();
      if (this.penColor === undefined) this.penColor = null;
      if (this.penRadius === undefined) this.penRadius = 0;
      if (this.xmin === undefined) this.xmin = 0;
      if (this.ymin === undefined) this.ymin = 0;
      if (this.xmax === undefined) this.xmax = 0;
      if (this.ymax === undefined) this.ymax = 0;
      if (this.font === undefined) this.font = null;
      if (this.__draw === undefined) this.__draw = null;
      if (this.offscreenImage === undefined) this.offscreenImage = null;
      if (this.onscreenImage === undefined) this.onscreenImage = null;
      if (this.offscreen === undefined) this.offscreen = null;
      if (this.onscreen === undefined) this.onscreen = null;
      (() => {
        this.init();
      })();
    } else throw new Error('invalid overload');
  }

  init() {
    if (this.frame != null) this.frame.setVisible(false);
    this.frame = new JFrame();
    this.offscreenImage = new BufferedImage(
      2 * this.width,
      2 * this.height,
      BufferedImage.TYPE_INT_ARGB
    );
    this.onscreenImage = new BufferedImage(
      2 * this.width,
      2 * this.height,
      BufferedImage.TYPE_INT_ARGB
    );
    this.offscreen = this.offscreenImage.createGraphics();
    this.onscreen = this.onscreenImage.createGraphics();
    this.offscreen.scale(2.0, 2.0);
    this.setXscale();
    this.setYscale();
    this.offscreen.setColor(Draw.DEFAULT_CLEAR_COLOR_$LI$());
    this.offscreen.fillRect(0, 0, this.width, this.height);
    this.setPenColor();
    this.setPenRadius();
    this.setFont();
    this.clear();
    const hints: RenderingHints = new RenderingHints(
      RenderingHints.KEY_ANTIALIASING,
      RenderingHints.VALUE_ANTIALIAS_ON
    );
    hints.put(
      RenderingHints.KEY_RENDERING,
      RenderingHints.VALUE_RENDER_QUALITY
    );
    this.offscreen.addRenderingHints(hints);
    const icon: Draw.RetinaImageIcon = new Draw.RetinaImageIcon(
      this.onscreenImage
    );
    this.__draw = new JLabel(icon);
    this.__draw.addMouseListener(this);
    this.__draw.addMouseMotionListener(this);
    this.frame.setContentPane(this.__draw);
    this.frame.addKeyListener(this);
    this.frame.setResizable(false);
    this.frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
    this.frame.setFocusTraversalKeysEnabled(false);
    this.frame.setTitle(this.name);
    this.frame.setJMenuBar(this.createMenuBar());
    this.frame.pack();
    this.frame.requestFocusInWindow();
    this.frame.setVisible(true);
  }

  /**
   * Sets the upper-left hand corner of the drawing window to be (x, y), where (0, 0) is upper left.
   *
   * @param   x the number of pixels from the left
   * @param   y the number of pixels from the top
   * @throws IllegalArgumentException if the width or height is 0 or negative
   */
  public setLocationOnScreen(x: number, y: number) {
    if (x <= 0 || y <= 0) throw new Error();
    this.frame.setLocation(x, y);
  }

  /**
   * Sets the default close operation.
   *
   * @param   value the value, typically {@code JFrame.EXIT_ON_CLOSE}
   * (close all windows) or {@code JFrame.DISPOSE_ON_CLOSE}
   * (close current window)
   */
  public setDefaultCloseOperation(value: number) {
    this.frame.setDefaultCloseOperation(value);
  }

  /**
   * Sets the canvas (drawing area) to be <em>width</em>-by-<em>height</em> pixels.
   * This also erases the current drawing and resets the coordinate system, pen radius,
   * pen color, and font back to their default values.
   * Ordinarly, this method is called once, at the very beginning of a program.
   *
   * @param   canvasWidth the width as a number of pixels
   * @param   canvasHeight the height as a number of pixels
   * @throws IllegalArgumentException unless both {@code canvasWidth}
   * and {@code canvasHeight} are positive
   */
  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    if (canvasWidth < 1 || canvasHeight < 1) {
      throw new Error('width and height must be positive');
    }
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.init();
  }

  createMenuBar(): JMenuBar {
    const menuBar: JMenuBar = new JMenuBar();
    const menu: JMenu = new JMenu('File');
    menuBar.add(menu);
    const menuItem1: JMenuItem = new JMenuItem(' Save...   ');
    menuItem1.addActionListener(this);
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
      /* isInfinite */ (value =>
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

  public setXscale$() {
    this.setXscale$double$double(Draw.DEFAULT_XMIN, Draw.DEFAULT_XMAX);
  }

  public setYscale$() {
    this.setYscale$double$double(Draw.DEFAULT_YMIN, Draw.DEFAULT_YMAX);
  }

  public setXscale$double$double(min: number, max: number) {
    Draw.validate(min, 'min');
    Draw.validate(max, 'max');
    const size: number = max - min;
    if (size === 0.0) throw new Error('the min and max are the same');
    this.xmin = min - Draw.BORDER * size;
    this.xmax = max + Draw.BORDER * size;
  }

  /**
   * Sets the x-scale.
   *
   * @param  min the minimum value of the x-scale
   * @param  max the maximum value of the x-scale
   * @throws IllegalArgumentException if {@code (max == min)}
   * @throws IllegalArgumentException if either {@code min} or {@code max} is either NaN or infinite
   */
  public setXscale(min?: any, max?: any): any {
    if (
      (typeof min === 'number' || min === null) &&
      (typeof max === 'number' || max === null)
    ) {
      return <any>this.setXscale$double$double(min, max);
    }
    if (min === undefined && max === undefined) {
      return <any>this.setXscale$();
    }
    throw new Error('invalid overload');
  }

  public setYscale$double$double(min: number, max: number) {
    Draw.validate(min, 'min');
    Draw.validate(max, 'max');
    const size: number = max - min;
    if (size === 0.0) throw new Error('the min and max are the same');
    this.ymin = min - Draw.BORDER * size;
    this.ymax = max + Draw.BORDER * size;
  }

  /**
   * Sets the y-scale.
   *
   * @param  min the minimum value of the y-scale
   * @param  max the maximum value of the y-scale
   * @throws IllegalArgumentException if {@code (max == min)}
   * @throws IllegalArgumentException if either {@code min} or {@code max} is either NaN or infinite
   */
  public setYscale(min?: any, max?: any): any {
    if (
      (typeof min === 'number' || min === null) &&
      (typeof max === 'number' || max === null)
    ) {
      return <any>this.setYscale$double$double(min, max);
    }
    if (min === undefined && max === undefined) {
      return <any>this.setYscale$();
    }
    throw new Error('invalid overload');
  }

  scaleX(x: number): number {
    return (this.width * (x - this.xmin)) / (this.xmax - this.xmin);
  }

  scaleY(y: number): number {
    return (this.height * (this.ymax - y)) / (this.ymax - this.ymin);
  }

  factorX(w: number): number {
    return (w * this.width) / Math.abs(this.xmax - this.xmin);
  }

  factorY(h: number): number {
    return (h * this.height) / Math.abs(this.ymax - this.ymin);
  }

  userX(x: number): number {
    return this.xmin + (x * (this.xmax - this.xmin)) / this.width;
  }

  userY(y: number): number {
    return this.ymax - (y * (this.ymax - this.ymin)) / this.height;
  }

  public clear$() {
    this.clear$java_awt_Color(Draw.DEFAULT_CLEAR_COLOR_$LI$());
  }

  public clear$java_awt_Color(color: Color) {
    Draw.validateNotNull(color, 'color');
    this.offscreen.setColor(color);
    this.offscreen.fillRect(0, 0, this.width, this.height);
    this.offscreen.setColor(this.penColor);
    this.draw();
  }

  /**
   * Clears the screen to the given color.
   *
   * @param {Color} color the color to make the background
   * @throws IllegalArgumentException if {@code color} is {@code null}
   */
  public clear(color?: any): any {
    if ((color != null && color instanceof <any>Color) || color === null) {
      return <any>this.clear$java_awt_Color(color);
    }
    if (color === undefined) {
      return <any>this.clear$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Gets the current pen radius.
   *
   * @return  the current pen radius
   */
  public getPenRadius(): number {
    return this.penRadius;
  }

  public setPenRadius$() {
    this.setPenRadius$double(Draw.DEFAULT_PEN_RADIUS);
  }

  public setPenRadius$double(radius: number) {
    Draw.validate(radius, 'pen radius');
    Draw.validateNonnegative(radius, 'pen radius');
    this.penRadius = radius * Draw.DEFAULT_SIZE;
    const stroke: BasicStroke = new BasicStroke(
      (<any>Math).fround(this.penRadius),
      BasicStroke.CAP_ROUND,
      BasicStroke.JOIN_ROUND
    );
    this.offscreen.setStroke(stroke);
  }

  /**
   * Sets the radius of the pen to the given size.
   *
   * @param   radius the radius of the pen
   * @throws IllegalArgumentException if {@code radius} is negative, NaN, or infinite
   */
  public setPenRadius(radius?: any): any {
    if (typeof radius === 'number' || radius === null) {
      return <any>this.setPenRadius$double(radius);
    }
    if (radius === undefined) {
      return <any>this.setPenRadius$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Gets the current pen color.
   *
   * @return {Color} the current pen color
   */
  public getPenColor(): Color {
    return this.penColor;
  }

  public setPenColor$() {
    this.setPenColor$java_awt_Color(Draw.DEFAULT_PEN_COLOR_$LI$());
  }

  public setPenColor$java_awt_Color(color: Color) {
    Draw.validateNotNull(color, 'color');
    this.penColor = color;
    this.offscreen.setColor(this.penColor);
  }

  public setPenColor$int$int$int(red: number, green: number, blue: number) {
    if (red < 0 || red >= 256) throw new Error('red must be between 0 and 255');
    if (green < 0 || green >= 256)
      throw new Error('green must be between 0 and 255');
    if (blue < 0 || blue >= 256)
      throw new Error('blue must be between 0 and 255');
    this.setPenColor$java_awt_Color(new Color(red, green, blue));
  }

  /**
   * Sets the pen color to the given RGB color.
   *
   * @param   red the amount of red (between 0 and 255)
   * @param   green the amount of green (between 0 and 255)
   * @param   blue the amount of blue (between 0 and 255)
   * @throws IllegalArgumentException if {@code red}, {@code green},
   * or {@code blue} is outside its prescribed range
   */
  public setPenColor(red?: any, green?: any, blue?: any): any {
    if (
      (typeof red === 'number' || red === null) &&
      (typeof green === 'number' || green === null) &&
      (typeof blue === 'number' || blue === null)
    ) {
      return <any>this.setPenColor$int$int$int(red, green, blue);
    }
    if (
      ((red != null && red instanceof <any>Color) || red === null) &&
      green === undefined &&
      blue === undefined
    ) {
      return <any>this.setPenColor$java_awt_Color(red);
    }
    if (red === undefined && green === undefined && blue === undefined) {
      return <any>this.setPenColor$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Turns on xor mode.
   */
  public xorOn() {
    this.offscreen.setXORMode(Draw.DEFAULT_CLEAR_COLOR_$LI$());
  }

  /**
   * Turns off xor mode.
   */
  public xorOff() {
    this.offscreen.setPaintMode();
  }

  /**
   * Gets the current {@code JLabel} for use in some other GUI.
   *
   * @return {JLabel} the current {@code JLabel}
   */
  public getJLabel(): JLabel {
    return this.__draw;
  }

  /**
   * Gets the current font.
   *
   * @return {Font} the current font
   */
  public getFont(): Font {
    return this.font;
  }

  public setFont$() {
    this.setFont$java_awt_Font(Draw.DEFAULT_FONT_$LI$());
  }

  public setFont$java_awt_Font(font: Font) {
    Draw.validateNotNull(font, 'font');
    this.font = font;
  }

  /**
   * Sets the font to the given value.
   *
   * @param {Font} font the font
   * @throws IllegalArgumentException if {@code font} is {@code null}
   */
  public setFont(font?: any): any {
    if ((font != null && font instanceof <any>Font) || font === null) {
      return <any>this.setFont$java_awt_Font(font);
    }
    if (font === undefined) {
      return <any>this.setFont$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Draws a line from (x0, y0) to (x1, y1).
   *
   * @param  x0 the x-coordinate of the starting point
   * @param  y0 the y-coordinate of the starting point
   * @param  x1 the x-coordinate of the destination point
   * @param  y1 the y-coordinate of the destination point
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   */
  public line(x0: number, y0: number, x1: number, y1: number) {
    Draw.validate(x0, 'x0');
    Draw.validate(y0, 'y0');
    Draw.validate(x1, 'x1');
    Draw.validate(y1, 'y1');
    this.offscreen.draw(
      new Line2D.Double(
        this.scaleX(x0),
        this.scaleY(y0),
        this.scaleX(x1),
        this.scaleY(y1)
      )
    );
    this.draw();
  }

  /**
   * Draws one pixel at (x, y).
   *
   * @param  x the x-coordinate of the pixel
   * @param  y the y-coordinate of the pixel
   * @throws IllegalArgumentException if {@code x} or {@code y} is either NaN or infinite
   * @private
   */
  pixel(x: number, y: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    this.offscreen.fillRect(
      (<number>Math.round(this.scaleX(x))) | 0,
      (<number>Math.round(this.scaleY(y))) | 0,
      1,
      1
    );
  }

  /**
   * Draws a point at (x, y).
   *
   * @param  x the x-coordinate of the point
   * @param  y the y-coordinate of the point
   * @throws IllegalArgumentException if either {@code x} or {@code y} is either NaN or infinite
   */
  public point(x: number, y: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const r: number = this.penRadius;
    if (r <= 1) this.pixel(x, y);
    else
      this.offscreen.fill(new Ellipse2D.Double(xs - r / 2, ys - r / 2, r, r));
    this.draw();
  }

  /**
   * Draws a circle of the specified radius, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the x-coordinate of the center of the circle
   * @param   y the y-coordinate of the center of the circle
   * @param   radius the radius of the circle
   * @throws IllegalArgumentException if {@code radius} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public circle(x: number, y: number, radius: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(radius, 'radius');
    Draw.validateNonnegative(radius, 'radius');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * radius);
    const hs: number = this.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.draw(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a filled circle of the specified radius, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the x-coordinate of the center of the circle
   * @param   y the y-coordinate of the center of the circle
   * @param   radius the radius of the circle
   * @throws IllegalArgumentException if {@code radius} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public filledCircle(x: number, y: number, radius: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(radius, 'radius');
    Draw.validateNonnegative(radius, 'radius');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * radius);
    const hs: number = this.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.fill(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws an ellipse with the specified semimajor and semiminor axes,
   * centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the ellipse
   * @param   y the <em>y</em>-coordinate of the center of the ellipse
   * @param   semiMajorAxis is the semimajor axis of the ellipse
   * @param   semiMinorAxis is the semiminor axis of the ellipse
   * @throws IllegalArgumentException if either {@code semiMajorAxis}
   * or {@code semiMinorAxis} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public ellipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(semiMajorAxis, 'semimajor axis');
    Draw.validate(semiMinorAxis, 'semiminor axis');
    Draw.validateNonnegative(semiMajorAxis, 'semimajor axis');
    Draw.validateNonnegative(semiMinorAxis, 'semiminor axis');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * semiMajorAxis);
    const hs: number = this.factorY(2 * semiMinorAxis);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.draw(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a filled ellipse with the specified semimajor and semiminor axes,
   * centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the ellipse
   * @param   y the <em>y</em>-coordinate of the center of the ellipse
   * @param   semiMajorAxis is the semimajor axis of the ellipse
   * @param   semiMinorAxis is the semiminor axis of the ellipse
   * @throws IllegalArgumentException if either {@code semiMajorAxis}
   * or {@code semiMinorAxis} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public filledEllipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(semiMajorAxis, 'semimajor axis');
    Draw.validate(semiMinorAxis, 'semiminor axis');
    Draw.validateNonnegative(semiMajorAxis, 'semimajor axis');
    Draw.validateNonnegative(semiMinorAxis, 'semiminor axis');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * semiMajorAxis);
    const hs: number = this.factorY(2 * semiMinorAxis);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.fill(
        new Ellipse2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
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
   * @throws IllegalArgumentException if {@code radius} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public arc(
    x: number,
    y: number,
    radius: number,
    angle1: number,
    angle2: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(radius, 'arc radius');
    Draw.validate(angle1, 'angle1');
    Draw.validate(angle2, 'angle2');
    Draw.validateNonnegative(radius, 'arc radius');
    while (angle2 < angle1) {
      angle2 += 360;
    }
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * radius);
    const hs: number = this.factorY(2 * radius);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.draw(
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
    this.draw();
  }

  /**
   * Draws a square of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the square
   * @param   y the <em>y</em>-coordinate of the center of the square
   * @param   halfLength one half the length of any side of the square
   * @throws IllegalArgumentException if {@code halfLength} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public square(x: number, y: number, halfLength: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(halfLength, 'halfLength');
    Draw.validateNonnegative(halfLength, 'half length');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * halfLength);
    const hs: number = this.factorY(2 * halfLength);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.draw(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a square of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the square
   * @param   y the <em>y</em>-coordinate of the center of the square
   * @param   halfLength one half the length of any side of the square
   * @throws IllegalArgumentException if {@code halfLength} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public filledSquare(x: number, y: number, halfLength: number) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(halfLength, 'halfLength');
    Draw.validateNonnegative(halfLength, 'half length');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * halfLength);
    const hs: number = this.factorY(2 * halfLength);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.fill(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a rectangle of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the rectangle
   * @param   y the <em>y</em>-coordinate of the center of the rectangle
   * @param   halfWidth one half the width of the rectangle
   * @param   halfHeight one half the height of the rectangle
   * @throws IllegalArgumentException if either {@code halfWidth} or {@code halfHeight} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public rectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(halfWidth, 'halfWidth');
    Draw.validate(halfHeight, 'halfHeight');
    Draw.validateNonnegative(halfWidth, 'half width');
    Draw.validateNonnegative(halfHeight, 'half height');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * halfWidth);
    const hs: number = this.factorY(2 * halfHeight);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.draw(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a filled rectangle of the specified size, centered at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the center of the rectangle
   * @param   y the <em>y</em>-coordinate of the center of the rectangle
   * @param   halfWidth one half the width of the rectangle
   * @param   halfHeight one half the height of the rectangle
   * @throws IllegalArgumentException if either {@code halfWidth} or {@code halfHeight} is negative
   * @throws IllegalArgumentException if any argument is either NaN or infinite
   */
  public filledRectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(halfWidth, 'halfWidth');
    Draw.validate(halfHeight, 'halfHeight');
    Draw.validateNonnegative(halfWidth, 'half width');
    Draw.validateNonnegative(halfHeight, 'half height');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(2 * halfWidth);
    const hs: number = this.factorY(2 * halfHeight);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else
      this.offscreen.fill(
        new Rectangle2D.Double(xs - ws / 2, ys - hs / 2, ws, hs)
      );
    this.draw();
  }

  /**
   * Draws a polygon with the vertices
   * (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>),
   * (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>), ...,
   * (<em>x</em><sub><em>n</em>�C1</sub>, <em>y</em><sub><em>n</em>�C1</sub>).
   *
   * @param   x an array of all the <em>x</em>-coordinates of the polygon
   * @param   y an array of all the <em>y</em>-coordinates of the polygon
   * @throws IllegalArgumentException unless {@code x[]} and {@code y[]}
   * are of the same length
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   * @throws IllegalArgumentException if either {@code x[]} or {@code y[]} is {@code null}
   */
  public polygon(x: number[], y: number[]) {
    Draw.validateNotNull(x, 'x-coordinate array');
    Draw.validateNotNull(y, 'y-coordinate array');
    for (let i = 0; i < x.length; i++) {
      Draw.validate(x[i], `x[${i}]`);
    }
    for (let i = 0; i < y.length; i++) {
      Draw.validate(y[i], `y[${i}]`);
    }
    const n1: number = x.length;
    const n2: number = y.length;
    if (n1 !== n2) throw new Error('arrays must be of the same length');
    const n: number = n1;
    if (n === 0) return;
    const path: GeneralPath = new GeneralPath();
    path.moveTo(
      (<any>Math).fround(this.scaleX(x[0])),
      (<any>Math).fround(this.scaleY(y[0]))
    );
    for (let i = 0; i < n; i++) {
      path.lineTo(
        (<any>Math).fround(this.scaleX(x[i])),
        (<any>Math).fround(this.scaleY(y[i]))
      );
    }
    path.closePath();
    this.offscreen.draw(path);
    this.draw();
  }

  /**
   * Draws a filled polygon with the vertices
   * (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>),
   * (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>), ...,
   * (<em>x</em><sub><em>n</em>�C1</sub>, <em>y</em><sub><em>n</em>�C1</sub>).
   *
   * @param   x an array of all the <em>x</em>-coordinates of the polygon
   * @param   y an array of all the <em>y</em>-coordinates of the polygon
   * @throws IllegalArgumentException unless {@code x[]} and {@code y[]}
   * are of the same length
   * @throws IllegalArgumentException if any coordinate is either NaN or infinite
   * @throws IllegalArgumentException if either {@code x[]} or {@code y[]} is {@code null}
   */
  public filledPolygon(x: number[], y: number[]) {
    Draw.validateNotNull(x, 'x-coordinate array');
    Draw.validateNotNull(y, 'y-coordinate array');
    for (let i = 0; i < x.length; i++) {
      Draw.validate(x[i], `x[${i}]`);
    }
    for (let i = 0; i < y.length; i++) {
      Draw.validate(y[i], `y[${i}]`);
    }
    const n1: number = x.length;
    const n2: number = y.length;
    if (n1 !== n2) throw new Error('arrays must be of the same length');
    const n: number = n1;
    if (n === 0) return;
    const path: GeneralPath = new GeneralPath();
    path.moveTo(
      (<any>Math).fround(this.scaleX(x[0])),
      (<any>Math).fround(this.scaleY(y[0]))
    );
    for (let i = 0; i < n; i++) {
      path.lineTo(
        (<any>Math).fround(this.scaleX(x[i])),
        (<any>Math).fround(this.scaleY(y[i]))
      );
    }
    path.closePath();
    this.offscreen.fill(path);
    this.draw();
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
      const url: URL = Draw.getResource(`/${filename}`);
      if (url == null) throw new Error(`image ${filename} not found`);
      icon = new ImageIcon(url);
    }
    return icon.getImage();
  }

  public picture$double$double$java_lang_String(
    x: number,
    y: number,
    filename: string
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validateNotNull(filename, 'filename');
    const image: Image = Draw.getImage(filename);
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = image.getWidth(null);
    const hs: number = image.getHeight(null);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    this.offscreen.drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      null
    );
    this.draw();
  }

  public picture$double$double$java_lang_String$double(
    x: number,
    y: number,
    filename: string,
    degrees: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(degrees, 'degrees');
    Draw.validateNotNull(filename, 'filename');
    const image: Image = Draw.getImage(filename);
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = image.getWidth(null);
    const hs: number = image.getHeight(null);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    this.offscreen.drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      null
    );
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(+degrees),
      xs,
      ys
    );
    this.draw();
  }

  public picture$double$double$java_lang_String$double$double(
    x: number,
    y: number,
    filename: string,
    scaledWidth: number,
    scaledHeight: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(scaledWidth, 'scaled width');
    Draw.validate(scaledHeight, 'scaled height');
    Draw.validateNotNull(filename, 'filename');
    Draw.validateNonnegative(scaledWidth, 'scaled width');
    Draw.validateNonnegative(scaledHeight, 'scaled height');
    const image: Image = Draw.getImage(filename);
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(scaledWidth);
    const hs: number = this.factorY(scaledHeight);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    else {
      this.offscreen.drawImage(
        image,
        (<number>Math.round(xs - ws / 2.0)) | 0,
        (<number>Math.round(ys - hs / 2.0)) | 0,
        (<number>Math.round(ws)) | 0,
        (<number>Math.round(hs)) | 0,
        null
      );
    }
    this.draw();
  }

  public picture$double$double$java_lang_String$double$double$double(
    x: number,
    y: number,
    filename: string,
    scaledWidth: number,
    scaledHeight: number,
    degrees: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(scaledWidth, 'scaled width');
    Draw.validate(scaledHeight, 'scaled height');
    Draw.validate(degrees, 'degrees');
    Draw.validateNotNull(filename, 'filename');
    Draw.validateNonnegative(scaledWidth, 'scaled width');
    Draw.validateNonnegative(scaledHeight, 'scaled height');
    const image: Image = Draw.getImage(filename);
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = this.factorX(scaledWidth);
    const hs: number = this.factorY(scaledHeight);
    if (ws < 0 || hs < 0) throw new Error(`image ${filename} is corrupt`);
    if (ws <= 1 && hs <= 1) this.pixel(x, y);
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    this.offscreen.drawImage(
      image,
      (<number>Math.round(xs - ws / 2.0)) | 0,
      (<number>Math.round(ys - hs / 2.0)) | 0,
      (<number>Math.round(ws)) | 0,
      (<number>Math.round(hs)) | 0,
      null
    );
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(+degrees),
      xs,
      ys
    );
    this.draw();
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
   * @throws IllegalArgumentException if either {@code scaledWidth}
   * or {@code scaledHeight} is negative
   * @throws IllegalArgumentException if the image filename is invalid
   */
  public picture(
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
        this.picture$double$double$java_lang_String$double$double$double(
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
        this.picture$double$double$java_lang_String$double$double(
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
        this.picture$double$double$java_lang_String$double(
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
      return <any>this.picture$double$double$java_lang_String(x, y, filename);
    }
    throw new Error('invalid overload');
  }

  public text$double$double$java_lang_String(
    x: number,
    y: number,
    text: string
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validateNotNull(text, 'text');
    this.offscreen.setFont(this.font);
    const metrics: FontMetrics = this.offscreen.getFontMetrics();
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = metrics.stringWidth(text);
    const hs: number = metrics.getDescent();
    this.offscreen.drawString(
      text,
      (<any>Math).fround(xs - ws / 2.0),
      (<any>Math).fround(ys + hs)
    );
    this.draw();
  }

  public text$double$double$java_lang_String$double(
    x: number,
    y: number,
    text: string,
    degrees: number
  ) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validate(degrees, 'degrees');
    Draw.validateNotNull(text, 'text');
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(-degrees),
      xs,
      ys
    );
    this.text$double$double$java_lang_String(x, y, text);
    this.offscreen.rotate(
      /* toRadians */ (x => (x * Math.PI) / 180)(+degrees),
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
   * @throws IllegalArgumentException if {@code text} is {@code null}
   * @throws IllegalArgumentException if {@code x}, {@code y}, or {@code degrees} is either NaN or infinite
   */
  public text(x?: any, y?: any, text?: any, degrees?: any): any {
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof text === 'string' || text === null) &&
      (typeof degrees === 'number' || degrees === null)
    ) {
      return <any>(
        this.text$double$double$java_lang_String$double(x, y, text, degrees)
      );
    }
    if (
      (typeof x === 'number' || x === null) &&
      (typeof y === 'number' || y === null) &&
      (typeof text === 'string' || text === null) &&
      degrees === undefined
    ) {
      return <any>this.text$double$double$java_lang_String(x, y, text);
    }
    throw new Error('invalid overload');
  }

  /**
   * Writes the given text string in the current font, left-aligned at (<em>x</em>, <em>y</em>).
   * @param   x the <em>x</em>-coordinate of the text
   * @param   y the <em>y</em>-coordinate of the text
   * @param   text the text
   * @throws IllegalArgumentException if {@code text} is {@code null}
   * @throws IllegalArgumentException if {@code x} or {@code y} is either NaN or infinite
   */
  public textLeft(x: number, y: number, text: string) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validateNotNull(text, 'text');
    this.offscreen.setFont(this.font);
    const metrics: FontMetrics = this.offscreen.getFontMetrics();
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const hs: number = metrics.getDescent();
    this.offscreen.drawString(
      text,
      (<any>Math).fround(xs),
      (<any>Math).fround(ys + hs)
    );
    this.draw();
  }

  /**
   * Writes the given text string in the current font, right-aligned at (<em>x</em>, <em>y</em>).
   *
   * @param   x the <em>x</em>-coordinate of the text
   * @param   y the <em>y</em>-coordinate of the text
   * @param   text the text to write
   * @throws IllegalArgumentException if {@code text} is {@code null}
   * @throws IllegalArgumentException if {@code x} or {@code y} is either NaN or infinite
   */
  public textRight(x: number, y: number, text: string) {
    Draw.validate(x, 'x');
    Draw.validate(y, 'y');
    Draw.validateNotNull(text, 'text');
    this.offscreen.setFont(this.font);
    const metrics: FontMetrics = this.offscreen.getFontMetrics();
    const xs: number = this.scaleX(x);
    const ys: number = this.scaleY(y);
    const ws: number = metrics.stringWidth(text);
    const hs: number = metrics.getDescent();
    this.offscreen.drawString(
      text,
      (<any>Math).fround(xs - ws),
      (<any>Math).fround(ys + hs)
    );
    this.draw();
  }

  public show$int(t: number) {
    this.show();
    this.pause(t);
    this.enableDoubleBuffering();
  }

  /**
   * Copies the offscreen buffer to the onscreen buffer, pauses for t milliseconds
   * and enables double buffering.
   * @param  t number of milliseconds
   * @deprecated replaced by {@link #enableDoubleBuffering()}, {@link #show()}, and {@link #pause(int t)}
   */
  public show(t?: any): any {
    if (typeof t === 'number' || t === null) {
      return <any>this.show$int(t);
    }
    if (t === undefined) {
      return <any>this.show$();
    }
    throw new Error('invalid overload');
  }

  /**
   * Pause for t milliseconds. This method is intended to support computer animations.
   * @param  t number of milliseconds
   */
  public pause(t: number) {
    try {
      java.lang.Thread.sleep(t);
    } catch (e) {
      console.info('Error sleeping');
    }
  }

  public show$() {
    this.onscreen.drawImage(this.offscreenImage, 0, 0, null);
    this.frame.repaint();
  }

  draw() {
    if (!this.defer) this.show();
  }

  /**
   * Enable double buffering. All subsequent calls to
   * drawing methods such as {@code line()}, {@code circle()},
   * and {@code square()} will be deferred until the next call
   * to show(). Useful for animations.
   */
  public enableDoubleBuffering() {
    this.defer = true;
  }

  /**
   * Disable double buffering. All subsequent calls to
   * drawing methods such as {@code line()}, {@code circle()},
   * and {@code square()} will be displayed on screen when called.
   * This is the default.
   */
  public disableDoubleBuffering() {
    this.defer = false;
  }

  /**
   * Saves the drawing to using the specified filename.
   * The supported image formats are JPEG and PNG;
   * the filename suffix must be {@code .jpg} or {@code .png}.
   *
   * @param   filename the name of the file with one of the required suffixes
   * @throws IllegalArgumentException if {@code filename} is {@code null}
   */
  public save(filename: string) {
    Draw.validateNotNull(filename, 'filename');
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
        ImageIO.write(this.offscreenImage, suffix, file);
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
      const raster: WritableRaster = this.offscreenImage.getRaster();
      let newRaster: WritableRaster;
      newRaster = raster.createWritableChild(
        0,
        0,
        this.width,
        this.height,
        0,
        0,
        [0, 1, 2]
      );
      const cm: DirectColorModel = <DirectColorModel>(
        this.offscreenImage.getColorModel()
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
      this.frame,
      'Use a .png or .jpg extension',
      FileDialog.SAVE
    );
    chooser.setVisible(true);
    const filename: string = chooser.getFile();
    if (filename != null) {
      this.save(chooser.getDirectory() + File.separator + chooser.getFile());
    }
  }

  /**
   * Adds a {@link DrawListener} to listen to keyboard and mouse events.
   *
   * @param  listener the {\tt DrawListener} argument
   */
  public addListener(listener: DrawListener) {
    this.show();
    this.listeners.add(listener);
    this.frame.addKeyListener(this);
    this.frame.addMouseListener(this);
    this.frame.addMouseMotionListener(this);
    this.frame.setFocusable(true);
  }

  /**
   * Returns true if the mouse is being pressed.
   *
   * @return  {@code true} if the mouse is being pressed;
   * {@code false} otherwise
   */
  public isMousePressed(): boolean {
    {
      return this.__isMousePressed;
    }
  }

  public mousePressed$(): boolean {
    {
      return this.__isMousePressed;
    }
  }

  /**
   * Returns the x-coordinate of the mouse.
   * @return  the x-coordinate of the mouse
   */
  public mouseX(): number {
    {
      return this.__mouseX;
    }
  }

  /**
   * Returns the y-coordinate of the mouse.
   *
   * @return  the y-coordinate of the mouse
   */
  public mouseY(): number {
    {
      return this.__mouseY;
    }
  }

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

  public mousePressed$java_awt_event_MouseEvent(e: MouseEvent) {
    {
      this.__mouseX = this.userX(e.getX());
      this.__mouseY = this.userY(e.getY());
      this.__isMousePressed = true;
    }
    if (e.getButton() === MouseEvent.BUTTON1) {
      for (let index227 = this.listeners.iterator(); index227.hasNext(); ) {
        const listener = index227.next();
        listener.mousePressed(this.userX(e.getX()), this.userY(e.getY()));
      }
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mousePressed(e?: any): any {
    if ((e != null && e instanceof <any>MouseEvent) || e === null) {
      return <any>this.mousePressed$java_awt_event_MouseEvent(e);
    }
    if (e === undefined) {
      return <any>this.mousePressed$();
    }
    throw new Error('invalid overload');
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseReleased(e: MouseEvent) {
    {
      this.__isMousePressed = false;
    }
    if (e.getButton() === MouseEvent.BUTTON1) {
      for (let index228 = this.listeners.iterator(); index228.hasNext(); ) {
        const listener = index228.next();
        listener.mouseReleased(this.userX(e.getX()), this.userY(e.getY()));
      }
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseClicked(e: MouseEvent) {
    if (e.getButton() === MouseEvent.BUTTON1) {
      for (let index229 = this.listeners.iterator(); index229.hasNext(); ) {
        const listener = index229.next();
        listener.mouseClicked(this.userX(e.getX()), this.userY(e.getY()));
      }
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseDragged(e: MouseEvent) {
    {
      this.__mouseX = this.userX(e.getX());
      this.__mouseY = this.userY(e.getY());
    }
    for (let index230 = this.listeners.iterator(); index230.hasNext(); ) {
      const listener = index230.next();
      listener.mouseDragged(this.userX(e.getX()), this.userY(e.getY()));
    }
  }

  /**
   * This method cannot be called directly.
   * @param {MouseEvent} e
   */
  public mouseMoved(e: MouseEvent) {
    {
      this.__mouseX = this.userX(e.getX());
      this.__mouseY = this.userY(e.getY());
    }
  }

  /**
   * Returns true if the user has typed a key.
   *
   * @return  {@code true} if the user has typed a key; {@code false} otherwise
   */
  public hasNextKeyTyped(): boolean {
    {
      return !this.keysTyped.isEmpty();
    }
  }

  /**
   * The next key typed by the user.
   *
   * @return  the next key typed by the user
   */
  public nextKeyTyped(): string {
    {
      return String.fromCharCode(this.keysTyped.removeLast());
    }
  }

  /**
   * Returns true if the keycode is being pressed.
   * <p>
   * This method takes as an argument the keycode (corresponding to a physical key).
   * It can handle action keys (such as F1 and arrow keys) and modifier keys
   * (such as shift and control).
   * See {@link KeyEvent} for a description of key codes.
   *
   * @param   keycode the keycode to check
   * @return  {@code true} if {@code keycode} is currently being pressed;
   * {@code false} otherwise
   */
  public isKeyPressed(keycode: number): boolean {
    {
      return this.keysDown.contains(keycode);
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyTyped(e: KeyEvent) {
    {
      this.keysTyped.addFirst(e.getKeyChar());
    }
    for (let index231 = this.listeners.iterator(); index231.hasNext(); ) {
      const listener = index231.next();
      listener.keyTyped(e.getKeyChar());
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyPressed(e: KeyEvent) {
    {
      this.keysDown.add(e.getKeyCode());
    }
    for (let index232 = this.listeners.iterator(); index232.hasNext(); ) {
      const listener = index232.next();
      listener.keyPressed(e.getKeyCode());
    }
  }

  /**
   * This method cannot be called directly.
   * @param {KeyEvent} e
   */
  public keyReleased(e: KeyEvent) {
    {
      this.keysDown.remove(e.getKeyCode());
    }
    for (let index233 = this.listeners.iterator(); index233.hasNext(); ) {
      const listener = index233.next();
      listener.keyReleased(e.getKeyCode());
    }
  }

  /**
   * Test client.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const draw1: Draw = new Draw('Test client 1');
    draw1.square(0.2, 0.8, 0.1);
    draw1.filledSquare(0.8, 0.8, 0.2);
    draw1.circle(0.8, 0.2, 0.2);
    draw1.setPenColor$java_awt_Color(Draw.MAGENTA_$LI$());
    draw1.setPenRadius$double(0.02);
    draw1.arc(0.8, 0.2, 0.1, 200, 45);
    const draw2: Draw = new Draw('Test client 2');
    draw2.setCanvasSize(900, 200);
    draw2.setPenRadius();
    draw2.setPenColor$java_awt_Color(Draw.BLUE_$LI$());
    const x: number[] = [0.1, 0.2, 0.3, 0.2];
    const y: number[] = [0.2, 0.3, 0.2, 0.1];
    draw2.filledPolygon(x, y);
    draw2.setPenColor$java_awt_Color(Draw.BLACK_$LI$());
    draw2.text$double$double$java_lang_String(0.2, 0.5, 'bdfdfdfdlack text');
    draw2.setPenColor$java_awt_Color(Draw.WHITE_$LI$());
    draw2.text$double$double$java_lang_String(0.8, 0.8, 'white text');
  }
}
Draw.__class = 'edu.princeton.cs.algs4.Draw';
Draw.__interfaces = [
  'java.util.EventListener',
  'java.awt.event.KeyListener',
  'java.awt.event.ActionListener',
  'java.awt.event.MouseMotionListener',
  'java.awt.event.MouseListener',
];

export namespace Draw {
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
  RetinaImageIcon.__class = 'edu.princeton.cs.algs4.Draw.RetinaImageIcon';
  RetinaImageIcon.__interfaces = [
    'javax.swing.Icon',
    'javax.accessibility.Accessible',
    'java.io.Serializable',
  ];
}

Draw.DEFAULT_FONT_$LI$();

Draw.DEFAULT_CLEAR_COLOR_$LI$();

Draw.DEFAULT_PEN_COLOR_$LI$();

Draw.PRINCETON_ORANGE_$LI$();

Draw.BOOK_RED_$LI$();

Draw.BOOK_LIGHT_BLUE_$LI$();

Draw.BOOK_BLUE_$LI$();

Draw.YELLOW_$LI$();

Draw.WHITE_$LI$();

Draw.RED_$LI$();

Draw.PINK_$LI$();

Draw.ORANGE_$LI$();

Draw.MAGENTA_$LI$();

Draw.LIGHT_GRAY_$LI$();

Draw.GREEN_$LI$();

Draw.GRAY_$LI$();

Draw.DARK_GRAY_$LI$();

Draw.CYAN_$LI$();

Draw.BLUE_$LI$();

Draw.BLACK_$LI$();

Draw.main(null);
