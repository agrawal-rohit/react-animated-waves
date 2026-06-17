import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
	toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/** Whether the active theme resolves to dark, including system preference. */
function isDarkTheme(theme: Theme) {
	return (
		theme === "dark" ||
		(theme === "system" &&
			globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
	);
}

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "playground-theme",
}: Readonly<ThemeProviderProps>) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const persistTheme = useCallback(
		(nextTheme: Theme) => {
			localStorage.setItem(storageKey, nextTheme);
			setTheme(nextTheme);
		},
		[storageKey],
	);

	const toggleTheme = useCallback(() => {
		persistTheme(isDarkTheme(theme) ? "light" : "dark");
	}, [theme, persistTheme]);

	const value = useMemo(
		() => ({
			theme,
			setTheme: persistTheme,
			toggleTheme,
		}),
		[theme, persistTheme, toggleTheme],
	);

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) 
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
}
