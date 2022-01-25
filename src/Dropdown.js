import React from "react";
import { useState } from "react";
import CountryCodes from "./CountryCodes.json";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Dropdown.css";
import blank from "./Assets/blank.svg";
import { motion } from "framer-motion";

const Dropdown = ({ state, setState, active, setActive }) => {
  const [CountryCode, setCountryCode] = useState("IN");
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="imgCode">
          <img
            src={`https://flag.pk/flags/4x3/${CountryCode}.svg`}
            onError={(e) => (e.currentTarget.src = blank)}
          />
          {state.country_code}
        </div>

        <span>
          <IoMdArrowDropdown size="20px" />
        </span>
      </div>

      <motion.div
        className="dropdown-content"
        animate={
          (active && { height: "40vh", padding: "20px" }) ||
          (!active && { height: "0", padding: "0px" })
        }
        transition={{ type: "tween" }}
      >
        {CountryCodes.map((item, index) => {
          return (
            <div
              onClick={() => {
                setState({ ...state, country_code: item.dial_code });
                setCountryCode(item.code);
                setActive(false);
              }}
              key={index}
              className="dropdown-item"
            >
              <img
                src={`https://flag.pk/flags/4x3/${item.code.toLocaleLowerCase()}.svg`}
                onError={(e) => (e.currentTarget.src = blank)}
                alt={item.code}
              />
              {item.dial_code}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dropdown;
