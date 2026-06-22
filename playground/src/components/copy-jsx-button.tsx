import { Check, Copy } from "lucide-react";
import { useState } from "react";
import {
	buildPlaygroundJsxConfig,
	formatPlaygroundJsx,
} from "../format-playground-jsx";
import type { ConfigPanelProps } from "./config/types";
import { Button } from "./ui/button";

export function CopyJsxButton(props: Readonly<ConfigPanelProps>) {
	const [copied, setCopied] = useState(false);

	const copyJsx = async () => {
		const code = formatPlaygroundJsx(buildPlaygroundJsxConfig(props));

		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			globalThis.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			className="w-full"
			onClick={() => void copyJsx()}
		>
			{copied ? <Check /> : <Copy />}
			{copied ? "Copied" : "Copy JSX"}
		</Button>
	);
}
