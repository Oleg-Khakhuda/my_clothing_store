import React from "react";
import s from "./Basket.module.scss";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";

const Basket = () => {
  return (
    <div className={s.basket}>
      <Link href={"/bascket"} rel="preload" as="style">
        <span className={s.basket_icon}>
          <SlBasket />
        </span>
        <div className={s.counter}>0</div>
      </Link>
    </div>
  );
};

export default Basket;
