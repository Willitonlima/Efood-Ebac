import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { openCart } from '../../store/cartSlice'
import fundoImg from '../../assets/fundo.png'
import logoImg from '../../assets/logo.png'

/* ── shared wrapper ── */
const Wrapper = styled.header`
  background-image: url(${fundoImg});
  background-repeat: repeat;
  background-size: auto;
  width: 100%;
`

/* ── HOME header: only logo, centered ── */
const HomeInner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 28px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

/* ── PERFIL header: Restaurantes | logo | carrinho ── */
const PerfilInner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 22px 171px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoImg = styled.img`
  height: 40px;
  display: block;
`

/* Home – logo as a link but NO border (image already has border baked in) */
const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`

const NavLink = styled(Link)`
  color: #E66767;
  text-decoration: none;
  font-size: 18px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  line-height: 1;
`

const CartBtn = styled.button`
  background: none;
  border: none;
  color: #E66767;
  font-size: 18px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  line-height: 1;
`

/* ── Home variant: only logo ── */
export const HeaderHome: React.FC = () => (
  <Wrapper>
    <HomeInner>
      <LogoLink to="/">
        <LogoImg src={logoImg} alt="efood" />
      </LogoLink>
    </HomeInner>
  </Wrapper>
)

/* ── Perfil (restaurant) variant: full header ── */
export const HeaderPerfil: React.FC = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)
  const total = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <Wrapper>
      <PerfilInner>
        <NavLink to="/">Restaurantes</NavLink>
        <LogoLink to="/">
          <LogoImg src={logoImg} alt="efood" />
        </LogoLink>
        <CartBtn onClick={() => dispatch(openCart())}>
          {total} produto{total !== 1 ? 's' : ''} no carrinho
        </CartBtn>
      </PerfilInner>
    </Wrapper>
  )
}

export default HeaderHome
