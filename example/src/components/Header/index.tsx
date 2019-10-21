import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

export default function Header() {
  return (
    <Head>
      <Nav>
      <Link to="/">首页</Link>
    </Nav>
    </Head>
  )
}

const Head = styled.header`
  width: 100%;
  color: #ccc;
  padding: 25px;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`


`;
