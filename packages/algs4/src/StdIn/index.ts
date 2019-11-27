import fs from 'fs';
import readline from 'readline';

// import StdOut from '../StdOut';

/**
 * The `StdIn` class provides static methods for reading strings
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
 * To use this class, you must have `StdIn.class` in your
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
 * `\n` (Linux), `\r` (old Macintosh),
 * `\r\n` (Windows),
 * `\}`u2028`, `\}`u2029`, or `\``u0085`.
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
 * `readDouble`, `readInt`, and `readString()` methods.
 * The `readAllLines()` method reads all remaining lines on standard
 * input and returns them as an array of strings.
 * The `readAll()` method reads all remaining input on standard
 * input and returns it as a string.
 * <p>
 * As an example, the following code fragment reads all of the remaining
 * tokens from standard input and returns them as an array of strings.
 * <pre>
 * String[] words = StdIn.readAllStrings();
 * </pre>
 * <p>
 * <b>Differences with Scanner.</b>
 * `StdIn` and {@link Scanner} are both designed to parse
 * tokens and convert them to primitive types and strings.
 * The main differences are summarized below:
 * <ul>
 * <li> `StdIn` is a set of static methods and reads
 * reads input from only standard input. It is suitable for use before
 * a programmer knows about objects.
 * See {@link In} for an object-oriented version that handles
 * input from files, URLs,
 * and sockets.
 * <li> `StdIn` uses whitespace as the delimiter pattern
 * that separates tokens.
 * {@link Scanner} supports arbitrary delimiter patterns.
 * <li> `StdIn` coerces the character-set encoding to UTF-8,
 * which is the most widely used character encoding for Unicode.
 * <li> `StdIn` coerces the locale to {@link Locale#US},
 * for consistency with {@link StdOut}, {@link Double#parseDouble(String)},
 * and floating-point literals.
 * <li> `StdIn` has convenient methods for reading a single
 * character; reading in sequences of integers, doubles, or strings;
 * and reading in all of the remaining input.
 * </ul>
 * <p>
 * Historical note: `StdIn` preceded `Scanner`; when
 * `Scanner` was introduced, this class was re-implemented to use `Scanner`.
 * <p>
 * <b>Using standard input.</b>
 * Standard input is a fundamental operating system abstraction on Mac OS X,
 * Windows, and Linux.
 * The methods in `StdIn` are <em>blocking</em>, which means that they
 * will wait until you enter input on standard input.
 * If your program has a loop that repeats until standard input is empty,
 * you must signal that the input is finished.
 * To do so, depending on your operating system and IDE,
 * use either `<Ctrl-d>` or `<Ctrl-z>`, on its own line.
 * If you are redirecting standard input from a file, you will not need
 * to do anything to signal that the input is finished.
 * <p>
 * <b>Known bugs.</b>
 * Java's UTF-8 encoding does not recognize the optional
 * <a href = "http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058">byte-order mask</a>.
 * If the input begins with the optional byte-order mask, `StdIn`
 * will have an extra character `\``uFEFF` at the beginning.
 * <p>
 * <b>Reference.</b>
 * For additional documentation,
 * see <a href="https://introcs.cs.princeton.edu/15inout">Section 1.5</a> of
 * <em>Computer Science: An Interdisciplinary Approach</em>
 * by Robert Sedgewick and Kevin Wayne.
 *
 */
export default class StdIn {
  private static rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });

  private static doesStreamEnd = false;

  private static inputLines: Array<string> = [];

  private static nextIndex = 0;

  private static _initialize = StdIn.init();

  public static init(fileName?: string) {
    if (fileName) {
      StdIn.rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity,
      });
    }
    StdIn.doesStreamEnd = false;
    StdIn.inputLines = [];
    StdIn.nextIndex = 0;
    StdIn.rl.on('line', (line) => {
      StdIn.inputLines.push(...line.split(/\s/));
    });
  }

  /**
   * Returns true if standard input is empty (except possibly for whitespace).
   * Use this method to know whether the next call to {@link #readString()},
   * {@link #readDouble()}, etc will succeed.
   *
   * @return  `true` if standard input is empty (except possibly
   * for whitespace); `false` otherwise
   */
  public static isEmpty(): boolean {
    return StdIn.nextIndex >= StdIn.inputLines.length;
  }

  /**
   * Returns true if standard input has a next line.
   * Use this method to know whether the
   * next call to {@link #readLine()} will succeed.
   * This method is functionally equivalent to {@link #hasNextChar()}.
   *
   * @return  `true` if standard input has more input (including whitespace);
   * `false` otherwise
   */
  public static hasNextLine(): boolean {
    return StdIn.nextIndex < StdIn.inputLines.length;
  }

  /**
   * Returns true if standard input has more input (including whitespace).
   * Use this method to know whether the next call to {@link #readChar()} will succeed.
   * This method is functionally equivalent to {@link #hasNextLine()}.
   *
   * `false` otherwise
   */
  public static hasNextChar() {
    throw new Error('No implemented');
  }

  /**
   * Reads and returns the next line, excluding the line separator if present.
   *
   * @return the next line, excluding the line separator if present;
   * `null` if no such line
   */
  public static async readLine() {
    // if (StdIn.isEmpty()) {
    //   return null;
    // }
    if (StdIn.doesStreamEnd) {
      console.warn('Input stream ended!');
    } else if (StdIn.isEmpty()) {
      // Wait a short time to read lines
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    const line = StdIn.inputLines[StdIn.nextIndex];
    StdIn.nextIndex++;
    return line;
  }

  /**
   * Reads and returns the next character.
   * @deprecated
   *
   * @return the next `char`
   * @throws Error if standard input is empty
   */
  public static readChar(): string {
    throw new Error('No implemented');
  }

  /**
   * Reads and returns the remainder of the input, as a string.
   *
   * @return the remainder of the input, as a string
   * @throws Error if standard input is empty
   */
  public static readAll(): string {
    return StdIn.readAllStrings().join('');
  }

  /**
   * Reads the next token  and returns the `String`.
   * @return the next `String`
   * @throws Error if standard input is empty
   */
  public static async readString() {
    return StdIn.readLine();
  }

  /**
   * Reads the next token from standard input, parses it as an integer, and returns the integer.
   * @return the next integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as an `int`
   */
  public static async readInt() {
    return parseInt(await StdIn.readLine(), 10);
  }

  /**
   * Reads the next token from standard input, parses it as a double, and returns the double.
   * @deprecated
   * @return the next double on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `double`
   */
  public static async readDouble() {
    return StdIn.readInt();
  }

  /**
   * Reads the next token from standard input, parses it as a float, and returns the float.
   *
   * @return the next float on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `float`
   */
  public static async readFloat() {
    return StdIn.readInt();
  }

  /**
   * Reads the next token from standard input, parses it as a long integer, and returns the long integer.
   *
   * @return the next long integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `long`
   */
  public static async readLong() {
    return StdIn.readInt();
  }

  /**
   * Reads the next token from standard input, parses it as a short integer, and returns the short integer.
   *
   * @return  the next short integer on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `short`
   */
  public static async readShort() {
    return StdIn.readInt();
  }

  /**
   * Reads the next token from standard input, parses it as a byte, and returns the byte.
   *
   * @return  the next byte on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `byte`
   */
  public static async readByte() {
    return StdIn.readInt();
  }

  /**
   * Reads the next token from standard input, parses it as a boolean,
   * and returns the boolean.
   *
   * @return  the next boolean on standard input
   * @throws Error if standard input is empty
   * @throws InputMismatchException if the next token cannot be parsed as a `boolean`:
   * `true` or `1` for true, and `false` or `0` for false,
   * ignoring case
   */
  public static readBoolean(): boolean {
    return Boolean(StdIn.readLine());
  }

  /**
   * Reads all remaining tokens from standard input and returns them as an array of strings.
   *
   * @return  all remaining tokens on standard input, as an array of strings
   */
  public static readAllStrings(): string[] {
    if (StdIn.isEmpty()) {
      throw new Error('input is empty');
    }
    const { inputLines, nextIndex } = StdIn;
    const val = inputLines.slice(nextIndex);
    StdIn.nextIndex = StdIn.inputLines.length - 1;
    return val;
  }

  /**
   * Reads all remaining lines from standard input and returns them as an array of strings.
   * @return  all remaining lines on standard input, as an array of strings
   */
  public static readAllLines(): string[] {
    return StdIn.readAllStrings();
  }

  /**
   * Reads all remaining tokens from standard input, parses them as integers, and returns
   * them as an array of integers.
   * @return  all remaining integers on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as an `int`
   */
  public static readAllInts(): number[] {
    const fields: string[] = StdIn.readAllStrings();
    return fields.map((field) => parseInt(field, 10));
  }

  /**
   * Reads all remaining tokens from standard input, parses them as longs, and returns
   * them as an array of longs.
   * @return  all remaining longs on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as a `long`
   */
  public static readAllLongs(): number[] {
    return StdIn.readAllInts();
  }

  /**
   * Reads all remaining tokens from standard input, parses them as doubles, and returns
   * them as an array of doubles.
   * @return  all remaining doubles on standard input, as an array
   * @throws InputMismatchException if any token cannot be parsed as a `double`
   */
  public static readAllDoubles(): number[] {
    return StdIn.readAllInts();
  }

  /**
   * Reads all remaining tokens, parses them as integers, and returns
   * them as an array of integers.
   * @return  all remaining integers, as an array
   * @throws InputMismatchException if any token cannot be parsed as an `int`
   * @deprecated Replaced by {@link #readAllInts()}.
   */
  public static readInts(): number[] {
    return StdIn.readAllInts();
  }

  /**
   * Reads all remaining tokens, parses them as doubles, and returns
   * them as an array of doubles.
   * @return  all remaining doubles, as an array
   * @throws InputMismatchException if any token cannot be parsed as a `double`
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
}
