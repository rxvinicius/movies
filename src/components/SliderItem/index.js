import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate,
} from './styles'
import COLORS from '../../styles/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SliderItem() {
  return (
    <Container>
      <BannerItem
        source={{ uri: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
      />
      <Title>sdsds</Title>
      <RateContainer>
        <Ionicons name='md-star' />
        <Rate>9/10</Rate>
      </RateContainer>
    </Container>
  )
}