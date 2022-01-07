import type { IVector } from "./IVector";

export class Vector2 implements IVector {
  /** @internal */
  private _x: number;

  /** @internal */
  private _y: number;

  public readonly dimension: 2 = 2;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  /**
   * Creates a new vector and adds up the given vector values.
   */
  public plus(...v: Array<Vector2>): Vector2 {
    let x = 0;
    let y = 0;

    for (const el of v) {
      x += el.x;
      y += el.y;
    }

    return new Vector2(this._x + x, this._y + y);
  }

  /**
   * Adds up the given vector values to this vector.
   */
  public add(...v: Array<Vector2>): Vector2 {
    for (const el of v) {
      this._x += el.x;
      this._y += el.y;
    }

    return this;
  }

  /**
   * Creates a new vector from this vector and subtracts all the given vector values.
   */
  public minus(...v: Array<Vector2>): Vector2 {
    let x = 0;
    let y = 0;

    for (const el of v) {
      x += el.x;
      y += el.y;
    }

    return new Vector2(this._x - x, this._y - y);
  }

  /**
   * Subtracts all the given vector values from this vector.
   */
  public subtract(...v: Array<Vector2>): Vector2 {
    for (const el of v) {
      this._x -= el.x;
      this._y -= el.y;
    }

    return this;
  }

  /**
   * Multiplies this vector by the given scalar.
   */
  public multiply(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      this._x *= scalar;
      this._y *= scalar;
    } else {
      this._x *= scalar.x;
      this._y *= scalar.y;
    }

    return this;
  }

  /**
   * Divides this vector by the given scalar.
   */
  public divide(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      this._x /= scalar;
      this._y /= scalar;
    } else {
      this._x /= scalar.x;
      this._y /= scalar.y;
    }

    return this;
  }

  /**
   * Check against another vector for equality, within specified error limits.
   * @param v The vector to check against.
   * @param tolerance Error tolerance.
   * @returns true if the vectors are equal within tolerance limits, false otherwise.
   */
  public equals(v: Vector2, tolerance?: number): boolean {
    if (tolerance) {
      return (
        Math.abs(this._x - v.x) <= tolerance &&
        Math.abs(this._y - v.y) <= tolerance
      );
    } else {
      return this._x === v.x && this._y === v.y;
    }
  }

  /**
   * @returns The length of this vector.
   */
  public length(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  /**
   * @returns the dot product of this and another vector.
   */
  public dot(v: Vector2): number {
    return this._x * v.x + this._y * v.y;
  }

  /**
   * @returns the dot product of two vectors.
   */
  public static dotProduct(a: Vector2, b: Vector2): number {
    return a.dot(b);
  }

  /**
   * @returns a normalized unit copy of the vector, ensuring it is safe to do so based on the length. Returns zero vector if vector length is too small to safely normalize.
   */
  public normalize(): Vector2 {
    const length = this.length();

    if (length === 0) {
      return new Vector2(0, 0);
    }

    return new Vector2(this._x / length, this._y / length);
  }

  /**
   * @returns a string representation of this vector.
   */
  public toString(): string {
    return `(${this._x}, ${this._y})`;
  }

  /**
   * @returns an array representation of this vector.
   */
  public toArray(): [number, number] {
    return [this._x, this._y];
  }
}
