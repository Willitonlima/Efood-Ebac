import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { HeaderPerfil as Header } from '../../components/Header'
import Footer from '../../components/Footer'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Main = styled.main`
  max-width: 560px;
  margin: 0 auto;
  padding: 80px 40px;
  text-align: center;
  animation: ${fadeUp} 0.4s ease;
`

const CheckIcon = styled.div`
  font-size: 56px;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #E66767;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
`

const InfoCard = styled.div`
  background: #FFF0E6;
  border-radius: 4px;
  padding: 20px 24px;
  margin-bottom: 24px;
  text-align: left;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #555;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
  &:last-child { margin-bottom: 0; }
`

const InfoLabel = styled.span`
  font-weight: 700;
  color: #E66767;
`

const Desc = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 32px;
  font-family: 'Roboto', sans-serif;
`

const BackBtn = styled(Link)`
  display: inline-block;
  background: #E66767;
  color: white;
  text-decoration: none;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  &:hover { background: #c94f4f; }
`

const OrderConfirmation: React.FC = () => {
  const { confirmation } = useAppSelector((s) => s.order)

  if (!confirmation) {
    return (
      <>
        <Header />
        <Main>
          <Title>Nenhum pedido encontrado</Title>
          <BackBtn to="/">Voltar ao início</BackBtn>
        </Main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Main>
        <CheckIcon>✅</CheckIcon>
        <Title>Pedido realizado com sucesso!</Title>

        <InfoCard>
          {confirmation.orderId && (
            <InfoRow>
              <InfoLabel>Pedido:</InfoLabel>
              <span>#{String(confirmation.orderId)}</span>
            </InfoRow>
          )}
          {confirmation.delivery?.receiver && (
            <InfoRow>
              <InfoLabel>Para:</InfoLabel>
              <span>{confirmation.delivery.receiver}</span>
            </InfoRow>
          )}
          {confirmation.delivery?.address?.description && (
            <InfoRow>
              <InfoLabel>Endereço:</InfoLabel>
              <span>
                {confirmation.delivery.address.description}
                {confirmation.delivery.address.number ? `, ${confirmation.delivery.address.number}` : ''}
                {confirmation.delivery.address.city ? ` - ${confirmation.delivery.address.city}` : ''}
              </span>
            </InfoRow>
          )}
        </InfoCard>

        <Desc>
          Estamos preparando seu pedido com muito carinho!
          Em breve ele chegará até você. Obrigado por escolher o efood!
        </Desc>

        <BackBtn to="/">Voltar ao início</BackBtn>
      </Main>
      <Footer />
    </>
  )
}

export default OrderConfirmation
