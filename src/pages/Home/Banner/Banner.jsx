import React, { useEffect, useState } from "react";
import ButtonBig from "../../../components/ButtonBig/ButtonBig";
import useMediaQuery from "../../../hooks/useMediaQuery";
import s from "./styles.module.scss";
import BannerImg from "../../../assets/images/home/banner-img.png";
import { Link } from "react-router-dom";

const Banner = () => {
  const [textBanner, setTextBanner] = useState("");
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const textBannerBase = [["Сухофрукты"], ["Наборы"], ["Орехи"]];

  const getRandomInt = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    let typeForward = true;
    let word = 0;
    let count = 0;
    let out = " ";
    let typeSpeed = getRandomInt(300, 450);
    let myFunction = function () {
      if (typeForward) {
        out += textBannerBase[word][0][count];
        count++;
        typeSpeed = getRandomInt(300, 450);
      } else {
        out = out.substring(0, out.length - 1);
        count--;
        typeSpeed = getRandomInt(50, 100);
      }
      if (count >= textBannerBase[word][0].length) {
        typeForward = false;
      }
      if (count <= 0) {
        typeForward = true;
        word++;
        typeSpeed = getRandomInt(500, 700);
      }
      if (word >= textBannerBase.length) {
        count = 0;
        word = 0;
      }
      setTextBanner(out);
      setTimeout(myFunction, typeSpeed);
    };
    setTimeout(myFunction, typeSpeed);
  }, []);
  return (
    <section className={s.banner}>
      <div className={s.text}>
        <h1>
          Добро пожаловать в&nbsp;магазин к Белочке!
          У&nbsp;нас&nbsp;вы&nbsp;можете&nbsp;заказать: {!isDesktop && <br />}
          <span>{textBanner}</span>
          <span className={s.tabLine}>|</span>
        </h1>
        <div className={s.button}>
          <a href="#popularsCategory">
            <ButtonBig>Популярные категории</ButtonBig>
          </a>
        </div>
      </div>
      <img src={BannerImg} alt="Banner" />
    </section>
  );
};

export default Banner;
