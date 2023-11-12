import styled from 'styled-components/native';
import { DEFAULT_SINGLE_PADDING } from '../../../../shared/constants';
import COLORS from '../../../../styles/colors';

export const Container = styled.View`
  padding: 7px ${DEFAULT_SINGLE_PADDING};
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ContentArea = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 70%;
`;

export const Banner = styled.Image`
  width: 40%;
  height: 140px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  padding: 10px 30px 10px 15px;
  color: ${COLORS.WHITE};
  font-size: 15px;
  font-weight: bold;
  padding-top: 8px;
  width: 100%;
`;

export const DeleteArea = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: 30%;
`;
