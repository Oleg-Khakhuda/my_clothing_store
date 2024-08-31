import React from "react";
import { CiMenuFries } from "react-icons/ci";
import s from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <span className={s.sidebar_icon}>
        <CiMenuFries />
      </span>
    </div>
  );
};

export default Sidebar;
