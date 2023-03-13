import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import s from "./styles.module.scss";
import ImgTopProduct from "../../assets/images/home/topProduct.png";
import ImgDelivery from "../../assets/images/menu/delivery-icon.png";
import ButtonBig from "../../components/ButtonBig/ButtonBig";
import ReviewsSlide1 from "../../assets/images/home/reviews/slide1.png";
// import ReviewsSlide2 from "../../assets/images/home/reviews/slide2.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

const Home = () => {
  const popularContentMobile = useMediaQuery("(min-width: 694px)");
  return (
    <main className={s.main}>
      <Banner />
      <section className={s.advanteges}>
        <div className={`${s.block}`}>
          <div className={s.text}>
            <h3>Бесплатная доставка</h3>
            <p>При заказе от 1500 рублей - привезем товар бесплатно*</p>
          </div>
          <img src={ImgDelivery} alt="delivery" />
        </div>
        <div className={`${s.block}`}>
          <div className={s.text}>
            <h3>Отборные продукты</h3>
            <p>Вся наша продукция исключительно свежая</p>
          </div>
          <img src={ImgTopProduct} alt="catalog" />
        </div>
      </section>
      <section className={s.popular} id="popularsCategory">
        <h2>
          Популярные <span className="green">категории</span>{" "}
        </h2>
        <div
          className={`${s.popular__content} ${
            popularContentMobile && s.desktop
          }`}
        >
          <div
            className={`${s.block} ${s.nuts} ${
              !popularContentMobile && s.bigHeight
            }`}
          >
            <Link to="/catalog/nuts">
              <h3>Орехи</h3>
              <p>Неповторимый вкус и польза для вашего организма</p>
            </Link>
          </div>

          <div className={`${s.block} ${s.dry}`}>
            <Link to="/catalog/dry">
              <h3>Сухофрукты</h3>
              <p>Тут есть манго</p>{" "}
            </Link>
          </div>

          <div className={`${s.block} ${s.sweets}`}>
            <Link to="/catalog/sweets">
              <h3>Сладости</h3>
              <p>Слишком заманчиво</p>
            </Link>
          </div>

          <div
            className={`${s.block} ${s.sets} ${
              !popularContentMobile && s.bigWidth
            }`}
          >
            <Link to="/catalog/sets">
              <h3>Подарочные наборы</h3>
              <p>
                Для близких людей <br />и на корпоративные подарки
              </p>
            </Link>
          </div>
        </div>

        <ButtonBig>
          <Link to="/catalog">Перейти в каталог</Link>
        </ButtonBig>
      </section>
      <section className={s.reviews}>
        <h2>
          Вот, что <span className="green">пишут покупатели</span>{" "}
        </h2>
        <p>
          «Если заказывать орехи, то только у вас» <br />{" "}
          <span className="green">- мнение клиента бесценно!</span>
        </p>
        <div className={s.reviews__slider}>
          <img src={ReviewsSlide1} alt="review1" />
          {/* <img src={ReviewsSlide2} alt="review2" /> */}
        </div>
      </section>
      <a
        href="https://t.me/Schummik"
        target="_blank"
        rel="noopener noreferrer"
        className={s.creator}
      >
        Сайт создан @Shummik
      </a>
    </main>
  );
};

export default Home;
