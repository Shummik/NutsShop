import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import BasketContext from "../../context";
import s from "./styles.module.scss";
import ImgBasket from "../../assets/images/menu/basket-icon.png";
import ImgCatalog from "../../assets/images/menu/catalog-icon.png";
import ImgDelivery from "../../assets/images/menu/delivery-icon.png";
import ImgPhone from "../../assets/images/menu/phone-icon.png";
import ImgTg from "../../assets/images/menu/tg-icon.png";
import useScrollPosition from "../../hooks/useTopPosition";

const MenuContext = createContext();

const Menu = () => {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [isActive, setIsActive] = useState(false);
  return (
    <MenuContext.Provider value={{ isActive, setIsActive }}>
      <ContentMenu />
      {isDesktop ? (
        ""
      ) : (
        <>
          <BurgerMenu />
        </>
      )}
    </MenuContext.Provider>
  );
};

const BurgerMenu = () => {
  const { basket } = useContext(BasketContext);
  const { isActive, setIsActive } = useContext(MenuContext);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isActive]);

  const scrollPosition = useScrollPosition();
  const toogleBurger = () => {
    setIsActive((current) => !current);
  };

  return (
    <div
      className={`${s.burger__wrap} ${scrollPosition > 0 && s.scrolled}`}
      onClick={() => {
        toogleBurger();
      }}
    >
      <div className={`${s.burger} ${isActive ? `${s.open}` : ""}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {basket.length > 0 && !isActive && <span className={s.basketNote}></span>}
    </div>
  );
};

const ContentMenu = () => {
  const { basket } = useContext(BasketContext);
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const { isActive, setIsActive } = useContext(MenuContext);
  return (
    <>
      {isDesktop ? (
        <nav className={s.desktop}>
          <div className={s.line}>
            <Link to="/catalog">Каталог</Link>
          </div>
          <div className={`${s.line} ${s.basket}`}>
            <Link to="/basket">
              Корзина: <span>{Object.keys(basket).length} шт.</span>
            </Link>
          </div>
          <div className={s.line}>
            <Link to="/delivery">Доставка</Link>
          </div>
          <a href="tel:+74955673246">
            <div className={s.line}>+7 495 567 32 46</div>
          </a>
          {/* <a
            href="http://t.me/shummik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={s.line}>Телеграм канал</div>
          </a> */}
        </nav>
      ) : (
        <nav className={`${s.mobile} ${isActive ? `${s.active}` : ""}`}>
          <Link
            to="/catalog"
            onClick={() => {
              setIsActive(false);
            }}
          >
            <div className={`${s.block} ${s.catalog}`}>
              <div className={s.text}>
                <h3>Каталог</h3>
                <p>Большое количество товаров на любой выбор</p>
              </div>
              <img src={ImgCatalog} alt="catalog" />
            </div>
          </Link>

          <Link
            to="/basket"
            onClick={() => {
              setIsActive(false);
            }}
          >
            <div className={`${s.block}`}>
              <div className={s.text}>
                <h3>
                  Корзина: <span>{Object.keys(basket).length} шт.</span>
                </h3>
                <p>Добавляйте выбранные позиции в корзину</p>
              </div>
              <img src={ImgBasket} alt="basket" />
            </div>
          </Link>

          <Link
            to="/delivery"
            onClick={() => {
              setIsActive(false);
            }}
          >
            <div className={`${s.block}`}>
              <div className={s.text}>
                <h3>Доставка</h3>
                <p>Более подробно о ценах доставки по Москве</p>
              </div>
              <img src={ImgDelivery} alt="delivery" />
            </div>
          </Link>

          <a href="tel:+74955673246">
            <div className={`${s.block} ${s.phone}`}>
              <div className={s.text}>
                <h3>+7 495 567 32 46</h3>

                <p>Звоните по любым возникшим вопросам</p>
              </div>
              <img src={ImgPhone} alt="phone" />
            </div>
          </a>
          {/* <a
            href="http://t.me/shummik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${s.block} ${s.tg}`}>
              <div className={s.text}>
                <h3>Телеграм канал</h3>

                <p>
                  Здесь все наши новинки <br /> и вкусные акции
                </p>
              </div>
              <img src={ImgTg} alt="tg" />
            </div>
          </a> */}
        </nav>
      )}
    </>
  );
};

export default Menu;
