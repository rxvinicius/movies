import styled from 'styled-components/native';
import COLORS from '../../styles/colors';

export const Container = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Title = styled.Text`
  color: ${COLORS.WHITE};
  font-size: 21px;
  font-weight: bold;
  margin-top: 15px;
`;
