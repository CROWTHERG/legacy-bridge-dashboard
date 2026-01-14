import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your Live Render URL
  const API_URL = "https://legacy-bridge-dashboard-1.onrender.com/api/products";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Connection Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', margin: '0', fontSize: '1.8rem' }}>Inventory Management System</h1>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Live Cloud Demo | React + FastAPI</p>
      </header>

      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        overflow: 'hidden' 
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading Inventory Data...</div>
        ) : (
          /* RESPONSIVE WRAPPER START: This ensures the price shows on mobile */
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead style={{ backgroundColor: '#34495e', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px 15px', textAlign: 'left' }}>Product Name</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '12px 15px', textAlign: 'center' }}>Stock</th>
                  <th style={{ padding: '12px 15px', textAlign: 'right' }}>Price (NGN)</th>
                </tr>
              </thead>
              <tbody>
                {products.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 15px', color: '#2c3e50' }}>{item.name}</td>
                    <td style={{ padding: '12px 15px', color: '#7f8c8d', fontSize: '0.85rem' }}>{item.category}</td>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>
                      ₦{item.price ? item.price.toLocaleString() : "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          /* RESPONSIVE WRAPPER END */
        )}
      </div>
      
      <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: '#bdc3c7' }}>
        Status: Backend is running on Render (Cloud)
      </footer>
    </div>
  );
}

export default App;