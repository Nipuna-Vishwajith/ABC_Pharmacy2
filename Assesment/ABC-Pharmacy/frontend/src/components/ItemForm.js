import './ItemForm.css';
import React, { useState } from 'react';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitQuantity, setUnitQuantity] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert string values to  data types
    const parsedUnitPrice = parseFloat(unitPrice);
    const parsedUnitQuantity = parseInt(unitQuantity, 10);

    await fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        unitPrice: parsedUnitPrice,
        unitQuantity: parsedUnitQuantity,
        itemCategory,
      }),
    });

    // Reset form fields after submission
    setName('');
    setUnitPrice('');
    setUnitQuantity('');
    setItemCategory('');
  };

  return (
    <div className="item-form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Unit Price:</label>
          <input type="text" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Unit Quantity:</label>
          <input type="text" value={unitQuantity} onChange={(e) => setUnitQuantity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Item Category:</label>
          <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
