import styled from 'styled-components/native'
import COLORS from '../../styles/colors'

const defaultHeightSize = '70px'

export const Container = styled.View`
  height: ${defaultHeightSize};
  flex-direction: row;
  align-items: center;
  padding-left: 14px;
`

export const MenuButton = styled.TouchableOpacity`
  height: ${defaultHeightSize};
  align-items: center;
  flex-direction: row;
`

export const Title = styled.Text`
  color: ${COLORS.WHITE};
  font-size: 23px;
  font-weight: bold;
  margin-left: 14px;
`