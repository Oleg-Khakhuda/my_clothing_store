import React from "react";
import s from "./Logo.module.scss";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} rel="preload">
      <div className={s.logo}>My Clothing</div>
    </Link>
  );
};

export default Logo;
