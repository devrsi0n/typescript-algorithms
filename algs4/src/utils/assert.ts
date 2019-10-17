export default function assert(x: boolean, message: string) {
  if (!x) {
    throw new Error(message);
  }
}
