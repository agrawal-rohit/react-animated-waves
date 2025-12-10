import { describe, expect, it } from "vitest";
import { hexToRgba, lerp } from "../src/utils";

describe("lerp", () => {
	it("interpolates between two numbers at t=0.5", () => {
		expect(lerp(0, 10, 0.5)).toBe(5);
	});

	it("returns start value when t=0", () => {
		expect(lerp(5, 15, 0)).toBe(5);
	});

	it("returns end value when t=1", () => {
		expect(lerp(5, 15, 1)).toBe(15);
	});

	it("extrapolates below start when t < 0", () => {
		expect(lerp(10, 20, -0.5)).toBe(5);
	});

	it("extrapolates above end when t > 1", () => {
		expect(lerp(10, 20, 1.5)).toBe(25);
	});

	it("handles negative numbers", () => {
		expect(lerp(-10, 10, 0.5)).toBe(0);
	});

	it("handles decimal inputs", () => {
		expect(lerp(1.5, 3.5, 0.25)).toBe(2);
	});
});

describe("hexToRgba", () => {
	it("converts hex with # prefix to rgba with default alpha", () => {
		expect(hexToRgba("#ff0000")).toBe("rgba(255, 0, 0, 1)");
	});

	it("converts hex without # prefix to rgba with default alpha", () => {
		expect(hexToRgba("00ff00")).toBe("rgba(0, 255, 0, 1)");
	});

	it("converts hex to rgba with custom alpha", () => {
		expect(hexToRgba("#0000ff", 0.5)).toBe("rgba(0, 0, 255, 0.5)");
	});

	it("handles lowercase hex", () => {
		expect(hexToRgba("#abcdef")).toBe("rgba(171, 205, 239, 1)");
	});

	it("handles uppercase hex", () => {
		expect(hexToRgba("#ABCDEF")).toBe("rgba(171, 205, 239, 1)");
	});

	it("handles mixed case hex", () => {
		expect(hexToRgba("#AbCdEf")).toBe("rgba(171, 205, 239, 1)");
	});

	it("converts black to rgba", () => {
		expect(hexToRgba("#000000", 0.8)).toBe("rgba(0, 0, 0, 0.8)");
	});

	it("converts white to rgba", () => {
		expect(hexToRgba("ffffff")).toBe("rgba(255, 255, 255, 1)");
	});
});
