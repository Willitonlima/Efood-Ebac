import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { HeaderPerfil } from '../../components/Header'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import ProductModal from '../../components/ProductModal'
import { Restaurant as RestaurantType, Product } from '../../types'
import fundoImg from '../../assets/fundo.png'

/* Hero: 1366×280, text aligned to container (padding 171px) */
const HeroWrapper = styled.section`
  position: relative;
  height: 280px;
  overflow: hidden;
`

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const HeroDim = styled.div`
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.52);
`

/* Hero text aligned to container — same 171px padding as the rest */
const HeroContent = styled.div`
  position: absolute; inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 171px;
  max-width: 1366px;
  margin: 0 auto;
  left: 0; right: 0;
`

/* Figma: categoria italic, Roboto, white */
const HeroCategory = styled.span`
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  font-family: 'Roboto', sans-serif;
`

/* Figma: restaurant name, Roboto 900 32px white */
const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: white;
  font-family: 'Roboto', sans-serif;
  line-height: 1;
`

/* Products area: fundo background */
const Main = styled.main`
  background-image: url(${fundoImg});
  background-repeat: repeat;
  background-size: auto;
`

/* Figma: produtos container 1024×708, left 171px */
const Grid = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 48px 171px;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 32px;
  justify-content: start;
`

const LoadingMsg = styled.p`
  text-align: center; color: #888; padding: 60px 0;
  font-family: 'Roboto', sans-serif;
`

const Restaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((r) => r.json())
      .then((data: RestaurantType[]) => {
        const found = data.find((r) => String(r.id) === String(id))
        setRestaurant(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <><HeaderPerfil /><LoadingMsg>Carregando...</LoadingMsg><Footer /></>
  if (!restaurant) return <><HeaderPerfil /><LoadingMsg>Restaurante não encontrado.</LoadingMsg><Footer /></>

  return (
    <>
      <HeaderPerfil />
      <HeroWrapper>
        <HeroImg src={restaurant.capa} alt={restaurant.titulo} />
        <HeroDim />
        <HeroContent>
          <HeroCategory>{restaurant.tipo}</HeroCategory>
          <HeroTitle>{restaurant.titulo}</HeroTitle>
        </HeroContent>
      </HeroWrapper>
      <Main>
        <Grid>
          {(restaurant.cardapio || []).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={setSelectedProduct}
            />
          ))}
        </Grid>
      </Main>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          restaurantId={restaurant.id}
          restaurantName={restaurant.titulo}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </>
  )
}

export default Restaurant
