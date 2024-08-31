import Image from "next/image";
import s from "./page.module.scss";
import { getGenderCategories } from "./(server)/api/genderCategories/route";
import Link from "next/link";
import Header from "./components/Header/Header";

const Home = async () => {
  const { categories } = await getGenderCategories();

  return (
    <>
      <Header />
      <main className={s.main}>
        <div className={s.description}>Home</div>
        <div>
          <ul className={s.category_list}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li className={s.category_item} key={category.id}>
                  <Link
                    rel="preload"
                    as="style"
                    className={s.category_link}
                    href={String(category.slug)}
                  >
                    <Image
                      className={s.category_image}
                      src={category.image}
                      alt="category"
                      width={600}
                      height={450}
                      priority={true}
                    />
                    <h2 className={s.category_title}>{category.title}</h2>
                  </Link>
                </li>
              ))
            ) : (
              <div>Щось пішло не так! Спробуйте перезавантажити сторінку.</div>
            )}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
