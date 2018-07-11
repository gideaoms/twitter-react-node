import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  background: ${props => (props.type === 'error' ? colors.red : colors.green)};

  p {
    color: ${colors.white};
    flex: 1;
  }

  button {
    padding: 5px;
    background: transparent;
    border: 1px solid ${colors.white};
    color: ${colors.white};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 0.8rem;
  }
`;
