import type { IVector } from "./IVector";

export class Vector3 implements IVector {
  public x: number;

  public y: number;

  public z: number;

  public readonly dimension: 3 = 3;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Creates a new 3d vector and adds up the given 3d vector value.
   */
  public plus(v: Vector3 | number): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x + v, this.y + v, this.z + v);
    } else {
      return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
  }

  /**
   * Adds up the given 3d vector value to this 3d vector.
   */
  public add(v: Vector3 | number): Vector3 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
      this.z += v;
    } else {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    }

    return this;
  }

  /**
   * Creates a new 3d vector from this and subtracts the given 3d vector value.
   */
  public minus(v: Vector3 | number): Vector3 {
    if (typeof v === "number") {
      return new Vector3(this.x - v, this.y - v, this.z - v);
    } else {
      return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
  }

  /**
   * Subtracts the given 3d vector value from this 3d vector.
   */
  public subtract(v: Vector3 | number): Vector3 {
    if (typeof v === "number") {
      this.x -= v;
      this.y -= v;
      this.z -= v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    }

    return this;
  }

  /**
   * Multiplies this 3d vector by the given scalar.
   */
  public multiply(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
    } else {
      this.x *= scalar.x;
      this.y *= scalar.y;
      this.z *= scalar.z;
    }

    return this;
  }

  /**
   * Creates a new 3d vector from this 3d vector and multiplies by the given value.
   */
  public multipliedBy(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    } else {
      return new Vector3(
        this.x * scalar.x,
        this.y * scalar.y,
        this.z * scalar.z
      );
    }
  }

  /**
   * Divides this 3d vector by the given scalar.
   */
  public divide(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      this.x /= scalar;
      this.y /= scalar;
      this.z /= scalar;
    } else {
      this.x /= scalar.x;
      this.y /= scalar.y;
      this.z /= scalar.z;
    }

    return this;
  }

  /**
   * Creates a new 3d vector from this 3d vector and divides by the given value.
   */
  public dividedBy(scalar: Vector3 | number): Vector3 {
    if (typeof scalar === "number") {
      return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
    } else {
      return new Vector3(
        this.x / scalar.x,
        this.y / scalar.y,
        this.z / scalar.z
      );
    }
  }

  /**
   * Check against another 3d vector for equality, within specified error limits.
   * @param v The 3d vector to check against.
   * @param tolerance Error tolerance.
   * @returns true if the 3d vectors are equal within tolerance limits, false otherwise.
   */
  public equals(v: Vector3, tolerance?: number): boolean {
    if (tolerance) {
      return (
        Math.abs(this.x - v.x) <= tolerance &&
        Math.abs(this.y - v.y) <= tolerance &&
        Math.abs(this.z - v.z) <= tolerance
      );
    } else {
      return this.x === v.x && this.y === v.y && this.z === v.z;
    }
  }

  /**
   * Creates a copy of this 3d vector.
   */
  public copy(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * @returns The length of this 3d vector.
   */
  public length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  /**
   * @returns the dot product of this and another 3d vector.
   */
  public dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * @returns the cross product of this and another 3d vector.
   */
  public cross(v: Vector3): Vector3 {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  /**
   * @returns the dot product of two 3d vectors.
   */
  public static dotProduct(a: Vector3, b: Vector3): number {
    return a.dot(b);
  }

  /**
   * @returns a normalized unit copy of the 3d vector, ensuring it is safe to do so based on the length. Returns zero 3d vector if 3d vector length is too small to safely normalize.
   */
  public normalize(): Vector3 {
    const length = this.length();

    if (length === 0) {
      return new Vector3(0, 0, 0);
    }

    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  /**
   * @returns a string representation of this 3d vector.
   */
  public toString(): string {
    return `(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
  }

  /**
   * @returns an array representation of this 3d vector.
   */
  public toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}
