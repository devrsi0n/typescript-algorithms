/**
 * Creates a `width`-by-`height` picture, with `width` columns
 * and `height` rows, where each pixel is black.
 *
 * @param  width the width of the picture
 * @param  height the height of the picture
 * @throws IllegalArgumentException if `width` is negative or zero
 * @throws IllegalArgumentException if `height` is negative or zero
 * @class
 * @author Robert Sedgewick
 */
export class Picture implements ActionListener {
  private image: BufferedImage;

  private frame: JFrame;

  private filename: string;

  private isOriginUpperLeft = true;

  private __width: number;

  private __height: number;

  public constructor(width?: any, height?: any) {
    if (
      (typeof width === 'number' || width === null) &&
      (typeof height === 'number' || height === null)
    ) {
      const __args = arguments;
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      this.isOriginUpperLeft = true;
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      (() => {
        if (width <= 0) throw new Error('width must be positive');
        if (height <= 0) throw new Error('height must be positive');
        this.__width = width;
        this.__height = height;
        this.image = new BufferedImage(
          width,
          height,
          BufferedImage.TYPE_INT_RGB
        );
      })();
    } else if (
      ((width != null && width instanceof <any>Picture) || width === null) &&
      height === undefined
    ) {
      const __args = arguments;
      const picture: any = __args[0];
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      this.isOriginUpperLeft = true;
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      (() => {
        if (picture == null) throw new Error('constructor argument is null');
        this.__width = picture.width();
        this.__height = picture.height();
        this.image = new BufferedImage(
          this.__width,
          this.__height,
          BufferedImage.TYPE_INT_RGB
        );
        this.filename = picture.filename;
        this.isOriginUpperLeft = picture.isOriginUpperLeft;
        for (let col = 0; col < this.width(); col++) {
          for (let row = 0; row < this.height(); row++) {
            this.image.setRGB(col, row, picture.image.getRGB(col, row));
          }
        }
      })();
    } else if (
      (typeof width === 'string' || width === null) &&
      height === undefined
    ) {
      const __args = arguments;
      const name: any = __args[0];
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      this.isOriginUpperLeft = true;
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      (() => {
        if (name == null) throw new Error('constructor argument is null');
        this.filename = name;
        try {
          const file: File = new File(name);
          if (file.isFile()) {
            this.image = ImageIO.read(file);
          } else {
            let url: URL = (<any>this.constructor).getResource(this.filename);
            if (url == null) {
              url = (<any>this.constructor).getClassLoader().getResource(name);
            }
            if (url == null) {
              url = <URL>new URL(name);
            }
            this.image = ImageIO.read(url);
          }
          if (this.image == null) {
            throw new Error(`could not read image: ${name}`);
          }
          this.__width = this.image.getWidth(null);
          this.__height = this.image.getHeight(null);
        } catch (ioe) {
          throw new Error(`could not open image: ${name}`, ioe);
        }
      })();
    } else if (
      ((width != null && width instanceof <any>File) || width === null) &&
      height === undefined
    ) {
      const __args = arguments;
      const file: any = __args[0];
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      this.isOriginUpperLeft = true;
      if (this.image === undefined) this.image = null;
      if (this.frame === undefined) this.frame = null;
      if (this.filename === undefined) this.filename = null;
      if (this.__width === undefined) this.__width = 0;
      if (this.__height === undefined) this.__height = 0;
      (() => {
        if (file == null) throw new Error('constructor argument is null');
        try {
          this.image = ImageIO.read(file);
        } catch (ioe) {
          throw new Error(`could not open file: ${file}`, ioe);
        }
        if (this.image == null) {
          throw new Error(`could not read file: ${file}`);
        }
        this.__width = this.image.getWidth(null);
        this.__height = this.image.getHeight(null);
        this.filename = file.getName();
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns a {@link JLabel} containing this picture, for embedding in a {@link JPanel},
   * {@link JFrame} or other GUI widget.
   *
   * @return {JLabel} the `JLabel`
   */
  public getJLabel(): JLabel {
    if (this.image == null) return null;
    const icon: ImageIcon = new ImageIcon(this.image);
    return new JLabel(icon);
  }

  /**
   * Sets the origin to be the upper left pixel. This is the default.
   */
  public setOriginUpperLeft() {
    this.isOriginUpperLeft = true;
  }

  /**
   * Sets the origin to be the lower left pixel.
   */
  public setOriginLowerLeft() {
    this.isOriginUpperLeft = false;
  }

  /**
   * Displays the picture in a window on the screen.
   */
  public show() {
    if (this.frame == null) {
      this.frame = new JFrame();
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
      this.frame.setJMenuBar(menuBar);
      this.frame.setContentPane(this.getJLabel());
      this.frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
      if (this.filename == null)
        this.frame.setTitle(`${this.__width}-by-${this.__height}`);
      else this.frame.setTitle(this.filename);
      this.frame.setResizable(false);
      this.frame.pack();
      this.frame.setVisible(true);
    }
    this.frame.repaint();
  }

  /**
   * Returns the height of the picture.
   *
   * @return  the height of the picture (in pixels)
   */
  public height(): number {
    return this.__height;
  }

  /**
   * Returns the width of the picture.
   *
   * @return  the width of the picture (in pixels)
   */
  public width(): number {
    return this.__width;
  }

  private validateRowIndex(row: number) {
    if (row < 0 || row >= this.height())
      throw new Error(
        `row index must be between 0 and ${this.height() - 1}: ${row}`
      );
  }

  private validateColumnIndex(col: number) {
    if (col < 0 || col >= this.width())
      throw new Error(
        `column index must be between 0 and ${this.width() - 1}: ${col}`
      );
  }

  /**
   * Returns the color of pixel (`col`, `row`) as a {@link java.awt.Color}.
   *
   * @param  col the column index
   * @param  row the row index
   * @return {Color} the color of pixel (`col`, `row`)
   * @throws IllegalArgumentException unless both `0 <= col < width` and `0 <= row < height`
   */
  public get(col: number, row: number): Color {
    this.validateColumnIndex(col);
    this.validateRowIndex(row);
    const rgb: number = this.getRGB(col, row);
    return new Color(rgb);
  }

  /**
   * Returns the color of pixel (`col`, `row`) as an `int`.
   * Using this method can be more efficient than {@link #get(int, int)} because
   * it does not create a `Color` object.
   *
   * @param  col the column index
   * @param  row the row index
   * @return  the integer representation of the color of pixel (`col`, `row`)
   * @throws IllegalArgumentException unless both `0 <= col < width` and `0 <= row < height`
   */
  public getRGB(col: number, row: number): number {
    this.validateColumnIndex(col);
    this.validateRowIndex(row);
    if (this.isOriginUpperLeft) return this.image.getRGB(col, row);
    return this.image.getRGB(col, this.__height - row - 1);
  }

  /**
   * Sets the color of pixel (`col`, `row`) to given color.
   *
   * @param  col the column index
   * @param  row the row index
   * @param {Color} color the color
   * @throws IllegalArgumentException unless both `0 <= col < width` and `0 <= row < height`
   * @throws IllegalArgumentException if `color` is `null`
   */
  public set(col: number, row: number, color: Color) {
    this.validateColumnIndex(col);
    this.validateRowIndex(row);
    if (color == null) throw new Error('color argument is null');
    const rgb: number = color.getRGB();
    this.setRGB(col, row, rgb);
  }

  /**
   * Sets the color of pixel (`col`, `row`) to given color.
   *
   * @param  col the column index
   * @param  row the row index
   * @param  rgb the integer representation of the color
   * @throws IllegalArgumentException unless both `0 <= col < width` and `0 <= row < height`
   */
  public setRGB(col: number, row: number, rgb: number) {
    this.validateColumnIndex(col);
    this.validateRowIndex(row);
    if (this.isOriginUpperLeft) this.image.setRGB(col, row, rgb);
    else this.image.setRGB(col, this.__height - row - 1, rgb);
  }

  /**
   * Returns true if this picture is equal to the argument picture.
   *
   * @param  other the other picture
   * @return  `true` if this picture is the same dimension as `other`
   * and if all pixels have the same color; `false` otherwise
   */
  public equals(other: any): boolean {
    if (other === this) return true;
    if (other == null) return false;
    if (<any>other.constructor !== <any>this.constructor) return false;
    const that: Picture = <Picture>other;
    if (this.width() !== that.width()) return false;
    if (this.height() !== that.height()) return false;
    for (let col = 0; col < this.width(); col++) {
      for (let row = 0; row < this.height(); row++) {
        if (this.getRGB(col, row) !== that.getRGB(col, row)) return false;
      }
    }
    return true;
  }

  /**
   * Returns a string representation of this picture.
   * The result is a <code>width</code>-by-<code>height</code> matrix of pixels,
   * where the color of a pixel is represented using 6 hex digits to encode
   * the red, green, and blue components.
   *
   * @return  a string representation of this picture
   */
  public toString(): string {
    const sb = new String();
    sb.append(
      `${this.__width}-by-${this.__height} picture (RGB values given in hex)\n`
    );
    for (let row = 0; row < this.__height; row++) {
      {
        for (let col = 0; col < this.__width; col++) {
          {
            let rgb = 0;
            if (this.isOriginUpperLeft) rgb = this.image.getRGB(col, row);
            else rgb = this.image.getRGB(col, this.__height - row - 1);
            sb.append(printf('#%06X ', rgb & 16777215));
          }
        }
        sb.append('\n');
      }
    }
    return sb.toString().trim();
  }

  /**
   * This operation is not supported because pictures are mutable.
   *
   * @return  does not return a value
   * @throws UnsupportedOperationException if called
   */
  public hashCode(): number {
    throw new java.lang.UnsupportedOperationException(
      'hashCode() is not supported because pictures are mutable'
    );
  }

  public save$java_lang_String(name: string) {
    if (name == null) throw new Error('argument to save() is null');
    this.save$java_io_File(new File(name));
    this.filename = name;
  }

  /**
   * Saves the picture to a file in either PNG or JPEG format.
   * The filetype extension must be either .png or .jpg.
   *
   * @param  name the name of the file
   * @throws IllegalArgumentException if `name` is `null`
   */
  public save(name?: any): any {
    if (typeof name === 'string' || name === null) {
      return <any>this.save$java_lang_String(name);
    }
    if ((name != null && name instanceof <any>File) || name === null) {
      return <any>this.save$java_io_File(name);
    }
    throw new Error('invalid overload');
  }

  public save$java_io_File(file: File) {
    if (file == null) throw new Error('argument to save() is null');
    this.filename = file.getName();
    if (this.frame != null) this.frame.setTitle(this.filename);
    const suffix: string = this.filename.substring(
      this.filename.lastIndexOf('.') + 1
    );
    if (
      /* equalsIgnoreCase */ ((o1, o2) =>
        o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
        'jpg',
        suffix
      ) ||
      /* equalsIgnoreCase */ ((o1, o2) =>
        o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
        'png',
        suffix
      )
    ) {
      try {
        ImageIO.write(this.image, suffix, file);
      } catch (e) {
        console.error(e.message, e);
      }
    } else {
      console.info('Error: filename must end in .jpg or .png');
    }
  }

  /**
   * Opens a save dialog box when the user selects "Save As" from the menu.
   * @param {ActionEvent} e
   */
  public actionPerformed(e: ActionEvent) {
    const chooser: FileDialog = new FileDialog(
      this.frame,
      'Use a .png or .jpg extension',
      FileDialog.SAVE
    );
    chooser.setVisible(true);
    if (chooser.getFile() != null) {
      this.save$java_lang_String(
        chooser.getDirectory() + File.separator + chooser.getFile()
      );
    }
  }

  /**
   * Unit tests this `Picture` data type.
   * Reads a picture specified by the command-line argument,
   * and shows it in a window on the screen.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const picture: Picture = new Picture(args[0]);
    console.info('%d-by-%d\n');
    picture.show();
  }
}
Picture.__class = 'edu.princeton.cs.algs4.Picture';
Picture.__interfaces = [
  'java.util.EventListener',
  'java.awt.event.ActionListener',
];

Picture.main(null);
