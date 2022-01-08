import type { anyVector } from ".";
import { Vector3 } from "./Vector3";
import { Vector2 } from "./Vector2";
import { findLookAtRotation } from "../Rotator/Math";
import type { Rotator3 } from "../Rotator/Rotator3";

export const distance = <V extends anyVector>(a: V, b: V): number =>
  a.minus(b as any).length();

/**
 * Gets the angle of the target vector relative to the source vector.
 * The result is an angle expressed in radians.
 */
export const AngleBetweenVectors: {
  (v1: Vector2, v2: Vector2): number;
  (v1: Vector3, v2: Vector3): number;
} = <V extends anyVector = Vector3>(source: V, target: V): number => {
  const dot = source.dot(target as any);
  const len = source.length() * target.length();
  return Math.acos(dot / len);
};

/**
 * Determines whether the given point is in a box. Includes points on the box.
 * @param point Point to test.
 * @param boxOrigin Origin of the box.
 * @param boxExtent Extents of the box (distance in each axis from origin).
 * @returns Whether the point is in the box.
 */
export const isPointInBox = <V extends anyVector>(
  point: V,
  boxOrigin: V,
  boxExtent: V
) => {
  if (
    point.dimension === 2 &&
    boxOrigin.dimension === 2 &&
    boxExtent.dimension === 2
  ) {
    return (
      point.x >= boxOrigin.x - boxExtent.x &&
      point.x <= boxOrigin.x + boxExtent.x &&
      point.y >= boxOrigin.y - boxExtent.y &&
      point.y <= boxOrigin.y + boxExtent.y
    );
  }

  if (
    point.dimension === 3 &&
    boxOrigin.dimension === 3 &&
    boxExtent.dimension === 3
  ) {
    return (
      point.x >= boxOrigin.x - boxExtent.x &&
      point.x <= boxOrigin.x + boxExtent.x &&
      point.y >= boxOrigin.y - boxExtent.y &&
      point.y <= boxOrigin.y + boxExtent.y &&
      point.z >= boxOrigin.z - boxExtent.z &&
      point.z <= boxOrigin.z + boxExtent.z
    );
  }

  throw new Error("Invalid dimensions");
};

/**
 * Determines whether the given point is in a box. Includes points on the box.
 * @param point Point to test.
 * @param boxOrigin Origin of the box.
 * @param boxExtent Extents of the box (distance in each axis from origin).
 * @param boxRotation Rotation of the box with `boxOrigin` as rotation anchor.
 * @returns Whether the point is in the box.
 */
export const isPointInRotatedBox: {
  (
    point: Vector3,
    boxOrigin: Vector3,
    boxExtent: Vector3,
    boxRotation: Rotator3
  ): boolean;
  (
    point: Vector2,
    boxOrigin: Vector2,
    boxExtent: Vector2,
    boxRotation: number
  ): boolean;
} = (
  point: anyVector,
  boxOrigin: anyVector,
  boxExtent: anyVector,
  boxRotation: Rotator3 | number
): boolean => {
  if (
    point.dimension === 2 &&
    boxOrigin.dimension === 2 &&
    boxExtent.dimension === 2 &&
    typeof boxRotation === "number"
  ) {
    const zero = new Vector2(0, 0);
    const deltaLocation = point.minus(boxOrigin);
    const deltaRotation = findLookAtRotation(boxOrigin, point) - boxRotation;

    const length = Math.sqrt(deltaLocation.x ** 2 + deltaLocation.y ** 2);
    deltaLocation.x = length * Math.cos(deltaRotation);
    deltaLocation.y = length * Math.sin(deltaRotation);

    return isPointInBox(deltaLocation, zero, boxExtent);
  } else if (
    point.dimension === 3 &&
    boxOrigin.dimension === 3 &&
    boxExtent.dimension === 3 &&
    typeof boxRotation === "object"
  ) {
    const boxRotationMatrix = boxRotation.toVector();
    const rotatedPoint = boxRotationMatrix.multiply(point);
    return isPointInBox<Vector3>(rotatedPoint, boxOrigin, boxExtent);
  }

  throw new Error("Invalid dimensions");
};

/**
 * Get a copy of this vector, clamped inside of an axis aligned cube centered at the origin.
 * @param radius Half size of the cube (or radius of sphere circumscribed in the cube).
 * @returns A copy of this vector, bound by cube.
 */
export const vectorBoundedToCube = <V extends anyVector>(
  vect: V,
  radius: number
): V => {
  const newVect = vect.copy() as V;

  for (let i = 0; i < vect.dimension; i++) {
    newVect.set(i, Math.max(-radius, Math.min(radius, vect.get(i))));
  }

  return newVect;
};

/**
 * Get a copy of this vector, clamped inside of an axis aligned sphere centered at the origin.
 * @param radius Radius of the sphere.
 * @returns A copy of this vector, bound by sphere.
 */
export const vectorBoundedToSphere = <V extends anyVector>(
  vect: V,
  radius: number
): V => {
  if (vect.length() > radius) {
    return vect.normalize().multiply(radius) as V;
  }

  return vect.copy() as V;
};

/**
 * Get the forward (X) unit direction vector from a `Rotator`, in world space.
 * @returns The world forward vector by the given rotation.
 */
export const getForwardVector = (rot: Rotator3) =>
  rot.rotateVector(new Vector3(1, 0, 0));

/**
 * Get the right (Y) unit direction vector from a `Rotator`, in world space.
 * @returns The world right vector by the given rotation.
 */
export const getRightVector = (rot: Rotator3) =>
  rot.rotateVector(new Vector3(0, 1, 0));

/**
 * Get the up (Z) unit direction vector from a `Rotator`, in world space.
 * @returns The world up vector by the given rotation.
 */
export const getUpVector = (rot: Rotator3) =>
  rot.rotateVector(new Vector3(0, 0, 1));
