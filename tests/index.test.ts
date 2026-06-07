import React from "react";
import { describe, expect, it } from "vitest";
import { Waves, type WaveLayer, type WavesProps } from "../src/index";

describe("index", () => {
	it("exports Waves component", () => {
		expect(Waves).toBeDefined();
		expect(typeof Waves).toBe("object");
	});

	it("Waves component can be rendered", () => {
		expect(() => React.createElement(Waves)).not.toThrow();
	});

	it("exports public types", () => {
		const props: WavesProps = {
			amplitude: 20,
			colors: ["#436EDB"],
			smoothing: 0.2,
			intensity: 0.5,
		};
		const layer: WaveLayer = { alpha: 0.5, meshCount: 10 };

		expect(props.smoothing).toBe(0.2);
		expect(layer.meshCount).toBe(10);
	});
});
