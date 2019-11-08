/**
 * <i>Standard audio</i>. This class provides a basic capability for
 * creating, reading, and saving audio.
 * <p>
 * The audio format uses a sampling rate of 44,100 Hz, 16-bit, monaural.
 *
 * <p>
 * For additional documentation, see <a href="https://introcs.cs.princeton.edu/15inout">Section 1.5</a> of
 * <i>Computer Science: An Interdisciplinary Approach</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class StdAudio {
  static __static_initialized = false;
  static __static_initialize() {
    if (!StdAudio.__static_initialized) {
      StdAudio.__static_initialized = true;
      StdAudio.__static_initializer_0();
    }
  }

  /**
   * The sample rate: 44,100 Hz for CD quality audio.
   */
  public static SAMPLE_RATE = 44100;

  static BYTES_PER_SAMPLE = 2;

  static BITS_PER_SAMPLE = 16;

  static MAX_16_BIT = 32768;

  static SAMPLE_BUFFER_SIZE = 4096;

  static MONO = 1;

  static STEREO = 2;

  static LITTLE_ENDIAN = false;

  static BIG_ENDIAN = true;

  static SIGNED = true;

  static UNSIGNED = false;

  static line: SourceDataLine;
  public static line_$LI$(): SourceDataLine {
    StdAudio.__static_initialize();
    return StdAudio.line;
  }

  static buffer: number[];
  public static buffer_$LI$(): number[] {
    StdAudio.__static_initialize();
    return StdAudio.buffer;
  }

  static bufferSize = 0;



  static __static_initializer_0() {
    StdAudio.init();
  }

  private static init() {
    try {
      const format: AudioFormat = new AudioFormat(
        <number>StdAudio.SAMPLE_RATE,
        StdAudio.BITS_PER_SAMPLE,
        StdAudio.MONO,
        StdAudio.SIGNED,
        StdAudio.LITTLE_ENDIAN
      );
      const info: DataLine.Info = new DataLine.Info(
        'javax.sound.sampled.SourceDataLine',
        format
      );
      StdAudio.line = <SourceDataLine>(<any>AudioSystem.getLine(info));
      StdAudio.line_$LI$().open(
        format,
        StdAudio.SAMPLE_BUFFER_SIZE * StdAudio.BYTES_PER_SAMPLE
      );
      StdAudio.buffer = (s => {
        const a = [];
        while (s-- > 0) a.push(0);
        return a;
      })(((StdAudio.SAMPLE_BUFFER_SIZE * StdAudio.BYTES_PER_SAMPLE) / 3) | 0);
    } catch (e) {
      console.info(e.message);
    }
    StdAudio.line_$LI$().start();
  }

  private static getAudioInputStreamFromFile(
    filename: string
  ): AudioInputStream {
    if (filename == null) {
      throw new Error('filename is null');
    }
    try {
      const file: File = new File(filename);
      if (file.exists()) {
        return AudioSystem.getAudioInputStream(file);
      }
      const is1: InputStream = StdAudio.getResourceAsStream(filename);
      if (is1 != null) {
        return AudioSystem.getAudioInputStream(is1);
      }
      const is2: InputStream = StdAudio.getClassLoader().getResourceAsStream(
        filename
      );
      if (is2 != null) {
        return AudioSystem.getAudioInputStream(is2);
      }
      throw new Error(`could not read '${filename}'`);
    } catch (__e) {
      if (__e != null && __e instanceof <any>IOException) {
        const e: IOException = <IOException>__e;
        throw new Error(`could not read '${filename}'`, e);
      }
      if (__e != null && __e instanceof <any>UnsupportedAudioFileException) {
        const e: UnsupportedAudioFileException = <
          UnsupportedAudioFileException
        >__e;
        throw new Error(`file of unsupported audio format: '${filename}'`, e);
      }
    }
  }

  /**
   * Closes standard audio.
   */
  public static close() {
    StdAudio.line_$LI$().drain();
    StdAudio.line_$LI$().stop();
  }

  public static play$double(sample: number) {
    if (/* isNaN */ isNaN(sample)) throw new Error('sample is NaN');
    if (sample < -1.0) sample = -1.0;
    if (sample > +1.0) sample = +1.0;
    let s: number = (<number>(StdAudio.MAX_16_BIT * sample)) | 0;
    if (sample === 1.0) s = Number.MAX_VALUE;
    StdAudio.buffer_$LI$()[StdAudio.bufferSize++] = (<number>s) | 0;
    StdAudio.buffer_$LI$()[StdAudio.bufferSize++] = (<number>(s >> 8)) | 0;
    if (StdAudio.bufferSize >= StdAudio.buffer_$LI$().length) {
      StdAudio.line_$LI$().write(
        StdAudio.buffer_$LI$(),
        0,
        StdAudio.buffer_$LI$().length
      );
      StdAudio.bufferSize = 0;
    }
  }

  public static play$double_A(samples: number[]) {
    if (samples == null) throw new Error('argument to play() is null');
    for (let i = 0; i < samples.length; i++) {
      {
        StdAudio.play$double(samples[i]);
      }
    }
  }

  /**
   * Writes the array of samples (between -1.0 and +1.0) to standard audio.
   * If a sample is outside the range, it will be clipped.
   *
   * @param  {Array} samples the array of samples to play
   * @throws IllegalArgumentException if any sample is {@code Double.NaN}
   * @throws IllegalArgumentException if {@code samples} is {@code null}
   */
  public static play(samples?: any): any {
    if (
      (samples != null &&
        samples instanceof <any>Array &&
        (samples.length == 0 ||
          samples[0] == null ||
          typeof samples[0] === 'number')) ||
      samples === null
    ) {
      return <any>StdAudio.play$double_A(samples);
    }
    if (typeof samples === 'string' || samples === null) {
      return <any>StdAudio.play$java_lang_String(samples);
    }
    if (typeof samples === 'number' || samples === null) {
      return <any>StdAudio.play$double(samples);
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads audio samples from a file (in .wav or .au format) and returns
   * them as a double array with values between -1.0 and +1.0.
   * The audio file must be 16-bit with a sampling rate of 44,100.
   * It can be mono or stereo.
   *
   * @param  {string} filename the name of the audio file
   * @return  the array of samples
   */
  public static read(filename: string): number[] {
    const ais: AudioInputStream = StdAudio.getAudioInputStreamFromFile(
      filename
    );
    const audioFormat: AudioFormat = ais.getFormat();
    if (audioFormat.getSampleRate() !== StdAudio.SAMPLE_RATE) {
      throw new Error(
        `StdAudio.read() currently supports only a sample rate of ${StdAudio.SAMPLE_RATE} Hz\naudio format: ${audioFormat}`
      );
    }
    if (audioFormat.getSampleSizeInBits() !== StdAudio.BITS_PER_SAMPLE) {
      throw new Error(
        `StdAudio.read() currently supports only ${StdAudio.BITS_PER_SAMPLE}-bit audio\naudio format: ${audioFormat}`
      );
    }
    if (audioFormat.isBigEndian()) {
      throw new Error(
        `StdAudio.read() currently supports only audio stored using little endian\naudio format: ${audioFormat}`
      );
    }
    let bytes: number[] = null;
    try {
      const bytesToRead: number = ais.available();
      bytes = (s => {
        const a = [];
        while (s-- > 0) a.push(0);
        return a;
      })(bytesToRead);
      const bytesRead: number = ais.read(bytes);
      if (bytesToRead !== bytesRead) {
        throw new java.lang.IllegalStateException(
          `read only ${bytesRead} of ${bytesToRead} bytes`
        );
      }
    } catch (ioe) {
      throw new Error(`could not read '${filename}'`, ioe);
    }
    const n: number = bytes.length;
    if (audioFormat.getChannels() === StdAudio.MONO) {
      const data: number[] = (s => {
        const a = [];
        while (s-- > 0) a.push(0);
        return a;
      })((n / 2) | 0);
      for (let i = 0; i < ((n / 2) | 0); i++) {
        {
          data[i] =
            ((<number>(
              (((bytes[2 * i + 1] & 255) << 8) | (bytes[2 * i] & 255))
            )) |
              0) /
            <number>StdAudio.MAX_16_BIT;
        }
      }
      return data;
    }
    if (audioFormat.getChannels() === StdAudio.STEREO) {
      const data: number[] = (s => {
        const a = [];
        while (s-- > 0) a.push(0);
        return a;
      })((n / 4) | 0);
      for (let i = 0; i < ((n / 4) | 0); i++) {
        {
          const left: number =
            ((<number>(
              (((bytes[4 * i + 1] & 255) << 8) | (bytes[4 * i + 0] & 255))
            )) |
              0) /
            <number>StdAudio.MAX_16_BIT;
          const right: number =
            ((<number>(
              (((bytes[4 * i + 3] & 255) << 8) | (bytes[4 * i + 2] & 255))
            )) |
              0) /
            <number>StdAudio.MAX_16_BIT;
          data[i] = (left + right) / 2.0;
        }
      }
      return data;
    }
    throw new java.lang.IllegalStateException(
      'audio format is neither mono or stereo'
    );
  }

  /**
   * Saves the double array as an audio file (using .wav or .au format).
   *
   * @param  {string} filename the name of the audio file
   * @param  {Array} samples the array of samples
   * @throws IllegalArgumentException if unable to save {@code filename}
   * @throws IllegalArgumentException if {@code samples} is {@code null}
   * @throws IllegalArgumentException if {@code filename} is {@code null}
   * @throws IllegalArgumentException if {@code filename} extension is not {@code .wav}
   * or {@code .au}
   */
  public static save(filename: string, samples: number[]) {
    if (filename == null) {
      throw new Error('filenameis null');
    }
    if (samples == null) {
      throw new Error('samples[] is null');
    }
    const format: AudioFormat = new AudioFormat(
      StdAudio.SAMPLE_RATE,
      16,
      StdAudio.MONO,
      StdAudio.SIGNED,
      StdAudio.LITTLE_ENDIAN
    );
    const data: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(2 * samples.length);
    for (let i = 0; i < samples.length; i++) {
      {
        let temp: number = (<number>(samples[i] * StdAudio.MAX_16_BIT)) | 0;
        if (samples[i] === 1.0) temp = Number.MAX_VALUE;
        data[2 * i + 0] = (<number>temp) | 0;
        data[2 * i + 1] = (<number>(temp >> 8)) | 0;
      }
    }
    try {
      const bais: ByteArrayInputStream = new ByteArrayInputStream(data);
      const ais: AudioInputStream = new AudioInputStream(
        bais,
        format,
        samples.length
      );
      if (
        /* endsWith */ ((str, searchString) => {
          const pos = str.length - searchString.length;
          const lastIndex = str.indexOf(searchString, pos);
          return lastIndex !== -1 && lastIndex === pos;
        })(filename, '.wav') ||
        /* endsWith */ ((str, searchString) => {
          const pos = str.length - searchString.length;
          const lastIndex = str.indexOf(searchString, pos);
          return lastIndex !== -1 && lastIndex === pos;
        })(filename, '.WAV')
      ) {
        AudioSystem.write(ais, AudioFileFormat.Type.WAVE, new File(filename));
      } else if (
        /* endsWith */ ((str, searchString) => {
          const pos = str.length - searchString.length;
          const lastIndex = str.indexOf(searchString, pos);
          return lastIndex !== -1 && lastIndex === pos;
        })(filename, '.au') ||
        /* endsWith */ ((str, searchString) => {
          const pos = str.length - searchString.length;
          const lastIndex = str.indexOf(searchString, pos);
          return lastIndex !== -1 && lastIndex === pos;
        })(filename, '.AU')
      ) {
        AudioSystem.write(ais, AudioFileFormat.Type.AU, new File(filename));
      } else {
        throw new Error('file type for saving must be .wav or .au');
      }
    } catch (ioe) {
      throw new Error(`unable to save file '${filename}'`, ioe);
    }
  }

  public static play$java_lang_String(filename: string) {
    new java.lang.Thread(() => {
      const ais: AudioInputStream = StdAudio.getAudioInputStreamFromFile(
        filename
      );
      StdAudio.stream(ais);
    }).start();
  }

  private static stream(ais: AudioInputStream) {
    let line: SourceDataLine = null;
    const BUFFER_SIZE = 4096;
    try {
      const audioFormat: AudioFormat = ais.getFormat();
      const info: DataLine.Info = new DataLine.Info(
        'javax.sound.sampled.SourceDataLine',
        audioFormat
      );
      line = <SourceDataLine>(<any>AudioSystem.getLine(info));
      line.open(audioFormat);
      line.start();
      const samples: number[] = (s => {
        const a = [];
        while (s-- > 0) a.push(0);
        return a;
      })(BUFFER_SIZE);
      let count = 0;
      while ((count = ais.read(samples, 0, BUFFER_SIZE)) !== -1) {
        {
          line.write(samples, 0, count);
        }
      }
    } catch (__e) {
      if (__e != null && __e instanceof <any>IOException) {
        const e: IOException = <IOException>__e;
        console.error(e.message, e);
      }
      if (__e != null && __e instanceof <any>LineUnavailableException) {
        const e: LineUnavailableException = <LineUnavailableException>__e;
        console.error(e.message, e);
      }
    } finally {
      if (line != null) {
        line.drain();
        line.close();
      }
    }
  }

  /**
   * Loops an audio file (in .wav, .mid, or .au format) in a background thread.
   *
   * @param {string} filename the name of the audio file
   * @throws IllegalArgumentException if {@code filename} is {@code null}
   */
  public static loop(filename: string) {
    if (filename == null) throw new Error();
    const ais: AudioInputStream = StdAudio.getAudioInputStreamFromFile(
      filename
    );
    try {
      const clip: Clip = AudioSystem.getClip();
      clip.open(ais);
      clip.loop(Clip.LOOP_CONTINUOUSLY);
    } catch (__e) {
      if (__e != null && __e instanceof <any>LineUnavailableException) {
        const e: LineUnavailableException = <LineUnavailableException>__e;
        console.error(e.message, e);
      }
      if (__e != null && __e instanceof <any>IOException) {
        const e: IOException = <IOException>__e;
        console.error(e.message, e);
      }
    }
    new java.lang.Thread(() => {
      while (true) {
        {
          try {
            java.lang.Thread.sleep(1000);
          } catch (e) {
            console.error(e.message, e);
          }
        }
      }
    }).start();
  }

  /**
   * Unit tests {@code StdAudio}.
   * @param {number} hz
   * @param {number} duration
   * @param {number} amplitude
   * @return
   * @private
   */
  private static note(
    hz: number,
    duration: number,
    amplitude: number
  ): number[] {
    const n: number = (<number>(StdAudio.SAMPLE_RATE * duration)) | 0;
    const a: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n + 1);
    for (let i = 0; i <= n; i++) {
      a[i] =
        amplitude * Math.sin((2 * Math.PI * i * hz) / StdAudio.SAMPLE_RATE);
    }
    return a;
  }

  /**
   * Test client - play an A major scale to standard audio.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const freq = 440.0;
    for (let i = 0; i <= StdAudio.SAMPLE_RATE; i++) {
      {
        StdAudio.play$double(
          0.5 * Math.sin((2 * Math.PI * freq * i) / StdAudio.SAMPLE_RATE)
        );
      }
    }
    const steps: number[] = [0, 2, 4, 5, 7, 9, 11, 12];
    for (let i = 0; i < steps.length; i++) {
      {
        const hz: number = 440.0 * Math.pow(2, steps[i] / 12.0);
        StdAudio.play$double_A(StdAudio.note(hz, 1.0, 0.5));
      }
    }
    StdAudio.close();
  }
}
StdAudio.__class = 'edu.princeton.cs.algs4.StdAudio';

StdAudio.buffer_$LI$();

StdAudio.line_$LI$();

StdAudio.__static_initialize();

StdAudio.main(null);
