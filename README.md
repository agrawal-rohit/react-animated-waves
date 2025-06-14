<div align="center">
<h2>React Animated Waves</h2>
<p align="center" style="width: 80%; margin: auto">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/agrawal-rohit/react-animated-waves/Publish.yml">
<img alt="Codacy coverage" src="https://img.shields.io/codacy/coverage/09220ab3d193472ba76d1ad50f11ee51">
<img alt="npm" src="https://img.shields.io/npm/dw/react-animated-waves">
<img alt="Licence" src="https://img.shields.io/github/license/agrawal-rohit/react-animated-waves">
</p>
</div>

<br /><br />

![Aug-24-2024 22-55-33](https://github.com/user-attachments/assets/348b84bf-d2f8-406b-a162-e0a480c9e273)

A lightweight and customizable React component that creates stunning animated wave effects. Perfect for enhancing audio visualizations, adding dynamic loading states, or creating eye-catching UI elements in your React apps.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Props](#props)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

**React Animated Waves** can be installed using either npm or yarn:

**Using npm:**

```bash
npm install --save react-animated-waves
```

**Using yarn:**

```bash
yarn add react-animated-waves
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

All contributions from the community are welcome. Please read the [contributing guide](CONTRIBUTING.md) for more information.

## License

[MIT License](LICENSE).
