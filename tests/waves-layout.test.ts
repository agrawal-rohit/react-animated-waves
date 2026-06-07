import { afterEach, describe, expect, it } from "vitest";
import {
	applyCanvasLayout,
	getPixelRatio,
	resolveCanvasHeight,
} from "../src/canvas";

describe("getPixelRatio", () => {
	const originalWindow = globalThis.window;
	const originalDevicePixelRatio = globalThis.window?.devicePixelRatio;

	afterEach(() => {
		globalThis.window = originalWindow;
		if (originalWindow !== undefined && originalDevicePixelRatio !== undefined) {
			Object.defineProperty(globalThis.window, "devicePixelRatio", {
				configurable: true,
				value: originalDevicePixelRatio,
			});
		}
	});

	it("returns 1 when window is unavailable", () => {
		// @ts-expect-error test override
		delete globalThis.window;

		expect(getPixelRatio("auto")).toBe(1);
	});

	it("falls back to 1 when devicePixelRatio is falsy", () => {
		Object.defineProperty(globalThis.window, "devicePixelRatio", {
			configurable: true,
			value: 0,
		});

		expect(getPixelRatio("auto")).toBe(1);
	});

	it("uses devicePixelRatio when pixelRatio is auto", () => {
		Object.defineProperty(globalThis.window, "devicePixelRatio", {
			configurable: true,
			value: 2,
		});

		expect(getPixelRatio("auto")).toBe(2);
	});

	it("returns an explicit pixel ratio", () => {
		expect(getPixelRatio(3)).toBe(3);
	});
});

describe("resolveCanvasHeight", () => {
	it("uses the parent height when height is omitted", () => {
		expect(resolveCanvasHeight(undefined, 240)).toBe(240);
	});

	it("falls back when the parent height is zero", () => {
		expect(resolveCanvasHeight(undefined, 0)).toBe(150);
	});

	it("returns numeric heights unchanged", () => {
		expect(resolveCanvasHeight(320, 0)).toBe(320);
	});

	it("calculates percentage heights from the parent", () => {
		expect(resolveCanvasHeight("50%", 200)).toBe(100);
	});

	it("falls back for percentage heights before the parent is measured", () => {
		expect(resolveCanvasHeight("50%", 0)).toBe(150);
	});

	it("falls back for invalid string heights", () => {
		expect(resolveCanvasHeight("not-a-number", 100)).toBe(150);
	});

	it("parses numeric string heights", () => {
		expect(resolveCanvasHeight("120", 100)).toBe(120);
	});
});

describe("applyCanvasLayout", () => {
	it("returns null when canvas is missing", () => {
		expect(applyCanvasLayout(null, undefined, "auto")).toBeNull();
	});

	it("updates canvas dimensions when a canvas is provided", () => {
		const canvas = document.createElement("canvas");
		const parent = document.createElement("div");
		Object.defineProperty(parent, "clientWidth", {
			configurable: true,
			value: 240,
		});
		Object.defineProperty(parent, "clientHeight", {
			configurable: true,
			value: 120,
		});
		parent.append(canvas);

		const layout = applyCanvasLayout(canvas, "50%", 1);

		expect(layout).toEqual({ width: 240, height: 60 });
		expect(canvas.style.width).toBe("240px");
		expect(canvas.style.height).toBe("60px");
	});
});
