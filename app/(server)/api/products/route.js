import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// axios.defaults.baseURL = process.env.NEXT_API_URL
const FETCH_PRODUCTS = process.env.FETCH_PRODUCTS
const FETCH_PRODUCTS_BY_MAINCAT = process.env.FETCH_PRODUCTS_BY_MAINCAT
const FETCH_PRODUCTS_BY_CAT = process.env.FETCH_PRODUCTS_BY_CAT
const FETCH_PRODUCT_BY_ID = process.env.FETCH_PRODUCT_BY_ID

// export async function fetchAllProduct () {
//   try {
//     const { data } = await axios(FETCH_PRODUCTS);
//     return data.products.data;
//   } catch (error) {
//     return console.log(error);
//   }
// }

// export async function fetchProductsByMainCat(slug) {
//   try {
//     const { data } = await axios(`${FETCH_PRODUCTS_BY_MAINCAT}${slug}`);

//     return data.data.products;
//   } catch (error) {
//     return console.log(error);
//   }
// }

// export async function fetchProductsByCategory(slug) {
//   try {
//     const { data } = await axios(`${FETCH_PRODUCTS_BY_CAT}${slug}`);
//     // console.log(data);
//     return data.data.products;
//   } catch (error) {
//     return console.log(error);
//   }
// }

// export async function fetchProductById(id) {
//   try {
//     const { data } = await axios(`${FETCH_PRODUCT_BY_ID}${id}`);
//     // console.log(data);
//     return data.product;
//   } catch (error) {
//     console.log(error);
//   }
// }
