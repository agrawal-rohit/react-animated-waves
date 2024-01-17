import React from 'react';
import { render } from '@testing-library/react';
import AudioWaves from '../index';
import '@testing-library/jest-dom';

// Mock canvas context
HTMLCanvasElement.prototype.getContext = (() => {
  // return whatever context you want to use in your tests
  return {
    canvas: {
      width: 500,
      height: 500,
      style: {
        width: '100%',
        height: '100%',
      },
    },
    fillRect: function () {},
    clearRect: function () {},
    getImageData: function (x: any, y: any, w: any, h: any) {
      return {
        data: new Array(w * h * 4),
      };
    },
    putImageData: function () {},
    createImageData: function () {
      return [];
    },
    setTransform: function () {},
    drawImage: function () {},
    save: function () {},
    fillText: function () {},
    restore: function () {},
    beginPath: function () {},
    moveTo: function () {},
    lineTo: function () {},
    closePath: function () {},
    stroke: function () {},
    translate: function () {},
    scale: function () {},
    rotate: function () {},
    arc: function () {},
    fill: function () {},
    measureText: function () {
      return { width: 0 };
    },
    transform: function () {},
    rect: function () {},
    clip: function () {},
    createLinearGradient: function () {
      return {
        addColorStop: function () {},
      };
    },
  };
}) as any;

describe('AudioWaves Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AudioWaves />);
    expect(container).toMatchSnapshot();
  });

  it('renders with default props', () => {
    const { container } = render(<AudioWaves />);
    expect(container).toMatchSnapshot();
  });

  it('renders with custom amplitude', () => {
    const { container } = render(<AudioWaves amplitude={50} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with custom colors', () => {
    const { container } = render(
      <AudioWaves colors={['#FF0000', '#00FF00', '#0000FF']} />
    );
    expect(container).toMatchSnapshot();
  });
});
