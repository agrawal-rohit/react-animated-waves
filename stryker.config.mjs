// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
	_comment:
		"This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
	packageManager: "pnpm",
	reporters: ["html", "json"],
	testRunner: "vitest",
	testRunner_comment:
		"Take a look at https://stryker-mutator.io/docs/stryker-js/vitest-runner for information about the vitest plugin.",
	coverageAnalysis: "perTest",
	plugins: [
		"@stryker-mutator/vitest-runner",
		"@stryker-mutator/typescript-checker",
	],
	checkers: ["typescript"],
	tsconfigFile: "tsconfig.json",
	typescriptChecker: {
		prioritizePerformanceOverAccuracy: true,
	},
};
export default config;
