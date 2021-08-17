import { resolveGender } from "../../utils/helper";

describe("helpers", () => {
  it("should return 1 when gender is male", async () => {
    const gender = resolveGender("male");
    expect(gender).toBe(1);
  });

  it("should return 2 when gender is female", async () => {
    const gender = resolveGender("female");
    expect(gender).toBe(2);
  });

  it("should return 0 when gender is unknown", async () => {
    const gender = resolveGender("unknown");
    expect(gender).toBe(0);
  });

  it("should throw an error when gender is not male, female or unknown", async () => {
    expect(() => {
      resolveGender("bipedal");
    }).toThrow("unacceptable gender!");
  });
});
