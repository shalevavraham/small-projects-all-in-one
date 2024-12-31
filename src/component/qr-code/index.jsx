import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import "./style.css";

const QRCodeGenerate = () => {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const qrCodeRef = useRef(null);

  const handleGenerateQrCode = () => {
    setQrCode(input);
  };

  const handleShare = async () => {
    console.log("Share button clicked");
    if (navigator.share) {
      try {
        const qrElement = document.getElementById("qr-code-value");

        if (!qrElement) {
          alert("Please generate the QR code before sharing.");
          return;
        }

        const imageUrl = await toPng(qrElement);
        console.log("Image URL:", imageUrl);

        // שולח את התמונה כקובץ דרך navigator.share
        await navigator.share({
          title: "QR Code",
          text: "Check this QR Code",
          files: [new File([imageUrl], "qrcode.png", { type: "image/png" })],
        });
      } catch (error) {
        console.log("Sharing Failed", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleCopy = async () => {
    if (!qrCode) {
      alert("Please generate a QR code first!");
      return;
    }
    try {
      const qrElement = document.getElementById("qr-code-value");

      if (!qrElement) {
        alert("QR code not found.");
        return;
      }
      const imageUrl = await toPng(qrElement);
      console.log("Image URL to copy:", imageUrl);

      await navigator.clipboard.writeText(imageUrl);

      alert("QR Code image URL copied to clipboard!");
    } catch (error) {
      console.log("Copy failed", error);
      alert("Failed to copy QR Code!");
    }
  };

  const handleClear = () => {
    setQrCode("");
    setInput("");
    setQrColor("#000000");
    setBgColor("#ffffff");
    setSize(200);
  };

  return (
    <div className="qr-app">
      <h1 className="qr-title">QR Code Generator</h1>
      <div className="qr-controls">
        <input
          type="text"
          name="qr-code"
          placeholder="Enter text..."
          className="qr-input"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="qr-buttons">
          <button
            className="qr-button"
            disabled={!input.trim()}
            onClick={handleGenerateQrCode}
          >
            Generate
          </button>
          <button className="qr-button" onClick={handleClear}>
            Clear
          </button>
          <button className="qr-button qr-share-button" onClick={handleShare}>
            Share QR Code
          </button>
          <button className="qr-button qr-copy-button" onClick={handleCopy}>
            Copy QR Code
          </button>
        </div>
      </div>
      <div className="qr-customization">
        <label>QR Color</label>
        <input
          type="color"
          value={qrColor}
          className="qr-color-picker"
          onChange={(e) => setQrColor(e.target.value)}
        />
        <label>Background</label>
        <input
          type="color"
          value={bgColor}
          className="qr-color-picker"
          onChange={(e) => setBgColor(e.target.value)}
        />
        <label>Size</label>
        <select
          value={size}
          className="qr-size-selector"
          onChange={(e) => setSize(parseInt(e.target.value))}
        >
          <option value="200">Small</option>
          <option value="300">Medium</option>
          <option value="400">Large</option>
        </select>
      </div>
      <div className="qr-preview">
        {qrCode ? (
          <div id="qr-code-value" className="qr-code-container">
            <QRCode
              value={qrCode}
              size={size}
              fgColor={qrColor}
              bgColor={bgColor}
            />
          </div>
        ) : (
          <p className="qr-placeholder">
            No QR Code to display. Please generate one!
          </p>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerate;
