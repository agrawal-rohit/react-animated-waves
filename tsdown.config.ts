import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: ["./src/index.ts"],
		platform: "browser",
		external: ["react", "react/jsx-runtime"],
		minify: true,
    sourcemap: true,
		dts: true,
	},
]);
