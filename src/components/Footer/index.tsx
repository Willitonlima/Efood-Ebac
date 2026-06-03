import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import fundoImg from '../../assets/fundo.png'
import logoImg from '../../assets/logo.png'
import redesSociaisImg from '../../assets/redes_sociais.png'

const FooterWrapper = styled.footer`
  background-image: url(${fundoImg});
  background-repeat: repeat;
  background-size: auto;
  padding: 32px 40px 24px;
  text-align: center;
  width: 100%;
`

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`

const LogoImg = styled.img`
  height: 40px;
  display: block;
`

const SocialImg = styled.img`
  height: 28px;
  margin-bottom: 28px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const Disclaimer = styled.p`
  font-size: 10px;
  color: #888;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`

const Footer: React.FC = () => (
  <FooterWrapper>
    <div><LogoLink to="/"><LogoImg src={logoImg} alt="efood" /></LogoLink></div>
    <SocialImg src={redesSociaisImg} alt="redes sociais" />
    <Disclaimer>
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pelos serviços,
      qualidade dos produtos e entrega são totalmente do estabelecimento contratado.
    </Disclaimer>
  </FooterWrapper>
)

export default Footer
