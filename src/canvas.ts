import { type GradientCache, getGradientStops } from "./color";
import type { resolveWaveConfig } from "./config";
import type { WavesProps } from "./types";

/**
 * Resolve the device pixel ratio used for the canvas backing store.
 * @param pixelRatio - The pixel ratio to use for the canvas.
 * @returns The device pixel ratio.
 */
export const getPixelRatio = (pixelRatio: WavesProps["pixelRatio"]) => {
	if (pixelRatio === "auto" || pixelRatio === undefined) {
		return globalThis.window === undefined
			? 1
			: globalThis.window.devicePixelRatio || 1;
	}

	return pixelRatio;
};

/**
 * Resolve the canvas height in CSS pixels from the height prop and parent size.
 * @param height - The height of the canvas.
 * @param parentHeight - The height of the parent element.
 * @returns The canvas height in CSS pixels.
 */
export const resolveCanvasHeight = (
	height: WavesProps["height"],
	parentHeight: number,
) => {
	if (height === undefined) return parentHeight > 0 ? parentHeight : 150;

	if (typeof height === "number") return height;

	if (height.endsWith("%")) {
		if (parentHeight > 0)
			return (parentHeight * Number.parseFloat(height)) / 100;

		// Parent may not be measured yet; fall back until ResizeObserver runs.
		return 150;
	}

	const parsedHeight = Number.parseFloat(height);
	return Number.isFinite(parsedHeight) ? parsedHeight : 150;
};

/**
 * Sync canvas CSS and backing-store dimensions.
 * @param canvas - The canvas element to apply the layout to.
 * @param height - The height of the canvas.
 * @param pixelRatio - The pixel ratio to use for the canvas.
 * @returns The layout width and height.
 */
export const applyCanvasLayout = (
	canvas: HTMLCanvasElement | null,
	height: WavesProps["height"],
	pixelRatio: WavesProps["pixelRatio"],
) => {
	if (!canvas) return null;

	const parent = canvas.parentElement;
	const layoutWidthValue = parent?.clientWidth || canvas.clientWidth || 300;
	const layoutHeightValueRaw = resolveCanvasHeight(
		height,
		parent?.clientHeight || 0,
	);
	const ratio = getPixelRatio(pixelRatio);
	const layoutWidth = Math.max(1, layoutWidthValue);
	const layoutHeightValue = Math.max(1, Math.floor(layoutHeightValueRaw));

	// Backing-store pixels are scaled for retina; drawing uses layout coordinates.
	canvas.width = Math.max(1, Math.floor(layoutWidth * ratio));
	canvas.height = Math.max(1, Math.floor(layoutHeightValue * ratio));
	canvas.style.width = `${layoutWidth}px`;
	canvas.style.height = `${layoutHeightValue}px`;

	const ctx = canvas.getContext("2d");
	if (ctx && "setTransform" in ctx) {
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
	}

	return {
		width: layoutWidth,
		height: layoutHeightValue,
	};
};

/**
 * Create a diagonal canvas gradient for a wave layer.
 * @param ctx - The canvas context to use for the gradient.
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @param cache - Gradient stop cache keyed by palette and alpha.
 * @param colors - The colors to use for the gradient stops.
 * @param alpha - The alpha value to use for the gradient stops.
 * @returns The canvas gradient.
 */
const createWaveGradient = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	cache: GradientCache,
	colors: string[],
	alpha: number,
) => {
	const stops = getGradientStops(cache, colors, alpha);
	const gradient = ctx.createLinearGradient(0, 0, width, height);
	for (const stop of stops) gradient.addColorStop(stop.offset, stop.color);
	return gradient;
};

/**
 * Draw a single horizontal wave line using a sine curve and edge pinch envelope.
 * @param ctx - The canvas context to use for the waveform.
 * @param layoutWidth - The width of the waveform.
 * @param layoutHeight - The height of the waveform.
 * @param amplitude - The amplitude of the waveform.
 * @param frequency - The frequency of the waveform.
 * @param color - The color of the waveform.
 * @param phase - The phase of the waveform.
 * @param pinchExponent - The pinch exponent of the waveform.
 * @returns The drawn waveform.
 */
const drawWaveform = (
	ctx: CanvasRenderingContext2D,
	layoutWidth: number,
	layoutHeight: number,
	amplitude: number,
	frequency: number,
	color: string | CanvasGradient,
	phase: number,
	pinchExponent: number,
) => {
	ctx.strokeStyle = color;
	ctx.beginPath();

	for (let i = 0; i < layoutWidth; i++) {
		// Fade amplitude toward both edges so the wave tapers to a point.
		const sineWave = Math.sin(Math.PI * (i / layoutWidth));
		const pinch = sineWave ** pinchExponent;
		const y = amplitude * Math.sin(frequency * i + phase) * pinch;

		ctx.lineTo(i, layoutHeight / 2 + y);
	}

	ctx.stroke();
};

/**
 * Draw each primary wave and its surrounding mesh of secondary lines.
 * @param ctx - The canvas context to use for the waveform.
 * @param colors - The colors to use for the waveform.
 * @param config - The configuration to use for the waveform.
 * @param gradientCache - The cache to use for the gradient stops.
 * @param layoutWidth - The width of the waveform.
 * @param layoutHeight - The height of the waveform.
 * @param oscillatingAmplitude - The oscillating amplitude of the waveform.
 * @param timestamp - The timestamp of the waveform.
 * @returns The drawn waveform.
 */
export const drawWaveLayers = ({
	ctx,
	colors,
	config,
	gradientCache,
	layoutWidth,
	layoutHeight,
	oscillatingAmplitude,
	timestamp,
}: {
	ctx: CanvasRenderingContext2D;
	colors: string[];
	config: ReturnType<typeof resolveWaveConfig>;
	gradientCache: GradientCache;
	layoutWidth: number;
	layoutHeight: number;
	oscillatingAmplitude: number;
	timestamp: number;
}) => {
	for (const primary of config.layers) {
		const primaryAmplitude = oscillatingAmplitude * primary.amplitudeMultiplier;
		const primaryPhase = timestamp * primary.speed + primary.phaseOffset;

		drawWaveform(
			ctx,
			layoutWidth,
			layoutHeight,
			primaryAmplitude,
			primary.frequency,
			createWaveGradient(
				ctx,
				layoutWidth,
				layoutHeight,
				gradientCache,
				colors,
				primary.alpha,
			),
			primaryPhase,
			config.pinch,
		);

		// Secondary mesh lines create the dense woven look around each primary wave.
		for (let meshIndex = 0; meshIndex < primary.meshCount; meshIndex++) {
			const amp = primaryAmplitude - meshIndex * 0.1;
			const freq = primary.frequency + meshIndex * 0.00025;
			const alpha = primary.alpha * 0.6 - meshIndex * 0.01;

			drawWaveform(
				ctx,
				layoutWidth,
				layoutHeight,
				amp,
				freq,
				createWaveGradient(
					ctx,
					layoutWidth,
					layoutHeight,
					gradientCache,
					colors,
					alpha,
				),
				timestamp * primary.speed + meshIndex * 0.015 + primary.phaseOffset,
				config.pinch,
			);
		}
	}
};
