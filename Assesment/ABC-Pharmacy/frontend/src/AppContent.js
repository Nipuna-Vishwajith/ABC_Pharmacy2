// AppContent.js
import React from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Footer from './components/Footer';
import './AppContent.css'; 

const AppContent = () => {
  return (
    <div className="app-content-container">
      <Header />
      <div className="content-wrapper">
        <ItemList />
        <ItemForm />
      </div>
      <Footer />
    </div>
  );
};

export default AppContent;
