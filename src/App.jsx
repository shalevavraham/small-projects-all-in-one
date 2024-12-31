import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';
import './App.css';
import SearchBar from './component/search-bar';
import Accordian from './component/accordian';
import RandomColor from './component/rendom-color';
import StarRating from './component/star-rating';
import ImageSlider from './component/image-slider';
import LoadMoreData from './component/load-more-data';
import TreeView from './component/tree-view';
import menus from './component/tree-view/data';
import QRCodeGenerate from './component/qr-code/index';
import LightDarkMode from './component/light-dark-mode';
import ScrollIndicator from './component/scroll-indicator/index';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
          <SearchBar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectName" element={<ProjectPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// דף הבית
const Home = () => (
  <div className="home">
    <h1>Home</h1>
    <p>Welcome Shalev's Projects!</p>
  </div>
);

// דף פרויקטים
const Projects = () => (
  <div className="projects">
    <h1>Projects</h1>
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
        <li><Link to="/project/ScrollIndicator">ScrollIndicator</Link></li>
      </ul>
    </div>
  </div>
);

// דף פרויקט ספציפי
const ProjectPage = () => {
  const { projectName } = useParams();

  let projectComponent;
  switch (projectName) {
    case 'Accordian':
      projectComponent = <Accordian />;
      break;
    case 'RandomColor':
      projectComponent = <RandomColor />;
      break;
    case 'StarRating':
      projectComponent = <StarRating 
      noOfStars={10}/>
      break;
    case 'ImageSlider':
      projectComponent = <ImageSlider 
      url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"10"}
      />;
      break;
    case 'LoadMoreData':
      projectComponent = <LoadMoreData />;
      break;
    case 'TreeView':
      projectComponent = <TreeView menus={menus}/>;
      break;
    case 'QRCodeGenerate':
      projectComponent = <QRCodeGenerate />;
      break;
    case 'LightDarkMode':
      projectComponent = <LightDarkMode />;
      break;
      case 'ScrollIndicator':
        projectComponent = <ScrollIndicator url={"https://dummyjson.com/products?limit=100"}/>
        break;
    default:
      projectComponent = <p>Project not found!</p>;
  }

  return (
    <div className="project-page">
      <h1>{projectName}</h1>
      {projectComponent}
    </div>
  );
};

export default App;
