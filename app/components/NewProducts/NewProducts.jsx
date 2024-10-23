"use client";

import s from "./NewProducts.module.scss";
import Slider from "../Slider/Slider";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProductsThunk } from "../../redux/features/products/thunks";

const NewProducts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const allProducts = useAppSelector((state) => state.products.items);
  const products = allProducts.slice(0, 9);

  return (
    <div className={s.slider}>
      <h2 className={s.title}>Новинки</h2>
      <Slider products={products} />
    </div>
  );
};

export default NewProducts;
