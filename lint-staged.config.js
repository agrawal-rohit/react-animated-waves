/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
	// Only run Biome on code/config files that Biome actually processes (see biome.json).
	"src/**/*.{js,ts,jsx,tsx,cjs,mjs,json,css}": "pnpm check",
};
