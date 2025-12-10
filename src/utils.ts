/**
 * Linearly interpolates between two numeric values.
 *
 * Given a start value `a` and an end value `b`, returns the value that lies
 * `t` fraction of the way from `a` to `b`. The interpolation factor `t` is
 * typically in the range [0, 1], where 0 returns `a` and 1 returns `b`.
 * No clamping is performed on `t` (values outside [0, 1] will extrapolate).
 *
 * @param a - Start value.
 * @param b - End value.
 * @param t - Interpolation factor between 0 and 1 (no automatic clamping).
 * @returns The interpolated numeric value at fraction `t` between `a` and `b`.
 *
 * @example
 * lerp(0, 10, 0.5); // returns 5
 */
export const lerp = (a: number, b: number, t: number): number => {
	return a + t * (b - a);
};

/**
 * Convert a hexadecimal color to an rgba(...) CSS string.
 *
 * The `hex` parameter may optionally start with a leading '#'. This function
 * expects a 6-digit hexadecimal color (e.g. "#aabbcc" or "aabbcc"). The
 * returned string is a valid CSS `rgba(r, g, b, a)` representation where
 * `r`, `g`, and `b` are integer values in [0, 255] and `a` is the supplied
 * alpha value.
 *
 * Note: This function does not perform strict validation on the `hex` input.
 * Passing non-hex characters or an incorrectly sized hex string may produce
 * unexpected results.
 *
 * @param hex - Hex color string (with or without leading '#'), expected 6 hex digits.
 * @param alpha - Opacity value between 0 and 1 (default: 1).
 * @returns A CSS rgba(...) string representing the color and alpha.
 *
 * @example
 * hexToRgba('#ff0000', 0.5); // returns "rgba(255, 0, 0, 0.5)"
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
	if (hex[0] === "#") {
		hex = hex.slice(1);
	}

	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
