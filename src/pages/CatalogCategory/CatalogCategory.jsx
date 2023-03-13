import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ButtonBig from "../../components/ButtonBig/ButtonBig";
import ItemPreview from "../../components/ItemPreview/ItemPreview";
import s from "./styles.module.scss";

const CatalogCategory = () => {
  const { categoryName } = useParams();
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [categoryFullName, setCategoryFullName] = useState("");
  const [imgLoading, setImgLoading] = useState(true);

  async function getCategoryList() {
    const items = await fetch(
      `https://63fb9b597a045e192b6c5006.mockapi.io/nuts`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    const filter = itemsJson.filter((item) =>
      categoryName === "popular"
        ? item.popular === true
        : item.type === getCategoryId(categoryName)
    );
    setCategoriesItems(filter);
  }

  const getCategoryId = (category) => {
    if (category === "nuts") {
      return 1;
    }
    if (category === "dry") {
      return 2;
    }
    if (category === "sets") {
      return 3;
    }
    if (category === "sweets") {
      return 4;
    }
    if (category === "popular") {
      return 100;
    }
    return 0;
  };

  const getCategoryNamebyId = (category) => {
    switch (category) {
      case 1:
        return "Орехи";
      case 2:
        return "Сухофрукты";
      case 3:
        return "Подарочные наборы";
      case 4:
        return "Сладости";
      case 100:
        return "Популярные товары";
      default:
        return "";
    }
  };

  useEffect(() => {
    getCategoryList(categoryName);
    setCategoryFullName(getCategoryNamebyId(getCategoryId(categoryName)));
  }, []);

  if (categoriesItems === null) {
    return <div className="loader">Загрузка...</div>;
  }
  return (
    <main className={s.categories}>
      <BreadCrumbs />
      <h2>{categoryFullName}</h2>
      <div className={s.list}>
        {categoriesItems.map((item) => {
          return (
            <Link key={item.id} to={`/item/${item.id}`}>
              <ItemPreview item={item} />
            </Link>
          );
        })}
      </div>
      <Link to="/catalog">
        <ButtonBig empty="true" center="true">
          Перейти в каталог
        </ButtonBig>
      </Link>
    </main>
  );
};

export default CatalogCategory;
