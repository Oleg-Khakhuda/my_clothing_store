import s from "./page.module.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import GenderCategories from "./components/GenderCategories/GenderCategories";
import NewProducts from "./components/NewProducts/NewProducts";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Home = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <Hero />
        <Suspense fallback={<Loader />}>
          <GenderCategories />
          <NewProducts />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Home;
