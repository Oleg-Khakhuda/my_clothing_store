"use client";

import React from "react";
import { useState } from "react";
import s from "./Search.module.scss";
import { SlMagnifier } from "react-icons/sl";

const Search = () => {
  const [toggle, setToggle] = useState(false);

  const toggleSearch = () => {
    setToggle(!toggle);
  };

  return (
    <div className={s.search}>
      <button type="button" className={s.search_icon} onClick={toggleSearch}>
        <SlMagnifier />
      </button>
      <>
        <div
          className={`${s.form_overlay} ${toggle ? s["is-open"] : ""}`}
          onClick={toggleSearch}
        ></div>
        <div className={`${s.form_modal} ${toggle ? s["is-open"] : ""}`}>
          <form className={s.form}>
            <label className={s.label}></label>
            <input
              className={s.input}
              type="text"
              placeholder="Пошук..."
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
          </form>
        </div>
      </>
    </div>
  );
};

export default Search;
