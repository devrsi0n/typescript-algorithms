import React, { Component } from 'react';
import styled from '@emotion/styled';
// import { Interval2D, Interval1D, Counter, StdRandom, Point2D } from 'algs4';

async function testCase(times = 512) {
  const StdRandom = require('algs4/lib/StdRandom').default;
  const VisualAccumulator = require('algs4/lib/VisualAccumulator').default;
  const acc = new VisualAccumulator();
  for (let i = 0; i < times; i++) {
    acc.addDataValue(StdRandom.random() * 512);
  }
}

export default class Interval2DTestCase extends Component {
  componentDidMount() {
    testCase();
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
