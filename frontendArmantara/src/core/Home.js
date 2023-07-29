import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts, getCategories } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const loadAllCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = () => {
    let filteredProducts = [...products];
  
    // Filter by selected category
    if (selectedCategory !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category && product.category._id === selectedCategory
      );
    }
  
    // Sort products
    if (sortOption === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    // Filter by search query
    if (searchQuery.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    return filteredProducts;
  };
  

  const renderProducts = () => {
    const filteredProducts = filterProducts();

    return (
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card product={product} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Base title="Home Page" description="Welcome to the Gifting Store">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="text-center text-white mt-4 mb-5">Featured Products</h1>
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <select
                className="form-control"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <select
                className="form-control"
                value={sortOption}
                onChange={handleSortOptionChange}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {renderProducts()}
      </div>
    </Base>
  );
};

export default Home;
