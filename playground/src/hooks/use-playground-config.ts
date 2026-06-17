import { useState } from "react";
import type { WaveLayer } from "../../../src";
import {
	defaultPlaygroundConfig,
	playgroundPresets,
	type PlaygroundPreset,
} from "../presets";
import type { PlaygroundLayer } from "../components/config/types";

const createPlaygroundColor = (value: string) => ({
	id: crypto.randomUUID(),
	value,
});

const defaultColors = defaultPlaygroundConfig.colors.map(createPlaygroundColor);

const createPlaygroundLayer = (layer: WaveLayer): PlaygroundLayer => ({
	id: crypto.randomUUID(),
	...layer,
});

const defaultLayerValues: WaveLayer[] = [
	{
		amplitudeMultiplier: 1,
		frequency: 0.02,
		alpha: 0.6,
		speed: 0.001,
		meshCount: 20,
	},
	{
		amplitudeMultiplier: 0.6,
		frequency: 0.03,
		alpha: 0.4,
		speed: 0.004,
		meshCount: 20,
	},
];

const defaultLayers = defaultLayerValues.map(createPlaygroundLayer);

const toWaveLayers = (layers: PlaygroundLayer[]): WaveLayer[] =>
	layers.map(({ id: _id, ...layer }) => layer);

/**
 * Owns all interactive playground configuration state and the handlers that
 * mutate it.
 *
 * @returns Wave preview props and config panel props ready to spread into
 *   their respective layout components.
 */
export function usePlaygroundConfig() {
	const [amplitude, setAmplitude] = useState(20);
	const [colors, setColors] = useState(defaultColors);
	const [preset, setPreset] = useState<PlaygroundPreset>("default");
	const [speed, setSpeed] = useState(defaultPlaygroundConfig.speed);
	const [smoothing, setSmoothing] = useState(defaultPlaygroundConfig.smoothing);
	const [frequency, setFrequency] = useState(defaultPlaygroundConfig.frequency);
	const [waveCount, setWaveCount] = useState(defaultPlaygroundConfig.waveCount);
	const [lineCount, setLineCount] = useState(defaultPlaygroundConfig.lineCount);
	const [pinch, setPinch] = useState(defaultPlaygroundConfig.pinch);
	const [opacity, setOpacity] = useState(defaultPlaygroundConfig.opacity);
	const [amplitudeOscillation, setAmplitudeOscillation] = useState(
		defaultPlaygroundConfig.amplitudeOscillation,
	);
	const [intensity, setIntensity] = useState(1);
	const [useCustomLayers, setUseCustomLayers] = useState(false);
	const [layers, setLayers] = useState<PlaygroundLayer[]>(defaultLayers);

	const updateColor = (id: string, value: string) => {
		setColors((current) =>
			current.map((color) => (color.id === id ? { ...color, value } : color)),
		);
	};

	const addColor = () => {
		setColors((current) => [...current, createPlaygroundColor("#436EDB")]);
	};

	const removeColor = (id: string) => {
		setColors((current) =>
			current.length > 1 ? current.filter((color) => color.id !== id) : current,
		);
	};

	const reorderColors = (activeId: string, overId: string) => {
		setColors((current) => {
			const fromIndex = current.findIndex((color) => color.id === activeId);
			const toIndex = current.findIndex((color) => color.id === overId);
			if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
				return current;
			}

			const next = [...current];
			const [moved] = next.splice(fromIndex, 1);
			next.splice(toIndex, 0, moved);
			return next;
		});
	};

	const updateLayer = (id: string, field: keyof WaveLayer, value: number) => {
		setLayers((current) =>
			current.map((layer) =>
				layer.id === id ? { ...layer, [field]: value } : layer,
			),
		);
	};

	const addLayer = () => {
		setLayers((current) => [
			...current,
			createPlaygroundLayer({
				amplitudeMultiplier: 0.3,
				frequency: 0.04,
				alpha: 0.2,
				speed: 0.007,
				meshCount: lineCount,
			}),
		]);
	};

	const removeLayer = (id: string) => {
		setLayers((current) =>
			current.length > 1 ? current.filter((layer) => layer.id !== id) : current,
		);
	};

	const applyPreset = (nextPreset: PlaygroundPreset) => {
		const config = playgroundPresets[nextPreset];
		setPreset(nextPreset);
		setSpeed(config.speed);
		setSmoothing(config.smoothing);
		setFrequency(config.frequency);
		setWaveCount(config.waveCount);
		setLineCount(config.lineCount);
		setPinch(config.pinch);
		setOpacity(config.opacity);
		setAmplitudeOscillation(config.amplitudeOscillation);
		setColors(config.colors.map(createPlaygroundColor));
	};

	return {
		previewProps: {
			amplitude,
			colors: colors.map((color) => color.value),
			speed,
			smoothing,
			frequency,
			waveCount,
			lineCount,
			pinch,
			opacity,
			amplitudeOscillation,
			intensity,
			layers: useCustomLayers ? toWaveLayers(layers) : undefined,
		},
		configPanelProps: {
			amplitude,
			setAmplitude,
			colors,
			updateColor,
			addColor,
			removeColor,
			reorderColors,
			preset,
			applyPreset,
			speed,
			setSpeed,
			smoothing,
			setSmoothing,
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
			intensity,
			setIntensity,
			useCustomLayers,
			setUseCustomLayers,
			layers,
			updateLayer,
			addLayer,
			removeLayer,
		},
	};
}
