import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your Python Backend
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Connection Error:", err));
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50' }}>Inventory Management System</h1>
        <p>Modern React Interface | Python API Backend</p>
      </header>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#34495e', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Product Name</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Price (NGN)</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>{item.name}</td>
                <td style={{ padding: '15px' }}>{item.category}</td>
                <td style={{ padding: '15px' }}>{item.quantity}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>₦{item.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;