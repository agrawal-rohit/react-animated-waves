import { Plus, Trash2 } from "lucide-react";
import {
	waveLayerPropDescriptions,
	wavePropDescriptions,
} from "../../prop-descriptions";
import { SliderField } from "../slider-field";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TabScroll } from "../ui/tabs";
import { ToggleField } from "../ui/toggle-field";
import type { AdvancedTabProps } from "./types";

/** Rendering options and custom layer editor. */
export function AdvancedTab({
	useCustomLayers,
	setUseCustomLayers,
	layers,
	updateLayer,
	addLayer,
	removeLayer,
	lineCount,
}: Readonly<AdvancedTabProps>) {
	return (
		<TabScroll>
			<ToggleField
				id="custom-layers"
				label="Custom layers"
				description={wavePropDescriptions.layers}
				checked={useCustomLayers}
				onCheckedChange={setUseCustomLayers}
			/>

			{useCustomLayers ? (
				<div className="space-y-3">
					{layers.map((layer, index) => (
						<div
							key={layer.id}
							className="rounded-lg border border-border"
						>
							<div className="flex items-center justify-between border-b border-b-border pl-3.5 pr-2 py-1.5">
								<Label>Layer {index + 1}</Label>
								<Button
									size="icon"
									type="button"
									variant="ghost"
									onClick={() => removeLayer(layer.id)}
									disabled={layers.length <= 1}
									aria-label={`Remove layer ${index + 1}`}
								>
									<Trash2 />
								</Button>
							</div>
							
							<div className="space-y-4 p-4 pb-5">
							<SliderField
								label="Amplitude multiplier"
								description={waveLayerPropDescriptions.amplitudeMultiplier}
								value={layer.amplitudeMultiplier ?? 1}
								min={0.1}
								max={1.5}
								step={0.05}
								onChange={(value) =>
									updateLayer(layer.id, "amplitudeMultiplier", value)
								}
							/>
							<SliderField
								label="Frequency"
								description={waveLayerPropDescriptions.frequency}
								value={layer.frequency ?? 0.02}
								min={0.005}
								max={0.08}
								step={0.001}
								onChange={(value) => updateLayer(layer.id, "frequency", value)}
							/>
							<SliderField
								label="Speed"
								description={waveLayerPropDescriptions.speed}
								value={layer.speed ?? 0.001}
								min={0.0005}
								max={0.02}
								step={0.0005}
								onChange={(value) => updateLayer(layer.id, "speed", value)}
							/>
							<SliderField
								label="Alpha"
								description={waveLayerPropDescriptions.alpha}
								value={layer.alpha ?? 0.5}
								min={0}
								max={1}
								step={0.05}
								onChange={(value) => updateLayer(layer.id, "alpha", value)}
							/>
							<SliderField
								label="Mesh count"
								description={waveLayerPropDescriptions.meshCount}
								value={layer.meshCount ?? lineCount}
								min={0}
								max={50}
								onChange={(value) => updateLayer(layer.id, "meshCount", value)}
							/>
							<SliderField
								label="Phase offset"
								description={waveLayerPropDescriptions.phaseOffset}
								value={layer.phaseOffset ?? 0}
								min={0}
								max={1}
								step={0.01}
								onChange={(value) => updateLayer(layer.id, "phaseOffset", value)}
							/>
							</div>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="w-full"
						onClick={addLayer}
					>
						<Plus />
						Add layer
					</Button>
				</div>
			) : null}
		</TabScroll>
	);
}
