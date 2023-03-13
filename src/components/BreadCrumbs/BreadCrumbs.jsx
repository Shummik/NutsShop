import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePathname from "../../hooks/usePathname";
import s from "./styles.module.scss";

const BreadCrumbs = (props) => {
  const pathname = usePathname();
  const [pathLink, setPathLink] = useState("");

  const getCategoryById = (category) => {
    switch (category) {
      case 1:
        return "nuts";
      case 2:
        return "dry";
      case 3:
        return "sets";
      case 4:
        return "sweets";
      case 100:
        return "popular";

      default:
        return "";
    }
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

  const getPathLink = () => {
    const res = [];
    if (pathname.length > 1) {
      switch (pathname[1]) {
        case "catalog":
          res.push({ name: "Каталог", path: "/catalog" });
          break;
        case "basket":
          res.push(
            { name: "Главная", path: "/" },
            { name: "Корзина", path: "" }
          );
          break;
        case "delivery":
          res.push(
            { name: "Главная", path: "/" },
            { name: "Корзина", path: "/basket" },
            { name: "Доставка", path: "" }
          );
          break;
        case "item":
          res.push(
            { name: "Каталог", path: "/catalog" },
            {
              name: getCategoryNamebyId(props.item.type),
              path: "/catalog/" + getCategoryById(props.item.type),
            },
            { name: props.item.name, path: "" }
          );
          break;
        default:
          break;
      }
    }
    if (pathname.length > 2) {
      switch (pathname[2]) {
        case getCategoryById(1):
          res.push({
            name: getCategoryNamebyId(1),
            path: "/" + pathname[1] + "/" + getCategoryById(1),
          });
          break;
        case getCategoryById(2):
          res.push({
            name: getCategoryNamebyId(2),
            path: "/" + pathname[1] + "/" + getCategoryById(2),
          });
          break;
        case getCategoryById(3):
          res.push({
            name: getCategoryNamebyId(3),
            path: "/" + pathname[1] + "/" + getCategoryById(3),
          });
          break;
        case getCategoryById(4):
          res.push({
            name: getCategoryNamebyId(4),
            path: "/" + pathname[1] + "/" + getCategoryById(4),
          });
          break;
        case getCategoryById(100):
          res.push({
            name: getCategoryNamebyId(100),
            path: "/" + pathname[1] + "/" + getCategoryById(100),
          });
          break;

        default:
          break;
      }
    }

    setPathLink(res);
  };

  useEffect(() => {
    getPathLink();
  }, []);

  if (pathname === null) {
    return <div className="loader">Загрузка...</div>;
  }
  return (
    <nav className={s.address}>
      {pathLink.length > 0 && (
        <Link to={`${pathLink[0].path}`}>{pathLink[0].name}</Link>
      )}
      {pathLink.length > 1 && (
        <>
          <span>/</span>
          <Link to={`${pathLink[1].path}`}>{pathLink[1].name}</Link>
        </>
      )}
      {pathLink.length > 2 && (
        <>
          <span>/</span>
          <span>{pathLink[2].name}</span>
        </>
      )}
    </nav>
  );
};

export default BreadCrumbs;
