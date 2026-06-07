import { cleanup, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Waves } from "../src/waves";

type MockCanvasContext = {
	strokeStyle: string;
	beginPath: ReturnType<typeof vi.fn>;
	lineTo: ReturnType<typeof vi.fn>;
	stroke: ReturnType<typeof vi.fn>;
	clearRect: ReturnType<typeof vi.fn>;
	setTransform: ReturnType<typeof vi.fn>;
	createLinearGradient: ReturnType<typeof vi.fn>;
	canvas: { width: number; height: number };
};

const createMockContext = (width = 800, height = 400): MockCanvasContext => ({
	strokeStyle: "",
	beginPath: vi.fn(),
	lineTo: vi.fn(),
	stroke: vi.fn(),
	clearRect: vi.fn(),
	setTransform: vi.fn(),
	createLinearGradient: vi.fn(() => ({
		addColorStop: vi.fn(),
	})),
	canvas: { width, height },
});

type CanvasEnvironmentOptions = {
	width?: number;
	height?: number;
	runAnimationFrames?: number;
	context?: MockCanvasContext;
};

const mockCanvasEnvironment = ({
	width = 800,
	height = 400,
	runAnimationFrames = 1,
	context,
}: CanvasEnvironmentOptions = {}) => {
	let callCount = 0;
	const mockCtx = context ?? createMockContext(width, height);
	const rafCallbacks: FrameRequestCallback[] = [];

	vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
		mockCtx as unknown as CanvasRenderingContext2D, // NOSONAR - partial canvas mock
	);
	vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
		rafCallbacks.push(cb);
		if (callCount++ < runAnimationFrames) {
			cb(0);
		}
		return callCount;
	});
	vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(vi.fn());
	vi.spyOn(Date, "now").mockReturnValue(1000);

	return { mockCtx, rafCallbacks };
};

describe("Waves", () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it("renders without crashing", () => {
		expect(() => render(<Waves />)).not.toThrow();
	});

	it("renders a canvas element", () => {
		const { container } = render(<Waves />);
		expect(container.querySelector("canvas")).toBeInTheDocument();
	});

	it("applies custom props to canvas", () => {
		const { container } = render(
			<Waves className="custom-class" data-testid="waves-canvas" />,
		);
		const canvas = container.querySelector("canvas");
		expect(canvas).toHaveClass("custom-class");
		expect(canvas).toHaveAttribute("data-testid", "waves-canvas");
		expect(canvas).toHaveAttribute("aria-hidden", "true");
	});

	it("forwards the canvas ref and allows aria-hidden override", () => {
		const ref = createRef<HTMLCanvasElement>();
		const { container } = render(
			<Waves ref={ref} aria-hidden={false} className="forwarded-canvas" />,
		);

		expect(ref.current).toBe(container.querySelector("canvas"));
		expect(ref.current).toHaveClass("forwarded-canvas");
		expect(ref.current).toHaveAttribute("aria-hidden", "false");
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
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 800, height: 400 }}>
				<Waves colors={["#ff0000", "#00ff00"]} height={400} />
			</div>,
		);

		expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
		expect(mockCtx.clearRect).toHaveBeenCalled();
		expect(mockCtx.createLinearGradient).toHaveBeenCalled();
		expect(vi.mocked(mockCtx.stroke).mock.calls.length).toBeGreaterThanOrEqual(93);
	});

	it("reuses cached gradient stops across frames", () => {
		const { rafCallbacks } = mockCanvasEnvironment({ runAnimationFrames: 1 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves colors={["#ff0000", "#00ff00"]} height={100} />
			</div>,
		);

		const getSpy = vi.spyOn(Map.prototype, "get");
		rafCallbacks[0]?.(0);

		expect(getSpy.mock.results.some((result) => result.value !== undefined)).toBe(
			true,
		);
	});

	it("does not keep scheduling frames when paused", () => {
		mockCanvasEnvironment({ runAnimationFrames: 0 });

		render(
			<div style={{ width: 400, height: 200 }}>
				<Waves paused colors={["#ff0000"]} height={200} />
			</div>,
		);

		expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
	});

	it("reduces draw count when lineCount is lowered", () => {
		const defaultRun = mockCanvasEnvironment({ width: 200, height: 100 });
		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);
		const defaultStrokes = vi.mocked(defaultRun.mockCtx.stroke).mock.calls.length;

		cleanup();
		vi.restoreAllMocks();

		const sparseRun = mockCanvasEnvironment({ width: 200, height: 100 });
		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves lineCount={5} waveCount={1} height={100} />
			</div>,
		);
		const sparseStrokes = vi.mocked(sparseRun.mockCtx.stroke).mock.calls.length;

		expect(sparseStrokes).toBeLessThan(defaultStrokes);
	});

	it("accepts intensity and animation props", () => {
		expect(() =>
			render(
				<Waves
					intensity={0.75}
					amplitude={40}
					speed={1.2}
					smoothing={0.2}
					amplitudeOscillation={0.03}
				/>,
			),
		).not.toThrow();
	});

	it("handles multiple colors", () => {
		expect(() =>
			render(<Waves colors={["#ff0000", "#00ff00", "#0000ff"]} />),
		).not.toThrow();
	});

	it("handles zero amplitude", () => {
		expect(() => render(<Waves amplitude={0} />)).not.toThrow();
	});

	it("uses a fixed amplitude when oscillation is disabled", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves amplitudeOscillation={0} amplitude={25} height={100} />
			</div>,
		);

		expect(mockCtx.stroke).toHaveBeenCalled();
	});

	it("scales the canvas using an explicit pixel ratio", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves pixelRatio={2} height={100} />
			</div>,
		);

		expect(mockCtx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
	});

	it("supports percentage and fallback height values", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height="50%" />
			</div>,
		);

		expect(mockCtx.clearRect).toHaveBeenCalled();
	});

	it("falls back when percentage height is used before the parent is measured", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(<Waves height="100%" />);

		expect(mockCtx.clearRect).toHaveBeenCalled();
	});

	it("falls back for invalid string heights", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height="invalid-height" />
			</div>,
		);

		expect(mockCtx.clearRect).toHaveBeenCalled();
	});

	it("skips layout updates when canvas sizing is unavailable", async () => {
		vi.resetModules();
		vi.doMock("../src/canvas", async () => {
			const actual = await vi.importActual<typeof import("../src/canvas")>(
				"../src/canvas",
			);

			return {
				...actual,
				applyCanvasLayout: vi.fn(() => null),
			};
		});

		mockCanvasEnvironment({ runAnimationFrames: 0 });
		const { Waves: MockedWaves } = await import("../src/waves");

		expect(() =>
			render(
				<div style={{ width: 200, height: 100 }}>
					<MockedWaves height={100} />
				</div>,
			),
		).not.toThrow();

		vi.doUnmock("../src/canvas");
		vi.resetModules();
	});

	it("supports numeric height and custom layer definitions", () => {
		const { mockCtx } = mockCanvasEnvironment();

		render(
			<div style={{ width: 240, height: 120 }}>
				<Waves
					height={120}
					layers={[
						{
							amplitudeMultiplier: 1,
							frequency: 0.02,
							alpha: 0.6,
							speed: 0.001,
							meshCount: 2,
							phaseOffset: 0.1,
						},
					]}
				/>
			</div>,
		);

		expect(vi.mocked(mockCtx.stroke).mock.calls.length).toBeGreaterThan(0);
	});

	it("renders when setTransform is unavailable on the context", () => {
		const mockCtx = createMockContext();
		delete (mockCtx as { setTransform?: () => void }).setTransform;
		mockCanvasEnvironment({ context: mockCtx });

		expect(() =>
			render(
				<div style={{ width: 200, height: 100 }}>
					<Waves height={100} />
				</div>,
			),
		).not.toThrow();
	});

	it("renders a frame when ResizeObserver is unavailable", () => {
		const originalResizeObserver = globalThis.ResizeObserver;
		// @ts-expect-error test override
		delete globalThis.ResizeObserver;

		const { mockCtx } = mockCanvasEnvironment({ runAnimationFrames: 0 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);

		expect(mockCtx.clearRect).toHaveBeenCalled();

		globalThis.ResizeObserver = originalResizeObserver;
	});

	it("re-renders when ResizeObserver detects a resize", () => {
		let resizeCallback: ResizeObserverCallback = () => undefined;
		const observe = vi.fn();
		const disconnect = vi.fn();

		class MockResizeObserver {
			constructor(callback: ResizeObserverCallback) {
				resizeCallback = callback;
			}

			observe = observe;
			disconnect = disconnect;
		}

		globalThis.ResizeObserver =
			MockResizeObserver as unknown as typeof ResizeObserver;

		const { mockCtx } = mockCanvasEnvironment({ runAnimationFrames: 0 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);

		const callsBeforeResize = vi.mocked(mockCtx.clearRect).mock.calls.length;
		resizeCallback([], {} as ResizeObserver);

		expect(vi.mocked(mockCtx.clearRect).mock.calls.length).toBeGreaterThan(
			callsBeforeResize,
		);
		expect(observe).toHaveBeenCalled();
	});

	it("stops animating when the document becomes hidden", () => {
		const { rafCallbacks } = mockCanvasEnvironment({ runAnimationFrames: 0 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);

		expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(1);

		Object.defineProperty(document, "hidden", {
			configurable: true,
			value: true,
		});
		rafCallbacks.at(-1)?.(0);

		expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(1);
	});

	it("resumes animation when visibility returns", () => {
		mockCanvasEnvironment({ runAnimationFrames: 1 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);

		Object.defineProperty(document, "hidden", {
			configurable: true,
			value: true,
		});
		document.dispatchEvent(new Event("visibilitychange"));

		Object.defineProperty(document, "hidden", {
			configurable: true,
			value: false,
		});
		document.dispatchEvent(new Event("visibilitychange"));

		expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(2);
	});

	it("respects reduced motion preferences and resumes when they change", () => {
		let matches = true;
		const listeners = new Map<string, () => void>();

		vi.spyOn(globalThis, "matchMedia").mockImplementation(
			() =>
				({
					get matches() {
						return matches;
					},
					addEventListener: (event: string, listener: () => void) => {
						listeners.set(event, listener);
					},
					removeEventListener: (event: string) => {
						listeners.delete(event);
					},
				}) as unknown as MediaQueryList,
		);

		mockCanvasEnvironment({ runAnimationFrames: 0 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} respectReducedMotion />
			</div>,
		);

		expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();

		listeners.get("change")?.();
		expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();

		matches = false;
		listeners.get("change")?.();
		expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
	});

	it("ignores reduced motion checks when respectReducedMotion is false", () => {
		vi.spyOn(globalThis, "matchMedia").mockImplementation(
			() =>
				({
					matches: true,
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
				}) as unknown as MediaQueryList,
		);

		mockCanvasEnvironment({ runAnimationFrames: 1 });

		render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} respectReducedMotion={false} />
			</div>,
		);

		expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
	});

	it("cleans up animation and event listeners on unmount", () => {
		mockCanvasEnvironment({ runAnimationFrames: 0 });
		const removeEventListener = vi.spyOn(document, "removeEventListener");
		const { unmount } = render(
			<div style={{ width: 200, height: 100 }}>
				<Waves height={100} />
			</div>,
		);

		unmount();

		expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();
		expect(removeEventListener).toHaveBeenCalledWith(
			"visibilitychange",
			expect.any(Function),
		);
	});
});
