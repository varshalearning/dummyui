import React from 'react';
import styled from 'styled-components';

const LogoText = styled.h1`
  background: linear-gradient(135deg, #0066CC 0%, #00CCFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
`;

const WeighLinkLogo = () => {
  return <LogoText>WeighLink</LogoText>;
};

export default WeighLinkLogo;