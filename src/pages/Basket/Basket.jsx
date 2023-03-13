import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./styles.module.scss";
import BasketContext from "../../context";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import TrashImg from "../../assets/images/basket/trash.png";
import BannerImg from "../../assets/images/home/banner-img.png";
import inputNameIcon from "../../assets/images/basket/inputNameIcon.png";
import inputPhoneIcon from "../../assets/images/basket/inputPhoneIcon.png";
import { Link } from "react-router-dom";
import ButtonBig from "../../components/ButtonBig/ButtonBig";
import InputMask from "react-input-mask";
import useOnClickOutside from "../../hooks/useClickOutside";

const locationBase = [
  "Переделкино, Солнцево...",
  "Юго-Западные районы",
  "Остальные районы Москвы",
];

const Basket = () => {
  const { basket } = useContext(BasketContext);
  const [location, setLocation] = useState(0);
  const [orderSend, setOrderSend] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const handleChange = (e) => {
    setLocation(+e.target.id.slice(-1));
  };

  return (
    <main className={s.basket}>
      <BreadCrumbs />
      <h2 className={s.title}>Корзина товаров</h2>
      {basket.length > 0 ? (
        <div className={s.content}>
          <div className={s.basketList}>
            {basket.map((item, index) => (
              <GoodsBlock key={index} good={item} />
            ))}
          </div>
          <div className={s.delivery}>
            <h3>Выберите район доставки</h3>
            {locationBase.map((item, index) => (
              <DeliveryRadioBtn
                key={index}
                number={index}
                pickedLocation={location}
                onChange={handleChange}
              />
            ))}
            <Link to="/delivery">
              <p className={s.aboutBtn}>Читать подробнее про доставку</p>
            </Link>
          </div>
          <div className={s.mail}>
            <p>
              Итого:
              <span className="green">
                {basket.reduce((total, cur) => total + cur.itemPrice, 0)}
                руб. + доставка
              </span>
            </p>
            <SenderOrder
              basket={basket}
              location={location}
              orderNumber={orderNumber}
              setOrderNumber={setOrderNumber}
              statusOrder={setOrderSend}
            />
          </div>
        </div>
      ) : (
        <div className={s.basketList}>
          <p>
            <Link to="/catalog">У вас еще нет товаров</Link>
          </p>
        </div>
      )}
      {orderSend && <ThanksScreen orderNumber={orderNumber} />}
    </main>
  );
};

const GoodsBlock = (props) => {
  const { basket, setBasket } = useContext(BasketContext);
  const [trashActive, setTrashActive] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setTrashActive(false));

  const removeGood = (goodToRemove) => {
    setBasket(basket.filter((good) => good !== goodToRemove));
  };
  return (
    <div ref={ref} className={`${s.block} ${trashActive && s.active}`}>
      <div className={s.blockInfo}>
        <p className={s.title}>{props.good.itemName}</p>
        <div className={s.numbers}>
          <p>
            {props.good.itemWeight}{" "}
            {props.good.itemWeight < 20 ? <span> шт.</span> : <span> г.</span>}
          </p>
          <p className={s.price}>{props.good.itemPrice} руб.</p>
        </div>
      </div>
      <div
        className={s.blockDelBtn}
        onClick={() => {
          trashActive ? removeGood(props.good) : setTrashActive(true);
        }}
      >
        <img src={TrashImg} alt="Корзина" />
      </div>
    </div>
  );
};

const DeliveryRadioBtn = ({ number, pickedLocation, onChange }) => {
  return (
    <div className={s.deliveryLocation}>
      <input
        id={`loc${number}`}
        type="radio"
        name="location"
        onChange={onChange}
        checked={pickedLocation === number}
      />
      <label htmlFor={`loc${number}`}>
        <span></span> {locationBase[number]}
      </label>
    </div>
  );
};

const SenderOrder = (props) => {
  const { setBasket } = useContext(BasketContext);
  const telegram = {
    token: "5869685685:AAFYQwdxqkKgtPyEPloCmwSRysKPOd_Tc8k",
    chat: "-1001852532022",
    // token: "5869685685:AAFYQwdxqkKgtPyEPloCmwSRysKPOd_Tc8k",
    // chat: "-1001892232094",
  };

  const confirmOrder = (basket, location, userData) => {
    const confirmOrderNumber = Math.floor(Math.random() * 10000);
    let message = `Поступил заказ(№${confirmOrderNumber}) от ${userData.userName} номер ${userData.userPhone} в районе ${locationBase[location]} на: \n  `;
    basket.map((item) => {
      message += `${item.itemName}, ${item.itemWeight} ${
        item.itemWeight < 20 ? "шт." : "г."
      } : ${item.itemPrice} руб. \n`;
    });
    message += `Итого на: ${basket.reduce(
      (total, cur) => total + cur.itemPrice,
      0
    )} руб.`;
    fetch(
      `https://api.telegram.org/bot${telegram.token}/sendMessage?chat_id=${telegram.chat}&text=${message}`,
      {
        method: "GET",
      }
    ).then(
      (success) => {
        console.log(success, "success");
        props.setOrderNumber(confirmOrderNumber);
        props.statusOrder(true);
        // setOrderSend
        setBasket([]);
      },
      (error) => {
        console.log(error, "eror");
      }
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [formData, setFormData] = useState("");
  const [formValidate, setFormValidate] = useState(true);

  const onSubmit = (data) => {
    if (props.basket.length > 0) {
      setFormData(JSON.stringify(data));
      setFormValidate(true);
      confirmOrder(props.basket, props.location, data);
    } else {
      setFormValidate(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrap}>
          <input
            {...register("userName", { required: true })}
            aria-invalid={errors.userName ? "true" : "false"}
            className={`${s.mailInput} ${
              errors.userName?.type === "required" && s.invalid
            }`}
            type="text"
            placeholder="Введите ваше имя"
          />
          <img src={inputNameIcon} alt="name" />
        </div>
        {/* {errors.userName?.type === "required" && (
          <p role="alert">First name is required</p>
        )} */}
        <div className={s.inputWrap}>
          <InputMask
            mask="+7 (999) 999-99-99"
            alwaysShowMask={true}
            {...register("userPhone", {
              required: true,
            })}
            aria-invalid={errors.userPhone ? "true" : "false"}
            className={`${s.mailInput} ${
              errors.userPhone?.type === "required" && s.invalid
            }`}
            type="tel"
          />
          <img src={inputPhoneIcon} alt="phone" />
        </div>
        {/* {errors.userPhone && <p role="alert">{errors.userPhone?.message}</p>} */}

        <ButtonBig type="submit">Оформить заказ</ButtonBig>
      </form>
    </>
  );
};

const ThanksScreen = (props) => {
  return (
    <div className={s.thanksWrap}>
      <div className={s.thanksContent}>
        <img src={BannerImg} alt="банер" />
        <h3>
          Спасибо за заказ: <span className="green">{props.orderNumber}</span>
        </h3>
        <p>
          Запомните этот номер, в ближайшее время с вами свяжется наш менеджер
        </p>
        <Link to="/">
          <ButtonBig center="true">Вернуться на главную</ButtonBig>
        </Link>
      </div>
    </div>
  );
};

export default Basket;
