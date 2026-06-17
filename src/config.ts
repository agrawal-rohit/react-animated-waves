import type { WaveLayer, WavesProps } from "./types";

// Default values for the Waves component.
export const DEFAULT_COLORS = ["#436EDB"];
export const DEFAULT_AMPLITUDE = 20;
const BASE_TIME_SCALE = 0.0015;
const BASE_SMOOTHING = 0.9;
const BASE_FREQUENCY = 1;
const BASE_LINE_COUNT = 30;
const BASE_WAVE_COUNT = 3;
const BASE_PINCH = 6;
const BASE_OPACITY = 1;
const BASE_SPEED = 1;
const BASE_AMPLITUDE_OSCILLATION = 0.05;

/** Default wave layers used by the Waves component. */
const DEFAULT_PRIMARY_LAYERS: Required<WaveLayer>[] = [
	{
		amplitudeMultiplier: 1,
		frequency: 0.02,
		alpha: 0.6,
		speed: 0.001,
		meshCount: BASE_LINE_COUNT,
		phaseOffset: 0,
	},
	{
		amplitudeMultiplier: 0.6,
		frequency: 0.03,
		alpha: 0.4,
		speed: 0.004,
		meshCount: BASE_LINE_COUNT,
		phaseOffset: 0,
	},
	{
		amplitudeMultiplier: 0.3,
		frequency: 0.04,
		alpha: 0.2,
		speed: 0.007,
		meshCount: BASE_LINE_COUNT,
		phaseOffset: 0,
	},
];

export type ResolveWaveConfigInput = Pick<
	WavesProps,
	| "speed"
	| "smoothing"
	| "frequency"
	| "waveCount"
	| "lineCount"
	| "pinch"
	| "opacity"
	| "amplitudeOscillation"
	| "layers"
>;

/**
 * Merge a caller-provided layer with defaults.
 * @param layer - The caller-provided layer.
 * @param index - The index of the layer.
 * @param lineCount - The number of lines to draw.
 * @returns The merged layer.
 */
const resolveLayer = (
	layer: WaveLayer,
	index: number,
	lineCount: number,
): Required<WaveLayer> => {
	const fallback =
		DEFAULT_PRIMARY_LAYERS[index] ?? DEFAULT_PRIMARY_LAYERS.at(-1);

	return {
		amplitudeMultiplier:
			layer.amplitudeMultiplier ?? fallback.amplitudeMultiplier,
		frequency: layer.frequency ?? fallback.frequency,
		alpha: layer.alpha ?? fallback.alpha,
		speed: layer.speed ?? fallback.speed,
		meshCount: layer.meshCount ?? lineCount,
		phaseOffset: layer.phaseOffset ?? 0,
	};
};

/**
 * Generate evenly spaced waveform layers when the caller does not pass `layers`.
 * @param waveCount - The number of waves to generate.
 * @param frequencyScale - The frequency scale to apply to the waves.
 * @param opacityScale - The opacity scale to apply to the waves.
 * @param speedScale - The speed scale to apply to the waves.
 * @param lineCount - The number of lines to draw.
 * @returns The generated layers.
 */
const generateLayers = (
	waveCount: number,
	frequencyScale: number,
	opacityScale: number,
	speedScale: number,
	lineCount: number,
): Required<WaveLayer>[] => {
	if (
		waveCount === BASE_WAVE_COUNT &&
		frequencyScale === 1 &&
		opacityScale === 1 &&
		speedScale === 1 &&
		lineCount === BASE_LINE_COUNT
	) {
		return DEFAULT_PRIMARY_LAYERS.map((layer) => ({
			...layer,
			meshCount: lineCount,
		}));
	}

	return Array.from({ length: waveCount }, (_, index) => {
		const t = waveCount > 1 ? index / (waveCount - 1) : 0;

		return {
			amplitudeMultiplier: 1 - t * 0.7,
			frequency: (0.02 + t * 0.02) * frequencyScale,
			alpha: (0.6 - t * 0.4) * opacityScale,
			speed: (0.001 + t * 0.006) * speedScale,
			meshCount: lineCount,
			phaseOffset: 0,
		};
	});
};

/**
 * Normalize public props into renderer-ready animation settings.
 * @param speed - The speed of the waveform animation.
 * @param smoothing - How gradually amplitude approaches its target; higher values change more slowly.
 * @param frequency - The sine wave frequency of the waveform.
 * @param waveCount - The number of waves to generate.
 * @param lineCount - The number of lines to draw.
 * @param pinch - The pinch intensity at the canvas edges.
 * @param opacity - The opacity of the waveform gradient stops.
 * @param amplitudeOscillation - The oscillation factor applied to the amplitude over time.
 * @param layers - The custom layer configuration overrides.
 * @returns The resolved wave configuration.
 */
export const resolveWaveConfig = ({
	speed = BASE_SPEED,
	smoothing = BASE_SMOOTHING,
	frequency = BASE_FREQUENCY,
	waveCount = BASE_WAVE_COUNT,
	lineCount = BASE_LINE_COUNT,
	pinch = BASE_PINCH,
	opacity = BASE_OPACITY,
	amplitudeOscillation = BASE_AMPLITUDE_OSCILLATION,
	layers,
}: ResolveWaveConfigInput = {}) => {
	const resolvedLayers = layers?.length
		? layers.map((layer, index) => resolveLayer(layer, index, lineCount))
		: generateLayers(waveCount, frequency, opacity, speed, lineCount);

	return {
		smoothing,
		amplitudeOscillation,
		timeScale: BASE_TIME_SCALE * speed,
		pinch,
		layers: resolvedLayers,
	};
};

/**
 * Clamp a normalized activity level into the 0..1 range.
 * @param intensity - The normalized intensity of the waveform.
 * @returns The clamped intensity.
 */
export const clampIntensity = (intensity?: number) => {
	if (intensity === undefined) return 1;
	return Math.min(1, Math.max(0, intensity));
};
