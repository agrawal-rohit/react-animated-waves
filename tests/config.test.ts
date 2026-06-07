import { describe, expect, it } from "vitest";
import { clampIntensity, resolveWaveConfig } from "../src/config";

describe("resolveWaveConfig", () => {
	it("returns the default layer configuration", () => {
		const config = resolveWaveConfig();

		expect(config.layers).toHaveLength(3);
		expect(config.layers[0]).toMatchObject({
			amplitudeMultiplier: 1,
			frequency: 0.02,
			alpha: 0.6,
			speed: 0.001,
			meshCount: 30,
		});
		expect(config.smoothing).toBe(0.1);
		expect(config.pinch).toBe(6);
		expect(config.amplitudeOscillation).toBe(0.05);
	});

	it("respects explicit config values", () => {
		const config = resolveWaveConfig({
			amplitudeOscillation: 0,
			lineCount: 20,
		});

		expect(config.amplitudeOscillation).toBe(0);
		expect(config.layers[0]?.meshCount).toBe(20);
	});

	it("merges partial custom layers with defaults", () => {
		const config = resolveWaveConfig({
			layers: [{ alpha: 0.9 }],
		});

		expect(config.layers[0]).toMatchObject({
			amplitudeMultiplier: 1,
			frequency: 0.02,
			alpha: 0.9,
			speed: 0.001,
			meshCount: 30,
			phaseOffset: 0,
		});
	});

	it("falls back to the last default layer for extra custom layers", () => {
		const config = resolveWaveConfig({
			layers: [{}, {}, {}, { alpha: 0.1 }],
		});

		expect(config.layers[3]).toMatchObject({
			amplitudeMultiplier: 0.3,
			frequency: 0.04,
			alpha: 0.1,
			speed: 0.007,
		});
	});

	it("respects fully specified custom layers", () => {
		const config = resolveWaveConfig({
			layers: [{ alpha: 0.9, meshCount: 5, frequency: 0.05 }],
		});

		expect(config.layers).toHaveLength(1);
		expect(config.layers[0]).toMatchObject({
			alpha: 0.9,
			meshCount: 5,
			frequency: 0.05,
		});
	});

	it("generates a single layer when waveCount is one", () => {
		const config = resolveWaveConfig({ waveCount: 1, lineCount: 10 });

		expect(config.layers).toHaveLength(1);
		expect(config.layers[0]).toMatchObject({
			amplitudeMultiplier: 1,
			meshCount: 10,
			phaseOffset: 0,
		});
	});

	it("generates non-default layers when values differ from defaults", () => {
		const config = resolveWaveConfig({
			waveCount: 4,
			frequency: 2,
			opacity: 0.5,
			speed: 2,
			lineCount: 12,
		});

		expect(config.layers).toHaveLength(4);
		expect(config.layers[0]?.frequency).toBe(0.04);
		expect(config.layers[3]?.frequency).toBe(0.08);
		expect(config.layers.every((layer) => layer.meshCount === 12)).toBe(true);
	});
});

describe("clampIntensity", () => {
	it("returns 1 when intensity is omitted", () => {
		expect(clampIntensity()).toBe(1);
	});

	it("clamps values into the 0..1 range", () => {
		expect(clampIntensity(-0.2)).toBe(0);
		expect(clampIntensity(0.4)).toBe(0.4);
		expect(clampIntensity(1.5)).toBe(1);
	});
});
