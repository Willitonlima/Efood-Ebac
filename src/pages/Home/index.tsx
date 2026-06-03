import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HeaderHome } from '../../components/Header'
import Footer from '../../components/Footer'
import RestaurantCard from '../../components/RestaurantCard'
import { Restaurant } from '../../types'
import fundoImg from '../../assets/fundo.png'

/* Hero section: fundo background + red title, no header nav */
const HeroBanner = styled.section`
  background-image: url(${fundoImg});
  background-repeat: repeat;
  background-size: auto;
  padding: 56px 80px 64px;
  text-align: center;
`

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #E66767;
  line-height: 1.3;
  font-family: 'Roboto', sans-serif;
`

/* Main content: white/transparent background, max-width container */
const Main = styled.main`
  max-width: 1366px;
  margin: 0 auto;
  padding: 56px 171px;
`

/* 2-column grid, cards 472×398 as per Figma */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 472px);
  gap: 40px 80px;
  justify-content: center;
`

const LoadingMsg = styled.p`
  text-align: center;
  color: #888;
  padding: 60px 0;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((r) => r.json())
      .then((data: Restaurant[]) => { setRestaurants(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <HeaderHome />
      <HeroBanner>
        <HeroTitle>
          Viva experiências gastronômicas<br />
          no conforto da sua casa
        </HeroTitle>
      </HeroBanner>
      <Main>
        {loading ? (
          <LoadingMsg>Carregando restaurantes...</LoadingMsg>
        ) : (
          <Grid>
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </Grid>
        )}
      </Main>
      <Footer />
    </>
  )
}

export default Home
