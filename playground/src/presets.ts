export type PlaygroundPreset =
	| "default"
	| "minimal"
	| "deep"
	| "equalizer"
	| "loading"
	| "surge";

export type PlaygroundWaveConfig = {
	speed: number;
	smoothing: number;
	frequency: number;
	waveCount: number;
	lineCount: number;
	pinch: number;
	opacity: number;
	amplitudeOscillation: number;
	colors: string[];
};

export const defaultPlaygroundConfig: PlaygroundWaveConfig = {
	speed: 1,
	smoothing: 0.92,
	frequency: 1.1,
	waveCount: 3,
	lineCount: 14,
	pinch: 7,
	opacity: 1,
	amplitudeOscillation: 0.06,
	colors: ["#FF6AC6", "#436EDB", "#FF6AC6"],
};

/** Playground-only preset bundles mapped to individual `Waves` props. */
export const playgroundPresets: Record<
	PlaygroundPreset,
	PlaygroundWaveConfig
> = {
	default: defaultPlaygroundConfig,
	minimal: {
		...defaultPlaygroundConfig,
		speed: 0.7,
		frequency: 0.7,
		waveCount: 2,
		lineCount: 3,
		pinch: 1,
		opacity: 1.2,
		amplitudeOscillation: 0.01,
		colors: ["#64748B", "#CBD5E1"],
	},
	deep: {
		...defaultPlaygroundConfig,
		speed: 0.2,
		smoothing: 0.99,
		frequency: 0.2,
		waveCount: 4,
		lineCount: 42,
		pinch: 9,
		opacity: 0.7,
		amplitudeOscillation: 0.02,
		colors: ["#1E3A8A", "#0EA5E9", "#1E3A8A"],
	},
	equalizer: {
		...defaultPlaygroundConfig,
		speed: 2,
		smoothing: 0.58,
		frequency: 1.8,
		waveCount: 6,
		lineCount: 0,
		pinch: 4,
		opacity: 1.35,
		amplitudeOscillation: 0.14,
		colors: ["#22C55E", "#EAB308", "#EF4444"],
	},
	loading: {
		...defaultPlaygroundConfig,
		speed: 1.6,
		smoothing: 0.88,
		frequency: 1,
		waveCount: 1,
		lineCount: 14,
		pinch: 12,
		opacity: 1.1,
		amplitudeOscillation: 0,
		colors: ["#38BDF8", "#6366F1"],
	},
	surge: {
		...defaultPlaygroundConfig,
		speed: 1.8,
		smoothing: 0.94,
		frequency: 0.5,
		waveCount: 3,
		lineCount: 10,
		pinch: 8,
		opacity: 1.2,
		amplitudeOscillation: 0.2,
		colors: ["#FF6B35", "#F7C59F", "#FF6B35"],
	},
};

export type PlaygroundPresetOption = {
	value: PlaygroundPreset;
	name: string;
};

/** Preset metadata for the configuration preset select. */
export const playgroundPresetOptions: PlaygroundPresetOption[] = [
	{ value: "default", name: "Default" },
	{ value: "minimal", name: "Minimal" },
	{ value: "deep", name: "Abyss" },
	{ value: "loading", name: "Loading" },
	{ value: "equalizer", name: "Equalizer" },
	{ value: "surge", name: "Surge" },
];
