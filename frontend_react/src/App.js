import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '', price: '' });

  const API_URL = "https://legacy-bridge-dashboard-1.onrender.com/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(API_URL)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Fetch Error:", err));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price)
    };

    axios.post(API_URL, payload)
      .then(res => {
        setProducts([...products, res.data.product]);
        setFormData({ name: '', category: '', quantity: '', price: '' }); // Reset form
      })
      .catch(err => alert("Error adding product. Check if backend is awake!"));
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    flex: '1',
    minWidth: '150px'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', margin: '0' }}>Inventory Management System</h1>
        <p style={{ color: '#7f8c8d' }}>Modernization Bridge | React + FastAPI</p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* ADD PRODUCT FORM */}
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: '0', color: '#34495e' }}>Add New Inventory Item</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={inputStyle} />
            <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={inputStyle} />
            <input type="number" placeholder="Quantity" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required style={inputStyle} />
            <input type="number" placeholder="Price (NGN)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={inputStyle} />
            <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Item</button>
          </form>
        </section>

        {/* INVENTORY TABLE */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Connecting to Bridge...</div>
          ) : (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead style={{ backgroundColor: '#34495e', color: 'white' }}>
                  <tr>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Product</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '15px', textAlign: 'center' }}>Stock</th>
                    <th style={{ padding: '15px', textAlign: 'right' }}>Price (NGN)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px', fontWeight: '500' }}>{item.name}</td>
                      <td style={{ padding: '15px', color: '#7f8c8d' }}>{item.category}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>₦{item.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;