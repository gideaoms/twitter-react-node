import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 15px 25px;
  border: 1px solid ${colors.blue};
  background: ${colors.blue};
  color: ${colors.white};
  border-radius: 15rem;
  font-weight: bold;
  font-size: 2rem;
`;
