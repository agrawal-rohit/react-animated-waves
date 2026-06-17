import { HelpCircleIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type HelpTooltipProps = {
	description: string;
};

/** Info icon that reveals helper text in a tooltip on hover or focus. */
export function HelpTooltip({ description }: Readonly<HelpTooltipProps>) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					aria-label="More information"
				>
					<HelpCircleIcon className="size-3" aria-hidden />
				</button>
			</TooltipTrigger>
			<TooltipContent>{description}</TooltipContent>
		</Tooltip>
	);
}
