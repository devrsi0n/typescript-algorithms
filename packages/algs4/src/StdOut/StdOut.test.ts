import StdOut from './index';

let originalLog: any;
let originalWarn: any;
let originalError: any;

beforeAll(() => {
  originalLog = global.console.log;
  originalWarn = global.console.warn;
  originalError = global.console.error;

  global.console.log = jest.fn();
  global.console.warn = jest.fn();
  global.console.error = jest.fn();
});

afterAll(() => {
  global.console.log = originalLog;
  global.console.warn = originalWarn;
  global.console.error = originalError;
});

test('printf', () => {
  StdOut.printf('%10d', 123);
  expect(global.console.log).toHaveBeenCalledWith('       123');
  StdOut.printf('%*s', 'foo', 4);
  expect(global.console.log).toHaveBeenCalledWith(' foo');
  StdOut.printf('%*.*f', 3.14159265, 10, 2);
  expect(global.console.log).toHaveBeenCalledWith('      3.14');
  StdOut.printf('%0*.*f', 3.14159265, 10, 3);
  expect(global.console.log).toHaveBeenCalledWith('000003.142');
});
