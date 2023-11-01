import styled from 'styled-components/native';
import COLORS from '../../styles/colors';
import { DEFAULT_PADDING, DEFAULT_SINGLE_PADDING } from '../../shared/constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.SECONDARY};
`;

export const Header = styled.View`
  z-index: 9;
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  ${DEFAULT_PADDING};
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, 0.8);
  border-radius: 23px;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;

export const ButtonLink = styled.TouchableOpacity`
  background-color: ${COLORS.PRIMARY};
  width: 63px;
  height: 63px;
  border-radius: 35px;
  position: absolute;
  top: 300px;
  right: 15px;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const Title = styled.Text`
  color: ${COLORS.WHITE};
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const ContentArea = styled.View`
  flex-direction: row;
  align-items: center;
  ${DEFAULT_PADDING};
  justify-content: space-between;
`;

export const Rate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.WHITE};
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
`;

export const Description = styled.Text`
  color: ${COLORS.WHITE};
  padding-right: ${DEFAULT_SINGLE_PADDING};
  padding-left: ${DEFAULT_SINGLE_PADDING};
  padding-bottom: 30px;
  line-height: 20px;
`;