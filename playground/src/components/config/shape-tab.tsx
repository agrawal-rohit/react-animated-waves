import { SliderField } from "../slider-field";
import { wavePropDescriptions } from "../../prop-descriptions";
import { TabScroll } from "../ui/tabs";
import type { ShapeTabProps } from "./types";

/** Wave geometry and appearance controls. */
export function ShapeTab({
	frequency,
	setFrequency,
	waveCount,
	setWaveCount,
	lineCount,
	setLineCount,
	pinch,
	setPinch,
	opacity,
	setOpacity,
	amplitudeOscillation,
	setAmplitudeOscillation,
}: Readonly<ShapeTabProps>) {
	return (
		<TabScroll>
			<SliderField
				label="Frequency"
				description={wavePropDescriptions.frequency}
				value={frequency}
				min={0.1}
				max={3}
				step={0.1}
				onChange={setFrequency}
			/>
			<SliderField
				label="Wave count"
				description={wavePropDescriptions.waveCount}
				value={waveCount}
				min={1}
				max={6}
				onChange={setWaveCount}
			/>
			<SliderField
				label="Line count"
				description={wavePropDescriptions.lineCount}
				value={lineCount}
				min={0}
				max={50}
				onChange={setLineCount}
			/>
			<SliderField
				label="Pinch"
				description={wavePropDescriptions.pinch}
				value={pinch}
				min={1}
				max={12}
				onChange={setPinch}
			/>
			<SliderField
				label="Opacity"
				description={wavePropDescriptions.opacity}
				value={opacity}
				min={0.1}
				max={2}
				step={0.05}
				onChange={setOpacity}
			/>
			<SliderField
				label="Amplitude oscillation"
				description={wavePropDescriptions.amplitudeOscillation}
				value={amplitudeOscillation}
				min={0}
				max={0.2}
				step={0.01}
				onChange={setAmplitudeOscillation}
			/>
		</TabScroll>
	);
}
