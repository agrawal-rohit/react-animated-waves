import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Waves } from "../src/waves";

describe("Waves", () => {
	it("renders without crashing", () => {
		expect(() => render(<Waves />)).not.toThrow();
	});

	it("renders a canvas element", () => {
		const { container } = render(<Waves />);
		const canvas = container.querySelector("canvas");
		expect(canvas).toBeInTheDocument();
	});

	it("applies default attributes to canvas", () => {
		const { container } = render(<Waves />);
		const canvas = container.querySelector("canvas");
		expect(canvas).toHaveAttribute("width", "100%");
		expect(canvas).toHaveAttribute("height", "auto");
	});

	it("applies custom props to canvas", () => {
		const { container } = render(
			<Waves className="custom-class" data-testid="waves-canvas" />,
		);
		const canvas = container.querySelector("canvas");
		expect(canvas).toHaveClass("custom-class");
		expect(canvas).toHaveAttribute("data-testid", "waves-canvas");
	});

	it("accepts colors prop", () => {
		expect(() =>
			render(<Waves colors={["#ff0000", "#00ff00"]} />),
		).not.toThrow();
	});

	it("accepts amplitude prop", () => {
		expect(() => render(<Waves amplitude={30} />)).not.toThrow();
	});

	it("executes animation frame once", () => {
		let callCount = 0;
		const originalRAF = global.requestAnimationFrame;
		const originalCAF = global.cancelAnimationFrame;
		const originalDate = Date.now;
		const originalGetContext = HTMLCanvasElement.prototype.getContext;

		const mockCtx = {
			strokeStyle: "",
			beginPath: vi.fn(),
			lineTo: vi.fn(),
			stroke: vi.fn(),
			clearRect: vi.fn(),
			createLinearGradient: vi.fn(() => ({
				addColorStop: vi.fn(),
			})),
			canvas: { width: 800, height: 400 },
		};

		vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
			mockCtx as any,
		);
		vi.spyOn(global, "requestAnimationFrame").mockImplementation((cb) => {
			if (callCount++ === 0) {
				cb(0);
			}
			return callCount;
		});
		vi.spyOn(global, "cancelAnimationFrame").mockImplementation(vi.fn());
		vi.spyOn(Date, "now").mockReturnValue(1000);

		const { container } = render(<Waves colors={["#ff0000", "#00ff00"]} />);
		const canvas = container.querySelector("canvas") as HTMLCanvasElement;
		// Mock parentElement
		Object.defineProperty(canvas, "parentElement", {
			value: { clientWidth: 800 },
			writable: true,
		});
		canvas.height = 400;

		expect(global.requestAnimationFrame).toHaveBeenCalled();
		expect(mockCtx.clearRect).toHaveBeenCalled();
		expect(mockCtx.createLinearGradient).toHaveBeenCalled();
		expect(mockCtx.stroke).toHaveBeenCalled();
		expect(mockCtx.beginPath).toHaveBeenCalled();
		expect(mockCtx.lineTo.mock.calls.length).toBeGreaterThan(1000);

		// Restore mocks
		global.requestAnimationFrame = originalRAF;
		global.cancelAnimationFrame = originalCAF;
		Date.now = originalDate;
		HTMLCanvasElement.prototype.getContext = originalGetContext;
	});

	it("executes animation frame once with single color", () => {
		let callCount = 0;
		const originalRAF = global.requestAnimationFrame;
		const originalCAF = global.cancelAnimationFrame;
		const originalDate = Date.now;
		const originalGetContext = HTMLCanvasElement.prototype.getContext;

		const mockCtx = {
			strokeStyle: "",
			beginPath: vi.fn(),
			lineTo: vi.fn(),
			stroke: vi.fn(),
			clearRect: vi.fn(),
			createLinearGradient: vi.fn(() => ({
				addColorStop: vi.fn(),
			})),
			canvas: { width: 800, height: 400 },
		};

		vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
			mockCtx as any,
		);
		vi.spyOn(global, "requestAnimationFrame").mockImplementation((cb) => {
			if (callCount++ === 0) {
				cb(0);
			}
			return callCount;
		});
		vi.spyOn(global, "cancelAnimationFrame").mockImplementation(vi.fn());
		vi.spyOn(Date, "now").mockReturnValue(1000);

		const { container } = render(<Waves />); // default single color
		const canvas = container.querySelector("canvas") as HTMLCanvasElement;
		// Mock parentElement
		Object.defineProperty(canvas, "parentElement", {
			value: { clientWidth: 800 },
			writable: true,
		});
		canvas.height = 400;

		expect(global.requestAnimationFrame).toHaveBeenCalled();
		expect(mockCtx.clearRect).toHaveBeenCalled();
		expect(mockCtx.createLinearGradient).toHaveBeenCalled();
		expect(mockCtx.stroke).toHaveBeenCalled();
		expect(mockCtx.beginPath).toHaveBeenCalled();
		expect(mockCtx.lineTo.mock.calls.length).toBeGreaterThan(1000);

		// Restore mocks
		global.requestAnimationFrame = originalRAF;
		global.cancelAnimationFrame = originalCAF;
		Date.now = originalDate;
		HTMLCanvasElement.prototype.getContext = originalGetContext;
	});

	it("handles multiple colors", () => {
		expect(() =>
			render(<Waves colors={["#ff0000", "#00ff00", "#0000ff"]} />),
		).not.toThrow();
	});

	it("handles zero amplitude", () => {
		expect(() => render(<Waves amplitude={0} />)).not.toThrow();
	});
});
