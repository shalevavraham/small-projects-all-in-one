import React, { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  const handleRandomUtility = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleRandomHexColor = () => {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[handleRandomUtility(hex.length)];
    }
    setColor(hexColor);
  };

  const handleRandomRgbColor = () => {
    const r = handleRandomUtility(256)
    const g = handleRandomUtility(256)
    const b = handleRandomUtility(256)

     setColor(`rgb(${r}, ${g}, ${b})`)
  };

  useEffect(() => {
    if(typeOfColor === 'rgb') handleRandomRgbColor()
        else handleRandomHexColor()
  },[typeOfColor])

  return (
    <div
      style={{
        height: "100vh",
        background: color,
      }}
    >
      <button onClick={() => setTypeOfColor("hex")}>Create HEX color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB color</button>
      <button
        onClick={
          typeOfColor === "hex" ? handleRandomHexColor : handleRandomRgbColor
        }
      >
        Generate Create Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor}</h3>
        <h2>{color}</h2>
      </div>
    </div>
  );
};

export default RandomColor;
