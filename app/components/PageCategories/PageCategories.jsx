"use client";

import ListCategories from "../../components/ListCategories/ListCategories";
import ListProducts from "../../components/ListProducts/ListProducts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchCategoryThunk } from "../../redux/features/categories/thunks";
import { fetchProductsByMainCatThunk } from "../../redux/features/products/thunks";
import { getCategoriesBySlug } from "@/app/(server)/api/categories/[mainSlug]/route";

const PageCategories = ({ categories, slug }) => {
  // const dispatch = useAppDispatch();

  // const { mainSlug: slug } = params;

  // const categories = await getCategoriesBySlug();

  // useEffect(() => {
  //   dispatch(fetchCategoryThunk(slug));
  //   dispatch(fetchProductsByMainCatThunk(slug));
  // }, [dispatch, slug]);

  // const categories = useAppSelector((state) => state.category.items);
  // console.log(categories);

  // const products = useAppSelector((state) => state.productsByMainCat.items);
  // console.log(products);
  return (
    <>
      <ListCategories categories={categories} mainSlug={slug} />
      <ListProducts products={products} />
    </>
  );
};

export default PageCategories;
