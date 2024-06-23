"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    emailUser: "",
    emailPass: "",
    recipientEmail: "",
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    
    setLoading(false);

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Error sending email.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-4 border border-gray-300 rounded">
      <div className="mb-4">
        <label className="block mb-2" htmlFor="emailUser">Email User</label>
        <input
          type="text"
          id="emailUser"
          name="emailUser"
          value={formData.emailUser}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="emailPass">Email Password</label>
        <input
          type="password"
          id="emailPass"
          name="emailPass"
          value={formData.emailPass}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="recipientEmail">Recipient Email</label>
        <input
          type="email"
          id="recipientEmail"
          name="recipientEmail"
          value={formData.recipientEmail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
        {loading ? "Sending..." : "Send Email"}
      </button>
      {loading && <div className="mt-4 text-center">Loading...</div>}
    </form>
  );
};

export default Form;
