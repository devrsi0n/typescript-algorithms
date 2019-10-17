import assert from '../utils/assert';

export default class StdDraw {
  static canvas = StdDraw._createCanvas();
  static ctx = StdDraw._createContext();

  static line(x0: number, y0: number, x1: number, y1: number) {
    const { ctx } = StdDraw;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  /**
   * Draws a point centered at (x, y).
   * The point is a filled circle whose radius is equal to the pen radius.
   * To draw a single-pixel point, first set the pen radius to 0.
   *
   * @param x the x-coordinate of the point
   * @param y the y-coordinate of the point
   * @throws Error if either x or y is either NaN or infinite
   */
  static point(x: number, y: number) {
    StdDraw._assertXYSafeInt(x, y);
    const { ctx } = StdDraw;
    ctx.fillRect(x, y, 1, 1);
  }

  /**
   * Writes the given text string in the current font, centered at (x, y).
   *
   * @param  x the center x-coordinate of the text
   * @param  y the center y-coordinate of the text
   * @param  text the text to write
   * @throws Error if text is null
   * @throws Error if x or y is either NaN or infinite
   */
  static text(x: number, y: number, text: string) {
    assert(!text, 'text is not valid');
    StdDraw._assertXYSafeInt(x, y);
    const { ctx } = StdDraw;
    ctx.fillText(text, x, y);
  }

  /**
   * Draws a circle of the specified radius, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the circle
   * @param  y the y-coordinate of the center of the circle
   * @param  radius the radius of the circle
   * @throws Error if radius is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static circle(x: number, y: number, radius: number) {
    const { ctx } = StdDraw;
    StdDraw._circlePath(x, y, radius);
    ctx.stroke();
  }

  /**
   * Draws a filled circle of the specified radius, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the circle
   * @param  y the y-coordinate of the center of the circle
   * @param  radius the radius of the circle
   * @throws Error if radius is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static filledCircle(x: number, y: number, radius: number) {
    const { ctx } = StdDraw;
    StdDraw._circlePath(x, y, radius);
    ctx.fill();
  }

  /**
   * Draws an ellipse with the specified semimajor and semiminor axes,
   * centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the ellipse
   * @param  y the y-coordinate of the center of the ellipse
   * @param  semiMajorAxis is the semimajor axis of the ellipse
   * @param  semiMinorAxis is the semiminor axis of the ellipse
   * @throws Error if either semiMajorAxis
   *         or semiMinorAxis is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static ellipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    const { ctx } = StdDraw;
    StdDraw._ellipsePath(x, y, semiMajorAxis, semiMinorAxis);
    ctx.stroke();
  }

  /**
   * Draws a filled ellipse with the specified semimajor and semiminor axes,
   * centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the ellipse
   * @param  y the y-coordinate of the center of the ellipse
   * @param  semiMajorAxis is the semimajor axis of the ellipse
   * @param  semiMinorAxis is the semiminor axis of the ellipse
   * @throws Error if either semiMajorAxis
   *         or semiMinorAxis is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static filledEllipse(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    const { ctx } = StdDraw;
    StdDraw._ellipsePath(x, y, semiMajorAxis, semiMinorAxis);
    ctx.fill();
  }

  /**
   * Draws a square of the specified size, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the square
   * @param  y the y-coordinate of the center of the square
   * @param  halfLength one half the length of any side of the square
   * @throws Error if halfLength is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static square(x: number, y: number, halfLength: number) {
    assert(halfLength <= 0, 'halfLength must be positive number');
    StdDraw._assertXYSafeInt(x, y);
    const x0 = x - halfLength;
    const y0 = y - halfLength;
    const sideLength = 2 * halfLength;
    const { ctx } = StdDraw;
    ctx.strokeRect(x0, y0, sideLength, sideLength);
  }

  /**
   * Draws a filled square of the specified size, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the square
   * @param  y the y-coordinate of the center of the square
   * @param  halfLength one half the length of any side of the square
   * @throws Error if halfLength is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static filledSquare(x: number, y: number, halfLength: number) {
    assert(halfLength <= 0, 'halfLength must be positive number');
    StdDraw._assertXYSafeInt(x, y);
    const x0 = x - halfLength;
    const y0 = y - halfLength;
    const sideLength = 2 * halfLength;
    const { ctx } = StdDraw;
    ctx.fillRect(x0, y0, sideLength, sideLength);
  }

  /**
   * Draws a rectangle of the specified size, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the rectangle
   * @param  y the y-coordinate of the center of the rectangle
   * @param  halfWidth one half the width of the rectangle
   * @param  halfHeight one half the height of the rectangle
   * @throws Error if either halfWidth or halfHeight is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static rectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    StdDraw._assertXYSafeInt(x, y);
    assert(halfWidth <= 0, 'halfWidth must be positive number');
    assert(halfHeight <= 0, 'halfHeight must be positive number');
    const x0 = x - halfWidth;
    const y0 = y - halfHeight;
    const width = 2 * halfWidth;
    const height = 2 * halfHeight;
    const { ctx } = StdDraw;
    ctx.strokeRect(x0, y0, width, height);
  }

  /**
   * Draws a filled rectangle of the specified size, centered at (x, y).
   *
   * @param  x the x-coordinate of the center of the rectangle
   * @param  y the y-coordinate of the center of the rectangle
   * @param  halfWidth one half the width of the rectangle
   * @param  halfHeight one half the height of the rectangle
   * @throws Error if either halfWidth or halfHeight is negative
   * @throws Error if any argument is either NaN or infinite
   */
  static filledRectangle(
    x: number,
    y: number,
    halfWidth: number,
    halfHeight: number
  ) {
    StdDraw._assertXYSafeInt(x, y);
    assert(halfWidth <= 0, 'halfWidth must be positive number');
    assert(halfHeight <= 0, 'halfHeight must be positive number');
    const x0 = x - halfWidth;
    const y0 = y - halfHeight;
    const width = 2 * halfWidth;
    const height = 2 * halfHeight;
    const { ctx } = StdDraw;
    ctx.fillRect(x0, y0, width, height);
  }

  /**
   * Draws a polygon with the vertices
   * (x0, y0),
   * (x1, y1), ...,
   * (xn - 1, yn - 1).
   *
   * @param  x an array of all the x-coordinates of the polygon
   * @param  y an array of all the y-coordinates of the polygon
   * @throws Error unless x[] and y[]
   *         are of the same length
   * @throws Error if any coordinate is either NaN or infinite
   * @throws Error if either x[] or y[] is null
   */
  static polygon(x: number[], y: number[]) {
    StdDraw._polygonPath(x, y);
    const { ctx } = StdDraw;
    ctx.stroke();
  }

  /**
   * Draws a filled polygon with the vertices
   * (x0, y0),
   * (x1, y1), ...,
   * (xn - 1, yn - 1).
   *
   * @param  x an array of all the x-coordinates of the polygon
   * @param  y an array of all the y-coordinates of the polygon
   * @throws Error unless x[] and y[]
   *         are of the same length
   * @throws Error if any coordinate is either NaN or infinite
   * @throws Error if either x[] or y[] is null
   */
  static filledPolygon(x: number[], y: number[]) {
    StdDraw._polygonPath(x, y);
    const { ctx } = StdDraw;
    ctx.fill();
  }

  static setXscale(x0: number, x1: number) {}

  static setYscale(x0: number, x1: number) {}

  /**
   * Sets the pen size to the default size (0.002).
   * The pen is circular, so that lines have rounded ends, and when you set the
   * pen radius and draw a point, you get a circle of the specified radius.
   * The pen radius is not affected by coordinate scaling.
   */
  static setPenRadius(r: number) {
    const { ctx } = StdDraw;
    ctx.lineWidth = 2 * r;
    ctx.lineCap = 'round';
  }

  /**
   * Sets the pen color to the specified color.
   *
   * The predefined pen colors are
   *   StdDraw.BLACK,   StdDraw.BLUE,   StdDraw.CYAN,
   *   StdDraw.DARK_GRAY,   StdDraw.GRAY,   StdDraw.GREEN,
   *   StdDraw.LIGHT_GRAY,   StdDraw.MAGENTA,   StdDraw.ORANGE,
   *   StdDraw.PINK,   StdDraw.RED,   StdDraw.WHITE, and
   *   StdDraw.YELLOW.
   *
   * @param color the color to make the pen
   */
  static setPenColor(c: string) {
    const { ctx } = StdDraw;
    ctx.strokeStyle = c;
  }

  /**
   * Sets the font to the specified value.
   *
   * @param font the font
   */
  static setFont(f: string) {
    const { ctx } = StdDraw;
    ctx.font = f;
  }

  /**
   * Sets the canvas (drawing area) to be 512-by-512 pixels.
   * This also erases the current drawing and resets the coordinate system,
   * pen radius, pen color, and font back to their default values.
   * Ordinarly, this method is called once, at the very beginning
   * of a program.
   */
  static setCanvasSize(width: number, height: number) {
    const { canvas } = StdDraw;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  /**
   * Clears the screen to the specified color.
   *
   * @param color the color to make the background
   */
  static clear(color: string) {
    const { ctx } = StdDraw;
    ctx.clearRect(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  }

  static show(time: number) {}

  static _polygonPath(x: number[], y: number[]) {
    assert(!!x, 'x-coordinate array');
    assert(!!y, 'y-coordinate array');
    assert(x.length !== y.length, 'arrays must be of the same length');
    const { ctx } = StdDraw;
    ctx.beginPath();
    const [[firstX, firstY], ...points] = x.map((iX, index) => [iX, y[index]]);
    ctx.moveTo(firstX, firstY);
    for (const [x, y] of points) {
      ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  static _circlePath(x: number, y: number, radius: number) {
    assert(radius < 0, 'radius must not negative');
    StdDraw._assertXYSafeInt(x, y);
    const { ctx } = StdDraw;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  }

  static _ellipsePath(
    x: number,
    y: number,
    semiMajorAxis: number,
    semiMinorAxis: number
  ) {
    StdDraw._assertXYSafeInt(x, y);
    const { ctx } = StdDraw;
    ctx.beginPath();
    ctx.ellipse(x, y, semiMajorAxis, semiMinorAxis, 0, 0, 2 * Math.PI, true);
  }

  static _createCanvas() {
    let _canvas = document.getElementById('StdCanvas') as HTMLCanvasElement;
    if (!_canvas) {
      _canvas = document.createElement('canvas') as HTMLCanvasElement;
      _canvas.id = 'StdCanvas';
      _canvas.width = 300;
      _canvas.height = 300;
      _canvas.style.background = '#fff';

      const canvasContainer = document.getElementById('CanvasContainer');
      if (!canvasContainer) {
        throw new Error('CanvasContainer element not found');
      }
      canvasContainer.appendChild(_canvas);
    }
    return _canvas;
  }

  static _createContext() {
    let _ctx = StdDraw.canvas.getContext('2d');
    if (!_ctx) {
      throw new Error('Canvas element not found');
    }
    _ctx.fillStyle = '#000';
    _ctx.strokeStyle = '#000';
    return _ctx;
  }

  static _assertXYSafeInt(x: number, y: number) {
    assert(
      !Number.isSafeInteger(x) || !Number.isSafeInteger(y),
      'x or y is either NaN or infinite'
    );
  }
}
6;
