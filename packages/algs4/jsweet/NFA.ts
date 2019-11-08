import { Digraph } from './Digraph';
import { Stack } from './Stack';
import { DirectedDFS } from './DirectedDFS';
import { Bag } from './Bag';
import { StdOut } from './StdOut';

/**
 * Initializes the NFA from the specified regular expression.
 *
 * @param  {string} regexp the regular expression
 * @class
 * @author Robert Sedgewick
 */
export class NFA {
  private graph: Digraph;

  private regexp: string;

  private m: number;

  public constructor(regexp: string) {
    if (this.graph === undefined) this.graph = null;
    if (this.regexp === undefined) this.regexp = null;
    if (this.m === undefined) this.m = 0;
    this.regexp = regexp;
    this.m = regexp.length;
    const ops: Stack<number> = <any>new Stack<number>();
    this.graph = new Digraph(this.m + 1);
    for (let i = 0; i < this.m; i++) {
      {
        let lp: number = i;
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == '('.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == '|'.charCodeAt(0)
        )
          ops.push(i);
        else if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == ')'.charCodeAt(0)
        ) {
          const or: number = ops.pop();
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              regexp.charAt(or)
            ) == '|'.charCodeAt(0)
          ) {
            lp = ops.pop();
            this.graph.addEdge(lp, or + 1);
            this.graph.addEdge(or, i);
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              regexp.charAt(or)
            ) == '('.charCodeAt(0)
          )
            lp = or;
          else;
        }
        if (
          i < this.m - 1 &&
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i + 1)
          ) == '*'.charCodeAt(0)
        ) {
          this.graph.addEdge(lp, i + 1);
          this.graph.addEdge(i + 1, lp);
        }
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == '('.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == '*'.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            regexp.charAt(i)
          ) == ')'.charCodeAt(0)
        )
          this.graph.addEdge(i, i + 1);
      }
    }
    if (ops.size() !== 0) throw new Error('Invalid regular expression');
  }

  /**
   * Returns true if the text is matched by the regular expression.
   *
   * @param  {string} txt the text
   * @return  {@code true} if the text is matched by the regular expression,
   * {@code false} otherwise
   */
  public recognizes(txt: string): boolean {
    let dfs: DirectedDFS = new DirectedDFS(this.graph, 0);
    let pc: Bag<number> = <any>new Bag<number>();
    for (let v = 0; v < this.graph.V(); v++) {
      if (dfs.marked(v)) pc.add(v);
    }
    for (let i = 0; i < txt.length; i++) {
      {
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            txt.charAt(i)
          ) == '*'.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            txt.charAt(i)
          ) == '|'.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            txt.charAt(i)
          ) == '('.charCodeAt(0) ||
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            txt.charAt(i)
          ) == ')'.charCodeAt(0)
        )
          throw new Error(`text contains the metacharacter '${txt.charAt(i)}'`);
        const match: Bag<number> = <any>new Bag<number>();
        for (let index319 = pc.iterator(); index319.hasNext(); ) {
          const v = index319.next();
          {
            if (v === this.m) continue;
            if (
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                this.regexp.charAt(v)
              ) ==
                (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                  txt.charAt(i)
                ) ||
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                this.regexp.charAt(v)
              ) == '.'.charCodeAt(0)
            )
              match.add(v + 1);
          }
        }
        dfs = new DirectedDFS(this.graph, match);
        pc = <any>new Bag<number>();
        for (let v = 0; v < this.graph.V(); v++) {
          if (dfs.marked(v)) pc.add(v);
        }
        if (pc.size() === 0) return false;
      }
    }
    for (let index320 = pc.iterator(); index320.hasNext(); ) {
      const v = index320.next();
      if (v === this.m) return true;
    }
    return false;
  }

  /**
   * Unit tests the {@code NFA} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const regexp = `(${args[0]})`;
    const txt: string = args[1];
    const nfa: NFA = new NFA(regexp);
    StdOut.println$boolean(nfa.recognizes(txt));
  }
}
NFA.__class = 'edu.princeton.cs.algs4.NFA';

NFA.main(null);
