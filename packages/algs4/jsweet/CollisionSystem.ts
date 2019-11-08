import { MinPQ } from './MinPQ';
import { Particle } from './Particle';
import { StdDraw } from './StdDraw';
import { StdIn } from './StdIn';

/**
 * Initializes a system with the specified collection of particles.
 * The individual particles will be mutated during the simulation.
 *
 * @param   particles the array of particles
 * @class
 * @author Robert Sedgewick
 */
export class CollisionSystem {
  static HZ = 0.5;

  private pq: MinPQ<CollisionSystem.Event>;

  private t = 0.0;

  private particles: Particle[];

  public constructor(particles: Particle[]) {
    if (this.pq === undefined) this.pq = null;
    if (this.particles === undefined) this.particles = null;
    this.particles = /* clone */ ((o: any) => {
      if (o.clone != undefined) {
        return (<any>o).clone();
      }
      const clone = Object.create(o);
      for (const p in o) {
        if (o.hasOwnProperty(p)) clone[p] = o[p];
      }
      return clone;
    })(particles);
  }

  predict(a: Particle, limit: number) {
    if (a == null) return;
    for (let i = 0; i < this.particles.length; i++) {
      {
        const dt: number = a.timeToHit(this.particles[i]);
        if (this.t + dt <= limit)
          this.pq.insert(
            new CollisionSystem.Event(this.t + dt, a, this.particles[i])
          );
      }
    }
    const dtX: number = a.timeToHitVerticalWall();
    const dtY: number = a.timeToHitHorizontalWall();
    if (this.t + dtX <= limit)
      this.pq.insert(new CollisionSystem.Event(this.t + dtX, a, null));
    if (this.t + dtY <= limit)
      this.pq.insert(new CollisionSystem.Event(this.t + dtY, null, a));
  }

  redraw(limit: number) {
    StdDraw.clear();
    for (let i = 0; i < this.particles.length; i++) {
      {
        this.particles[i].draw();
      }
    }
    StdDraw.show();
    StdDraw.pause(20);
    if (this.t < limit) {
      this.pq.insert(
        new CollisionSystem.Event(this.t + 1.0 / CollisionSystem.HZ, null, null)
      );
    }
  }

  /**
   * Simulates the system of particles for the specified amount of time.
   *
   * @param   limit the amount of time
   */
  public simulate(limit: number) {
    this.pq = <any>new MinPQ<CollisionSystem.Event>();
    for (let i = 0; i < this.particles.length; i++) {
      {
        this.predict(this.particles[i], limit);
      }
    }
    this.pq.insert(new CollisionSystem.Event(0, null, null));
    while (!this.pq.isEmpty()) {
      {
        const e: CollisionSystem.Event = this.pq.delMin();
        if (!e.isValid()) continue;
        const { a } = e;
        const { b } = e;
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].move(e.time - this.t);
        }
        this.t = e.time;
        if (a != null && b != null) a.bounceOff(b);
        else if (a != null && b == null) a.bounceOffVerticalWall();
        else if (a == null && b != null) b.bounceOffHorizontalWall();
        else if (a == null && b == null) this.redraw(limit);
        this.predict(a, limit);
        this.predict(b, limit);
      }
    }
  }

  /**
   * Unit tests the {@code CollisionSystem} data type.
   * Reads in the particle collision system from a standard input
   * (or generates {@code N} random particles if a command-line integer
   * is specified); simulates the system.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    StdDraw.setCanvasSize$int$int(600, 600);
    StdDraw.enableDoubleBuffering();
    let particles: Particle[];
    if (args.length === 1) {
      const n: number = parseInt(args[0]);
      particles = (s => {
        const a = [];
        while (s-- > 0) a.push(null);
        return a;
      })(n);
      for (let i = 0; i < n; i++) {
        particles[i] = new Particle();
      }
    } else {
      const n: number = StdIn.readInt();
      particles = (s => {
        const a = [];
        while (s-- > 0) a.push(null);
        return a;
      })(n);
      for (let i = 0; i < n; i++) {
        {
          const rx: number = StdIn.readDouble();
          const ry: number = StdIn.readDouble();
          const vx: number = StdIn.readDouble();
          const vy: number = StdIn.readDouble();
          const radius: number = StdIn.readDouble();
          const mass: number = StdIn.readDouble();
          const r: number = StdIn.readInt();
          const g: number = StdIn.readInt();
          const b: number = StdIn.readInt();
          const color: Color = new Color(r, g, b);
          particles[i] = new Particle(rx, ry, vx, vy, radius, mass, color);
        }
      }
    }
    const system: CollisionSystem = new CollisionSystem(particles);
    system.simulate(10000);
  }
}
CollisionSystem.__class = 'edu.princeton.cs.algs4.CollisionSystem';

export namespace CollisionSystem {
  /**
   * An event during a particle collision simulation. Each event contains
   * the time at which it will occur (assuming no supervening actions)
   * and the particles a and b involved.
   *
   * -  a and b both null:      redraw event
   * -  a null, b not null:     collision with vertical wall
   * -  a not null, b null:     collision with horizontal wall
   * -  a and b both not null:  binary collision between a and b
   * @param  t
   * @param {Particle} a
   * @param {Particle} b
   * @class
   */
  export class Event implements java.lang.Comparable<CollisionSystem.Event> {
    time: number;

    a: Particle;

    b: Particle;

    countA: number;

    countB: number;

    public constructor(t: number, a: Particle, b: Particle) {
      if (this.time === undefined) this.time = 0;
      if (this.a === undefined) this.a = null;
      if (this.b === undefined) this.b = null;
      if (this.countA === undefined) this.countA = 0;
      if (this.countB === undefined) this.countB = 0;
      this.time = t;
      this.a = a;
      this.b = b;
      if (a != null) this.countA = a.count();
      else this.countA = -1;
      if (b != null) this.countB = b.count();
      else this.countB = -1;
    }

    public compareTo(that: CollisionSystem.Event): number {
      return /* compare */ this.time - that.time;
    }

    public isValid(): boolean {
      if (this.a != null && this.a.count() !== this.countA) return false;
      if (this.b != null && this.b.count() !== this.countB) return false;
      return true;
    }
  }
  Event.__class = 'edu.princeton.cs.algs4.CollisionSystem.Event';
  Event.__interfaces = ['java.lang.Comparable'];
}

CollisionSystem.main(null);
