export type PlaygroundPreset =
	| "default"
	| "minimal"
	| "mesh"
	| "calm"
	| "equalizer"
	| "pulse"
	| "deep"
	| "loading";

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
	mesh: {
		...defaultPlaygroundConfig,
		speed: 0.5,
		smoothing: 0.95,
		frequency: 0.9,
		waveCount: 5,
		lineCount: 32,
		pinch: 9,
		opacity: 0.55,
		amplitudeOscillation: 0.12,
		colors: ["#8B5CF6", "#22D3EE", "#8B5CF6"],
	},
	calm: {
		...defaultPlaygroundConfig,
		speed: 0.8,
		smoothing: 0.93,
		frequency: 0.6,
		waveCount: 3,
		lineCount: 16,
		pinch: 7,
		opacity: 0.85,
		amplitudeOscillation: 0.07,
		colors: ["#2DD4BF", "#38BDF8", "#2DD4BF"],
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
	pulse: {
		...defaultPlaygroundConfig,
		speed: 1.1,
		smoothing: 0.6,
		frequency: 0.5,
		waveCount: 1,
		lineCount: 6,
		pinch: 10,
		opacity: 1.3,
		amplitudeOscillation: 0.2,
		colors: ["#FB7185", "#E11D48"],
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
};

export type PlaygroundPresetOption = {
	value: PlaygroundPreset;
	name: string;
	description: string;
};

/** Preset metadata for the configuration preset select. */
export const playgroundPresetOptions: PlaygroundPresetOption[] = [
	{
		value: "default",
		name: "Default",
		description: "Balanced waves with light mesh.",
	},
	{
		value: "minimal",
		name: "Minimal",
		description: "Few lines, almost no pinch.",
	},
	{
		value: "loading",
		name: "Loading",
		description: "One steady wave, strong pinch.",
	},
	{
		value: "equalizer",
		name: "Equalizer",
		description: "Fast waves without mesh lines.",
	},
	{
		value: "pulse",
		name: "Pulse",
		description: "Single wide wave, strong pulse.",
	},
	{
		value: "mesh",
		name: "Mesh",
		description: "Soft layered mesh with pulse.",
	},
	{
		value: "calm",
		name: "Calm",
		description: "Slow flowing translucent waves.",
	},
	{
		value: "deep",
		name: "Deep",
		description: "Wide slow waves, dense lines.",
	},
];
