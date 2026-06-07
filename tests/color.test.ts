import { describe, expect, it } from "vitest";
import { colorWithAlpha, getGradientStops } from "../src/color";

describe("colorWithAlpha", () => {
	it("converts colors with explicit alpha", () => {
		expect(colorWithAlpha("#436EDB", 0.5)).toBe("rgba(67, 110, 219, 0.5)");
	});

	it("clamps negative alpha values to zero", () => {
		expect(colorWithAlpha("#436EDB", -0.05)).toBe("rgba(67, 110, 219, 0)");
	});
});

describe("getGradientStops", () => {
	it("creates evenly spaced stops for multiple colors", () => {
		const cache = new Map();

		expect(getGradientStops(cache, ["#ff0000", "#0000ff"], 0.5)).toEqual([
			{ offset: 0, color: "rgba(255, 0, 0, 0.5)" },
			{ offset: 1, color: "rgba(0, 0, 255, 0.5)" },
		]);
	});

	it("uses a single stop at offset zero for one color", () => {
		const cache = new Map();

		expect(getGradientStops(cache, ["#436EDB"], 1)).toEqual([
			{ offset: 0, color: "rgb(67, 110, 219)" },
		]);
	});

	it("reuses cached stops for the same palette and alpha", () => {
		const cache = new Map();
		const colors = ["#ff0000", "#00ff00"];
		const first = getGradientStops(cache, colors, 0.5);

		expect(getGradientStops(cache, colors, 0.5)).toBe(first);
		expect(cache.size).toBe(1);
	});
});
