import assert from '../utils/assert';

export default class StdDraw {
  static scaleX = 1;
  static scaleY = -1;
  static readonly DEFAULT_WIDTH = 512;
  static readonly DEFAULT_HEIGHT = 512;

  static canvas = StdDraw._createCanvas();
  static ctx = StdDraw._createContext();

  /** @see https://www.colorhexa.com/ */

  static DARK_GRAY = '#a9a9a9';
  static RED = '#ff0000';

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

    // const id = ctx.createImageData(1, 1);
    // const d = id.data;
    // d[0] = 100;
    // d[1] = 100;
    // d[2] = 100;
    // d[3] = 0.5;
    // ctx.putImageData(id, x, y);
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

  static setScale(x: number, y: number) {
    const { ctx } = StdDraw;
    StdDraw.scaleX = x;
    StdDraw.scaleY = -y;
    // Canvas has reverse y-coordinate
    ctx.scale(x, -y);
  }

  static setTranslate(x: number, y: number) {
    StdDraw._assertXYSafeInt(x, y);
    const { ctx } = StdDraw;
    ctx.translate(x, y);
  }

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
    StdDraw._assertXYSafeInt(width, height);
    assert(width > 0, 'width must greater than 0');
    assert(height > 0, 'width must greater than 0');
    const { canvas } = StdDraw;
    canvas.width = width;
    canvas.height = height;
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

  static getRad(degree: number) {
    return (degree / 180) * Math.PI;
  }

  static drawAxis() {
    const { ctx } = StdDraw;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    // Translate to cartesian coordinate system
    const offset = 20; // Offset for coordinate axis

    ctx.save();
    ctx.translate(0 + offset, StdDraw.DEFAULT_HEIGHT - offset);
    ctx.rotate(StdDraw.getRad(180));
    ctx.scale(-1, 1);

    StdDraw.drawAxisX();
    StdDraw.drawAxisY();
  }

  static drawAxisX() {
    const { ctx } = StdDraw;
    ctx.save();

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = 'navy';

    const width = StdDraw.DEFAULT_WIDTH - 40;
    // Draw axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(
      width - Math.cos(StdDraw.getRad(15)) * 10,
      Math.sin(StdDraw.getRad(15)) * 10
    );
    ctx.lineTo(width, 0);
    ctx.lineTo(
      width - Math.cos(StdDraw.getRad(15)) * 10,
      -Math.sin(StdDraw.getRad(15)) * 10
    );
    ctx.stroke();
    ctx.closePath();

    // Draw coordinates calibration
    let x;
    const y = 5;
    for (x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);

      ctx.stroke();
      ctx.closePath();
    }

    // Draw coordinates numbers
    for (x = 0; x < width; x += 50) {
      ctx.save();
      ctx.scale(1, -1);
      ctx.fillText(x.toString(), x - 8, y + 10);
      ctx.restore();
    }

    ctx.restore();
  }

  static drawAxisY() {
    const { ctx } = StdDraw;
    ctx.save();

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = 'navy';

    const height = StdDraw.DEFAULT_HEIGHT - 62;

    // Draw axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(
      Math.sin(StdDraw.getRad(15)) * 10,
      height - Math.cos(StdDraw.getRad(15)) * 10
    );
    ctx.lineTo(0, height);
    ctx.lineTo(
      -Math.sin(StdDraw.getRad(15)) * 10,
      height - Math.cos(StdDraw.getRad(15)) * 10
    );
    ctx.stroke();
    ctx.closePath();

    // Draw coordinates calibration
    let y;
    let x = 5;
    for (y = 50; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(0, y);

      ctx.stroke();
      ctx.closePath();
    }

    // Draw coordinates numbers
    x = -19;
    for (y = 50; y < height; y += 50) {
      ctx.save();

      ctx.scale(1, -1);
      ctx.translate(0, -height);

      ctx.fillText((height - y).toString(), x, y);
      ctx.restore();
    }

    ctx.restore();
  }

  /**
   * Create new canvas, container element must exist
   * @param containerId Canvas container id
   * @param canvasId new canvas id
   */
  static createNewCanvas(containerId: string, canvasId: string) {
    if (document.getElementById(canvasId)) {
      throw new Error(`Canvas(${canvasId}) already exist`);
    }
    if (!document.getElementById(containerId)) {
      throw new Error(`Canvas container(${containerId}) must exist`);
    }
    StdDraw.canvas = StdDraw._createCanvas(containerId, canvasId);
    StdDraw.ctx = StdDraw._createContext();
    StdDraw.drawAxis();
  }

  static _createCanvas(
    containerId = 'CanvasContainer',
    canvasId = 'StdCanvas'
  ) {
    let _canvas = window.document.getElementById(canvasId) as HTMLCanvasElement;
    if (!_canvas) {
      _canvas = document.createElement('canvas') as HTMLCanvasElement;
      _canvas.id = canvasId;
      _canvas.width = StdDraw.DEFAULT_WIDTH;
      _canvas.height = StdDraw.DEFAULT_HEIGHT;
      // _canvas.width = 440;
      // _canvas.height = 240;
      _canvas.style.background = '#fff';
      _canvas.style.border = '1px solid #eee';

      const canvasContainer = document.getElementById(containerId);
      if (!canvasContainer) {
        throw new Error(`${containerId} element not found`);
      }
      canvasContainer.appendChild(_canvas);
    }
    return _canvas;
  }

  static _createContext() {
    const _ctx = StdDraw.canvas.getContext('2d');
    if (!_ctx) {
      throw new Error('Canvas element not found');
    }
    // _ctx.scale(StdDraw.scaleX, StdDraw.scaleY);
    _ctx.fillStyle = '#000';
    _ctx.strokeStyle = '#000';
    _ctx.save();
    return _ctx;
  }

  static _assertXYSafeInt(x: number, y: number) {
    assert(
      !Number.isSafeInteger(x) || !Number.isSafeInteger(y),
      'x or y is either NaN or infinite'
    );
  }
}

StdDraw.drawAxis();
