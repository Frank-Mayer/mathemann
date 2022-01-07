import type { IVector } from "./IVector";

export class Vector2 implements IVector {
  public x: number;

  public y: number;

  public readonly dimension: 2 = 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a new 2d vector from this and adds up the given 2d vector value.
   */
  public plus(v: Vector2 | number): Vector2 {
    if (typeof v === "number") {
      return new Vector2(this.x + v, this.y + v);
    } else {
      return new Vector2(this.x + v.x, this.y + v.y);
    }
  }

  /**
   * Adds up the given 2d vector value to this 2d vector.
   */
  public add(v: Vector2 | number): Vector2 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
    } else {
      this.x += v.x;
      this.y += v.y;
    }

    return this;
  }

  /**
   * Creates a new 2d vector from this and subtracts the given 2d vector value.
   */
  public minus(v: Vector2 | number): Vector2 {
    if (typeof v === "number") {
      return new Vector2(this.x - v, this.y - v);
    } else {
      return new Vector2(this.x - v.x, this.y - v.y);
    }
  }

  /**
   * Subtracts all the given 2d vector values from this 2d vector.
   */
  public subtract(v: Vector2 | number): Vector2 {
    if (typeof v === "number") {
      this.x -= v;
      this.y -= v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
    }

    return this;
  }

  /**
   * Multiplies this 2d vector by the given scalar.
   */
  public multiply(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      this.x *= scalar;
      this.y *= scalar;
    } else {
      this.x *= scalar.x;
      this.y *= scalar.y;
    }

    return this;
  }

  /**
   * Creates a new 2d vector from this 2d vector and multiplies by the given value.
   */
  public multipliedBy(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      return new Vector2(this.x * scalar, this.y * scalar);
    } else {
      return new Vector2(this.x * scalar.x, this.y * scalar.y);
    }
  }

  /**
   * Divides this 2d vector by the given scalar.
   */
  public divide(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      this.x /= scalar;
      this.y /= scalar;
    } else {
      this.x /= scalar.x;
      this.y /= scalar.y;
    }

    return this;
  }

  /**
   * Creates a new 2d vector from this 2d vector and divides by the given value.
   */
  public dividedBy(scalar: Vector2 | number): Vector2 {
    if (typeof scalar === "number") {
      return new Vector2(this.x / scalar, this.y / scalar);
    } else {
      return new Vector2(this.x / scalar.x, this.y / scalar.y);
    }
  }

  /**
   * Check against another 2d vector for equality, within specified error limits.
   * @param v The 2d vector to check against.
   * @param tolerance Error tolerance.
   * @returns true if the 2d vectors are equal within tolerance limits, false otherwise.
   */
  public equals(v: Vector2, tolerance?: number): boolean {
    if (tolerance) {
      return (
        Math.abs(this.x - v.x) <= tolerance &&
        Math.abs(this.y - v.y) <= tolerance
      );
    } else {
      return this.x === v.x && this.y === v.y;
    }
  }

  /**
   * Creates a copy of this 2d vector.
   */
  public copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * @returns The length of this 2d vector.
   */
  public length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * @returns the dot product of this and another 2d vector.
   */
  public dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * @returns the cross product of this and another 2d vector.
   */
  public cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * @returns the dot product of two 2d vectors.
   */
  public static dotProduct(a: Vector2, b: Vector2): number {
    return a.dot(b);
  }

  /**
   * @returns a normalized unit copy of the 2d vector, ensuring it is safe to do so based on the length. Returns zero 2d vector if 2d vector length is too small to safely normalize.
   */
  public normalize(): Vector2 {
    const length = this.length();

    if (length === 0) {
      return new Vector2(0, 0);
    }

    return new Vector2(this.x / length, this.y / length);
  }

  /**
   * @returns a string representation of this 2d vector.
   */
  public toString(): string {
    return `(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
  }

  /**
   * @returns an array representation of this 2d vector.
   */
  public toArray(): [number, number] {
    return [this.x, this.y];
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
}
