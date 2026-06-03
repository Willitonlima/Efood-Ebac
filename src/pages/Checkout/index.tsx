import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setConfirmation, setLoading, setError } from '../../store/orderSlice'
import { clearCart } from '../../store/cartSlice'
import { HeaderPerfil as Header } from '../../components/Header'
import Footer from '../../components/Footer'

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

const Main = styled.main`
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 40px;
`

const Section = styled.div`
  background: #E66767;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
`

const SectionTitle = styled.h2`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`

const Row = styled.div<{ cols?: string }>`
  display: grid;
  grid-template-columns: ${(p) => p.cols || '1fr'};
  gap: 12px;
  margin-bottom: 12px;
`

const Label = styled.label`
  color: white;
  font-size: 13px;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 2px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  outline: none;
  color: #333;
`

const SubmitBtn = styled.button`
  width: 100%;
  background: #FFEBD9;
  color: #E66767;
  border: none;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  margin-top: 8px;
  &:hover { background: white; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

const ErrorMsg = styled.p`
  color: white;
  background: rgba(0,0,0,0.15);
  padding: 10px;
  border-radius: 2px;
  margin-top: 10px;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
`

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items } = useAppSelector((s) => s.cart)
  const { loading, error } = useAppSelector((s) => s.order)

  const [form, setForm] = useState<FormState>({
    receiver: '', address: '', city: '', zipCode: '',
    number: '', complement: '', cardName: '', cardNumber: '',
    cardCode: '', expiresMonth: '', expiresYear: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.receiver || !form.address || !form.cardNumber) return
    dispatch(setLoading(true))
    try {
      const body = {
        products: items.map((i) => ({ id: i.id, price: i.preco })),
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
      }
      const res = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      dispatch(setConfirmation(data))
      dispatch(clearCart())
      navigate('/confirmacao')
    } catch {
      dispatch(setError('Erro ao processar o pedido. Tente novamente.'))
    }
  }

  return (
    <>
      <Header />
      <Main>
        <Section>
          <SectionTitle>Entrega</SectionTitle>
          <Row>
            <div>
              <Label>Quem irá receber</Label>
              <Input name="receiver" value={form.receiver} onChange={handleChange} placeholder="Nome completo" />
            </div>
          </Row>
          <Row>
            <div>
              <Label>Endereço</Label>
              <Input name="address" value={form.address} onChange={handleChange} placeholder="Rua, Avenida..." />
            </div>
          </Row>
          <Row cols="1fr 1fr">
            <div>
              <Label>Cidade</Label>
              <Input name="city" value={form.city} onChange={handleChange} />
            </div>
            <div>
              <Label>CEP</Label>
              <Input name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="00000-000" />
            </div>
          </Row>
          <Row cols="80px 1fr">
            <div>
              <Label>Número</Label>
              <Input name="number" value={form.number} onChange={handleChange} />
            </div>
            <div>
              <Label>Complemento (opcional)</Label>
              <Input name="complement" value={form.complement} onChange={handleChange} />
            </div>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Pagamento – Cartão de crédito</SectionTitle>
          <Row>
            <div>
              <Label>Nome no cartão</Label>
              <Input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Como está impresso no cartão" />
            </div>
          </Row>
          <Row cols="3fr 1fr">
            <div>
              <Label>Número do cartão</Label>
              <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength={19} />
            </div>
            <div>
              <Label>CVV</Label>
              <Input name="cardCode" value={form.cardCode} onChange={handleChange} placeholder="000" maxLength={3} />
            </div>
          </Row>
          <Row cols="1fr 1fr">
            <div>
              <Label>Mês de vencimento</Label>
              <Input name="expiresMonth" value={form.expiresMonth} onChange={handleChange} placeholder="MM" maxLength={2} />
            </div>
            <div>
              <Label>Ano de vencimento</Label>
              <Input name="expiresYear" value={form.expiresYear} onChange={handleChange} placeholder="AAAA" maxLength={4} />
            </div>
          </Row>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SubmitBtn onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar pedido'}
          </SubmitBtn>
        </Section>
      </Main>
      <Footer />
    </>
  )
}

export default Checkout
