import { StdRandom } from './StdRandom';
import { StdDraw } from './StdDraw';

/**
 * Initializes a particle with the specified position, velocity, radius, mass, and color.
 *
 * @param  {number} rx <em>x</em>-coordinate of position
 * @param  {number} ry <em>y</em>-coordinate of position
 * @param  {number} vx <em>x</em>-coordinate of velocity
 * @param  {number} vy <em>y</em>-coordinate of velocity
 * @param  {number} radius the radius
 * @param  {number} mass the mass
 * @param  {Color} color the color
 * @class
 * @author Robert Sedgewick
 */
export class Particle {
  static INFINITY: number;
  public static INFINITY_$LI$(): number {
    if (Particle.INFINITY == null)
      Particle.INFINITY = Number.POSITIVE_INFINITY;
    return Particle.INFINITY;
  }

  private rx: number;

  private ry: number;

  private vx: number;

  private vy: number;

  private __count: number;

  private radius: number;

  private mass: number;

  private color: Color;

  public constructor(
    rx?: any,
    ry?: any,
    vx?: any,
    vy?: any,
    radius?: any,
    mass?: any,
    color?: any
  ) {
    if (
      (typeof rx === 'number' || rx === null) &&
      (typeof ry === 'number' || ry === null) &&
      (typeof vx === 'number' || vx === null) &&
      (typeof vy === 'number' || vy === null) &&
      (typeof radius === 'number' || radius === null) &&
      (typeof mass === 'number' || mass === null) &&
      ((color != null && color instanceof <any>Color) || color === null)
    ) {
      const __args = arguments;
      if (this.rx === undefined) this.rx = 0;
      if (this.ry === undefined) this.ry = 0;
      if (this.vx === undefined) this.vx = 0;
      if (this.vy === undefined) this.vy = 0;
      if (this.__count === undefined) this.__count = 0;
      if (this.radius === undefined) this.radius = 0;
      if (this.mass === undefined) this.mass = 0;
      if (this.color === undefined) this.color = null;
      if (this.rx === undefined) this.rx = 0;
      if (this.ry === undefined) this.ry = 0;
      if (this.vx === undefined) this.vx = 0;
      if (this.vy === undefined) this.vy = 0;
      if (this.__count === undefined) this.__count = 0;
      if (this.radius === undefined) this.radius = 0;
      if (this.mass === undefined) this.mass = 0;
      if (this.color === undefined) this.color = null;
      (() => {
        this.vx = vx;
        this.vy = vy;
        this.rx = rx;
        this.ry = ry;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
      })();
    } else if (
      rx === undefined &&
      ry === undefined &&
      vx === undefined &&
      vy === undefined &&
      radius === undefined &&
      mass === undefined &&
      color === undefined
    ) {
      const __args = arguments;
      if (this.rx === undefined) this.rx = 0;
      if (this.ry === undefined) this.ry = 0;
      if (this.vx === undefined) this.vx = 0;
      if (this.vy === undefined) this.vy = 0;
      if (this.__count === undefined) this.__count = 0;
      if (this.radius === undefined) this.radius = 0;
      if (this.mass === undefined) this.mass = 0;
      if (this.color === undefined) this.color = null;
      if (this.rx === undefined) this.rx = 0;
      if (this.ry === undefined) this.ry = 0;
      if (this.vx === undefined) this.vx = 0;
      if (this.vy === undefined) this.vy = 0;
      if (this.__count === undefined) this.__count = 0;
      if (this.radius === undefined) this.radius = 0;
      if (this.mass === undefined) this.mass = 0;
      if (this.color === undefined) this.color = null;
      (() => {
        this.rx = StdRandom.uniform$double$double(0.0, 1.0);
        this.ry = StdRandom.uniform$double$double(0.0, 1.0);
        this.vx = StdRandom.uniform$double$double(-0.005, 0.005);
        this.vy = StdRandom.uniform$double$double(-0.005, 0.005);
        this.radius = 0.02;
        this.mass = 0.5;
        this.color = Color.BLACK;
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Moves this particle in a straight line (based on its velocity)
   * for the specified amount of time.
   *
   * @param  {number} dt the amount of time
   */
  public move(dt: number) {
    this.rx += this.vx * dt;
    this.ry += this.vy * dt;
  }

  /**
   * Draws this particle to standard draw.
   */
  public draw() {
    StdDraw.setPenColor$java_awt_Color(this.color);
    StdDraw.filledCircle(this.rx, this.ry, this.radius);
  }

  /**
   * Returns the number of collisions involving this particle with
   * vertical walls, horizontal walls, or other particles.
   * This is equal to the number of calls to {@link #bounceOff},
   * {@link #bounceOffVerticalWall}, and
   * {@link #bounceOffHorizontalWall}.
   *
   * @return  the number of collisions involving this particle with
   * vertical walls, horizontal walls, or other particles
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Returns the amount of time for this particle to collide with the specified
   * particle, assuming no interening collisions.
   *
   * @param  {Particle} that the other particle
   * @return  the amount of time for this particle to collide with the specified
   * particle, assuming no interening collisions;
   * {@code Double.POSITIVE_INFINITY} if the particles will not collide
   */
  public timeToHit(that: Particle): number {
    if (this === that) return Particle.INFINITY_$LI$();
    const dx: number = that.rx - this.rx;
    const dy: number = that.ry - this.ry;
    const dvx: number = that.vx - this.vx;
    const dvy: number = that.vy - this.vy;
    const dvdr: number = dx * dvx + dy * dvy;
    if (dvdr > 0) return Particle.INFINITY_$LI$();
    const dvdv: number = dvx * dvx + dvy * dvy;
    if (dvdv === 0) return Particle.INFINITY_$LI$();
    const drdr: number = dx * dx + dy * dy;
    const sigma: number = this.radius + that.radius;
    const d: number = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
    if (d < 0) return Particle.INFINITY_$LI$();
    return -(dvdr + Math.sqrt(d)) / dvdv;
  }

  /**
   * Returns the amount of time for this particle to collide with a vertical
   * wall, assuming no interening collisions.
   *
   * @return  the amount of time for this particle to collide with a vertical wall,
   * assuming no interening collisions;
   * {@code Double.POSITIVE_INFINITY} if the particle will not collide
   * with a vertical wall
   */
  public timeToHitVerticalWall(): number {
    if (this.vx > 0) return (1.0 - this.rx - this.radius) / this.vx;
    if (this.vx < 0) return (this.radius - this.rx) / this.vx;
    return Particle.INFINITY_$LI$();
  }

  /**
   * Returns the amount of time for this particle to collide with a horizontal
   * wall, assuming no interening collisions.
   *
   * @return  the amount of time for this particle to collide with a horizontal wall,
   * assuming no interening collisions;
   * {@code Double.POSITIVE_INFINITY} if the particle will not collide
   * with a horizontal wall
   */
  public timeToHitHorizontalWall(): number {
    if (this.vy > 0) return (1.0 - this.ry - this.radius) / this.vy;
    if (this.vy < 0) return (this.radius - this.ry) / this.vy;
    return Particle.INFINITY_$LI$();
  }

  /**
   * Updates the velocities of this particle and the specified particle according
   * to the laws of elastic collision. Assumes that the particles are colliding
   * at this instant.
   *
   * @param  {Particle} that the other particle
   */
  public bounceOff(that: Particle) {
    const dx: number = that.rx - this.rx;
    const dy: number = that.ry - this.ry;
    const dvx: number = that.vx - this.vx;
    const dvy: number = that.vy - this.vy;
    const dvdr: number = dx * dvx + dy * dvy;
    const dist: number = this.radius + that.radius;
    const magnitude: number =
      (2 * this.mass * that.mass * dvdr) / ((this.mass + that.mass) * dist);
    const fx: number = (magnitude * dx) / dist;
    const fy: number = (magnitude * dy) / dist;
    this.vx += fx / this.mass;
    this.vy += fy / this.mass;
    that.vx -= fx / that.mass;
    that.vy -= fy / that.mass;
    this.__count++;
    that.__count++;
  }

  /**
   * Updates the velocity of this particle upon collision with a vertical
   * wall (by reflecting the velocity in the <em>x</em>-direction).
   * Assumes that the particle is colliding with a vertical wall at this instant.
   */
  public bounceOffVerticalWall() {
    this.vx = -this.vx;
    this.__count++;
  }

  /**
   * Updates the velocity of this particle upon collision with a horizontal
   * wall (by reflecting the velocity in the <em>y</em>-direction).
   * Assumes that the particle is colliding with a horizontal wall at this instant.
   */
  public bounceOffHorizontalWall() {
    this.vy = -this.vy;
    this.__count++;
  }

  /**
   * Returns the kinetic energy of this particle.
   * The kinetic energy is given by the formula 1/2 <em>m</em> <em>v</em><sup>2</sup>,
   * where <em>m</em> is the mass of this particle and <em>v</em> is its velocity.
   *
   * @return  the kinetic energy of this particle
   */
  public kineticEnergy(): number {
    return 0.5 * this.mass * (this.vx * this.vx + this.vy * this.vy);
  }
}
Particle.__class = 'edu.princeton.cs.algs4.Particle';

Particle.INFINITY_$LI$();
