import React from "react";
import Logo from "../../assets/images/logo.png";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import s from "./styles.module.scss";

const Header = () => {
  return (
    <header>
      <div className={s.headerWrap}>
        <Link to="/">
          <div className={s.logo}>
            <img src={Logo} alt="logo" />
            <p>
              Орехи и сухофрукты <br />в Москве и области
            </p>
          </div>
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
