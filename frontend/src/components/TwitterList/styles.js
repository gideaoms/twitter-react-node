import styled from 'styled-components';
import { colors } from '../../styles';

export const Loading = styled.span`
  color: ${colors.black};
  font-size: 1.2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  button {
    background: none;
    color: ${colors.blue};
    width: 100px;
    border: 1px solid ${colors.blue};
    font-size: 1rem;
    padding: 5px;
  }

  ul {
    list-style: none;
    margin-top: 20px;
  }

  li {
    display: flex;
    color: ${colors.black};
    border-bottom: 1px solid ${colors.black};
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  li:last-child {
    border-bottom: none;
  }
`;
