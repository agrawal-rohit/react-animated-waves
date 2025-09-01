<div align="center">
  
# React Animated Waves

<p align="center" style="width: 80%; margin: auto">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/agrawal-rohit/react-animated-waves/Publish.yml">
<img alt="Codacy coverage" src="https://img.shields.io/codacy/coverage/09220ab3d193472ba76d1ad50f11ee51">
<img alt="npm" src="https://img.shields.io/npm/dw/react-animated-waves">
<img alt="Licence" src="https://img.shields.io/github/license/agrawal-rohit/react-animated-waves">
</p>

[Installation](#installation) • [Usage](#usage) • [Props](#props) • [Contributing](#contributing) • [License](#license)
</div>

<br />

![Aug-24-2024 22-55-33](https://cdn.rohit.build/work%3Areact-animated-waves%3Avoice-demo.gif)

A canvas-based component built with React for creating fluid animated waves _(ideally used in audio visualizations, voice UIs, progress loaders, etc.)_.

## Installation

The easiest way to get the latest version of `react-animated-waves` is to install it via npm, yarn or pnpm:

```bash
npm install react-animated-waves
```

## Usage

Import the `Waves` component from the library and use it in your React app. Check out an interactive demo [here](https://codesandbox.io/p/sandbox/react-animated-waves-example-6z9hlh).

```jsx
import Waves from "react-animated-waves";

<Waves amplitude={20} colors={["#FF6AC6", "#436EDB", "#FF6AC6"]} />;
```

## Props

The `Waves` component accepts the following props:

| Prop        | Description                                                                 | Default       |
| ----------- | --------------------------------------------------------------------------- | ------------- |
| `amplitude` | Defines the height of the waveform. Higher values result in taller waves.   | `20`          |
| `colors`    | An array of colors used to create a linear gradient effect on the waveform. | `['#436EDB']` |

## Contributing

Contributions are welcome. Please read the [contributing guide](CONTRIBUTING.md) for more information.

## License

[MIT License](LICENSE).
