"use client";

import React from "react";
import s from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import Basket from "../Basket/Basket";
import Link from "next/link";
import { SlHeart } from "react-icons/sl";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.left_side}>
        <Sidebar />
        <Search />
      </div>
      <Logo />
      <div className={s.right_side}>
        <div className={s.avatar}></div>
        <div className={s.favorites}>
          <Link href="/favorite" rel="preload">
            <span className={s.favorite_icon}>
              <SlHeart />
            </span>
            <div className={s.counter}>0</div>
          </Link>
        </div>
        <Basket />
      </div>
    </header>
  );
};

export default Header;
