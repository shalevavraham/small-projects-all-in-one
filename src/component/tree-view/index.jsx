import React, { useState } from "react";
import MenuList from "./menu-list";
import "./style.css";

const TreeView = ({ menus = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMenus = menus.filter((menu) =>
    menu.label.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search menu..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="tree-view-container">
        <MenuList list={filteredMenus} />
      </div>
    </div>
  );
};

export default TreeView;
