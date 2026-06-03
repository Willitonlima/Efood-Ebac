import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeCart, removeItem } from '../../store/cartSlice'

const slideIn = keyframes`from{transform:translateX(100%)}to{transform:translateX(0)}`

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 900;
`

const Drawer = styled.div`
  position: fixed;
  top: 0; right: 0;
  width: 360px;
  height: 100vh;
  background: #E66767;
  z-index: 901;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease;
  display: flex;
  flex-direction: column;
`

/* Each item row: white background */
const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
`

const ItemImg = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  flex-shrink: 0;
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #333;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 4px;
`

const ItemPrice = styled.p`
  font-size: 12px;
  color: #555;
  font-family: 'Roboto', sans-serif;
`

const RemoveBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 14px;
  padding: 4px;
  line-height: 1;
  font-weight: 700;
  &:hover { color: #E66767; }
`

const BottomSection = styled.div`
  background: #E66767;
  padding: 20px 16px 24px;
  margin-top: auto;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const TotalLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: white;
  font-family: 'Roboto', sans-serif;
`

const TotalValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: white;
  font-family: 'Roboto', sans-serif;
`

const ContinueBtn = styled.button`
  width: 100%;
  background: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  &:hover { background: white; }
`

const EmptyMsg = styled.p`
  color: white;
  text-align: center;
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;
`

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isOpen, items } = useAppSelector((s) => s.cart)

  if (!isOpen) return null

  const total = items.reduce((acc, i) => acc + i.preco * i.quantity, 0)

  const handleCheckout = () => {
    dispatch(closeCart())
    navigate('/checkout')
  }

  return (
    <>
      <Overlay onClick={() => dispatch(closeCart())} />
      <Drawer>
        {items.length === 0 ? (
          <EmptyMsg>O carrinho está vazio</EmptyMsg>
        ) : (
          <>
            {items.map((item) => (
              <ItemRow key={item.id}>
                {item.foto && <ItemImg src={item.foto} alt={item.nome} />}
                <ItemInfo>
                  <ItemName>{item.nome}</ItemName>
                  <ItemPrice>R$ {Number(item.preco).toFixed(2).replace('.', ',')}</ItemPrice>
                </ItemInfo>
                <RemoveBtn onClick={() => dispatch(removeItem(item.id))}>✕</RemoveBtn>
              </ItemRow>
            ))}
            <BottomSection>
              <TotalRow>
                <TotalLabel>Valor total</TotalLabel>
                <TotalValue>R$ {total.toFixed(2).replace('.', ',')}</TotalValue>
              </TotalRow>
              <ContinueBtn onClick={handleCheckout}>Continuar com o estrego</ContinueBtn>
            </BottomSection>
          </>
        )}
      </Drawer>
    </>
  )
}

export default Cart
