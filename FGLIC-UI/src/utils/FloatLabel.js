import React, { useState } from "react";
import { Input } from "antd";

const FloatLabel = (props) => {

  const { label, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChange = (e) =>{
    props?.value(e.target.value)
  }

  return (
    <div className={`floating-label-input ${(isFocused || value) ? "focused" : ""}`}>
      <Input value={value} onFocus={handleFocus} onBlur={handleBlur} placeholder="" onChange={handleChange} disabled/>
      <label>{label}</label>
    </div>
  );
};

export default FloatLabel;
