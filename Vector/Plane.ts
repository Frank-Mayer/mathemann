import { Vector3 } from "./Vector3";

/**
 * Structure for three dimensional planes.
 */
export class Plane extends Vector3 {
  /** @internal */
  private _w: number;

  public get w(): number {
    return this._w;
  }

  constructor(x: number, y: number, z: number, w: number) {
    super(x, y, z);
    this._w = w;
  }

  /**
   * Get a flipped version of the plane.
   */
  public flip(): Plane {
    return new Plane(-this._x, -this._y, -this._z, -this._w);
  }

  /**
   * Get the normal of this plane.
   */
  public getNormal(): Vector3 {
    return new Vector3(this._x, this._y, this._z);
  }

  /**
   * Get the origin of this plane.
   */
  public getOrigin(): Vector3 {
    return new Vector3(this._w, this._w, this._w);
  }

  /**
   * Checks if this plane is valid (ie: if it has a non-zero normal).
   */
  public isValid(): boolean {
    return this._x !== 0 || this._y !== 0 || this._z !== 0;
  }

  /**
   * Normalize this plane in-place.
   */
  public override normalize(): Plane {
    const magnitude = this.getMagnitude();
    return new Plane(
      this._x / magnitude,
      this._y / magnitude,
      this._z / magnitude,
      this._w / magnitude
    );
  }

  /**
   * Get the magnitude of this plane.
   */
  public getMagnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }
}
