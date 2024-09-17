import React from 'react';
import styled from 'styled-components';
import '../../App.css';

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  align-items: center;
`;

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MainContainer className="main">{children}</MainContainer>;
};

export default Main;