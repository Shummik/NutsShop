import React from "react";
import s from "./styles.module.scss";

const ButtonBig = (props) => {
  return (
    <button
      {...props}
      className={`${s.buttonBig} ${props.empty && s.buttonEmpty} ${
        props.center && s.buttonCenter
      }`}
    />
  );
};

export default ButtonBig;
