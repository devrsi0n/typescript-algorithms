import React from 'react';
import styled from '@emotion/styled';

export default function Footer() {
  return (
    <Foot>
      <a href="//github.com/devrsi0n">GitHub</a>
    </Foot>
  )
}

const Foot = styled.footer`
  padding: 25px auto;
  color: #999;
`;
