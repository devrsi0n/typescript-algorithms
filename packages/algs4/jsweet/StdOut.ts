/**
 * This class provides methods for printing strings and numbers to standard output.
 * <p>
 * <b>Getting started.</b>
 * To use this class, you must have `StdOut.class` in your
 * Java classpath. If you used our autoinstaller, you should be all set.
 * Otherwise, either download
 * <a href = "https://introcs.cs.princeton.edu/java/code/stdlib.jar">stdlib.jar</a>
 * and add to your Java classpath or download
 * <a href = "https://introcs.cs.princeton.edu/java/stdlib/StdOut.java">StdOut.java</a>
 * and put a copy in your working directory.
 * <p>
 * Here is an example program that uses `StdOut`:
 * <pre>
 * public class TestStdOut {
 * public static void main(String[] args) {
 * int a = 17;
 * int b = 23;
 * int sum = a + b;
 * StdOut.println("Hello, World");
 * StdOut.printf("%d + %d = %d\n", a, b, sum);
 * }
 * }
 * </pre>
 * <p>
 * <b>Differences with System.out.</b>
 * The behavior of `StdOut` is similar to that of {@link System#out},
 * but there are a few technical differences:
 * <ul>
 * <li> `StdOut` coerces the character-set encoding to UTF-8,
 * which is a standard character encoding for Unicode.
 * <li> `StdOut` coerces the locale to {@link Locale#US},
 * for consistency with {@link StdIn}, {@link Double#parseDouble(String)},
 * and floating-point literals.
 * <li> `StdOut` <em>flushes</em> standard output after each call to
 * `print()` so that text will appear immediately in the terminal.
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
export class StdOut {
  static __static_initialized = false;
  static __static_initialize() {
    if (!StdOut.__static_initialized) {
      StdOut.__static_initialized = true;
      StdOut.__static_initializer_0();
    }
  }

  static CHARSET_NAME = 'UTF-8';

  static LOCALE: Locale;
  public static LOCALE_$LI$(): Locale {
    StdOut.__static_initialize();
    if (StdOut.LOCALE == null) StdOut.LOCALE = Locale.US;
    return StdOut.LOCALE;
  }

  static out: PrintWriter;
  public static out_$LI$(): PrintWriter {
    StdOut.__static_initialize();
    return StdOut.out;
  }

  static __static_initializer_0() {
    try {
      StdOut.out = new PrintWriter(
        new OutputStreamWriter(java.lang.System.out, StdOut.CHARSET_NAME),
        true
      );
    } catch (e) {
      console.info(e);
    }
  }

  public static println$() {
    StdOut.out_$LI$().println();
  }

  public static println$java_lang_Object(x: any) {
    StdOut.out_$LI$().println(x);
  }

  public static println$boolean(x: boolean) {
    StdOut.out_$LI$().println(x);
  }

  /**
   * Prints a boolean to standard output and then terminates the line.
   *
   * @param  x the boolean to print
   */
  public static println(x?: any): any {
    if (typeof x === 'boolean' || x === null) {
      return <any>StdOut.println$boolean(x);
    }
    if (typeof x === 'string' || x === null) {
      return <any>StdOut.println$char(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$byte(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$short(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$int(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$long(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$float(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.println$double(x);
    }
    if (x != null || x === null) {
      return <any>StdOut.println$java_lang_Object(x);
    }
    if (x === undefined) {
      return <any>StdOut.println$();
    }
    throw new Error('invalid overload');
  }

  public static println$char(x: string) {
    StdOut.out_$LI$().println(x);
  }

  public static println$double(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static println$float(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static println$int(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static println$long(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static println$short(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static println$byte(x: number) {
    StdOut.out_$LI$().println(x);
  }

  public static print$() {
    StdOut.out_$LI$().flush();
  }

  public static print$java_lang_Object(x: any) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$boolean(x: boolean) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  /**
   * Prints a boolean to standard output and flushes standard output.
   *
   * @param  x the boolean to print
   */
  public static print(x?: any): any {
    if (typeof x === 'boolean' || x === null) {
      return <any>StdOut.print$boolean(x);
    }
    if (typeof x === 'string' || x === null) {
      return <any>StdOut.print$char(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$byte(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$short(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$int(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$long(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$float(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>StdOut.print$double(x);
    }
    if (x != null || x === null) {
      return <any>StdOut.print$java_lang_Object(x);
    }
    if (x === undefined) {
      return <any>StdOut.print$();
    }
    throw new Error('invalid overload');
  }

  public static print$char(x: string) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$double(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$float(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$int(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$long(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$short(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static print$byte(x: number) {
    StdOut.out_$LI$().print(x);
    StdOut.out_$LI$().flush();
  }

  public static printf$java_lang_String$java_lang_Object_A(
    format: string,
    ...args: any[]
  ) {
    ((o) =>
      o.printf.apply(o, [StdOut.LOCALE_$LI$(), format].concat(<any[]>args)))(
      StdOut.out_$LI$()
    );
    StdOut.out_$LI$().flush();
  }

  public static printf$java_util_Locale$java_lang_String$java_lang_Object_A(
    locale: Locale,
    format: string,
    ...args: any[]
  ) {
    ((o) => o.printf.apply(o, [locale, format].concat(<any[]>args)))(
      StdOut.out_$LI$()
    );
    StdOut.out_$LI$().flush();
  }

  /**
   * Prints a formatted string to standard output, using the locale and
   * the specified format string and arguments; then flushes standard output.
   *
   * @param {Locale} locale the locale
   * @param  format the <a href = "http://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax">format string</a>
   * @param  args   the arguments accompanying the format string
   */
  public static printf(locale?: any, format?: any, ...args: any[]): any {
    if (
      ((locale != null && locale instanceof <any>Locale) || locale === null) &&
      (typeof format === 'string' || format === null) &&
      ((args != null &&
        args instanceof <any>Array &&
        (args.length == 0 || args[0] == null || args[0] != null)) ||
        args === null)
    ) {
      return <any>(
        StdOut.printf$java_util_Locale$java_lang_String$java_lang_Object_A(
          locale,
          format,
          args
        )
      );
    }
    if (
      (typeof locale === 'string' || locale === null) &&
      ((format != null &&
        format instanceof <any>Array &&
        (format.length == 0 || format[0] == null || format[0] != null)) ||
        format === null) &&
      args === undefined
    ) {
      return <any>(
        StdOut.printf$java_lang_String$java_lang_Object_A(locale, format)
      );
    }
    throw new Error('invalid overload');
  }

  /**
   * Unit tests some of the methods in `StdOut`.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    StdOut.println$java_lang_Object('Test');
    StdOut.println$int(17);
    StdOut.println$boolean(true);
    StdOut.printf('%.6f\n', 1.0 / 7.0);
  }
}
StdOut.__class = 'edu.princeton.cs.algs4.StdOut';

StdOut.out_$LI$();

StdOut.LOCALE_$LI$();

StdOut.__static_initialize();

StdOut.main(null);
