import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/images/catalog/searchIcon.png";
import CrossIcon from "../../assets/images/catalog/crossIcon.png";
import s from "./styles.module.scss";
import useOnClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router-dom";

const SearchInput = ({ setBlurWrap, blurWrap }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [baseData, setBaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [qValue, setQValue] = useState("");
  const ref = useRef();
  useOnClickOutside(ref, () => setBlurWrap(false));

  useEffect(() => {
    fetch(`https://63fb9b597a045e192b6c5006.mockapi.io/nuts`, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBaseData(result);
          setFilteredData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    setBlurWrap(qValue === "" ? false : true);
  }, [qValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setFilteredData(baseData);
    } else {
      const filterResult = baseData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filterResult);
    }
    setQValue(value);
  };

  return (
    <div ref={ref} className={s.search}>
      <div className={s.searchInputWrap}>
        <input
          type="search"
          placeholder="Поиск по товарам"
          value={qValue}
          onChange={(e) => handleChange(e)}
        />
        {qValue === "" && <img src={SearchIcon} alt="search" />}
        {qValue !== "" && (
          <img
            src={CrossIcon}
            alt="cross"
            className={s.cross}
            onClick={() => {
              setQValue("");
            }}
          />
        )}
      </div>
      {qValue && blurWrap && (
        <div className={s.searchResultContainer}>
          {filteredData.length > 0 ? (
            filteredData.map((x) => {
              return (
                <Link key={x.id} to={`/item/${x.id}`}>
                  <p className={s.resItem}>{x.name}</p>
                </Link>
              );
            })
          ) : (
            <p className={s.resItem}>Нет подходящего товара</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
