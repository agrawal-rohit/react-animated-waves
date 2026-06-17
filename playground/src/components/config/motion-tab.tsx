import { SliderField } from "../slider-field";
import { wavePropDescriptions } from "../../prop-descriptions";
import { TabScroll } from "../ui/tabs";
import type { MotionTabProps } from "./types";

/** Motion and playback controls for the wave animation. */
export function MotionTab({
	amplitude,
	setAmplitude,
	intensity,
	setIntensity,
	speed,
	setSpeed,
	smoothing,
	setSmoothing,
}: Readonly<MotionTabProps>) {
	return (
		<TabScroll>
			<SliderField
				label="Amplitude"
				description={wavePropDescriptions.amplitude}
				value={amplitude}
				min={0}
				max={80}
				onChange={setAmplitude}
			/>
			<SliderField
				label="Intensity"
				description={wavePropDescriptions.intensity}
				value={intensity}
				min={0}
				max={1}
				step={0.05}
				onChange={setIntensity}
			/>
			<SliderField
				label="Speed"
				description={wavePropDescriptions.speed}
				value={speed}
				min={0.1}
				max={3}
				step={0.1}
				onChange={setSpeed}
			/>
			<SliderField
				label="Smoothing"
				description={wavePropDescriptions.smoothing}
				value={smoothing}
				min={0}
				max={0.99}
				step={0.01}
				onChange={setSmoothing}
			/>
		</TabScroll>
	);
}
