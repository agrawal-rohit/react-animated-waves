import { Label } from "./label";
import { Switch } from "./switch";

type ToggleFieldProps = {
	id: string;
	label: string;
	description?: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
};

/** Label + switch row used for boolean configuration fields. */
export function ToggleField({
	id,
	label,
	description,
	checked,
	onCheckedChange,
}: Readonly<ToggleFieldProps>) {
	return (
		<div className="flex items-center justify-between gap-3">
			<Label htmlFor={id} description={description}>
				{label}
			</Label>
			<Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
		</div>
	);
}
