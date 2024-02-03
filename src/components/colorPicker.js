// ColorPicker.js
import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState("#000");

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    onColorChange(color.hex);
  };

  return (
    <div>
      <ChromePicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
