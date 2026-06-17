import { Waves } from "../../src";
import { PlaygroundConfigAside } from "./components/playground-config-aside";
import { PlaygroundNavbar } from "./components/playground-navbar";
import { usePlaygroundConfig } from "./hooks/use-playground-config";

export const App = () => {
	const { previewProps, configPanelProps } = usePlaygroundConfig();

	return (
		<div className="flex h-svh flex-col overflow-hidden">
			<PlaygroundNavbar />
			<div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
				<main className="relative min-h-0 min-w-0 flex-1 bg-muted/30">
					<Waves
						{...previewProps}
						height="100%"
						className="absolute inset-0 block h-full w-full"
					/>
				</main>
				<PlaygroundConfigAside {...configPanelProps} />
			</div>
		</div>
	);
};
