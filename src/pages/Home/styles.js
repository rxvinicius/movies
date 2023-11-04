import styled from 'styled-components/native';
import COLORS from '../../styles/colors';
import { DEFAULT_PADDING } from '../../shared/constants';

const defaultHeightSize = '50px';

export const Container = styled.SafeAreaView`
  background-color: ${COLORS.SECONDARY};
  flex: 1;
  padding: 4px 0;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${defaultHeightSize};
  align-items: center;
  ${DEFAULT_PADDING};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: ${COLORS.LIGHT_GRAY};
  width: 85%;
  height: ${defaultHeightSize};
  border-radius: 50px;
  padding: 8px 15px;
  font-size: 16px;
  color: ${COLORS.WHITE};
`;

export const SearchButton = styled.TouchableOpacity`
  width: 15%;
  height: ${defaultHeightSize};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  padding: 10px 14px 8px 14px;
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.WHITE};
`;

export const BannerButton = styled.TouchableOpacity`
  padding-bottom: 12px;
`;

export const Banner = styled.Image`
  height: 180px;
  border-radius: 7px;
  margin: 0 14px;
`;

export const SliderMovie = styled.FlatList`
  height: 230px;
  ${DEFAULT_PADDING};
`;
