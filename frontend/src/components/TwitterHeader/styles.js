import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  span {
    color: ${colors.black};
    font-size: 1.5rem;
  }

  button {
    padding: 10px;
    border: 1px solid ${colors.blue};
    background: ${colors.blue};
    color: ${colors.white};
    border-radius: 15rem;
    font-weight: bold;
    font-size: 0.8rem;
  }
`;
