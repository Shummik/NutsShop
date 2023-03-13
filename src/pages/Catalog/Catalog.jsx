import React, { useState } from "react";
import s from "./styles.module.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import SearchInput from "../../components/SearchInput/SearchInput";
import ImgNuts from "../../assets/images/catalog/catalogNuts.png";
import ImgDried from "../../assets/images/catalog/catalogDried.png";
import ImgSet from "../../assets/images/catalog/catalogSet.png";
import ImgSweets from "../../assets/images/catalog/catalogSweets.png";
import { Link } from "react-router-dom";

const Catalog = () => {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [blurWrap, setBlurWrap] = useState(false);

  return (
    <main className={s.catalog}>
      {isDesktop && <BreadCrumbs />}
      <SearchInput setBlurWrap={setBlurWrap} blurWrap={blurWrap} />
      <div className={`${s.content} ${blurWrap && s.searchBlur}`}>
        <Link to="/catalog/nuts">
          <div className={`${s.block}`}>
            <div className={s.text}>
              <h3>Орехи</h3>
              <p>Неповторимый вкус и польза для вашего организма</p>
            </div>
            <img src={ImgNuts} alt="nuts" />
          </div>
        </Link>
        <Link to="/catalog/dry">
          <div className={`${s.block}`}>
            <div className={s.text}>
              <h3>Сухофрукты</h3>
              <p>Осторожно, наше манго вызывает привыкание</p>
            </div>
            <img src={ImgDried} alt="dried" />
          </div>
        </Link>
        <Link to="/catalog/sets">
          <div className={`${s.block}`}>
            <div className={s.text}>
              <h3>Подарочные наборы</h3>
              <p>Для близких людей и на корпоративные подарки</p>
            </div>
            <img src={ImgSet} alt="sets" />
          </div>
        </Link>
        <Link to="/catalog/sweets">
          <div className={`${s.block} `}>
            <div className={s.text}>
              <h3>Сладости</h3>
              <p>Ммм... слишком заманчиво, чтобы пройти мимо</p>
            </div>
            <img src={ImgSweets} alt="sweets" />
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Catalog;
