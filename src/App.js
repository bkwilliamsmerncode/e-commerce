import React, { useState, useMemo, useCallback } from 'react';
import './ProductList.css'; // Import the CSS file
import book1 from './Assets/book1.jpg'
import book2 from  './Assets/book2.jpg'
import elec1 from './Assets/elec1.jpeg'
import elec2 from './Assets/elec2.png'

// Sample product data
const initialProducts = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 99, img: elec1 },
  { id: 2, name: 'Product B', category: 'Books', price: 15, img: book1 },
  { id: 3, name: 'Product C', category: 'Electronics', price: 199, img: elec2 },
  { id: 4, name: 'Product D', category: 'Books', price: 25, img: book2 },
  // Add more products as needed
];

const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filterProducts = useCallback(
    (products) => {
      return categoryFilter
        ? products.filter((product) => product.category === categoryFilter)
        : products;
    },
    [categoryFilter]
  );

  const sortProducts = useCallback(
    (products) => {
      return [...products].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    },
    [sortOrder]
  );

  const displayedProducts = useMemo(() => {
    const filtered = filterProducts(initialProducts);
    return sortProducts(filtered);
  }, [filterProducts, sortProducts]);

  return (
    <div className="product-list-container">
      <h1>Product List</h1>

      <div className="controls">
        <label>
          Filter by Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
          </select>
        </label>

        <label>
          Sort by Price:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
      </div>

      <div className="product-grid">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;