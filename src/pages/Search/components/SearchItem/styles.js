import styled from 'styled-components/native';
import { DEFAULT_SINGLE_PADDING } from '../../../../shared/constants';
import COLORS from '../../../../styles/colors';

export const Container = styled.TouchableOpacity`
  padding: ${DEFAULT_SINGLE_PADDING};
`;

export const Banner = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  color: ${COLORS.WHITE};
  font-size: 18px;
  font-weight: bold;
  padding-top: 8px;
`;

export const RateContainer = styled.View`
  padding-top: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.Text`
  color: ${COLORS.WHITE};
  padding-left: 4px;
`;
