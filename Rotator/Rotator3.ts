import type { IRotator } from "./IRotator";
import type { IVector } from "../Vector/IVector";
import { Vector3 } from "../Vector/Vector3";
import { degToRad, radToDeg } from "./Math";

const mapToRad = (rot: number) => {
  while (rot < 0) {
    rot += 2 * Math.PI;
  }

  return rot % (2 * Math.PI);
};

const mapToDeg = (rot: number) => {
  while (rot < 0) {
    rot += 360;
  }

  return rot % 360;
};

/**
 * 3D rotation vector.
 */
export class Rotator3 implements IRotator {
  /** @internal */
  protected _xDeg: number;
  /** @internal */
  protected _xRad: number;

  /** @internal */
  protected _yDeg: number;
  /** @internal */
  protected _yRad: number;

  /** @internal */
  protected _zDeg: number;
  /** @internal */
  protected _zRad: number;

  public readonly dimension: 3 = 3;

  /**
   * Create a new rotator from the given radian values.
   */
  constructor(x: number, y: number, z: number, rad: true);
  /**
   * Create a new rotator from the given radian values.
   */
  constructor(x: number, y: number, z: number);

  /**
   * Create a new zero rotator.
   */
  constructor();

  /**
   * Create a new rotator from the given degrees values.
   */
  constructor(x: number, y: number, z: number, rad: false);

  constructor(
    x: number = 0,
    y: number = 0,
    z: number = 0,
    rad: boolean = true
  ) {
    if (rad) {
      this._xRad = mapToRad(x);
      this._xDeg = radToDeg(this._xRad);
      this._yRad = mapToRad(y);
      this._yDeg = radToDeg(this._yRad);
      this._zRad = mapToRad(z);
      this._zDeg = radToDeg(this._zRad);
    } else {
      this._xDeg = mapToDeg(x);
      this._xRad = degToRad(this._xDeg);
      this._yDeg = mapToDeg(y);
      this._yRad = degToRad(this._yDeg);
      this._zDeg = mapToDeg(z);
      this._zRad = degToRad(this._zDeg);
    }
  }

  /**
   * Create a new rotator from the given angle values as degrees.
   */
  public static from(vec: Vector3): IRotator {
    if (vec.dimension === 3) {
      return new Rotator3(
        (vec as Vector3).x,
        (vec as Vector3).y,
        (vec as Vector3).z,
        true
      );
    } else {
      throw new Error("Invalid dimension for Rotator3.from");
    }
  }

  /**
   * x axis rotation in degrees.
   */
  public get xDeg() {
    return this._xDeg;
  }

  /**
   * x axis rotation in radiants.
   */
  public get x() {
    return this._xRad;
  }

  public set x(x: number) {
    this._xRad = mapToRad(x);
    this._xDeg = radToDeg(this._xRad);
  }

  /**
   * y axis rotation in degrees.
   */
  public get yDeg() {
    return this._yDeg;
  }

  /**
   * y axis rotation in radiants.
   */
  public get y() {
    return this._yRad;
  }

  public set y(y: number) {
    this._yRad = mapToRad(y);
    this._yDeg = radToDeg(this._yRad);
  }

  /**
   * z axis rotation in degrees.
   */
  public get zDeg() {
    return this._zDeg;
  }

  /**
   * z axis rotation in radiants.
   */
  public get z() {
    return this._zRad;
  }

  public set z(z: number) {
    this._zRad = mapToRad(z);
    this._zDeg = radToDeg(this._zRad);
  }

  /**
   * Get the X direction vector after this rotation.
   */
  public getRotationXVector(): IVector {
    return this.rotateVector(new Vector3(1, 0, 0));
  }

  /**
   * Rotate a vector by this rotator.
   */
  public rotateVector(v: Vector3): Vector3 {
    if (v.dimension === 3) {
      const vec = v.copy();

      // yaw
      const lengthYaw = Math.sqrt(vec.x ** 2 + vec.y ** 2);
      vec.x = lengthYaw * Math.cos(this._zRad);
      vec.y = lengthYaw * Math.sin(this._zRad);

      // pitch
      const lengthPitch = Math.sqrt(vec.x ** 2 + vec.z ** 2);
      vec.x = lengthPitch * Math.cos(this._yRad);
      vec.z = lengthPitch * Math.sin(this._yRad);

      // roll
      const lengthRoll = Math.sqrt(vec.y ** 2 + vec.z ** 2);
      vec.y = lengthRoll * Math.cos(this._xRad);
      vec.z = lengthRoll * Math.sin(this._xRad);

      return vec;
    } else {
      throw new Error("Invalid dimension for Rotator.rotateVector");
    }
  }

  /**
   * @returns `Array` that contains the axis rotations.
   * @param rad If true, the axis values are exported as radiants. If false, they are exported as degrees. Default is radiants.
   */
  public toArray(rad: boolean = true): [number, number, number] {
    if (rad) {
      return [this._xRad, this._yRad, this._zRad];
    } else {
      return [this._xDeg, this._yDeg, this._zDeg];
    }
  }

  /**
   * @returns Converts this rotator to a `Vector3`.
   * @param rad If true, the axis values are exported as radiants. If false, they are exported as degrees. Default is radiants.
   */
  public toVector(rad: boolean = true): Vector3 {
    if (rad) {
      return new Vector3(this._xRad, this._yRad, this._zRad);
    } else {
      return new Vector3(this._xDeg, this._yDeg, this._zDeg);
    }
  }

  /**
   * @returns string representation of this rotator. Values as degrees.
   */
  public toString(): string {
    return `(${this._xDeg.toPrecision(3)}°, ${this._yDeg.toPrecision(
      3
    )}°, ${this._zDeg.toPrecision(3)}°)`;
  }

  *[Symbol.iterator]() {
    yield { deg: this._xDeg, rad: this._xRad };
    yield { deg: this._yDeg, rad: this._yRad };
    yield { deg: this._zDeg, rad: this._zRad };
  }
}
