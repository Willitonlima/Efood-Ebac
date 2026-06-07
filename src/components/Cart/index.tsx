import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearCartKeepOpen, closeCart, decrementItem, incrementItem, removeItem } from '../../store/cartSlice'
import { setConfirmation, setError, setLoading } from '../../store/orderSlice'

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

const Header = styled.div`
  padding: 24px 16px 12px;
`

const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: #FFEBD9;
  margin-bottom: 6px;
  font-family: 'Roboto', sans-serif;
`

const HeaderSubtitle = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.9);
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 344px;
  min-height: 100px;
  background: #FFEBD9;
  padding: 12px 16px;
  margin: 12px auto;
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
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif;
`

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const ItemPrice = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  &:hover { border-color: #999; }
`

const QuantityValue = styled.span`
  font-size: 14px;
  color: #333;
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

const Content = styled.div`
  padding: 0 0 24px;
  flex: 1;
`

const Section = styled.div`
  padding: 0 16px 16px;
  margin-bottom: 16px;
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #FFEBD9;
  margin-bottom: 14px;
  font-family: 'Roboto', sans-serif;
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

const PrimaryBtn = styled(ContinueBtn)`
  padding: 10px 12px;
  margin-top: 6px;
`

const SecondaryBtn = styled(PrimaryBtn)`
  margin-top: 6px;
`

const Fieldset = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 14px;
`

const Label = styled.label`
  color: #FFEBD9;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
  font-family: 'Roboto', sans-serif;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 0;
  background: #FFEBD9;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  outline: none;
  color: #333;
  transition: none;
`

const ErrorMsg = styled.p`
  color: white;
  background: rgba(179,58,58,0.2);
  padding: 12px 14px;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
`

const EmptyMsg = styled.p`
  color: white;
  text-align: center;
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;
`

const SuccessCard = styled.div`
  background: #E66767;
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-family: 'Roboto', sans-serif;
`

const SuccessParagraph = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.6;
`

interface FormState {
  receiver: string
  address: string
  city: string
  zipCode: string
  number: string
  complement: string
  cardName: string
  cardNumber: string
  cardCode: string
  expiresMonth: string
  expiresYear: string
}

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, items } = useAppSelector((s) => s.cart)
  const { loading, error } = useAppSelector((s) => s.order)
  const [checkoutMode, setCheckoutMode] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [form, setForm] = useState<FormState>({
    receiver: '', address: '', city: '', zipCode: '',
    number: '', complement: '', cardName: '', cardNumber: '',
    cardCode: '', expiresMonth: '', expiresYear: '',
  })

  if (!isOpen) return null

  const total = items.reduce((acc, item) => acc + item.preco * item.quantity, 0)
  const quantityCount = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.receiver || !form.address || !form.cardName || !form.cardNumber || !form.cardCode || !form.expiresMonth || !form.expiresYear) {
      dispatch(setError('Preencha todos os campos obrigatórios.'))
      return
    }
    if (items.length === 0) {
      dispatch(setError('O carrinho está vazio.'))
      return
    }

    dispatch(setLoading(true))
    try {
      const products = items.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({ id: item.id, price: item.preco }))
      )

      const res = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          delivery: {
            receiver: form.receiver,
            address: {
              description: form.address,
              city: form.city,
              zipCode: form.zipCode,
              number: Number(form.number),
              complement: form.complement,
            },
          },
          payment: {
            card: {
              name: form.cardName,
              number: form.cardNumber,
              code: Number(form.cardCode),
              expires: {
                month: Number(form.expiresMonth),
                year: Number(form.expiresYear),
              },
            },
          },
        }),
      })
      const data = await res.json()
      dispatch(setConfirmation(data))
      dispatch(clearCartKeepOpen())
      setOrderSuccess(true)
      setCheckoutMode(false)
    } catch {
      dispatch(setError('Erro ao processar o pedido. Tente novamente.'))
    }
  }

  const handleClose = () => {
    dispatch(closeCart())
    setCheckoutMode(false)
    setCheckoutStep(1)
    setOrderSuccess(false)
    dispatch(setError(''))
  }

  return (
    <>
      <Overlay onClick={handleClose} />
      <Drawer>
        <Header>
          <HeaderTitle>Meu carrinho</HeaderTitle>
          <HeaderSubtitle>{quantityCount} item{quantityCount !== 1 ? 's' : ''} selecionado{quantityCount !== 1 ? 's' : ''}</HeaderSubtitle>
        </Header>
        <Content>
          {orderSuccess ? (
            <SuccessCard>
              <SectionTitle>Pedido em preparação</SectionTitle>
              <SuccessParagraph>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</SuccessParagraph>
              <SuccessParagraph>Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.</SuccessParagraph>
              <SuccessParagraph>Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.</SuccessParagraph>
              <SuccessParagraph>Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!</SuccessParagraph>
              <PrimaryBtn onClick={handleClose}>Fechar</PrimaryBtn>
            </SuccessCard>
          ) : items.length === 0 ? (
            <EmptyMsg>O carrinho está vazio</EmptyMsg>
          ) : checkoutMode ? (
            <>
              {checkoutStep === 1 ? (
                <Section>
                  <SectionTitle>Endereço de entrega</SectionTitle>
                  <Fieldset>
                    <Label>Quem irá receber</Label>
                    <Input name="receiver" value={form.receiver} onChange={handleChange} placeholder="Nome completo" />
                  </Fieldset>
                  <Fieldset>
                    <Label>Endereço</Label>
                    <Input name="address" value={form.address} onChange={handleChange} placeholder="Rua, avenida..." />
                  </Fieldset>
                  <Fieldset>
                    <Label>Cidade</Label>
                    <Input name="city" value={form.city} onChange={handleChange} placeholder="Cidade" />
                  </Fieldset>
                  <Fieldset>
                    <Label>CEP</Label>
                    <Input name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="00000-000" />
                  </Fieldset>
                  <Fieldset>
                    <Label>Número</Label>
                    <Input name="number" value={form.number} onChange={handleChange} placeholder="Número" />
                  </Fieldset>
                  <Fieldset>
                    <Label>Complemento (opcional)</Label>
                    <Input name="complement" value={form.complement} onChange={handleChange} placeholder="Apto, bloco..." />
                  </Fieldset>
                  <PrimaryBtn onClick={() => setCheckoutStep(2)}>
                    Avançar para pagamento
                  </PrimaryBtn>
                  <SecondaryBtn type="button" onClick={() => setCheckoutMode(false)}>
                    Voltar ao carrinho
                  </SecondaryBtn>
                </Section>
              ) : (
                <Section>
                  <SectionTitle>Pagamento</SectionTitle>
                  <Fieldset>
                    <Label>Nome no cartão</Label>
                    <Input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Como está impresso no cartão" />
                  </Fieldset>
                  <Fieldset>
                    <Label>Número do cartão</Label>
                    <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength={19} />
                  </Fieldset>
                  <Fieldset>
                    <Label>CVV</Label>
                    <Input name="cardCode" value={form.cardCode} onChange={handleChange} placeholder="000" maxLength={3} />
                  </Fieldset>
                  <Fieldset>
                    <Label>Mês de vencimento</Label>
                    <Input name="expiresMonth" value={form.expiresMonth} onChange={handleChange} placeholder="MM" maxLength={2} />
                  </Fieldset>
                  <Fieldset>
                    <Label>Ano de vencimento</Label>
                    <Input name="expiresYear" value={form.expiresYear} onChange={handleChange} placeholder="AAAA" maxLength={4} />
                  </Fieldset>
                  {error && <ErrorMsg>{error}</ErrorMsg>}
                  <PrimaryBtn onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processando...' : 'Finalizar pedido'}
                  </PrimaryBtn>
                  <SecondaryBtn type="button" onClick={() => setCheckoutStep(1)}>
                    Voltar ao endereço
                  </SecondaryBtn>
                </Section>
              )}
            </>
          ) : (
            <>
              {items.map((item) => (
                <ItemRow key={item.id}>
                  {item.foto && <ItemImg src={item.foto} alt={item.nome} />}
                  <ItemInfo>
                    <ItemName>{item.nome}</ItemName>
                    <ItemMeta>
                      <ItemPrice>R$ {item.preco.toFixed(2).replace('.', ',')}</ItemPrice>
                      <QuantityControl>
                        <QuantityButton onClick={() => dispatch(decrementItem(item.id))}>−</QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton onClick={() => dispatch(incrementItem(item.id))}>+</QuantityButton>
                      </QuantityControl>
                    </ItemMeta>
                  </ItemInfo>
                  <RemoveBtn onClick={() => dispatch(removeItem(item.id))} aria-label={`Remover ${item.nome}`}>
                    ✕
                  </RemoveBtn>
                </ItemRow>
              ))}
              <BottomSection>
                <TotalRow>
                  <TotalLabel>Valor total</TotalLabel>
                  <TotalValue>R$ {total.toFixed(2).replace('.', ',')}</TotalValue>
                </TotalRow>
                <PrimaryBtn onClick={() => { dispatch(setError('')); setCheckoutMode(true) }}>
                  Finalizar compra
                </PrimaryBtn>
              </BottomSection>
            </>
          )}
        </Content>
      </Drawer>
    </>
  )
}

export default Cart
