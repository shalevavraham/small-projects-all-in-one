import React, { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaHome, FaUser, FaInfoCircle, FaMapMarkerAlt, FaCity, FaCogs, FaUserCog, FaShieldAlt, FaSignInAlt, FaUserPlus, FaDice } from 'react-icons/fa';


const iconMap = {
    home: <FaHome size={20} color="#fff" />,
    user: <FaUser size={20} color="#fff" />,
    "info-circle": <FaInfoCircle size={20} color="#fff" />,
    "map-marker-alt": <FaMapMarkerAlt size={20} color="#fff" />,
    city: <FaCity size={20} color="#fff" />,
    cogs: <FaCogs size={20} color="#fff" />,
    "user-cog": <FaUserCog size={20} color="#fff" />,
    "shield-alt": <FaShieldAlt size={20} color="#fff" />,
    "sign-in-alt": <FaSignInAlt size={20} color="#fff" />,
    "user-plus": <FaUserPlus size={20} color="#fff" />,
    dice: <FaDice size={20} color="#fff" />
  };

const MenuItem = ({ item }) => {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  const handleToggleChildren = (getCurrentLabel) => {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel],
    });
  };

  console.log(displayCurrentChildren);

  const isOpen = displayCurrentChildren[item.label];

  return (
    <li>
      <div style={{ display: "flex", gap: "20px" }}>
        <span>{iconMap[item.icon]}</span>
        <p>{item.label}</p>
        {item && item.children && item.children.length ? (
          <span onClick={() => handleToggleChildren(item.label)}>
            {isOpen ? (
              <FaMinus color="#fff" size={25} />
            ) : (
              <FaPlus color="#fff" size={25} />
            )}
          </span>
        ) : null}
      </div>
      {item &&
      item.children &&
      item.children.length > 0 &&
      displayCurrentChildren[item.label] ? (
        <MenuList className={isOpen ? "open" : "close"} list={item.children} />
      ) : null}
    </li>
  );
};

export default MenuItem;
