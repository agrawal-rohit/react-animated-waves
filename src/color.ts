import { TinyColor } from "@ctrl/tinycolor";

/**
 * Convert a CSS color string to an rgba(...) value with the given alpha.
 * @param color - The CSS color string to convert.
 * @param alpha - The alpha value to apply to the color.
 * @returns The rgba(...) value with the given alpha.
 */
export const colorWithAlpha = (color: string, alpha: number) =>
	new TinyColor(color).setAlpha(Math.max(0, alpha)).toRgbString();

export type GradientStops = {
	offset: number;
	color: string;
}[];

export type GradientCache = Map<string, GradientStops>;

/**
 * Resolve linear-gradient stop data for a palette and opacity, reusing cached results.
 * @param cache - Gradient stop cache keyed by palette and alpha.
 * @param colors - The colors to build the gradient stops for.
 * @param alpha - The alpha value to apply to the colors.
 * @returns The gradient stops.
 */
export const getGradientStops = (
	cache: GradientCache,
	colors: string[],
	alpha: number,
) => {
	const key = `${colors.join("|")}:${alpha.toFixed(3)}`;
	const cached = cache.get(key);
	if (cached) return cached;

	const stops = colors.map((color, index) => ({
		offset: colors.length > 1 ? index / (colors.length - 1) : 0,
		color: colorWithAlpha(color, alpha),
	}));
	cache.set(key, stops);
	return stops;
};
