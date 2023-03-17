import React, { useState } from "react";
import "./css/Dropdown.css";

const Dropdown = ({
  title,
  items,
  name,
  handleDropdownChange,
  type,
  checked,
  closeOnChange,
}) => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const handleClick = () => {
    setDropdownOpen(!dropDownOpen);
  };
  const closeDropdown = (e) => {
    setDropdownOpen(false);
    handleDropdownChange(e);
  };
  return (
    <div className="Dropdown">
      <button onClick={handleClick}>
        {title} <i className="fa-solid fa-chevron-down"></i>
      </button>
      <div className={`Dropdown-items ${dropDownOpen && "open"}`}>
        {items.map((item) => (
          <div className="Dropdown-item" key={item}>
            <input
              type={type}
              value={item}
              id={item.toLowerCase()}
              name={name}
              onChange={closeOnChange ? closeDropdown : handleDropdownChange}
              checked={item === checked || checked.includes(item)}
            />
            <label htmlFor={item.toLowerCase()}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
