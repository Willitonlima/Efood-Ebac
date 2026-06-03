import React from 'react'
import styled from 'styled-components'
import { Product } from '../../types'

interface Props {
  product: Product
  onOpenModal: (p: Product) => void
}

const Card = styled.div`
  background: #E66767;
  border: 3px solid #E66767;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Img = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  display: block;
`

const Body = styled.div`
  padding: 8px 8px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Name = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
`

const Desc = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.95);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
`

const AddBtn = styled.button`
  width: 100%;
  background: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  &:hover { background: white; }
`

const ProductCard: React.FC<Props> = ({ product, onOpenModal }) => (
  <Card>
    {product.foto && <Img src={product.foto} alt={product.nome} />}
    <Body>
      <Name>{product.nome}</Name>
      <Desc>{product.descricao}</Desc>
      <AddBtn onClick={() => onOpenModal(product)}>Adicionar ao carrinho</AddBtn>
    </Body>
  </Card>
)

export default ProductCard
