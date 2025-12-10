import React from "react";
import { describe, expect, it } from "vitest";
import { Waves } from "../src/index";

describe("index", () => {
	it("exports Waves component", () => {
		expect(Waves).toBeDefined();
		expect(typeof Waves).toBe("object");
	});

	it("Waves component can be rendered", () => {
		expect(() => React.createElement(Waves)).not.toThrow();
	});
});
