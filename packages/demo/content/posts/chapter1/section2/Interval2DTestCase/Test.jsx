import React, { Component } from 'react';
import styled from '@emotion/styled';
// import { Interval2D, Interval1D, Counter, StdRandom, Point2D } from 'algs4';

async function testCase(times) {
  const { Interval2D, Interval1D, Counter, StdRandom, Point2D, StdDraw } = await import('algs4');
  StdDraw.setCanvasSize(600, 600);
  const xinterval = new Interval1D(150, 450);
  const yinterval = new Interval1D(150, 450);
  const box = new Interval2D(xinterval, yinterval);
  box.draw();

  const counter = new Counter('hits');
  for (let i = 0; i < times; i++) {
    const x = StdRandom.uniform(600);
    const y = StdRandom.uniform(600);
    const p = new Point2D(x, y);
    if (box.contains(p)) {
      counter.increment();
    } else {
      p.draw();
    }
  }
}

export default class Interval2DTestCase extends Component {
  componentDidMount() {
    testCase(100000);
  }

  render() {
    return (
      <Wrap>
        <div id="CanvasContainer" />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;
