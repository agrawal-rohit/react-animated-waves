import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ColorPickerProps = {
	color: string;
	onChange: (color: string) => void;
};

export function ColorPicker({ color, onChange }: Readonly<ColorPickerProps>) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="h-9 w-full justify-start gap-2 px-2 text-sm uppercase"
					aria-label={`Color ${color}`}
				>
					<span
						aria-hidden="true"
						className="size-5 shrink-0 rounded border border-border"
						style={{ backgroundColor: color }}
					/>
					<span className="truncate">{color}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="w-auto border-0 p-0 shadow-lg"
				onOpenAutoFocus={(event) => event.preventDefault()}
			>
				<section aria-label="Color selection controls" className="color-picker-root">
					<SketchPicker
						color={color}
						disableAlpha
						onChange={(result: ColorResult) => onChange(result.hex)}
					/>
				</section>
			</PopoverContent>
		</Popover>
	);
}
