import type { WaveLayer, WavesProps } from "../../src";
import type { ConfigPanelProps } from "./components/config/types";
import type { PlaygroundWaveConfig } from "./presets";

const layerPropNames = [
	"amplitudeMultiplier",
	"frequency",
	"alpha",
	"speed",
	"meshCount",
	"phaseOffset",
] as const satisfies readonly (keyof WaveLayer)[];

/**
 * Builds the exportable JSX configuration from playground panel state.
 * @param input - Live playground configuration values.
 */
export function buildPlaygroundJsxConfig(
	input: ConfigPanelProps,
): PlaygroundWaveConfig &
	Required<Pick<WavesProps, "amplitude" | "intensity">> &
	Pick<WavesProps, "layers"> {
	return {
		amplitude: input.amplitude,
		colors: input.colors.map((color) => color.value),
		speed: input.speed,
		smoothing: input.smoothing,
		frequency: input.frequency,
		waveCount: input.waveCount,
		lineCount: input.lineCount,
		pinch: input.pinch,
		opacity: input.opacity,
		amplitudeOscillation: input.amplitudeOscillation,
		intensity: input.intensity,
		layers: input.useCustomLayers
			? input.layers.map(({ id: _id, ...layer }) => layer)
			: undefined,
	};
}

/**
 * Formats a playground configuration as paste-ready React JSX.
 * @param config - Normalized playground configuration.
 */
export function formatPlaygroundJsx(
	config: ReturnType<typeof buildPlaygroundJsxConfig>,
): string {
	const lines = [
		'import { Waves } from "react-animated-waves";',
		"",
		'<div style={{ height: 240 }}>',
		"  <Waves",
		`    amplitude={${formatJsxNumber(config.amplitude)}}`,
		`    colors={${JSON.stringify(config.colors)}}`,
		`    speed={${formatJsxNumber(config.speed)}}`,
		`    smoothing={${formatJsxNumber(config.smoothing)}}`,
		`    frequency={${formatJsxNumber(config.frequency)}}`,
		`    waveCount={${formatJsxNumber(config.waveCount)}}`,
		`    lineCount={${formatJsxNumber(config.lineCount)}}`,
		`    pinch={${formatJsxNumber(config.pinch)}}`,
		`    opacity={${formatJsxNumber(config.opacity)}}`,
		`    amplitudeOscillation={${formatJsxNumber(config.amplitudeOscillation)}}`,
	];

	if (config.intensity !== 1) {
		lines.push(`    intensity={${formatJsxNumber(config.intensity)}}`);
	}

	if (config.layers) {
		lines.push(`    layers={${formatJsxLayers(config.layers)}}`);
	}

	lines.push(
		'    height="100%"',
		'    className="block h-full w-full"',
		"  />",
		"</div>",
	);

	return lines.join("\n");
}

/**
 * Formats a numeric value for JSX attribute output.
 * @param value - Numeric prop value.
 */
function formatJsxNumber(value: number): string {
	return JSON.stringify(value);
}

/**
 * Formats custom wave layers for a JSX `layers` prop.
 *
 * @param layers - Layer overrides configured in the playground.
 */
function formatJsxLayers(layers: WaveLayer[]): string {
	const formattedLayers = layers
		.map((layer) => formatJsxLayer(layer))
		.join(",\n    ");

	return `[\n    ${formattedLayers}\n  ]`;
}

/**
 * Formats a single wave layer object for JSX output.
 * @param layer - Layer override values.
 */
function formatJsxLayer(layer: WaveLayer): string {
	const entries = layerPropNames.flatMap((propName) => {
		const value = layer[propName];
		if (value === undefined) return [];

		return [`${propName}: ${formatJsxNumber(value)}`];
	});

	return `{\n      ${entries.join(",\n      ")}\n    }`;
}
