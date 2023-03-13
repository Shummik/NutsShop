import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import s from "./styles.module.scss";
import DeliveryImg1 from "../../assets/images/delivery/delivery1.png";
import DeliveryImg2 from "../../assets/images/delivery/delivery2.png";

const Delivery = () => {
  return (
    <main>
      <BreadCrumbs />
      <div className={s.content}>
        <div className={s.block}>
          <div className={s.text}>
            <h2>Переделкино, Солнцево...</h2>
            <p>При заказе от 1500 руб - бесплатно</p>
            <p>В остальных случаях - 200 руб</p>
          </div>
          <div className={s.img}>
            <img src={DeliveryImg1} alt="Переделкино..." />
          </div>
        </div>
        <div className={s.block}>
          <div className={s.text}>
            <h2>Юго-Западные районы</h2>
            <p>При заказе от 3000 руб - бесплатно</p>
            <p>В остальных случаях - 300 руб</p>
          </div>
          <div className={s.img}>
            <img src={DeliveryImg2} alt="Юго-Западные районы" />
          </div>
        </div>
        <div className={s.block}>
          <div className={s.text}>
            <h2>Остальные районы Москвы</h2>
            <p>При заказе от 15000 руб - бесплатно</p>
            <p>В остальных случаях - от 1000 руб</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Delivery;
