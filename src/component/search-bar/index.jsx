import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="search-bar">
      <div className="header-links">
        <Link to="/" className="home-button">Home</Link>
        <button
          className="projects-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Projects
        </button>
      </div>

      {isOpen && (
        <div className="projects-list">
          <ul>
            <li><Link to="/project/Accordian">Accordian</Link></li>
            <li><Link to="/project/RandomColor">RandomColor</Link></li>
            <li><Link to="/project/StarRating">StarRating</Link></li>
            <li><Link to="/project/ImageSlider">ImageSlider</Link></li>
            <li><Link to="/project/LoadMoreData">LoadMoreData</Link></li>
            <li><Link to="/project/TreeView">TreeView</Link></li>
            <li><Link to="/project/QRCodeGenerate">QRCodeGenerate</Link></li>
            <li><Link to="/project/LightDarkMode">LightDarkMode</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
