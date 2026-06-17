import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AdvancedTab } from "./config/advanced-tab";
import { ColorsTab } from "./config/colors-tab";
import { MotionTab } from "./config/motion-tab";
import { ShapeTab } from "./config/shape-tab";
import type { ConfigPanelProps } from "./config/types";

export type { ConfigPanelProps } from "./config/types";

export function ConfigPanel(props: Readonly<ConfigPanelProps>) {
	return (
		<Tabs defaultValue="colors" className="min-h-0 flex-1">
			<div className="px-4 pt-3 pb-1">
				<TabsList>
					<TabsTrigger value="colors">Colors</TabsTrigger>
					<TabsTrigger value="motion">Motion</TabsTrigger>
					<TabsTrigger value="shape">Shape</TabsTrigger>
					<TabsTrigger value="advanced">Advanced</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="colors" className="mt-0 min-h-0 flex-1">
				<ColorsTab
					colors={props.colors}
					updateColor={props.updateColor}
					addColor={props.addColor}
					removeColor={props.removeColor}
					reorderColors={props.reorderColors}
				/>
			</TabsContent>

			<TabsContent value="motion" className="mt-0 min-h-0 flex-1">
				<MotionTab
					amplitude={props.amplitude}
					setAmplitude={props.setAmplitude}
					intensity={props.intensity}
					setIntensity={props.setIntensity}
					speed={props.speed}
					setSpeed={props.setSpeed}
					smoothing={props.smoothing}
					setSmoothing={props.setSmoothing}
				/>
			</TabsContent>

			<TabsContent value="shape" className="mt-0 min-h-0 flex-1">
				<ShapeTab
					frequency={props.frequency}
					setFrequency={props.setFrequency}
					waveCount={props.waveCount}
					setWaveCount={props.setWaveCount}
					lineCount={props.lineCount}
					setLineCount={props.setLineCount}
					pinch={props.pinch}
					setPinch={props.setPinch}
					opacity={props.opacity}
					setOpacity={props.setOpacity}
					amplitudeOscillation={props.amplitudeOscillation}
					setAmplitudeOscillation={props.setAmplitudeOscillation}
				/>
			</TabsContent>

			<TabsContent value="advanced" className="mt-0 min-h-0 flex-1">
				<AdvancedTab
					useCustomLayers={props.useCustomLayers}
					setUseCustomLayers={props.setUseCustomLayers}
					layers={props.layers}
					updateLayer={props.updateLayer}
					addLayer={props.addLayer}
					removeLayer={props.removeLayer}
					lineCount={props.lineCount}
				/>
			</TabsContent>
		</Tabs>
	);
}
