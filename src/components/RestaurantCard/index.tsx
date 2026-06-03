import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Restaurant } from '../../types'

interface Props {
  restaurant: Restaurant
}

/* Figma: 472×398, border 1px #E66767 */
const Card = styled.div`
  background: white;
  border: 1px solid #E66767;
  border-radius: 4px;
  overflow: hidden;
  width: 472px;
  height: 398px;
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  position: relative;
  height: 217px;
  flex-shrink: 0;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const TagsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`

const Tag = styled.span`
  background: #E66767;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 6px 10px;
  font-family: 'Roboto', sans-serif;
`

const Body = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

/* Figma: color #E66767, font Roboto 900 18px */
const Name = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: #E66767;
  font-family: 'Roboto', sans-serif;
`

const RatingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 900;
  color: #E66767;
  font-family: 'Roboto', sans-serif;
`

const Star = styled.span`
  color: #E8B84B;
  font-size: 20px;
`

/* Figma: description color #E66767 */
const Desc = styled.p`
  font-size: 14px;
  color: #E66767;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
`

const SaibaMaisBtn = styled.button`
  background: #E66767;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  align-self: flex-start;
  &:hover { background: #c94f4f; }
`

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const navigate = useNavigate()
  return (
    <Card>
      <ImageWrapper>
        <Img src={restaurant.capa} alt={restaurant.titulo} />
        <TagsWrapper>
          {restaurant.destacado && <Tag>Destaque da semana</Tag>}
          {restaurant.tipo && <Tag>{restaurant.tipo}</Tag>}
        </TagsWrapper>
      </ImageWrapper>
      <Body>
        <TitleRow>
          <Name>{restaurant.titulo}</Name>
          <RatingBox>{restaurant.avaliacao} <Star>★</Star></RatingBox>
        </TitleRow>
        <Desc>{restaurant.descricao}</Desc>
        <SaibaMaisBtn onClick={() => navigate(`/restaurante/${restaurant.id}`)}>
          Saiba mais
        </SaibaMaisBtn>
      </Body>
    </Card>
  )
}

export default RestaurantCard
