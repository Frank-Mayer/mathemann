import type { IRotator } from "./IRotator";
import type { IVector } from "../Vector/IVector";
import { Vector3 } from "../Vector/Vector3";
import { radToDeg } from "./Math";

const mapToRad = (rot: number) => {
  while (rot < 0) {
    rot += 2 * Math.PI;
  }

  return rot % (2 * Math.PI);
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
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._xRad = mapToRad(x);
    this._xDeg = radToDeg(this._xRad);
    this._yRad = mapToRad(y);
    this._yDeg = radToDeg(this._yRad);
    this._zRad = mapToRad(z);
    this._zDeg = radToDeg(this._zRad);
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

  public static from(x: Vector3): IRotator {
    if (x.dimension === 3) {
      return new Rotator3((x as Vector3).x, (x as Vector3).y, (x as Vector3).z);
    } else {
      throw new Error("Invalid dimension for Rotator3.from");
    }
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

  public toArray(): [number, number, number] {
    return [this._xRad, this._yRad, this._zRad];
  }

  public toVector(): Vector3 {
    return new Vector3(this._xRad, this._yRad, this._zRad);
  }

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
