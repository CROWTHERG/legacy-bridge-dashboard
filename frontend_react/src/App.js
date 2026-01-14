import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // REPLACE THIS URL with your live Render URL
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
    <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', margin: '0' }}>Inventory Management System</h1>
        <p style={{ color: '#7f8c8d' }}>Live Cloud Demo | React + FastAPI</p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading Inventory Data...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#34495e', color: 'white' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Product Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Stock</th>
                <th style={{ padding: '15px', textAlign: 'right' }}>Price (NGN)</th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{item.name}</td>
                  <td style={{ padding: '15px' }}>{item.category}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>
                    ₦{item.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: '#bdc3c7' }}>
        Status: Backend is running on Render (Cloud)
      </footer>
    </div>
  );
}

export default App;