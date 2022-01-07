const Rotator3 = require("../cjs/Rotator/Rotator3").Rotator3;

const numDigits = 5;

test("Rotator.Rotator3", () => {
  {
    const r = new Rotator3(0, 0, 0);
    const v = r.getRotationXVector();
    expect(v.x).toBeCloseTo(1, numDigits);
    expect(v.y).toBeCloseTo(0, numDigits);
    expect(v.z).toBeCloseTo(0, numDigits);
    expect(v.length()).toBeCloseTo(1, numDigits);
  }

  {
    const r = new Rotator3(0, 0, 90);
    const v = r.getRotationXVector();
    expect(v.x).toBeCloseTo(0, numDigits);
    expect(v.y).toBeCloseTo(1, numDigits);
    expect(v.z).toBeCloseTo(0, numDigits);
    expect(v.length()).toBeCloseTo(1, numDigits);
  }

  {
    const r = new Rotator3(0, 0, 45);
    const v = r.getRotationXVector();
    expect(v.length()).toBeCloseTo(1, numDigits);
  }

  {
    const r = new Rotator3(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
    const v = r.getRotationXVector();
    expect(v.length()).toBeCloseTo(1, numDigits);
  }

  {
    const r = new Rotator3(
      Math.random() * 1440,
      Math.random() * 1440,
      Math.random() * 1440
    );

    expect(r.x).toBeLessThanOrEqual(360);
    expect(r.x).toBeGreaterThanOrEqual(0);
    expect(r.y).toBeLessThanOrEqual(360);
    expect(r.y).toBeGreaterThanOrEqual(0);
    expect(r.z).toBeLessThanOrEqual(360);
    expect(r.z).toBeGreaterThanOrEqual(0);

    const v = r.getRotationXVector();
    expect(v.length()).toBeCloseTo(1, numDigits);
  }
});
