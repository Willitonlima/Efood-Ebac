import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { addItem } from '../../store/cartSlice'
import { Product } from '../../types'

interface Props {
  product: Product
  restaurantId: number
  restaurantName: string
  onClose: () => void
}

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`
const popIn = keyframes`from{transform:scale(0.95);opacity:0}to{transform:scale(1);opacity:1}`

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`

const Modal = styled.div`
  background: #E66767;
  max-width: 540px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  animation: ${popIn} 0.25s ease;
  position: relative;
  display: flex;
`

const CloseBtn = styled.button`
  position: absolute; top: 8px; right: 8px;
  background: none; border: none;
  color: white; font-size: 16px; cursor: pointer;
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; z-index: 2;
`

const ProductImg = styled.img`
  width: 165px;
  min-height: 165px;
  max-height: 240px;
  object-fit: cover;
  flex-shrink: 0;
`

const Info = styled.div`
  padding: 16px 24px 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  padding-right: 20px;
  font-family: 'Roboto', sans-serif;
`

const ProductDesc = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.95);
  line-height: 1.7;
  margin-bottom: 12px;
  flex: 1;
  font-family: 'Roboto', sans-serif;
`

const Serves = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.9);
  margin-bottom: 14px;
  font-family: 'Roboto', sans-serif;
`

const AddBtn = styled.button`
  background: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  width: 100%;
  &:hover { background: white; }
`

const ProductModal: React.FC<Props> = ({ product, restaurantId, restaurantName, onClose }) => {
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    dispatch(addItem({ item: product, restaurantId, restaurantName }))
    onClose()
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        {product.foto && <ProductImg src={product.foto} alt={product.nome} />}
        <Info>
          <ProductName>{product.nome}</ProductName>
          <ProductDesc>{product.descricao}</ProductDesc>
          {product.porcao && <Serves>Serve: {product.porcao}</Serves>}
          <AddBtn onClick={handleAdd}>
            Adicionar ao carrinho - R$ {Number(product.preco).toFixed(2).replace('.', ',')}
          </AddBtn>
        </Info>
      </Modal>
    </Overlay>
  )
}

export default ProductModal
