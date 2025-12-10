import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "happy-dom",
		globals: true,
		setupFiles: "./tests/setup.ts",
		exclude: [...configDefaults.exclude, "**/.stryker-tmp/**"],
		coverage: {
			reporter: ["text", "lcov", "html"],
			exclude: [
				...(configDefaults.coverage.exclude || []),
				"**/commitlint.config.js",
				"**/lint-staged.config.js",
				"**/tsdown.config.ts",
				"**/stryker.config.mjs",
				"**/playground/**",
			],
		},
	},
});
