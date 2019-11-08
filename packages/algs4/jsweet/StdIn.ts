import { StdOut } from './StdOut';

/**
 * The {@code StdIn} class provides static methods for reading strings
 * and numbers from standard input.
 * These functions fall into one of four categories:
 * <ul>
 * <li>those for reading individual tokens from standard input, one at a time,
 * and converting each to a number, string, or boolean
 * <li>those for reading characters from standard input, one at a time
 * <li>those for reading lines from standard input, one at a time
 * <li>those for reading a sequence of values of the same type from standard input,
 * and returning the values in an array
 * </ul>
 * <p>
 * Generally, it is best not to mix functions from the different
 * categories in the same program.
 * <p>
 * <b>Getting started.</b>
 * To use this class, you must have {@code StdIn.class} in your
 * Java classpath. If you used our autoinstaller, you should be all set.
 * Otherwise, either download
 * <a href = "https://introcs.cs.princeton.edu/java/code/stdlib.jar">stdlib.jar</a>
 * and add to your Java classpath or download
 * <a href = "https://introcs.cs.princeton.edu/java/stdlib/StdIn.java">StdIn.java</a>
 * and put a copy in your working directory.
 * <p>
 * <b>Reading tokens from standard input and converting to numbers and strings.</b>
 * You can use the following methods to read numbers, strings, and booleans
 * from standard input one at a time:
 * <ul>
 * <li> {@link #isEmpty()}
 * <li> {@link #readInt()}
 * <li> {@link #readDouble()}
 * <li> {@link #readString()}
 * <li> {@link #readShort()}
 * <li> {@link #readLong()}
 * <li> {@link #readFloat()}
 * <li> {@link #readByte()}
 * <li> {@link #readBoolean()}
 * </ul>
 * <p>
 * The first method returns true if standard input has no more tokens.
 * Each other method skips over any input that is whitespace. Then, it reads
 * the next token and attempts to convert it into a value of the specified
 * type. If it succeeds, it returns that value; otherwise, it
 * throws an {@link InputMismatchException}.
 * <p>
 * <em>Whitespace</em> includes spaces, tabs, and newlines; the full definition
 * is inherited from {@link Character#isWhitespace(char)}.
 * A <em>token</em> is a maximal sequence of non-whitespace characters.
 * The precise rules for describing which tokens can be converted to
 * integers and floating-point numbers are inherited from
 * <a href = "http://docs.oracle.com/javase/7/docs/api/java/util/Scanner.html#number-syntax">Scanner</a>,
 * using the locale {@link Locale#US}; the rules
 * for floating-point numbers are slightly different
 * from those in {@link Double#valueOf(String)},
 * but unlikely to be of concern to most programmers.
 * <p>
 * As an example, the following code fragment reads integers from standard input,
 * one at a time, and prints them one per line.
 * <pre>
 * while (!StdIn.isEmpty()) {
 * double value = StdIn.readDouble();
 * StdOut.println(value);
 * }
 * </pre>
 * <p>
 * <b>Reading characters from standard input.</b>
 * You can use the following two methods to read characters from standard input one at a time:
 * <ul>
 * <li> {@link #hasNextChar()}
 * <li> {@link #readChar()}
 * </ul>
 * <p>
 * The first method returns true if standard input has more input (including whitespace).
 * The second method reads and returns the next character of input on standard
 * input (possibly a whitespace character).
 * <p>
 * As an example, the following code fragment reads characters from standard input,
 * one character at a time, and prints it to standard output.
 * <pre>
 * while (StdIn.hasNextChar()) {
 * char c = StdIn.readChar();
 * StdOut.print(c);
 * }
 * </pre>
 * <p>
 * <b>Reading lines from standard input.</b>
 * You can use the following two methods to read lines from standard input:
 * <ul>
 * <li> {@link #hasNextLine()}
 * <li> {@link #readLine()}
 * </ul>
 * <p>
 * The first method returns true if standard input has more input (including whitespace).
 * The second method reads and returns the remaining portion of
 * the next line of input on standard input (possibly whitespace),
 * discarding the trailing line separator.
 * <p>
 * A <em>line separator</em> is defined to be one of the following strings:
 * {@code \n} (Linux), {@code \r} (old Macintosh),
 * {@code \r\n} (Windows),
 * {@code \}{@code u2028}, {@code \}{@code u2029}, or {@code \}{@code u0085}.
 * <p>
 * As an example, the following code fragment reads text from standard input,
 * one line at a time, and prints it to standard output.
 * <pre>
 * while (StdIn.hasNextLine()) {
 * String line = StdIn.readLine();
 * StdOut.println(line);
 * }
 * </pre>
 * <p>
 * <b>Reading a sequence of values of the same type from standard input.</b>
 * You can use the following methods to read a sequence numbers, strings,
 * or booleans (all of the same type) from standard input:
 * <ul>
 * <li> {@link #readAllDoubles()}
 * <li> {@link #readAllInts()}
 * <li> {@link #readAllLongs()}
 * <li> {@link #readAllStrings()}
 * <li> {@link #readAllLines()}
 * <li> {@link #readAll()}
 * </ul>
 * <p>
 * The first three methods read of all of remaining token on standard input
 * and converts the tokens to values of
 * the specified type, as in the corresponding
 * {@code readDouble}, {@code readInt}, and {@code readString()} methods.
 * The {@code readAllLines()} method reads all remaining lines on standard
 * input and returns them as an array of strings.
 * The {@code readAll()} method reads all remaining input on standard
 * input and returns it as a string.
 * <p>
 * As an example, the following code fragment reads all of the remaining
 * tokens from standard input and returns them as an array of strings.
 * <pre>
 * String[] words = StdIn.readAllStrings();
 * </pre>
 * <p>
 * <b>Differences with Scanner.</b>
 * {@code StdIn} and {@link Scanner} are both designed to parse
 * tokens and convert them to primitive types and strings.
 * The main differences are summarized below:
 * <ul>
 * <li> {@code StdIn} is a set of static methods and reads
 * reads input from only standard input. It is suitable for use before
 * a programmer knows about objects.
 * See {@link In} for an object-oriented version that handles
 * input from files, URLs,
 * and sockets.
 * <li> {@code StdIn} uses whitespace as the delimiter pattern
 * that separates tokens.
 * {@link Scanner} supports arbitrary delimiter patterns.
 * <li> {@code StdIn} coerces the character-set encoding to UTF-8,
 * which is the most widely used character encoding for Unicode.
 * <li> {@code StdIn} coerces the locale to {@link Locale#US},
 * for consistency with {@link StdOut}, {@link Double#parseDouble(String)},
 * and floating-point literals.
 * <li> {@code StdIn} has convenient methods for reading a single
 * character; reading in sequences of integers, doubles, or strings;
 * and reading in all of the remaining input.
 * </ul>
 * <p>
 * Historical note: {@code StdIn} preceded {@code Scanner}; when
 * {@code Scanner} was introduced, this class was re-implemented to use {@code Scanner}.
 * <p>
 * <b>Using standard input.</b>
 * Standard input is a fundamental operating system abstraction on Mac OS X,
 * Windows, and Linux.
 * The methods in {@code StdIn} are <em>blocking</em>, which means that they
 * will wait until you enter input on standard input.
 * If your program has a loop that repeats until standard input is empty,
 * you must signal that the input is finished.
 * To do so, depending on your operating system and IDE,
 * use either {@code <Ctrl-d>} or {@code <Ctrl-z>}, on its own line.
 * If you are redirecting standard input from a file, you will not need
 * to do anything to signal that the input is finished.
 * <p>
 * <b>Known bugs.</b>
 * Java's UTF-8 encoding does not recognize the optional
 * <a href = "http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058">byte-order mask</a>.
 * If the input begins with the optional byte-order mask, {@code StdIn}
 * will have an extra character {@code \}{@code uFEFF} at the beginning.
 * <p>
 * <b>Reference.</b>
 * For additional documentation,
 * see <a href="https://introcs.cs.princeton.edu/15inout">Section 1.5</a> of
 * <em>Computer Science: An Interdisciplinary Approach</em>
 * by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @author David Pritchard
 * @class
 */
export class StdIn {
  static __static_initialized = false;
  static __static_initialize() {
    if (!StdIn.__static_initialized) {
      StdIn.__static_initialized = true;
      StdIn.__static_initializer_0();
    }
  }

  /**
   * begin: section (1 of 2) of code duplicated from In to StdIn.
   */
  static CHARSET_NAME = 'UTF-8';

  static LOCALE: Locale;
  public static LOCALE_$LI$(): Locale {
    StdIn.__static_initialize();
    if (StdIn.LOCALE == null) StdIn.LOCALE = Locale.US;
    return StdIn.LOCALE;
  }

  static WHITESPACE_PATTERN: Pattern;
  public static WHITESPACE_PATTERN_$LI$(): Pattern {
    StdIn.__static_initialize();
    if (StdIn.WHITESPACE_PATTERN == null)
      StdIn.WHITESPACE_PATTERN = Pattern.compile('\\p{javaWhitespace}+');
    return StdIn.WHITESPACE_PATTERN;
  }

  static EMPTY_PATTERN: Pattern;
  public static EMPTY_PATTERN_$LI$(): Pattern {
    StdIn.__static_initialize();
    if (StdIn.EMPTY_PATTERN == null) StdIn.EMPTY_PATTERN = Pattern.compile('');
    return StdIn.EMPTY_PATTERN;
  }

  static EVERYTHING_PATTERN: Pattern;
  public static EVERYTHING_PATTERN_$LI$(): Pattern {
    StdIn.__static_initialize();
    if (StdIn.EVERYTHING_PATTERN == null)
      StdIn.EVERYTHING_PATTERN = Pattern.compile('\\A');
    return StdIn.EVERYTHING_PATTERN;
  }

  /**
   * end: section (1 of 2) of code duplicated from In to StdIn.
   */
  static scanner: Scanner;
  public static scanner_$LI$(): Scanner {
    StdIn.__static_initialize();
    return StdIn.scanner;
  }



  /**
   * Returns true if standard input is empty (except possibly for whitespace).
   * Use this method to know whether the next call to {@link #readString()},
   * {@link #readDouble()}, etc will succeed.
   *
   * @return  {@code true} if standard input is empty (except possibly
   * for whitespace); {@code false} otherwise
   */
  public static isEmpty(): boolean {
    return !StdIn.scanner_$LI$().hasNext();
  }

  /**
   * Returns true if standard input has a next line.
   * Use this method to know whether the
   * next call to {@link #readLine()} will succeed.
   * This method is functionally equivalent to {@link #hasNextChar()}.
   *
   * @return  {@code true} if standard input has more input (including whitespace);
   * {@code false} otherwise
   */
  public static hasNextLine(): boolean {
    return StdIn.scanner_$LI$().hasNextLine();
  }

  /**
   * Returns true if standard input has more input (including whitespace).
   * Use this method to know whether the next call to {@link #readChar()} will succeed.
   * This method is functionally equivalent to {@link #hasNextLine()}.
   *
   * @return  {@code true} if standard input has more input (including whitespace);
   * {@code false} otherwise
   */
  public static hasNextChar(): boolean {
    StdIn.scanner_$LI$().useDelimiter(StdIn.EMPTY_PATTERN_$LI$());
    const result: boolean = StdIn.scanner_$LI$().hasNext();
    StdIn.scanner_$LI$().useDelimiter(StdIn.WHITESPACE_PATTERN_$LI$());
    return result;
  }

  /**
   * Reads and returns the next line, excluding the line separator if present.
   *
   * @return  the next line, excluding the line separator if present;
   * {@code null} if no such line
   */
  public static readLine(): string {
    let line: string;
    try {
      line = StdIn.scanner_$LI$().nextLine();
    } catch (e) {
      line = null;
    }
    return line;
  }

  /**
   * Reads and returns the next character.
   *
   * @return  the next {@code char}
   * @throws Error if standard input is empty
   */
  public static readChar(): string {
    try {
      StdIn.scanner_$LI$().useDelimiter(StdIn.EMPTY_PATTERN_$LI$());
      const ch: string = StdIn.scanner_$LI$().next();
      StdIn.scanner_$LI$().useDelimiter(StdIn.WHITESPACE_PATTERN_$LI$());
      return ch.charAt(0);
    } catch (e) {
      throw new Error(
        "attempts to read a 'char' value from standard input, but no more tokens are available"
      );
    }
  }

  /**
   * Reads and returns the remainder of the input, as a string.
   *
   * @return  the remainder of the input, as a string
   * @throws Error if standard input is empty
   */
  public static readAll(): string {
    if (!StdIn.scanner_$LI$().hasNextLine()) return '';
    const result: string = StdIn.scanner_$LI$()
      .useDelimiter(StdIn.EVERYTHING_PATTERN_$LI$())
      .next();
    StdIn.scanner_$LI$().useDelimiter(StdIn.WHITESPACE_PATTERN_$LI$());
    return result;
  }

  /**
   * Reads the next token  and returns the {@code String}.
   *
   * @return  the next {@code String}
   * @throws Error if standard input is empty
   */
  public static readString(): string {
    try {
      return StdIn.scanner_$LI$().next();
    } catch (e) {
      throw new Error(
        "attempts to read a 'String' value from standard input, but no more tokens are available"
      );
    }
  }

  /**
   * Reads the next token from standard input, parses it as an integer, and returns the integer.
   *
   * @return  the next integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as an {@code int}
   */
  public static readInt(): number {
    try {
      return StdIn.scanner_$LI$().nextInt();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read an 'int' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attemps to read an 'int' value from standard input, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a double, and returns the double.
   *
   * @return  the next double on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code double}
   */
  public static readDouble(): number {
    try {
      return StdIn.scanner_$LI$().nextDouble();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read a 'double' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attempts to read a 'double' value from standard input, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a float, and returns the float.
   *
   * @return  the next float on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code float}
   */
  public static readFloat(): number {
    try {
      return StdIn.scanner_$LI$().nextFloat();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read a 'float' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attempts to read a 'float' value from standard input, but there no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a long integer, and returns the long integer.
   *
   * @return  the next long integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code long}
   */
  public static readLong(): number {
    try {
      return StdIn.scanner_$LI$().nextLong();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read a 'long' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attempts to read a 'long' value from standard input, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a short integer, and returns the short integer.
   *
   * @return  the next short integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code short}
   */
  public static readShort(): number {
    try {
      return StdIn.scanner_$LI$().nextShort();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read a 'short' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attempts to read a 'short' value from standard input, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a byte, and returns the byte.
   *
   * @return  the next byte on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code byte}
   */
  public static readByte(): number {
    try {
      return StdIn.scanner_$LI$().nextByte();
    } catch (__e) {
      if (__e != null && __e instanceof <any>InputMismatchException) {
        const e: InputMismatchException = <InputMismatchException>__e;
        const token: string = StdIn.scanner_$LI$().next();
        throw new InputMismatchException(
          `attempts to read a 'byte' value from standard input, but the next token is "${token}"`
        );
      }
      if (__e != null && __e instanceof <any>Error) {
        const e: Error = <Error>__e;
        throw new Error(
          "attempts to read a 'byte' value from standard input, but no more tokens are available"
        );
      }
    }
  }

  /**
   * Reads the next token from standard input, parses it as a boolean,
   * and returns the boolean.
   *
   * @return  the next boolean on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a {@code boolean}:
   * {@code true} or {@code 1} for true, and {@code false} or {@code 0} for false,
   * ignoring case
   */
  public static readBoolean(): boolean {
    try {
      const token: string = StdIn.readString();
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
        `attempts to read a 'boolean' value from standard input, but the next token is "${token}"`
      );
    } catch (e) {
      throw new Error(
        "attempts to read a 'boolean' value from standard input, but no more tokens are available"
      );
    }
  }

  /**
   * Reads all remaining tokens from standard input and returns them as an array of strings.
   *
   * @return  all remaining tokens on standard input, as an array of strings
   */
  public static readAllStrings(): string[] {
    const tokens: string[] = StdIn.WHITESPACE_PATTERN_$LI$().split(
      StdIn.readAll()
    );
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
   * Reads all remaining lines from standard input and returns them as an array of strings.
   * @return  all remaining lines on standard input, as an array of strings
   */
  public static readAllLines(): string[] {
    const lines: ArrayList<string> = <any>new ArrayList<string>();
    while (StdIn.hasNextLine()) {
      {
        lines.add(StdIn.readLine());
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
   * Reads all remaining tokens from standard input, parses them as integers, and returns
   * them as an array of integers.
   * @return  all remaining integers on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as an {@code int}
   */
  public static readAllInts(): number[] {
    const fields: string[] = StdIn.readAllStrings();
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
   * Reads all remaining tokens from standard input, parses them as longs, and returns
   * them as an array of longs.
   * @return  all remaining longs on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as a {@code long}
   */
  public static readAllLongs(): number[] {
    const fields: string[] = StdIn.readAllStrings();
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
   * Reads all remaining tokens from standard input, parses them as doubles, and returns
   * them as an array of doubles.
   * @return  all remaining doubles on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as a {@code double}
   */
  public static readAllDoubles(): number[] {
    const fields: string[] = StdIn.readAllStrings();
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

  static __static_initializer_0() {
    StdIn.resync();
  }

  /**
   * If StdIn changes, use this to reinitialize the scanner.
   * @private
   */
  private static resync() {
    StdIn.setScanner(
      new Scanner(
        new java.io.BufferedInputStream(java.lang.System.in),
        StdIn.CHARSET_NAME
      )
    );
  }

  private static setScanner(scanner: Scanner) {
    StdIn.scanner = scanner;
    StdIn.scanner_$LI$().useLocale(StdIn.LOCALE_$LI$());
  }

  /**
   * Reads all remaining tokens, parses them as integers, and returns
   * them as an array of integers.
   * @return  all remaining integers, as an array
   * @throws InputMismatchException if any token cannot be parsed as an {@code int}
   * @deprecated Replaced by {@link #readAllInts()}.
   */
  public static readInts(): number[] {
    return StdIn.readAllInts();
  }

  /**
   * Reads all remaining tokens, parses them as doubles, and returns
   * them as an array of doubles.
   * @return  all remaining doubles, as an array
   * @throws InputMismatchException if any token cannot be parsed as a {@code double}
   * @deprecated Replaced by {@link #readAllDoubles()}.
   */
  public static readDoubles(): number[] {
    return StdIn.readAllDoubles();
  }

  /**
   * Reads all remaining tokens and returns them as an array of strings.
   * @return  all remaining tokens, as an array of strings
   * @deprecated Replaced by {@link #readAllStrings()}.
   */
  public static readStrings(): string[] {
    return StdIn.readAllStrings();
  }

  /**
   * Interactive test of basic functionality.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    StdOut.print$java_lang_Object('Type a string: ');
    const s: string = StdIn.readString();
    StdOut.println$java_lang_Object(`Your string was: ${s}`);
    StdOut.println();
    StdOut.print$java_lang_Object('Type an int: ');
    const a: number = StdIn.readInt();
    StdOut.println$java_lang_Object(`Your int was: ${a}`);
    StdOut.println();
    StdOut.print$java_lang_Object('Type a boolean: ');
    const b: boolean = StdIn.readBoolean();
    StdOut.println$java_lang_Object(`Your boolean was: ${b}`);
    StdOut.println();
    StdOut.print$java_lang_Object('Type a double: ');
    const c: number = StdIn.readDouble();
    StdOut.println$java_lang_Object(`Your double was: ${c}`);
    StdOut.println();
  }
}
StdIn.__class = 'edu.princeton.cs.algs4.StdIn';

StdIn.scanner_$LI$();

StdIn.EVERYTHING_PATTERN_$LI$();

StdIn.EMPTY_PATTERN_$LI$();

StdIn.WHITESPACE_PATTERN_$LI$();

StdIn.LOCALE_$LI$();

StdIn.__static_initialize();

StdIn.main(null);
