/**
 * Initializes an input stream from a socket.
 *
 * @param  {Socket} socket the socket
 * @throws IllegalArgumentException if cannot open {@code socket}
 * @throws IllegalArgumentException if {@code socket} is {@code null}
 * @class
 * @author David Pritchard
 */
export class In {
  static CHARSET_NAME = 'UTF-8';

  static LOCALE: Locale;
  public static LOCALE_$LI$(): Locale {
    if (In.LOCALE == null) In.LOCALE = Locale.US;
    return In.LOCALE;
  }

  static WHITESPACE_PATTERN: Pattern;
  public static WHITESPACE_PATTERN_$LI$(): Pattern {
    if (In.WHITESPACE_PATTERN == null)
      In.WHITESPACE_PATTERN = Pattern.compile('\\p{javaWhitespace}+');
    return In.WHITESPACE_PATTERN;
  }

  static EMPTY_PATTERN: Pattern;
  public static EMPTY_PATTERN_$LI$(): Pattern {
    if (In.EMPTY_PATTERN == null) In.EMPTY_PATTERN = Pattern.compile('');
    return In.EMPTY_PATTERN;
  }

  static EVERYTHING_PATTERN: Pattern;
  public static EVERYTHING_PATTERN_$LI$(): Pattern {
    if (In.EVERYTHING_PATTERN == null)
      In.EVERYTHING_PATTERN = Pattern.compile('\\A');
    return In.EVERYTHING_PATTERN;
  }

  private scanner: Scanner;

  public constructor(socket?: any) {
    if ((socket != null && socket instanceof <any>Socket) || socket === null) {
      const __args = arguments;
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        if (socket == null) throw new Error('socket argument is null');
        try {
          const is: InputStream = socket.getInputStream();
          this.scanner = new Scanner(
            new BufferedInputStream(is),
            In.CHARSET_NAME
          );
          this.scanner.useLocale(In.LOCALE_$LI$());
        } catch (ioe) {
          throw new Error(`Could not open ${socket}`, ioe);
        }
      })();
    } else if (
      (socket != null && socket instanceof <any>URL) ||
      socket === null
    ) {
      const __args = arguments;
      const url: any = __args[0];
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        if (url == null) throw new Error('url argument is null');
        try {
          const site: URLConnection = url.openConnection();
          const is: InputStream = site.getInputStream();
          this.scanner = new Scanner(
            new BufferedInputStream(is),
            In.CHARSET_NAME
          );
          this.scanner.useLocale(In.LOCALE_$LI$());
        } catch (ioe) {
          throw new Error(`Could not open ${url}`, ioe);
        }
      })();
    } else if (
      (socket != null && socket instanceof <any>File) ||
      socket === null
    ) {
      const __args = arguments;
      const file: any = __args[0];
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        if (file == null) throw new Error('file argument is null');
        try {
          const fis: FileInputStream = new FileInputStream(file);
          this.scanner = new Scanner(
            new BufferedInputStream(fis),
            In.CHARSET_NAME
          );
          this.scanner.useLocale(In.LOCALE_$LI$());
        } catch (ioe) {
          throw new Error(`Could not open ${file}`, ioe);
        }
      })();
    } else if (typeof socket === 'string' || socket === null) {
      const __args = arguments;
      const name: any = __args[0];
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        if (name == null) throw new Error('argument is null');
        try {
          const file: File = new File(name);
          if (file.exists()) {
            const fis: FileInputStream = new FileInputStream(file);
            this.scanner = new Scanner(
              new BufferedInputStream(fis),
              In.CHARSET_NAME
            );
            this.scanner.useLocale(In.LOCALE_$LI$());
            return;
          }
          let url: URL = (<any>this.constructor).getResource(name);
          if (url == null) {
            url = (<any>this.constructor).getClassLoader().getResource(name);
          }
          if (url == null) {
            url = <URL>new URL(name);
          }
          const site: URLConnection = url.openConnection();
          const is: InputStream = site.getInputStream();
          this.scanner = new Scanner(
            new BufferedInputStream(is),
            In.CHARSET_NAME
          );
          this.scanner.useLocale(In.LOCALE_$LI$());
        } catch (ioe) {
          throw new Error(`Could not open ${name}`, ioe);
        }
      })();
    } else if (
      (socket != null && socket instanceof <any>Scanner) ||
      socket === null
    ) {
      const __args = arguments;
      const scanner: any = __args[0];
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        if (scanner == null) throw new Error('scanner argument is null');
        this.scanner = scanner;
      })();
    } else if (socket === undefined) {
      const __args = arguments;
      if (this.scanner === undefined) this.scanner = null;
      if (this.scanner === undefined) this.scanner = null;
      (() => {
        this.scanner = new Scanner(
          new BufferedInputStream(java.lang.System.in),
          In.CHARSET_NAME
        );
        this.scanner.useLocale(In.LOCALE_$LI$());
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns true if this input stream exists.
   *
   * @return  {@code true} if this input stream exists; {@code false} otherwise
   */
  public exists(): boolean {
    return this.scanner != null;
  }

  /**
   * Returns true if input stream is empty (except possibly whitespace).
   * Use this to know whether the next call to {@link #readString()},
   * {@link #readDouble()}, etc will succeed.
   *
   * @return  {@code true} if this input stream is empty (except possibly whitespace);
   * {@code false} otherwise
   */
  public isEmpty(): boolean {
    return !this.scanner.hasNext();
  }

  /**
   *
   * Returns true if this input stream has a next line.
   * Use this method to know whether the
   * next call to {@link #readLine()} will succeed.
   * This method is functionally equivalent to {@link #hasNextChar()}.
   *
   * @return  {@code true} if this input stream has more input (including whitespace);
   * {@code false} otherwise
   */
  public hasNextLine(): boolean {
    return this.scanner.hasNextLine();
  }

  /**
   * Returns true if this input stream has more input (including whitespace).
   * Use this method to know whether the next call to {@link #readChar()} will succeed.
   * This method is functionally equivalent to {@link #hasNextLine()}.
   *
   * @return  {@code true} if this input stream has more input (including whitespace);
   * {@code false} otherwise
   */
  public hasNextChar(): boolean {
    this.scanner.useDelimiter(In.EMPTY_PATTERN_$LI$());
    const result: boolean = this.scanner.hasNext();
    this.scanner.useDelimiter(In.WHITESPACE_PATTERN_$LI$());
    return result;
  }

  /**
   * Reads and returns the next line in this input stream.
   *
   * @return  the next line in this input stream; {@code null} if no such line
   */
  public readLine(): string {
    let line: string;
    try {
      line = this.scanner.nextLine();
    } catch (e) {
      line = null;
    }
    return line;
  }

  /**
   * Reads and returns the next character in this input stream.
   *
   * @return  the next {@code char} in this input stream
   * @throws Error if the input stream is empty
   */
  public readChar(): string {
    this.scanner.useDelimiter(In.EMPTY_PATTERN_$LI$());
    try {
      const ch: string = this.scanner.next();
      this.scanner.useDelimiter(In.WHITESPACE_PATTERN_$LI$());
      return ch.charAt(0);
    } catch (e) {
      throw new Error(
        "attempts to read a 'char' value from the input stream, but no more tokens are available"
      );
    }
  }

  /**
   * Reads and returns the remainder of this input stream, as a string.
   *
   * @return  the remainder of this input stream, as a string
   */
  public readAll(): string {
    if (!this.scanner.hasNextLine()) return '';
    const result: string = this.scanner
      .useDelimiter(In.EVERYTHING_PATTERN_$LI$())
      .next();
    this.scanner.useDelimiter(In.WHITESPACE_PATTERN_$LI$());
    return result;
  }

  /**
   * Reads the next token from this input stream and returns it as a {@code String}.
   *
   * @return  the next {@code String} in this input stream
   * @throws Error if the input stream is empty
   */
  public readString(): string {
    try {
      return this.scanner.next();
    } catch (e) {
      throw new Error(
        "attempts to read a 'String' value from the input stream, but no more tokens are available"
      );
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code int},
   * and returns the {@code int}.
   *
   * @return  the next {@code int} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as an {@code int}
   */
  public readInt(): number {
    try {
      return this.scanner.nextInt();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read an 'int' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read an 'int' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code double},
   * and returns the {@code double}.
   *
   * @return  the next {@code double} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code double}
   */
  public readDouble(): number {
    try {
      return this.scanner.nextDouble();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read a 'double' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read a 'double' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code float},
   * and returns the {@code float}.
   *
   * @return  the next {@code float} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code float}
   */
  public readFloat(): number {
    try {
      return this.scanner.nextFloat();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read a 'float' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read a 'float' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code long},
   * and returns the {@code long}.
   *
   * @return  the next {@code long} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code long}
   */
  public readLong(): number {
    try {
      return this.scanner.nextLong();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read a 'long' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read a 'long' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code short},
   * and returns the {@code short}.
   *
   * @return  the next {@code short} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code short}
   */
  public readShort(): number {
    try {
      return this.scanner.nextShort();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read a 'short' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read a 'short' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code byte},
   * and returns the {@code byte}.
   * <p>
   * To read binary data, use {@link BinaryIn}.
   *
   * @return  the next {@code byte} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code byte}
   */
  public readByte(): number {
    try {
      return this.scanner.nextByte();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = this.scanner.next();
        throw new InputMismatchException(
          `attempts to read a 'byte' value from the input stream, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read a 'byte' value from the input stream, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from this input stream, parses it as a {@code boolean}
   * (interpreting either {@code "true"} or {@code "1"} as {@code true},
   * and either {@code "false"} or {@code "0"} as {@code false}).
   *
   * @return  the next {@code boolean} in this input stream
   * @throws Error if the input stream is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code boolean}
   */
  public readBoolean(): boolean {
    try {
      const token: string = this.readString();
      if (
        /* equalsIgnoreCase */ ((o1, o2) =>
          o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
          'true',
          token
        )
      )
        return true;
      if (
        /* equalsIgnoreCase */ ((o1, o2) =>
          o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
          'false',
          token
        )
      )
        return false;
      if (/* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          }
          return o1 === o2;
        })('1', token)) return true;
      if (/* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          }
          return o1 === o2;
        })('0', token)) return false;
      throw new InputMismatchException(
        `attempts to read a 'boolean' value from the input stream, but the next token is "${token}"`
      );
    } catch (e) {
      throw new Error(
        "attempts to read a 'boolean' value from the input stream, but no more tokens are available"
      );
    }
  }

  /**
   * Reads all remaining tokens from this input stream and returns them as
   * an array of strings.
   *
   * @return  all remaining tokens in this input stream, as an array of strings
   */
  public readAllStrings(): string[] {
    const tokens: string[] = In.WHITESPACE_PATTERN_$LI$().split(this.readAll());
    if (tokens.length === 0 || tokens[0].length > 0) return tokens;
    const decapitokens: string[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(tokens.length - 1);
    for (let i = 0; i < tokens.length - 1; i++) {
      decapitokens[i] = tokens[i + 1];
    }
    return decapitokens;
  }

  /**
   * Reads all remaining lines from this input stream and returns them as
   * an array of strings.
   *
   * @return  all remaining lines in this input stream, as an array of strings
   */
  public readAllLines(): string[] {
    const lines: ArrayList<string> = <any>new ArrayList<string>();
    while (this.hasNextLine()) {
      {
        lines.add(this.readLine());
      }
    }
    return lines.toArray<any>(
      (s => {
        const a = [];
        while (s-- > 0) a.push(null);
        return a;
      })(lines.size())
    );
  }

  /**
   * Reads all remaining tokens from this input stream, parses them as integers,
   * and returns them as an array of integers.
   *
   * @return  all remaining lines in this input stream, as an array of integers
   */
  public readAllInts(): number[] {
    const fields: string[] = this.readAllStrings();
    const vals: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(fields.length);
    for (let i = 0; i < fields.length; i++) {
      vals[i] = parseInt(fields[i]);
    }
    return vals;
  }

  /**
   * Reads all remaining tokens from this input stream, parses them as longs,
   * and returns them as an array of longs.
   *
   * @return  all remaining lines in this input stream, as an array of longs
   */
  public readAllLongs(): number[] {
    const fields: string[] = this.readAllStrings();
    const vals: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(fields.length);
    for (let i = 0; i < fields.length; i++) {
      vals[i] = Number.parseInt(fields[i]);
    }
    return vals;
  }

  /**
   * Reads all remaining tokens from this input stream, parses them as doubles,
   * and returns them as an array of doubles.
   *
   * @return  all remaining lines in this input stream, as an array of doubles
   */
  public readAllDoubles(): number[] {
    const fields: string[] = this.readAllStrings();
    const vals: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(fields.length);
    for (let i = 0; i < fields.length; i++) {
      vals[i] = Number.parseFloat(fields[i]);
    }
    return vals;
  }

  /**
   * Closes this input stream.
   */
  public close() {
    this.scanner.close();
  }

  public static readInts$java_lang_String(filename: string): number[] {
    return new In(filename).readAllInts();
  }

  /**
   * Reads all integers from a file and returns them as
   * an array of integers.
   *
   * @param       filename the name of the file
   * @return      the integers in the file
   * @deprecated Replaced by {@code new In(filename)}.{@link #readAllInts()}.
   */
  public static readInts(filename?: any): any {
    if (typeof filename === 'string' || filename === null) {
      return <any>In.readInts$java_lang_String(filename);
    }
    if (filename === undefined) {
      return <any>In.readInts$();
    }
    throw new Error('invalid overload');
  }

  public static readDoubles$java_lang_String(filename: string): number[] {
    return new In(filename).readAllDoubles();
  }

  /**
   * Reads all doubles from a file and returns them as
   * an array of doubles.
   *
   * @param       filename the name of the file
   * @return      the doubles in the file
   * @deprecated Replaced by {@code new In(filename)}.{@link #readAllDoubles()}.
   */
  public static readDoubles(filename?: any): any {
    if (typeof filename === 'string' || filename === null) {
      return <any>In.readDoubles$java_lang_String(filename);
    }
    if (filename === undefined) {
      return <any>In.readDoubles$();
    }
    throw new Error('invalid overload');
  }

  public static readStrings$java_lang_String(filename: string): string[] {
    return new In(filename).readAllStrings();
  }

  /**
   * Reads all strings from a file and returns them as
   * an array of strings.
   *
   * @param       filename the name of the file
   * @return      the strings in the file
   * @deprecated Replaced by {@code new In(filename)}.{@link #readAllStrings()}.
   */
  public static readStrings(filename?: any): any {
    if (typeof filename === 'string' || filename === null) {
      return <any>In.readStrings$java_lang_String(filename);
    }
    if (filename === undefined) {
      return <any>In.readStrings$();
    }
    throw new Error('invalid overload');
  }

  public static readInts$(): number[] {
    return new In().readAllInts();
  }

  public static readDoubles$(): number[] {
    return new In().readAllDoubles();
  }

  public static readStrings$(): string[] {
    return new In().readAllStrings();
  }

  /**
   * Unit tests the {@code In} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    let __in: In;
    const urlName = 'https://introcs.cs.princeton.edu/java/stdlib/InTest.txt';
    console.info(`readAll() from URL ${urlName}`);
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In(urlName);
      console.info(__in.readAll());
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info(`readLine() from URL ${urlName}`);
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In(urlName);
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readLine();
          console.info(s);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info(`readString() from URL ${urlName}`);
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In(urlName);
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readString();
          console.info(s);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info('readLine() from current directory');
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In('./InTest.txt');
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readLine();
          console.info(s);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info('readLine() from relative path');
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In('../stdlib/InTest.txt');
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readLine();
          console.info(s);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info('readChar() from file');
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In('InTest.txt');
      while (!__in.isEmpty()) {
        {
          const c: string = __in.readChar();
          console.info(c);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info();
    console.info('readLine() from absolute OS X / Linux path');
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In('/n/fs/introcs/www/java/stdlib/InTest.txt');
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readLine();
          console.info(s);
        }
      }
    } catch (e) {
      console.info(e);
    }
    console.info();
    console.info('readLine() from absolute Windows path');
    console.info(
      '---------------------------------------------------------------------------'
    );
    try {
      __in = new In('G:\\www\\introcs\\stdlib\\InTest.txt');
      while (!__in.isEmpty()) {
        {
          const s: string = __in.readLine();
          console.info(s);
        }
      }
      console.info();
    } catch (e) {
      console.info(e);
    }
    console.info();
  }
}
In.__class = 'edu.princeton.cs.algs4.In';

In.EVERYTHING_PATTERN_$LI$();

In.EMPTY_PATTERN_$LI$();

In.WHITESPACE_PATTERN_$LI$();

In.LOCALE_$LI$();

In.main(null);
