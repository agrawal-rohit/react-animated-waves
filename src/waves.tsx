import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { applyCanvasLayout, drawWaveLayers } from "./canvas";
import type { GradientCache } from "./color";
import {
	clampIntensity,
	DEFAULT_AMPLITUDE,
	DEFAULT_COLORS,
	resolveWaveConfig,
} from "./config";
import type { WavesProps } from "./types";

/** Canvas-based animated wave renderer. */
const WavesComponent = forwardRef<HTMLCanvasElement, WavesProps>(
	(
		{
			amplitude = DEFAULT_AMPLITUDE,
			colors = DEFAULT_COLORS,
			speed,
			smoothing,
			frequency,
			waveCount,
			lineCount,
			pinch,
			opacity,
			amplitudeOscillation,
			height,
			pixelRatio = "auto",
			respectReducedMotion = true,
			paused = false,
			intensity,
			layers,
			...props
		},
		ref,
	) => {
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const amplitudeRef = useRef(amplitude);
		const targetAmplitudeRef = useRef(amplitude);
		const gradientCacheRef = useRef<GradientCache>(new Map());
		const layoutSizeRef = useRef({ width: 300, height: 150 });
		const renderFrameRef = useRef<(() => void) | null>(null);

		const waveConfig = useMemo(
			() =>
				resolveWaveConfig({
					speed,
					smoothing,
					frequency,
					waveCount,
					lineCount,
					pinch,
					opacity,
					amplitudeOscillation,
					layers,
				}),
			[
				speed,
				smoothing,
				frequency,
				waveCount,
				lineCount,
				pinch,
				opacity,
				amplitudeOscillation,
				layers,
			],
		);

		const intensityMultiplier = clampIntensity(intensity);

		// Expose the canvas element to the parent component.
		useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement, []);

		// Update the target amplitude based on the intensity.
		useEffect(() => {
			targetAmplitudeRef.current = amplitude * intensityMultiplier;
		}, [amplitude, intensityMultiplier]);

		// Apply the canvas layout and update the layout size reference.
		const resizeCanvas = useCallback(() => {
			const layout = applyCanvasLayout(canvasRef.current, height, pixelRatio);
			if (layout) layoutSizeRef.current = layout;
		}, [height, pixelRatio]);

		// Resize the canvas when the layout size changes.
		useLayoutEffect(() => {
			resizeCanvas();

			// If the parent element is not found or the ResizeObserver is not available, render the frame.
			const canvas = canvasRef.current;
			const parent = canvas?.parentElement;
			if (!parent || typeof ResizeObserver === "undefined") {
				renderFrameRef.current?.();
				return;
			}

			// Create a new ResizeObserver to resize the canvas when the parent element changes size.
			const observer = new ResizeObserver(() => {
				resizeCanvas();
				renderFrameRef.current?.();
			});

			observer.observe(parent);
			return () => observer.disconnect();
		}, [resizeCanvas]);

		// Render the frame when the canvas is resized.
		useEffect(() => {
			let animationFrameId = 0;

			const canvas = canvasRef.current;
			const ctx = canvas?.getContext("2d");
			if (!canvas || !ctx) return;

			gradientCacheRef.current.clear();

			// Determine if the animation should run based on the paused state, document visibility, and reduced motion query.
			const reducedMotionQuery =
				globalThis.window !== undefined && respectReducedMotion
					? globalThis.window.matchMedia("(prefers-reduced-motion: reduce)")
					: null;

			const shouldAnimate = () => {
				if (paused) return false;
				if (typeof document !== "undefined" && document.hidden) return false;
				if (reducedMotionQuery?.matches) return false;
				return true;
			};

			const renderFrame = () => {
				const timestamp = Date.now();
				const time = timestamp * waveConfig.timeScale;

				// Smoothly approach the latest target amplitude from props/intensity.
				amplitudeRef.current +=
					waveConfig.smoothing *
					(targetAmplitudeRef.current - amplitudeRef.current);

				// Calculate the oscillating amplitude based on the time and the amplitude oscillation configuration.
				const oscillatingAmplitude =
					waveConfig.amplitudeOscillation === 0
						? amplitudeRef.current
						: amplitudeRef.current *
							(1 + Math.sin(time) * waveConfig.amplitudeOscillation);

				ctx.clearRect(
					0,
					0,
					layoutSizeRef.current.width,
					layoutSizeRef.current.height,
				);

				drawWaveLayers({
					ctx,
					colors,
					config: waveConfig,
					gradientCache: gradientCacheRef.current,
					layoutWidth: layoutSizeRef.current.width,
					layoutHeight: layoutSizeRef.current.height,
					oscillatingAmplitude,
					timestamp,
				});
			};

			const animate = () => {
				if (!shouldAnimate()) return;

				renderFrame();
				animationFrameId = requestAnimationFrame(animate);
			};

			// Set the render frame reference to the render frame function.
			renderFrameRef.current = renderFrame;
			resizeCanvas();
			renderFrame();

			// Start the animation if the animation should run.
			if (shouldAnimate()) animationFrameId = requestAnimationFrame(animate);

			const handleVisibilityChange = () => {
				if (!document.hidden && shouldAnimate()) {
					renderFrame();
					animationFrameId = requestAnimationFrame(animate);
				}
			};

			const handleReducedMotionChange = () => {
				if (shouldAnimate()) {
					renderFrame();
					animationFrameId = requestAnimationFrame(animate);
				}
			};

			document.addEventListener("visibilitychange", handleVisibilityChange);
			reducedMotionQuery?.addEventListener("change", handleReducedMotionChange);

			return () => {
				renderFrameRef.current = null;
				cancelAnimationFrame(animationFrameId);
				document.removeEventListener(
					"visibilitychange",
					handleVisibilityChange,
				);
				reducedMotionQuery?.removeEventListener(
					"change",
					handleReducedMotionChange,
				);
			};
		}, [colors, paused, respectReducedMotion, resizeCanvas, waveConfig]);

		return (
			<canvas
				ref={canvasRef}
				aria-hidden={props["aria-hidden"] ?? true}
				width="100%"
				height="auto"
				{...props}
			/>
		);
	},
);

WavesComponent.displayName = "Waves";

export const Waves = memo(WavesComponent);
