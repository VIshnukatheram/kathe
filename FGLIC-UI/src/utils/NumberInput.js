import React, { useState } from 'react';

const NumberInput = () => { 
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Use a regular expression to allow only numbers
    const numericValue = value.replace(/[^0-9]/g, '');

    setInputValue(numericValue);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter numbers only"
    />
  );
};

export default NumberInput;
