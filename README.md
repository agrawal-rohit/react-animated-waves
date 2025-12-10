<div align="center">
  <h2>React Animated Waves</h2>
</div>

<div align="center">
  <p align="center" style="width: 80%; margin: auto">
    <a href="https://github.com/agrawal-rohit/grimoire"><img alt="Made with Grimoire" src="https://img.shields.io/badge/made_with-grimoire-7452A3"></a>
    <img alt="Status" src="https://img.shields.io/github/actions/workflow/status/agrawal-rohit/react-animated-waves/ci.yml">
    <img alt="Sonar Coverage" src="https://img.shields.io/sonar/coverage/agrawal-rohit_react-animated-waves?server=https%3A%2F%2Fsonarcloud.io">
    <img alt="Downloads" src="https://img.shields.io/npm/dt/react-animated-waves">
    <img alt="NPM version" src="https://img.shields.io/npm/v/react-animated-waves">
    <img alt="NPM bundle size" src="https://img.shields.io/bundlephobia/min/react-animated-waves">
    <img alt="License" src="https://img.shields.io/github/license/agrawal-rohit/react-animated-waves" />
  </p>

[Installation](#installation) • [Demo](#demo) • [Usage](#usage) • [Contributing](#contributing) • [License](#license)

<img src="https://cdn.rohit.build/oss/react-animated-waves/github-readme-preview.gif" alt="Preview" style="width: 80%; margin: auto" />

</div>

<br />

`react-animated-waves` is an opinionated canvas-based React component for displaying wave animations. The colors and strength of the wave animations can be customized to support dynamic UIs such as audio visualizations, voice UIs, progress loaders, etc.

## Installation

`react-animated-waves` can be installed using [npm](https://www.npmjs.com/) (or your favorite package manager):

```bash
$ npm install react-animated-waves
```

## Demo

Check out an interactive demo [here](https://codesandbox.io/p/sandbox/react-animated-waves-example-6z9hlh).

## Usage

Import the `Waves` component from `react-animated-waves` and use it in your React app as follows:

```jsx
import Waves from "react-animated-waves";

<Waves amplitude={20} colors={["#FF6AC6", "#436EDB", "#FF6AC6"]} />;
```

### Props

The `Waves` component accepts the following props:

| Prop        | Description                                                                 | Default       |
| ----------- | --------------------------------------------------------------------------- | ------------- |
| `amplitude` | Defines the strength of the waveform. Higher values result in taller waves.   | `20`          |
| `colors`    | An array of hex colors used to create a linear gradient effect on the waveform. | `['#436EDB']` |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to report issues, propose changes, and submit pull requests.

## License

[MIT](LICENSE) © [Rohit Agrawal](https://github.com/agrawal-rohit)
