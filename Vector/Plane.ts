import { Vector3 } from "./Vector3";

/**
 * Structure for three dimensional planes.
 */
export class Plane extends Vector3 {
  public w: number;

  constructor(x: number, y: number, z: number, w: number) {
    super(x, y, z);
    this.w = w;
  }

  /**
   * Get a flipped version of the plane.
   */
  public flip(): Plane {
    return new Plane(-this.x, -this.y, -this.z, -this.w);
  }

  /**
   * Get the normal of this plane.
   */
  public getNormal(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Get the origin of this plane.
   */
  public getOrigin(): Vector3 {
    return new Vector3(this.w, this.w, this.w);
  }

  /**
   * Checks if this plane is valid (ie: if it has a non-zero normal).
   */
  public isValid(): boolean {
    return this.x !== 0 || this.y !== 0 || this.z !== 0;
  }

  /**
   * Normalize this plane in-place.
   */
  public override normalize(): Plane {
    const magnitude = this.getMagnitude();
    return new Plane(
      this.x / magnitude,
      this.y / magnitude,
      this.z / magnitude,
      this.w / magnitude
    );
  }

  /**
   * Get the magnitude of this plane.
   */
  public getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}
