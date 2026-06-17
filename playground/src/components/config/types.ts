import type { WaveLayer } from "../../../../src";
import type { PlaygroundPreset } from "../../presets";

export type PlaygroundColor = {
	id: string;
	value: string;
};

export type PlaygroundLayer = WaveLayer & {
	id: string;
};

export type ConfigPanelProps = {
	amplitude: number;
	setAmplitude: (value: number) => void;
	colors: PlaygroundColor[];
	updateColor: (id: string, value: string) => void;
	addColor: () => void;
	removeColor: (id: string) => void;
	reorderColors: (activeId: string, overId: string) => void;
	preset: PlaygroundPreset;
	applyPreset: (preset: PlaygroundPreset) => void;
	speed: number;
	setSpeed: (value: number) => void;
	smoothing: number;
	setSmoothing: (value: number) => void;
	frequency: number;
	setFrequency: (value: number) => void;
	waveCount: number;
	setWaveCount: (value: number) => void;
	lineCount: number;
	setLineCount: (value: number) => void;
	pinch: number;
	setPinch: (value: number) => void;
	opacity: number;
	setOpacity: (value: number) => void;
	amplitudeOscillation: number;
	setAmplitudeOscillation: (value: number) => void;
	intensity: number;
	setIntensity: (value: number) => void;
	useCustomLayers: boolean;
	setUseCustomLayers: (value: boolean) => void;
	layers: PlaygroundLayer[];
	updateLayer: (id: string, field: keyof WaveLayer, value: number) => void;
	addLayer: () => void;
	removeLayer: (id: string) => void;
};

export type ColorsTabProps = Pick<
	ConfigPanelProps,
	| "colors"
	| "updateColor"
	| "addColor"
	| "removeColor"
	| "reorderColors"
>;

export type MotionTabProps = Pick<
	ConfigPanelProps,
	| "amplitude"
	| "setAmplitude"
	| "intensity"
	| "setIntensity"
	| "speed"
	| "setSpeed"
	| "smoothing"
	| "setSmoothing"
>;

export type ShapeTabProps = Pick<
	ConfigPanelProps,
	| "frequency"
	| "setFrequency"
	| "waveCount"
	| "setWaveCount"
	| "lineCount"
	| "setLineCount"
	| "pinch"
	| "setPinch"
	| "opacity"
	| "setOpacity"
	| "amplitudeOscillation"
	| "setAmplitudeOscillation"
>;

export type AdvancedTabProps = Pick<
	ConfigPanelProps,
	| "useCustomLayers"
	| "setUseCustomLayers"
	| "layers"
	| "updateLayer"
	| "addLayer"
	| "removeLayer"
	| "lineCount"
>;
