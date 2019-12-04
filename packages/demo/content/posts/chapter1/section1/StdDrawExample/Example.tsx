import React, { Component } from 'react';
import styled from '@emotion/styled';

class StdDrawCase {
  StdDraw =
    typeof window !== `undefined` ? require('algs4/lib/StdDraw').default : null;
  StdRandom =
    typeof window !== `undefined`
      ? require('algs4/lib/StdRandom').default
      : null;

  functionValue(n: number): void {
    const { StdDraw } = this;
    // StdDraw.setCanvasSize(sideLength, sideLength);
    StdDraw.setScale(10, -0.3164);
    // StdDraw.setTranslate(0, -3164);
    for (let i = 1; i <= n; i++) {
      StdDraw.point(i, i);
      StdDraw.point(i, i * i);
      StdDraw.point(i, i * Math.log(i));
    }
  }

  randomArray(
    n: number,
    newContainer = 'CanvasContainer1',
    newCanvas = 'canvas1'
  ) {
    const { StdDraw, StdRandom } = this;
    StdDraw.createNewCanvas(newContainer, newCanvas);
    // StdDraw.setCanvasSize(440, 240);
    // StdDraw.setTranslate(0, -2048);
    // StdDraw.setCanvasSize(n, n);
    const a: number[] = [];
    for (let i = 0; i < n; i++) {
      a[i] = StdRandom.random();
    }
    for (let i = 1; i <= n; i++) {
      const x = i * 10; // (1.0 * i) / n
      const y = (a[i - 1] * 400) / 2; // a[i] / 2.0
      const rw = 2; // 0.5 / n
      const rh = y - 5; // a[i] / 2.0
      StdDraw.filledRectangle(x, y, rw, rh);
    }
  }

  sortArray(
    n: number,
    newContainer = 'CanvasContainer2',
    newCanvas = 'canvas2'
  ) {
    const { StdDraw, StdRandom } = this;
    StdDraw.createNewCanvas(newContainer, newCanvas);
    // StdDraw.setCanvasSize(440, 240);
    // StdDraw.setTranslate(0, -2048);
    // StdDraw.setCanvasSize(n, n);
    const a: number[] = [];
    for (let i = 0; i < n; i++) {
      a[i] = StdRandom.random();
    }
    a.sort();
    for (let i = 1; i <= n; i++) {
      const x = i * 10; // (1.0 * i) / n
      const y = (a[i - 1] * 400) / 2; // a[i] / 2.0
      const rw = 2; // 0.5 / n
      const rh = y - 5; // a[i] / 2.0
      StdDraw.filledRectangle(x, y, rw, rh);
    }
  }
}

export default class StdDrawExample extends Component {
  componentDidMount() {
    const drawCase = new StdDrawCase();
    drawCase.functionValue(1000);
    drawCase.randomArray(45);
    drawCase.sortArray(45);
  }

  render() {
    return (
      <Wrap>
        <div id="CanvasContainer" />
        <div id="CanvasContainer1" />
        <div id="CanvasContainer2" />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    padding: 20px 0;
  }
`;
