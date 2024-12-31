import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import "./style.css";

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
    
  const [image, setImage] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMgs] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = async (getUrl) => {
    try {
      setLoading(true);
      const respons = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await respons.json();

      if (data) {
        setImage(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMgs(e.message);
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? image.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === image.length - 1 ? 0 : currentSlide + 1);
  };
  useEffect(() => {
    if (image.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          console.log("Previous Slide:", prevSlide);
          console.log(
            "Next Slide:",
            prevSlide === image.length - 1 ? 0 : prevSlide + 1
          );
          return prevSlide === image.length - 1 ? 0 : prevSlide + 1;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [image.length]);

  useEffect(() => {
    if (url !== "") fetchImage(url);
  }, [url]);

  console.log(image);

  if (loading) {
    return <div>Loading data! Please wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error! {errorMsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircle
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {image && image.length
        ? image.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircle onClick={handleNext} className="arrow arrow-right" />
      <span className="circle-indicators">
        {image && image.length
          ? image.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicators"
                    : "current-indicators inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
};

export default ImageSlider;
