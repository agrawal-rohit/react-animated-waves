import { Code, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

/** Top navigation bar with external links and a light/dark theme toggle. */
export function PlaygroundNavbar() {
	const { toggleTheme } = useTheme();

	return (
		<header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-3 sm:gap-4 sm:px-4">
			<div className="min-w-0 flex flex-col gap-0.25">
				<h1 className="truncate text-sm font-medium sm:text-base">
					React Animated Waves
				</h1>
				<p className="text-[0.825rem] leading-none text-muted-foreground">
					Interactive playground
				</p>
			</div>

			<div className="flex shrink-0 items-center gap-1 sm:gap-2">
				<Button variant="outline" size="sm" asChild>
					<a
						href="https://github.com/agrawal-rohit/react-animated-waves"
						target="_blank"
						rel="noreferrer"
					>
						<Code className="size-3.5!" />
						<span className="hidden leading-0 sm:inline">GitHub</span>
					</a>
				</Button>
				<Button
					size="sm"
					className="bg-[#CB3837] hover:bg-[#CB3837]/80"
					asChild
				>
					<a
						href="https://www.npmjs.com/package/react-animated-waves"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="size-3! fill-white"
						>
							<title>npm</title>
							<path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
						</svg>
						<span className="hidden leading-0 sm:inline">npm</span>
					</a>
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="relative size-8"
					aria-label="Toggle theme"
					onClick={toggleTheme}
				>
					<Sun className="size-3.5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute size-3.5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
				</Button>
			</div>
		</header>
	);
}
