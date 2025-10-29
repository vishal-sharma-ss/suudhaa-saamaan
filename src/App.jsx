// 🧪 MINIMAL TEST VERSION - Replace your App.jsx with this temporarily
// This will help us diagnose the issue

import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FF6B00, #00B894)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '48px',
          margin: '0 0 20px 0',
          color: '#FF6B00'
        }}>
          ✅ React is Working!
        </h1>
        <h2 style={{
          fontSize: '24px',
          margin: '0 0 10px 0',
          color: '#333'
        }}>
          Suudhaa Saamaan
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
          margin: '0 0 20px 0'
        }}>
          In one click. Delivered to your home 🏠
        </p>
        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            <strong>Next step:</strong> Replace this with full App.jsx
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;