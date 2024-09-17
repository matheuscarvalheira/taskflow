import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #4B0082 ;
  color: white;
  margin-top: auto;
`;

const FooterText = styled.div`
  font-size: 1em;
`;

const FooterNav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin-left: 20px;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1em;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 TaskFlow</FooterText>
      <FooterNav>
        <ul>
          <li><a href="#privacidade">Privacidade</a></li>
          <li><a href="#termos">Termos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;