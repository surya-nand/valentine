import React, { useState, useEffect, useRef } from "react";
import ColorPicker from "../colorPicker";
import "../HomePage/homePage.modules.css";
import axios from "axios";
const BASE_URL = "http://localhost:5000";
const client_URL = "";

function HomePage() {
  const [valentineDetails, setValentineDetails] = useState({
    name: "",
    pageColor: "",
    pickupLine: "",
  });

  const [customLink, setCustomLink] = useState("hello there");

  const [selectThemeOpen, setSelectThemeOpen] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(true);

  const colorPickerRef = useRef(null);
  console.log(customLink);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setSelectThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [colorPickerRef]);

  const handleThemeButtonClick = (e) => {
    e.preventDefault();
    setSelectThemeOpen((prev) => !prev);
  };

  const handleValentineDetailsInputChange = (event) => {
    const { name, value } = event.target;
    setValentineDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setValentineDetails((prevState) => ({
      ...prevState,
      pageColor: color,
    }));
  };

  const handleDetailsFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/register`,
        valentineDetails
      );
      if ((response.data.message = "New user saved successful")) {
        setCustomLink(`${client_URL}/${response.data.details}`);
        window.alert("Your link is getting ready");
        setShowCustomLink((prev) => !prev);
        setValentineDetails({
          name: "",
          pageColor: "",
          pickupLine: "",
        });
      }
    } catch (error) {}
  };

  return (
    <div className="homepage-component">
      {!showCustomLink && (
        <div className="homepage">
          <form method="POST" onSubmit={handleDetailsFormSubmit}>
            <div className="valentine-details">
              <input
                className="valentine-name"
                required
                type="text"
                name="name"
                value={valentineDetails.name}
                onChange={handleValentineDetailsInputChange}
                placeholder="Enter your valentine name"
              ></input>
              <input
                className="valentine-pickup-line"
                required
                type="text"
                name="pickupLine"
                value={valentineDetails.pickupLine}
                onChange={handleValentineDetailsInputChange}
                placeholder="Enter your pickup line"
              ></input>
              <input
                style={{ background: valentineDetails.pageColor }}
                className="valentine-page-theme"
                required
                type="text"
                name="pageColor"
                value={valentineDetails.pageColor}
                onChange={handleValentineDetailsInputChange}
                placeholder="Enter color code from select theme"
              ></input>
            </div>
            <div className="button-div">
              <button
                onClick={handleThemeButtonClick}
                className="theme-details-button"
              >
                SELECT THEME
              </button>
              <button type="submit" className="submit-details-button">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      )}

      {selectThemeOpen && (
        <div className="color-picker-container" ref={colorPickerRef}>
          <ColorPicker onColorChange={handleColorChange} />
        </div>
      )}
      {showCustomLink && (
        <div className="custom-link-container">
          <p>{customLink}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
