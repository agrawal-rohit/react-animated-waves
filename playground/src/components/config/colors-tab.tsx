import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "../../lib/utils";
import { ColorPicker } from "../color-picker";
import { Button } from "../ui/button";
import { TabScroll } from "../ui/tabs";
import type { ColorsTabProps } from "./types";

const findDropTarget = (
	clientX: number,
	clientY: number,
	activeId: string,
) => {
	for (const element of document.elementsFromPoint(clientX, clientY)) {
		const item = element.closest<HTMLElement>("[data-color-id]");
		const id = item?.dataset.colorId;
		if (id && id !== activeId) return id;
	}
	return null;
};

/** Color list editor for the wave gradient palette. */
export function ColorsTab({
	colors,
	updateColor,
	addColor,
	removeColor,
	reorderColors,
}: Readonly<ColorsTabProps>) {
	const [draggingId, setDraggingId] = useState<string | null>(null);
	const [dropTargetId, setDropTargetId] = useState<string | null>(null);

	const startReorder = (
		colorId: string,
		event: ReactPointerEvent<HTMLSpanElement>,
	) => {
		if (event.pointerType === "mouse" && event.button !== 0) return;

		event.preventDefault();
		const handle = event.currentTarget;
		handle.setPointerCapture(event.pointerId);
		setDraggingId(colorId);

		const updateDropTarget = (clientX: number, clientY: number) => {
			const targetId = findDropTarget(clientX, clientY, colorId);
			setDropTargetId(targetId);
		};

		const finishReorder = (clientX: number, clientY: number) => {
			const targetId = findDropTarget(clientX, clientY, colorId);
			if (targetId) reorderColors(colorId, targetId);
			setDraggingId(null);
			setDropTargetId(null);
		};

		const onPointerMove = (moveEvent: PointerEvent) => {
			moveEvent.preventDefault();
			updateDropTarget(moveEvent.clientX, moveEvent.clientY);
		};

		const onPointerEnd = (endEvent: PointerEvent) => {
			handle.releasePointerCapture(endEvent.pointerId);
			finishReorder(endEvent.clientX, endEvent.clientY);
			handle.removeEventListener("pointermove", onPointerMove);
			handle.removeEventListener("pointerup", onPointerEnd);
			handle.removeEventListener("pointercancel", onPointerEnd);
		};

		handle.addEventListener("pointermove", onPointerMove);
		handle.addEventListener("pointerup", onPointerEnd);
		handle.addEventListener("pointercancel", onPointerEnd);
	};

	return (
		<TabScroll>
			<ul className="list-none space-y-2" aria-label="Wave colors">
				{colors.map((color) => (
					<li
						key={color.id}
						data-color-id={color.id}
						className={cn(
							"flex items-center gap-1 rounded-md border border-transparent py-0.5 pr-0.5 transition-colors",
							draggingId === color.id && "opacity-50",
							dropTargetId === color.id && "border-primary bg-accent/50",
						)}
					>
						<span
							role="img"
							aria-label={`Drag to reorder color ${color.value}`}
							className={cn(
								"flex pr-1 shrink-0 touch-none items-center justify-center rounded-md text-muted-foreground select-none",
								draggingId === color.id
									? "cursor-grabbing"
									: "cursor-grab active:cursor-grabbing",
							)}
							onPointerDown={(event) => startReorder(color.id, event)}
						>
							<GripVertical className="size-4" aria-hidden />
						</span>
						<div className="min-w-0 flex-1">
							<ColorPicker
								color={color.value}
								onChange={(value) => updateColor(color.id, value)}
							/>
						</div>
						<Button
							size="icon"
							type="button"
							variant="ghost"
							className="size-8 shrink-0 ml-1"
							onClick={() => removeColor(color.id)}
							disabled={colors.length <= 1}
							aria-label={`Remove color ${color.value}`}
						>
							<Trash2 />
						</Button>
					</li>
				))}
			</ul>

			<Button
				type="button"
				variant="outline"
				size="sm"
				className="w-full"
				onClick={addColor}
			>
				<Plus />
				Add color
			</Button>
		</TabScroll>
	);
}
