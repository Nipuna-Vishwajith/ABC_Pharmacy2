// InvoicePage.js
import React, { useState, useEffect } from 'react';
import './InvoicePage.css';
import Header from './components/Header';
import Footer from './components/Footer';

const InvoicePage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [updateIndex, setUpdateIndex] = useState(null);

  // New state variables for client information
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billingTypes] = useState(['Cash', 'Credit Card', 'Online Payment']);
  const [selectedBillingType, setSelectedBillingType] = useState('');

  useEffect(() => {
    // Fetch items from the server
    fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  useEffect(() => {
    // Calculate total whenever invoiceItems or items change
    let calculatedTotal = 0;
    invoiceItems.forEach(invoiceItem => {
      const item = items.find(item => item.Name === invoiceItem.name);
      calculatedTotal += item.UnitPrice * invoiceItem.quantity;
    });
    setTotal(calculatedTotal);
  }, [invoiceItems, items]);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      if (updateIndex !== null) {
        // If an update is in progress, update the selected item
        const updatedInvoiceItems = [...invoiceItems];
        updatedInvoiceItems[updateIndex] = { name: selectedItem, quantity };
        setInvoiceItems(updatedInvoiceItems);
        setUpdateIndex(null);
      } else {
        // Otherwise, add a new item to the invoice
        setInvoiceItems([...invoiceItems, { name: selectedItem, quantity }]);
      }
      setSelectedItem('');
      setQuantity(1);
    }
  };

  const handleDeleteItem = index => {
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.splice(index, 1);
    setInvoiceItems(updatedInvoiceItems);
    setUpdateIndex(null); // Reset updateIndex when deleting an item
  };

  const handleUpdateItem = index => {
    const itemToUpdate = invoiceItems[index];
    setSelectedItem(itemToUpdate.name);
    setQuantity(itemToUpdate.quantity);
    setUpdateIndex(index);
  };

  const handleFinishClick = async () => {
    // Prepare the data to be sent to the server
    const invoiceData = {
      name,
      mobileNo,
      email,
      address,
      billingType: selectedBillingType,
      invoiceItems,
    };
  
    // Send the invoice data to the server
    const response = await fetch('http://localhost:8080/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });
  
    // Handle the response as needed
    const result = await response.json();
    console.log('Invoice saved:', result);
  
    // Reduce the selected quantities from the Items table
    invoiceItems.forEach(async (invoiceItem) => {
      const itemToUpdate = items.find((item) => item.Name === invoiceItem.name);
  
      // Calculate the new quantity
      const newQuantity = itemToUpdate.UnitQuantity - invoiceItem.quantity;
  
      // Update the item quantity in the database
      const updateResponse = await fetch(`http://localhost:8080/items/${itemToUpdate.ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UnitQuantity: newQuantity }),
      });
  
      // Handle the update response as needed
      const updateResult = await updateResponse.json();
      console.log('Item updated:', updateResult);
    });
  
    // Reset all data fields
    setName('');
    setMobileNo('');
    setEmail('');
    setAddress('');
    setSelectedBillingType('');
    setInvoiceItems([]);
    setTotal(0);
  };
  
  const getUnitPrice = itemName => {
    const selectedItem = items.find(item => item.Name === itemName);
    return selectedItem ? `LKR ${selectedItem.UnitPrice.toFixed(2)}` : '';
  };
  
  const getTotalPrice = (itemName, quantity) => {
    const selectedItem = items.find(item => item.Name === itemName);
    const total = selectedItem ? selectedItem.UnitPrice * quantity : 0;
    return `LKR ${total.toFixed(2)}`;
  };

  return (
    <div>
      <Header/>
      <div className="invoice-container">
        <h2>Invoice Page</h2>

        {/* Client Information */}
        <div className="client-info-container">
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <br />
          <label>Mobile No:</label>
          <input type="text" value={mobileNo} onChange={e => setMobileNo(e.target.value)} />
          <br />
          <label>Email:</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          <br />
          <label>Address:</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
          <br />
          <label>Billing Type:</label>
          <select value={selectedBillingType} onChange={e => setSelectedBillingType(e.target.value)}>
            <option value="" disabled>
              Select Billing Type
            </option>
            {billingTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Item Selection */}
        <div className="item-selection-container">
          <label>Select Item:</label>
          <input
            type="text"
            value={selectedItem}
            onChange={e => setSelectedItem(e.target.value)}
            list="itemList"
          />
          <datalist id="itemList">
            {items.map(item => (
              <option key={item.ItemID} value={item.Name} />
            ))}
          </datalist>

          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
          />

          <button onClick={handleAddItem}>
            {updateIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </div>

        {/* Selected Items */}
        <div className="selected-items-container">
          <h3>Selected Items:</h3>
          <table className="item-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price (LKR)</th>
                <th>Total Price (LKR)</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((invoiceItem, index) => (
                <tr key={index}>
                  <td>{invoiceItem.name}</td>
                  <td>{invoiceItem.quantity}</td>
                  <td>{getUnitPrice(invoiceItem.name)}</td>
                  <td>{getTotalPrice(invoiceItem.name, invoiceItem.quantity)}</td>
                  <td>
                    <button onClick={() => handleDeleteItem(index)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdateItem(index)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="total-container">
          <h3>Total: LKR {total.toFixed(2)}</h3>
        </div>

        <button onClick={handleFinishClick}>Finish</button>
      </div>
      <Footer/>
    </div>
  );
};

export default InvoicePage;
