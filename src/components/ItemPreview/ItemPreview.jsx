import React, { useState } from "react";

import s from "./styles.module.scss";

const ItemPreview = (props) => {
  const [imgLoading, setImgLoading] = useState(true);
  if (props.item === null) {
    return <div className="loader">Загрузка...</div>;
  }
  return (
    <div className={`${imgLoading && s.load} ${s.block}`}>
      <img
        src={props.item.imageSmall}
        alt={props.item.name}
        onLoad={() => setImgLoading(false)}
      />
      <div className={s.info}>
        <p>{props.item.name}</p>
        {props.item.price[0] && (
          <p className="grey">
            {props.item.type === 3 ? (
              <span>{props.item.price[0]?.ammount} руб.</span>
            ) : (
              <span>
                {props.item?.price[0]?.weight} г. -&nbsp;
                {props.item.price[0]?.ammount} руб.
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemPreview;
