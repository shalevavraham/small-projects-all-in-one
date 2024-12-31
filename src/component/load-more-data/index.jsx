import React, { useEffect, useState } from "react";
import "./style.css";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]); // כל המוצרים נטענים
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        // הוסף רק את המוצרים שלא נמצאים כבר ברשימה
        setAllProducts((prevData) => [
          ...prevData,
          ...result.products.filter(
            (product) => !prevData.some((item) => item.id === product.id)
          ),
        ]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // חיפוש בתוך כל המוצרים
  const filterSearchProducts =
    searchTerm.trim() !== ""
      ? allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allProducts;
      
  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (allProducts.length === 100) setDisableButton(true);
  }, [allProducts]);

  if (loading) {
    return <div>Loading data! Please wait.</div>;
  }

  return (
    <div className="load-more-container">
      <div className="input-search">
        <input
          type="text"
          placeholder="Search Item"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
          }}
        />
      </div>
      <div className="product-container">
        {searchTerm ? (
          filterSearchProducts.length === 0 ? ( // אם לא מצאנו מוצרים
            <p>No product found!</p>
          ) : (
            filterSearchProducts.map(
              (
                item,
                index // הצג את המוצרים שמצאנו בחיפוש
              ) => (
                <div className="product" key={`${item.id}-${index}`}>
                  {" "}
                  {/* השתמש ב-id של המוצר כמפתח */}
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              )
            )
          )
        ) : (
          // אם החיפוש ריק, הצג את כל המוצרים
          <>
            {allProducts.length > 0 ? (
              allProducts.map((item, index) => (
                <div className="product" key={`${item.id}-${index}`}>
                  {" "}
                  {/* השתמש ב-id של המוצר כמפתח */}
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </>
        )}
      </div>
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Data
        </button>
        {disableButton ? <p>You have reached to 100 products</p> : null}
      </div>
    </div>
  );
};

export default LoadMoreData;
