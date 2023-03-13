import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ButtonBig from "../../components/ButtonBig/ButtonBig";
import ItemPreview from "../../components/ItemPreview/ItemPreview";
import BasketContext from "../../context";
import s from "./styles.module.scss";

const ItemDetails = () => {
  const { basket, setBasket } = useContext(BasketContext);

  const { itemId } = useParams();
  const [priceTypeSelected, setPriceTypeSelected] = useState(0);
  const [calculator, setCalculator] = useState(0);
  const [calculatorWeight, setCalculatorWeight] = useState(0);

  const [item, setItem] = useState(null);
  const [popularItems, setPopularItems] = useState(null);
  const [addCartCheck, setAddCartCheck] = useState(false);

  async function getPopularList(currentItem) {
    const items = await fetch(
      `https://63fb9b597a045e192b6c5006.mockapi.io/nuts`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    const filter = itemsJson.filter(
      (x) => x.popular === true && x.id !== currentItem.id
    );
    setPopularItems(filter);
  }

  useEffect(() => {
    fetch(`https://63fb9b597a045e192b6c5006.mockapi.io/nuts/?id=${itemId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data[0]);
        getPopularList(data[0]);
      });
  }, [itemId]);

  useEffect(() => {
    if (item) {
      if (item?.price[priceTypeSelected]?.ammount) {
        setCalculator(Number(item.price[priceTypeSelected].ammount));
        setCalculatorWeight(Number(item.price[priceTypeSelected].weight));
      }
    }
    console.log(item, "why2");
  }, [item]);

  const addToBasket = (item, priceType, addPrice, addWeight) => {
    let resItem = {};
    setAddCartCheck(true);
    setTimeout(() => {
      setAddCartCheck(false);
    }, 2000);
    resItem = {
      itemId: item.id,
      priceType: priceType,
      itemName: item.name,
      itemPrice: addPrice,
      itemWeight: addWeight,
    };
    const oldGoodIndex = basket.findIndex(
      (good) => good.itemId === item.id && good.priceType === priceType
    );
    if (oldGoodIndex >= 0) {
      basket[oldGoodIndex].itemPrice += addPrice;
      basket[oldGoodIndex].itemWeight += addWeight;
      setBasket(basket);
    } else {
      setBasket([...basket, resItem]);
    }
  };

  if (item === null) {
    return <div className="loader">Загрузка...</div>;
  }
  return (
    <main className={s.itemWrap}>
      <BreadCrumbs item={item} />
      <h2>{item.name}</h2>
      <div className={s.goods}>
        <div className={s.goodsImg}>
          <img src={item.imageBig} alt={item.name} />
          <p className={s.article}>Артикул - {100 + item.id}</p>
        </div>
        <div className={s.goodsInfo}>
          <div className={s.goodsContent}>
            {item?.price[priceTypeSelected]?.ammount ? (
              <>
                {item?.type !== 3 && (
                  <div className={s.prices}>
                    {item.price.map((priceItem, index) => {
                      return (
                        <div
                          key={index}
                          className={`${s.pricesBlock} ${
                            priceTypeSelected === index && s.active
                          }`}
                          onClick={() => {
                            setPriceTypeSelected(index);
                            setCalculator(Number(priceItem.ammount));
                            setCalculatorWeight(Number(priceItem.weight));
                          }}
                        >
                          <p>
                            {priceItem.weight}
                            {item.type === 3 ? (
                              <span> шт.</span>
                            ) : (
                              <span> г.</span>
                            )}
                          </p>
                          <span className={s.line}></span>
                          <p>{priceItem.ammount} руб.</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className={s.calculator}>
                  <div className={s.calculatorControl}>
                    <button
                      className={s.minus}
                      onClick={() => {
                        calculator >
                          Number(item.price[priceTypeSelected].ammount) &&
                          setCalculator(
                            calculator -
                              Number(item.price[priceTypeSelected].ammount)
                          );
                        calculatorWeight >
                          Number(item.price[priceTypeSelected].weight) &&
                          setCalculatorWeight(
                            calculatorWeight -
                              Number(item.price[priceTypeSelected].weight)
                          );
                      }}
                    >
                      -
                    </button>
                    <p>
                      {calculatorWeight}{" "}
                      {item.type === 3 ? <span> шт.</span> : <span> г.</span>}
                    </p>
                    <button
                      className={s.add}
                      onClick={() => {
                        setCalculator(
                          calculator +
                            Number(item.price[priceTypeSelected].ammount)
                        );
                        setCalculatorWeight(
                          calculatorWeight +
                            Number(item.price[priceTypeSelected].weight)
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className={s.calculatorResult}>
                    <p>Итого: {calculator} руб. </p>
                  </div>
                </div>
                <ButtonBig
                  onClick={() => {
                    addToBasket(
                      item,
                      priceTypeSelected,
                      calculator,
                      calculatorWeight
                    );
                  }}
                >
                  Добавить в корзину
                  <span
                    className={`${s.checkmark} ${addCartCheck && s.active}`}
                  ></span>
                </ButtonBig>
              </>
            ) : (
              <div className={s.emptyItemData}>Товар временно недоступен</div>
            )}
          </div>
          {item?.type === 3 && item?.composition && (
            <div className={s.goodsSetText}>
              <h3>Состав набора:</h3>
              <ul>
                {item?.composition.map((x, index) => {
                  return <li key={index}>{x}</li>;
                })}
              </ul>
            </div>
          )}
          {item?.description && (
            <div className={s.goodsDescriptionText}>
              <h3>Описание:</h3>
              <p>{item?.description}</p>
            </div>
          )}
        </div>
      </div>
      {popularItems && popularItems.length > 0 && (
        <div className={s.popular}>
          <h3>Популярные товары:</h3>
          <div className={s.popularList}>
            {popularItems.map((item) => {
              return (
                <Link key={item.id} to={`/item/${item.id}`}>
                  <ItemPreview item={item} />
                </Link>
              );
            })}
          </div>
          <Link to="/catalog">
            <ButtonBig empty="true" center="true">
              Вернуться в общий каталог
            </ButtonBig>
          </Link>
        </div>
      )}
    </main>
  );
};

export default ItemDetails;
