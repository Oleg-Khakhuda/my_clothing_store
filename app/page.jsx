import s from './page.module.scss'
import Hero from './components/Hero/Hero'
import MainCategories from './components/MainCategories/MainCategories'
import NewProducts from './components/NewProducts/NewProducts'
export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <>
      <main className={s.main}>
        <Hero />
        <MainCategories />
        <NewProducts />
      </main>
    </>
  )
}

export default Home
