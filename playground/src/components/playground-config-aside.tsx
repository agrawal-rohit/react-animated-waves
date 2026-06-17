import { Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { playgroundPresetOptions, type PlaygroundPreset } from "../presets";
import { playgroundPropDescriptions } from "../prop-descriptions";
import { ConfigPanel, type ConfigPanelProps } from "./config-panel";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function PlaygroundConfigAside(props: Readonly<ConfigPanelProps>) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);

	useEffect(() => {
		const mediaQuery = globalThis.matchMedia("(min-width: 768px)");
		const closeOnDesktop = (event: MediaQueryListEvent) => {
			if (event.matches) setOpen(false);
		};

		mediaQuery.addEventListener("change", closeOnDesktop);
		return () => mediaQuery.removeEventListener("change", closeOnDesktop);
	}, []);

	return (
		<>
			{open && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/50 md:hidden"
					aria-label="Close configuration"
					onClick={() => setOpen(false)}
				/>
			)}

			<aside
				className={cn(
					"flex min-h-0 flex-col bg-background",
					"fixed inset-x-0 bottom-0 z-50 max-h-[min(85dvh,100%)] rounded-t-xl border-t border-border shadow-lg transition-transform duration-300 ease-in-out md:static md:z-auto md:h-full md:w-90 md:max-h-none md:shrink-0 md:rounded-none md:border-l md:border-t-0 md:shadow-none",
					open
						? "translate-y-0"
						: "pointer-events-none translate-y-full md:pointer-events-auto md:translate-y-0",
				)}
			>
				<div className="flex justify-center pt-2 md:hidden">
					<div className="h-1 w-10 rounded-full bg-border" />
				</div>
				<div className="space-y-2 shrink-0 px-4 pb-3 border-b border-border pt-3">
					<div className="flex items-center justify-between">
						<h2 className="text-sm font-medium">Configuration</h2>
						<Button
							size="icon"
							type="button"
							variant="ghost"
							className="size-8 md:hidden"
							onClick={() => setOpen(false)}
							aria-label="Close configuration"
						>
							<X className="size-4" />
						</Button>
					</div>
					<Select
						value={props.preset}
						onValueChange={(value) =>
							props.applyPreset(value as PlaygroundPreset)
						}
					>
						<SelectTrigger id="preset">
							<SelectValue placeholder="Select preset" />
						</SelectTrigger>
						<SelectContent>
							{playgroundPresetOptions.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									description={option.description}
								>
									{option.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<ConfigPanel {...props} />
			</aside>

			<Button
				type="button"
				size="icon"
				className={cn(
					"fixed bottom-4 right-3 z-30 size-12 rounded-full shadow-lg md:hidden",
					open && "pointer-events-none opacity-0",
				)}
				onClick={() => setOpen(true)}
				aria-label="Open configuration"
			>
				<Settings2 className="size-5" />
			</Button>
		</>
	);
}
