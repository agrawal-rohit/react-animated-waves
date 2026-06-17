/** Help text aligned with `Waves` prop docs in `src/types.ts`. */
export const wavePropDescriptions = {
	amplitude: "Maximum height of the waveform in pixels.",
	speed: "Speed of the waveform animation.",
	smoothing:
		"How gradually amplitude follows changes; higher values ease in more slowly.",
	frequency: "Sine wave frequency of the waveform.",
	waveCount: "Number of primary wave layers.",
	lineCount: "Number of secondary mesh lines.",
	pinch: "Pinch intensity at the canvas edges.",
	opacity: "Opacity of the waveform gradient stops.",
	amplitudeOscillation: "Oscillation factor applied to the amplitude over time.",
	intensity:
		"Activity multiplier for the waveform for dynamic intensity between 0 (flat) and 1 (configured amplitude).",
	layers: "Custom layer configuration overrides.",
	colors:
		"The colors for the waveform. Accepts any CSS color string (e.g., `#436EDB`, `rgb(67, 110, 219)`, `#436EDB80`).",
} as const;

/** Help text aligned with `WaveLayer` prop docs in `src/types.ts`. */
export const waveLayerPropDescriptions = {
	amplitudeMultiplier: "Multiplier applied to the current amplitude for this layer.",
	frequency: "Horizontal wave frequency.",
	speed: "Phase speed multiplier for this layer.",
	alpha: "Base opacity for this layer's gradient stops.",
	meshCount: "Number of secondary mesh lines drawn around this layer.",
	phaseOffset: "Static phase offset applied when drawing this layer.",
} as const;

/** Playground-only control descriptions. */
export const playgroundPropDescriptions = {
	preset: "Preset bundles mapped to individual Waves props.",
} as const;
