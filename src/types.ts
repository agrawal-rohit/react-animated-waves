/** Per-layer overrides for advanced wave configuration. */
export type WaveLayer = {
	/** Multiplier applied to the current amplitude for this layer. */
	amplitudeMultiplier?: number;
	/** Horizontal wave frequency. */
	frequency?: number;
	/** Phase speed multiplier for this layer. */
	speed?: number;
	/** Base opacity for this layer's gradient stops. */
	alpha?: number;
	/** Number of secondary mesh lines drawn around this layer. */
	meshCount?: number;
	/** Static phase offset applied when drawing this layer. */
	phaseOffset?: number;
};

/** Public props for the `Waves` canvas component. */
export type WavesProps = Omit<
	React.CanvasHTMLAttributes<HTMLCanvasElement>,
	"height"
> & {
	/** The colors for the waveform. Accepts any CSS color string (e.g., `#436EDB`, `rgb(67, 110, 219)`, `#436EDB80`). */
	colors?: string[];
	/** Maximum height of the waveform in pixels. */
	amplitude?: number;
	/** Speed of the waveform animation. */
	speed?: number;
	/** Smoothing factor while approaching the target amplitude. */
	smoothing?: number;
	/** Sine wave frequency of the waveform. */
	frequency?: number;
	/** Number of primary wave layers. */
	waveCount?: number;
	/** Number of secondary mesh lines. */
	lineCount?: number;
	/** Pinch intensity at the canvas edges. */
	pinch?: number;
	/** Opacity of the waveform gradient stops. */
	opacity?: number;
	/** Oscillation factor applied to the amplitude over time. */
	amplitudeOscillation?: number;
	/** Height of the canvas in pixels, or a CSS length such as `100%`. */
	height?: number | string;
	/** Pixel ratio of the canvas. */
	pixelRatio?: number | "auto";
	/** Respect the user's reduced motion preference. */
	respectReducedMotion?: boolean;
	/** Pause the animation. */
	paused?: boolean;
	/** Activity multiplier for the waveform for dynamic intensity between 0 (flat) and 1 (configured amplitude). */
	intensity?: number;
	/** Custom layer configuration overrides. */
	layers?: WaveLayer[];
};
