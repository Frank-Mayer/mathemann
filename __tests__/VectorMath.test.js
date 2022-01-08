const Vector2 = require("../cjs/Vector/Vector2").Vector2;
const Vector3 = require("../cjs/Vector/Vector3").Vector3;
const isPointInBox = require("../cjs/Vector/Math").isPointInBox;
const isPointInRotatedBox = require("../cjs/Vector/Math").isPointInRotatedBox;
const degToRad = require("../cjs/Rotator/Math").degToRad;

test("Vector.Math.isPointInBox 2D", () => {
  {
    const point = new Vector2(5, 5);
    const boxOrigin = new Vector2(0, 0);
    const boxExtent = new Vector2(10, 10);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeTruthy();
  }

  {
    const point = new Vector2(5, 5);
    const boxOrigin = new Vector2(10, 10);
    const boxExtent = new Vector2(5, 10);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeTruthy();
  }

  {
    const point = new Vector2(5, -5);
    const boxOrigin = new Vector2(0, 0);
    const boxExtent = new Vector2(5, 5);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeTruthy();
  }

  {
    const point = new Vector2(5, 6 + Math.random() * 10);
    const boxOrigin = new Vector2(0, 0);
    const boxExtent = new Vector2(5, 5);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeFalsy();
  }
});

test("Vector.Math.isPointInRotatedBox 2D", () => {
  {
    const point = new Vector2(5, 5);
    const boxOrigin = new Vector2(0, 0);
    const boxExtent = new Vector2(10, 10);

    expect(isPointInRotatedBox(point, boxOrigin, boxExtent, 0)).toBeTruthy();
  }

  {
    const point = new Vector2(9, 9);
    const boxOrigin = new Vector2(0, 0);
    const boxExtent = new Vector2(10, 10);

    expect(isPointInRotatedBox(point, boxOrigin, boxExtent, 0)).toBeTruthy();
    expect(
      isPointInRotatedBox(point, boxOrigin, boxExtent, degToRad(30))
    ).toBeFalsy();
  }
});

test("Vector.Math.isPointInBox 3D", () => {
  {
    const point = new Vector3(5, 5, 5);
    const boxOrigin = new Vector3(0, 0, 0);
    const boxExtent = new Vector3(10, 10, 10);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeTruthy();
  }

  {
    const point = new Vector3(10, 10, -10);
    const boxOrigin = new Vector3(20, 20, 10);
    const boxExtent = new Vector3(10, 10, 10);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeFalsy();
  }

  {
    const point = new Vector3(10, 10, -10);
    const boxOrigin = new Vector3(20, 20, 10);
    const boxExtent = new Vector3(10, 10, 30);

    expect(isPointInBox(point, boxOrigin, boxExtent)).toBeTruthy();
  }
});
