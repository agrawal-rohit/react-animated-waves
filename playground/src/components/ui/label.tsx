import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";
import { cn } from "../../lib/utils";
import { HelpTooltip } from "./help-tooltip";

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
	description?: string;
};

function Label({ className, description, children, ...props }: Readonly<LabelProps>) {
	const label = (
		<LabelPrimitive.Root
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className,
			)}
			{...props}
		>
			{children}
		</LabelPrimitive.Root>
	);

	if (!description) return label;

	return (
		<span className="inline-flex items-center gap-1">
			{label}
			<HelpTooltip description={description} />
		</span>
	);
}

export { Label };
