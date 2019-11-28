/**
 * Initializes an output stream from a {@link OutputStream}.
 *
 * @param  {OutputStream} os the `OutputStream`
 * @class
 * @author Robert Sedgewick
 */
export class Out {
  static CHARSET_NAME = 'UTF-8';

  static LOCALE: Locale;
  public static LOCALE_$LI$(): Locale {
    if (Out.LOCALE == null) Out.LOCALE = Locale.US;
    return Out.LOCALE;
  }

  private out: PrintWriter;

  public constructor(os?: any) {
    if ((os != null && os instanceof <any>OutputStream) || os === null) {
      const __args = arguments;
      if (this.out === undefined) this.out = null;
      if (this.out === undefined) this.out = null;
      (() => {
        try {
          const osw: OutputStreamWriter = new OutputStreamWriter(
            os,
            Out.CHARSET_NAME
          );
          this.out = new PrintWriter(osw, true);
        } catch (e) {
          console.error(e.message, e);
        }
      })();
    } else if ((os != null && os instanceof <any>Socket) || os === null) {
      const __args = arguments;
      const socket: any = __args[0];
      if (this.out === undefined) this.out = null;
      if (this.out === undefined) this.out = null;
      (() => {
        try {
          const os: OutputStream = socket.getOutputStream();
          const osw: OutputStreamWriter = new OutputStreamWriter(
            os,
            Out.CHARSET_NAME
          );
          this.out = new PrintWriter(osw, true);
        } catch (e) {
          console.error(e.message, e);
        }
      })();
    } else if (typeof os === 'string' || os === null) {
      const __args = arguments;
      const filename: any = __args[0];
      if (this.out === undefined) this.out = null;
      if (this.out === undefined) this.out = null;
      (() => {
        try {
          const os: OutputStream = new FileOutputStream(filename);
          const osw: OutputStreamWriter = new OutputStreamWriter(
            os,
            Out.CHARSET_NAME
          );
          this.out = new PrintWriter(osw, true);
        } catch (e) {
          console.error(e.message, e);
        }
      })();
    } else if (os === undefined) {
      const __args = arguments;
      {
        const __args = arguments;
        const os: any = java.lang.System.out;
        if (this.out === undefined) this.out = null;
        if (this.out === undefined) this.out = null;
        (() => {
          try {
            const osw: OutputStreamWriter = new OutputStreamWriter(
              os,
              Out.CHARSET_NAME
            );
            this.out = new PrintWriter(osw, true);
          } catch (e) {
            console.error(e.message, e);
          }
        })();
      }
    } else throw new Error('invalid overload');
  }

  /**
   * Closes the output stream.
   */
  public close() {
    this.out.close();
  }

  public println$() {
    this.out.println();
  }

  public println$java_lang_Object(x: any) {
    this.out.println(x);
  }

  public println$boolean(x: boolean) {
    this.out.println(x);
  }

  /**
   * Prints a boolean to this output stream and then terminates the line.
   *
   * @param  x the boolean to print
   */
  public println(x?: any): any {
    if (typeof x === 'boolean' || x === null) {
      return <any>this.println$boolean(x);
    }
    if (typeof x === 'string' || x === null) {
      return <any>this.println$char(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.println$byte(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.println$int(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.println$long(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.println$float(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.println$double(x);
    }
    if (x != null || x === null) {
      return <any>this.println$java_lang_Object(x);
    }
    if (x === undefined) {
      return <any>this.println$();
    }
    throw new Error('invalid overload');
  }

  public println$char(x: string) {
    this.out.println(x);
  }

  public println$double(x: number) {
    this.out.println(x);
  }

  public println$float(x: number) {
    this.out.println(x);
  }

  public println$int(x: number) {
    this.out.println(x);
  }

  public println$long(x: number) {
    this.out.println(x);
  }

  public println$byte(x: number) {
    this.out.println(x);
  }

  public print$() {
    this.out.flush();
  }

  public print$java_lang_Object(x: any) {
    this.out.print(x);
    this.out.flush();
  }

  public print$boolean(x: boolean) {
    this.out.print(x);
    this.out.flush();
  }

  /**
   * Prints a boolean to this output stream and flushes this output stream.
   *
   * @param  x the boolean to print
   */
  public print(x?: any): any {
    if (typeof x === 'boolean' || x === null) {
      return <any>this.print$boolean(x);
    }
    if (typeof x === 'string' || x === null) {
      return <any>this.print$char(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.print$byte(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.print$int(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.print$long(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.print$float(x);
    }
    if (typeof x === 'number' || x === null) {
      return <any>this.print$double(x);
    }
    if (x != null || x === null) {
      return <any>this.print$java_lang_Object(x);
    }
    if (x === undefined) {
      return <any>this.print$();
    }
    throw new Error('invalid overload');
  }

  public print$char(x: string) {
    this.out.print(x);
    this.out.flush();
  }

  public print$double(x: number) {
    this.out.print(x);
    this.out.flush();
  }

  public print$float(x: number) {
    this.out.print(x);
    this.out.flush();
  }

  public print$int(x: number) {
    this.out.print(x);
    this.out.flush();
  }

  public print$long(x: number) {
    this.out.print(x);
    this.out.flush();
  }

  public print$byte(x: number) {
    this.out.print(x);
    this.out.flush();
  }

  public printf$java_lang_String$java_lang_Object_A(
    format: string,
    ...args: any[]
  ) {
    ((o) => o.printf.apply(o, [Out.LOCALE_$LI$(), format].concat(<any[]>args)))(
      this.out
    );
    this.out.flush();
  }

  public printf$java_util_Locale$java_lang_String$java_lang_Object_A(
    locale: Locale,
    format: string,
    ...args: any[]
  ) {
    ((o) => o.printf.apply(o, [locale, format].concat(<any[]>args)))(this.out);
    this.out.flush();
  }

  /**
   * Prints a formatted string to this output stream, using the specified
   * locale, format string, and arguments, and then flushes this output stream.
   *
   * @param {Locale} locale the locale
   * @param  format the format string
   * @param  args   the arguments accompanying the format string
   */
  public printf(locale?: any, format?: any, ...args: any[]): any {
    if (
      ((locale != null && locale instanceof <any>Locale) || locale === null) &&
      (typeof format === 'string' || format === null) &&
      ((args != null &&
        args instanceof <any>Array &&
        (args.length == 0 || args[0] == null || args[0] != null)) ||
        args === null)
    ) {
      return <any>(
        this.printf$java_util_Locale$java_lang_String$java_lang_Object_A(
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
        this.printf$java_lang_String$java_lang_Object_A(locale, format)
      );
    }
    throw new Error('invalid overload');
  }

  /**
   * A test client.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    let out: Out;
    out = new Out();
    out.println$java_lang_Object('Test 1');
    out.close();
    out = new Out('test.txt');
    out.println$java_lang_Object('Test 2');
    out.close();
  }
}
Out.__class = 'edu.princeton.cs.algs4.Out';

Out.LOCALE_$LI$();

Out.main(null);
