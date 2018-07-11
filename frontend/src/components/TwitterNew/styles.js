import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  margin-top: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    color: ${colors.black};
  }

  button {
    padding: 10px;
    border: none;
    background: ${colors.blue};
    color: ${colors.white};
    font-weight: bold;
    font-size: 0.8rem;
  }
`;
