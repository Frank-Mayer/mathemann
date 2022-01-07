import type { IVector } from "./IVector";

export class Vector3 implements IVector {
  /** @internal */
  protected _x: number;

  /** @internal */
  protected _y: number;

  /** @internal */
  protected _z: number;

  public readonly dimension: 3 = 3;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get z() {
    return this._z;
  }

  /**
   * Creates a new vector and adds up the given vector values.
   */
  public plus(...v: Array<Vector3>): Vector3 {
    let x = 0;
    let y = 0;
    let z = 0;

    for (const el of v) {
      x += el.x;
      y += el.y;
      z += el.z;
    }

    return new Vector3(this._x + x, this._y + y, this._z + z);
  }

  /**
   * Adds up the given vector values to this vector.
   */
  public add(...v: Array<Vector3>): Vector3 {
    for (const el of v) {
      this._x += el.x;
      this._y += el.y;
      this._z += el.z;
    }

    return this;
  }

  /**
   * Creates a new vector from this vector and subtracts all the given vector values.
   */
  public minus(...v: Array<Vector3>): Vector3 {
    let x = 0;
    let y = 0;
    let z = 0;

    for (const el of v) {
      x += el.x;
      y += el.y;
      z += el.z;
    }

    return new Vector3(this._x - x, this._y - y, this._z - z);
  }

  /**
   * Subtracts all the given vector values from this vector.
   */
  public subtract(...v: Array<Vector3>): Vector3 {
    for (const el of v) {
      this._x -= el.x;
      this._y -= el.y;
      this._z -= el.z;
    }

    return this;
  }

  /**
   * Multiplies this vector by the given scalar.
   */
  public multiply(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      this._x *= scalar;
      this._y *= scalar;
      this._z *= scalar;
    } else {
      this._x *= scalar.x;
      this._y *= scalar.y;
      this._z *= scalar.z;
    }

    return this;
  }

  /**
   * Divides this vector by the given scalar.
   */
  public divide(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      this._x /= scalar;
      this._y /= scalar;
      this._z /= scalar;
    } else {
      this._x /= scalar.x;
      this._y /= scalar.y;
      this._z /= scalar.z;
    }

    return this;
  }

  /**
   * Check against another vector for equality, within specified error limits.
   * @param v The vector to check against.
   * @param tolerance Error tolerance.
   * @returns true if the vectors are equal within tolerance limits, false otherwise.
   */
  public equals(v: Vector3, tolerance?: number): boolean {
    if (tolerance) {
      return (
        Math.abs(this._x - v._x) <= tolerance &&
        Math.abs(this._y - v._y) <= tolerance &&
        Math.abs(this._z - v._z) <= tolerance
      );
    } else {
      return this._x === v._x && this._y === v._y && this._z === v._z;
    }
  }

  /**
   * @returns The length of this vector.
   */
  public length(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }

  /**
   * @returns the dot product of this and another vector.
   */
  public dot(v: Vector3): number {
    return this._x * v._x + this._y * v._y + this._z * v._z;
  }

  /**
   * @returns the dot product of two vectors.
   */
  public static dotProduct(a: Vector3, b: Vector3): number {
    return a.dot(b);
  }

  /**
   * @returns a normalized unit copy of the vector, ensuring it is safe to do so based on the length. Returns zero vector if vector length is too small to safely normalize.
   */
  public normalize(): Vector3 {
    const length = this.length();

    if (length === 0) {
      return new Vector3(0, 0, 0);
    }

    return new Vector3(this._x / length, this._y / length, this._z / length);
  }

  /**
   * @returns a string representation of this vector.
   */
  public toString(): string {
    return `(${this._x}, ${this._y}, ${this._z})`;
  }

  /**
   * @returns an array representation of this vector.
   */
  public toArray(): [number, number, number] {
    return [this._x, this._y, this._z];
  }
}
