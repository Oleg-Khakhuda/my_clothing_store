import React from "react";
import s from "./Search.module.scss";
import { SlMagnifier } from "react-icons/sl";

const Search = () => {
  return (
    <div className={s.search}>
      <span className={s.search_icon}>
        <SlMagnifier />
      </span>
    </div>
  );
};

export default Search;
