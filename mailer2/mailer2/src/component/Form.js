"use client";
import { useState } from 'react';

export default function EmailForm() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const res = await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sub: subject, con: content }),
    });
    
    const result = await res.json();
    if (res.status === 200) {
      setMessage('Email sent successfully!');
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Email Form</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '10px' }}>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ padding: '8px', marginTop: '5px', marginBottom: '15px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ padding: '8px', marginTop: '5px', marginBottom: '15px', width: '100%', height: '150px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#0070f3', color: '#fff', cursor: 'pointer' }}>
          Send Email
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
  );
}
