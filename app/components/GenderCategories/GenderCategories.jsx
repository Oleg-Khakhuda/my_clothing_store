"use client";

import Image from "next/image";
import Link from "next/link";
import s from "./GenderCategories.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchGenderCategoryThunk } from "../../redux/features/genderCategories/thunks";
import Loader from "../Loader/Loader";

const GenderCategories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenderCategoryThunk());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.genderCategory.items);
  const isLoading = useAppSelector((state) => state.genderCategory.isLoading);

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <div className={s.main}>
      <h2 className={s.title}>Обирайте одяг для всієї сім'ї</h2>
      <ul className={s.category_list}>
        {categories ? (
          categories.map((category) => (
            <li className={s.category_item} key={category.id}>
              <Link
                rel="preload"
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
    //   )}
    // </>
  );
};

export default GenderCategories;
