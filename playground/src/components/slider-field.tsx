import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

type SliderFieldProps = {
	label: string;
	description?: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
};

export function SliderField({
	label,
	description,
	value,
	min,
	max,
	step = 1,
	onChange,
}: Readonly<SliderFieldProps>) {
	return (
		<div className="flex flex-col gap-2.5">
			<div className="flex items-center justify-between gap-2">
				<Label description={description}>{label}</Label>
				<span className="text-sm font-medium text-muted-foreground">{value}</span>
			</div>
			<Slider
				min={min}
				max={max}
				step={step}
				value={[value]}
				onValueChange={([next]) => onChange(next ?? value)}
			/>
		</div>
	);
}
