import { memo, useCallback, useEffect, useRef } from "react";
import { hexToRgba, lerp } from "./utils";

// Define the properties for the AnimatedWaveform component
type WavesProps = React.DetailedHTMLProps<
	React.CanvasHTMLAttributes<HTMLCanvasElement>,
	HTMLCanvasElement
> & {
	/** The colors for the waveform */
	colors?: string[];
	/** The amplitude of the waveform */
	amplitude?: number;
};

export const Waves = memo<WavesProps>(
	({ amplitude = 20, colors = ["#436EDB"], ...props }) => {
		const amplitudeRef = useRef(amplitude);
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const targetAmplitudeRef = useRef<number>(amplitude);

		// Update the target amplitude whenever the amplitude prop changes
		useEffect(() => {
			targetAmplitudeRef.current = amplitude;
		}, [amplitude]);

		// Function to draw the waveform on the canvas
		const drawWaveform = useCallback(
			(
				ctx: CanvasRenderingContext2D,
				amplitude: number,
				frequency: number,
				color: string | CanvasGradient,
				phase = 0,
			) => {
				ctx.strokeStyle = color;
				ctx.beginPath();

				// Draw the waveform
				for (let i = 0; i < ctx.canvas.width; i++) {
					// Compute the pinching effect
					const sineWave = Math.sin(Math.PI * (i / ctx.canvas.width));
					const pinch = sineWave ** 6;

					// Calculate the y position with sine function, pinch effect, and time-based phase shift
					const y = amplitude * Math.sin(frequency * i + phase) * pinch;

					ctx.lineTo(i, ctx.canvas.height / 2 + y);
				}

				ctx.stroke();
			},
			[],
		);

		// Animate the waveform
		useEffect(() => {
			let animationFrameId: number;
			const canvas = canvasRef.current as HTMLCanvasElement;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const parent = canvas.parentElement;
			if (parent) canvas.width = parent.clientWidth;

			const animate = () => {
				const time = Date.now() * 0.0015; // Convert milliseconds to seconds and increase speed

				amplitudeRef.current = lerp(
					amplitudeRef.current,
					targetAmplitudeRef.current,
					0.1,
				);

				// Create an oscillating effect with amplitude
				const oscillatingAmplitude =
					amplitudeRef.current * (1 + Math.sin(time) * 0.05);

				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// Define primary waveforms with their respective amplitudes, frequencies, and colors
				const primaryWaveforms = [
					{
						amplitude: oscillatingAmplitude,
						frequency: 0.02,
						alpha: 0.6,
						speed: 0.001,
					},
					{
						amplitude: oscillatingAmplitude * 0.6,
						frequency: 0.03,
						alpha: 0.4,
						speed: 0.004,
					},
					{
						amplitude: oscillatingAmplitude * 0.3,
						frequency: 0.04,
						alpha: 0.2,
						speed: 0.007,
					},
				];

				// For each primary waveform, draw the waveform and its surrounding mesh
				for (const primary of primaryWaveforms) {
					const gradient = ctx.createLinearGradient(
						0,
						0,
						canvas.width,
						canvas.height,
					);
					const stopIncrement = colors.length > 1 ? 1 / (colors.length - 1) : 0;
					colors.forEach((color, index) => {
						gradient.addColorStop(
							stopIncrement * index,
							hexToRgba(color, primary.alpha),
						);
					});

					drawWaveform(
						ctx,
						primary.amplitude,
						primary.frequency,
						gradient,
						Date.now() * primary.speed,
					);

					// Draw secondary waveforms around the primary waveform
					for (let i = 0; i < 30; i++) {
						const amp = primary.amplitude - i * 0.1;
						const freq = primary.frequency + i * 0.00025;
						const alpha = primary.alpha * 0.6 - i * 0.01;
						const gradient = ctx.createLinearGradient(
							0,
							0,
							canvas.width,
							canvas.height,
						);
						const stopIncrement =
							colors.length > 1 ? 1 / (colors.length - 1) : 0;
						colors.forEach((color, index) => {
							gradient.addColorStop(
								stopIncrement * index,
								hexToRgba(color, alpha),
							);
						});

						drawWaveform(
							ctx,
							amp,
							freq,
							gradient,
							Date.now() * primary.speed + i * 0.015,
						);
					}
				}

				animationFrameId = requestAnimationFrame(animate);
			};

			animate();

			// Clean up the animation frame when the component unmounts
			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		}, [colors, drawWaveform]);

		// Render the canvas
		return (
			<canvas ref={canvasRef} width="100%" height="auto" {...props}></canvas>
		);
	},
);
