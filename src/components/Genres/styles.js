import styled from 'styled-components/native';
import COLORS from '../../styles/colors';

export const Container = styled.View`
  margin-right: 8px;
  background-color: ${COLORS.GRAY};
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 8px;
`;

export const Name = styled.Text`
  color: ${COLORS.BLACK};
`;