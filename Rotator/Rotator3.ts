import type { IRotator } from "./IRotator";
import type { IVector } from "../Vector/IVector";
import { Vector3 } from "../Vector/Vector3";
import { degToRad } from "./Math";

const mapToRotation = (rot: number) => {
  while (rot < 0) {
    rot += 360;
  }

  return rot % 360;
};

export class Rotator3 implements IRotator {
  /** @internal */
  protected _x: number;
  /** @internal */
  protected _xRad: number;

  /** @internal */
  protected _y: number;
  /** @internal */
  protected _yRad: number;

  /** @internal */
  protected _z: number;
  /** @internal */
  protected _zRad: number;

  public readonly dimension: 3 = 3;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._x = mapToRotation(x);
    this._xRad = degToRad(this._x);
    this._y = mapToRotation(y);
    this._yRad = degToRad(this._y);
    this._z = mapToRotation(z);
    this._zRad = degToRad(this._z);
  }

  /**
   * x axis rotation in degrees.
   */
  public get x() {
    return this._x;
  }

  /**
   * x axis rotation in radiants.
   */
  public get xRad() {
    return this._xRad;
  }

  public set x(x: number) {
    this._x = mapToRotation(x);
    this._xRad = degToRad(this._x);
  }

  /**
   * y axis rotation in degrees.
   */
  public get y() {
    return this._y;
  }

  /**
   * y axis rotation in radiants.
   */
  public get yRad() {
    return this._zRad;
  }

  public set y(y: number) {
    this._y = mapToRotation(y);
    this._yRad = degToRad(this._y);
  }

  /**
   * z axis rotation in degrees.
   */
  public get z() {
    return this._z;
  }

  /**
   * z axis rotation in radiants.
   */
  public get zRad() {
    return this._zRad;
  }

  public set z(z: number) {
    this._z = mapToRotation(z);
    this._zRad = degToRad(this._z);
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
      const lengthYaw = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
      vec.x = lengthYaw * Math.cos(this._zRad);
      vec.y = lengthYaw * Math.sin(this._zRad);

      // pitch
      const lengthPitch = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.z, 2));
      vec.x = lengthPitch * Math.cos(this._yRad);
      vec.z = lengthPitch * Math.sin(this._yRad);

      // roll
      const lengthRoll = Math.sqrt(Math.pow(vec.y, 2) + Math.pow(vec.z, 2));
      vec.y = lengthRoll * Math.cos(this._xRad);
      vec.z = lengthRoll * Math.sin(this._xRad);

      return vec;
    } else {
      throw new Error("Invalid dimension for Rotator.rotateVector");
    }
  }

  public toArray(): [number, number, number] {
    return [this._x, this._y, this._z];
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}
