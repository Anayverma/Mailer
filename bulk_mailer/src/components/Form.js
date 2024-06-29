"use client";
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import bcrypt from 'bcryptjs';

const templates = [
  {
    id: 1,
    template: "Hello [name],\n\nThis is a reminder about [event]. Please remember to [action].\n\nBest,\n[Your Name]",
    placeholders: ["name", "event", "action"]
  },
  {
    id: 2,
    template: "Dear [name],\n\nThank you for [reason]. We appreciate your [appreciation].\n\nSincerely,\n[Your Name]",
    placeholders: ["name", "reason", "appreciation"]
  },
  {
    id: 3,
    template: "Hi [name],\n\nYour appointment for [appointment] is scheduled on [date]. Please be on time.\n\nRegards,\n[Your Name]",
    placeholders: ["name", "appointment", "date"]
  },
  {
    id: 4,
    template: "Greetings [name],\n\nWe are excited to invite you to [event]. The event will take place on [date] at [location].\n\nWarm regards,\n[Your Name]",
    placeholders: ["name", "event", "date", "location"]
  },
  {
    id: 5,
    template: "Hey [name],\n\nDon't forget about [reminder]. It's happening on [date].\n\nCheers,\n[Your Name]",
    placeholders: ["name", "reminder", "date"]
  },
  {id: 6,
    template: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <div style="text-align: center;">
          <img src="https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner" style="width: 100%; height: auto; max-width: 600px; margin-bottom: 20px;">
        </div>
        <p>Hello [name],</p>
        <p>This is a reminder about <strong>[event]</strong>. Please remember to <em>[action]</em>.</p>
        <p>Best,</p>
        <p style="font-size: 18px; color: #555;">[Your Name]</p>
      </div>
    `,
    placeholders: ["name", "event", "action"]}

];
const Form = () => {
  const [formData, setFormData] = useState({
    emailUser: "",
    emailPass: "",
    recipientEmails: [],
    subject: "",
    templateId: "",
    senderName: "",
    placeholders: {}
  });

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const hashedPassword = bcrypt.hashSync("123456789", 10);

  const handleChange = (e) => {
    // console.log(e)
    const { name, value } = e.target;
    if (name.startsWith('placeholder_')) {
      setFormData({
        ...formData,
        placeholders: {
          ...formData.placeholders,
          [name.replace('placeholder_', '')]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileUpload = (e) => {
    // console.log(e)
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emails = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).map(row => row[0]);
      setFormData({
        ...formData,
        recipientEmails: emails
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

  const selectedTemplate = templates.find(t => t.id === parseInt(formData.templateId));

  const generatePreview = () => {
    if (!selectedTemplate) return "";

    let preview = selectedTemplate.template;
    for (const [placeholder, value] of Object.entries(formData.placeholders)) {
      preview = preview.replace(`[${placeholder}]`, value);
    }
    preview = preview.replace("[Your Name]", formData.senderName);

    return preview;
  };

  const handleLogin = () => {
    if (loginEmail === "test@gmail.com" && bcrypt.compareSync(loginPassword, hashedPassword)) {
      setIsAuthenticated(true);
      setLoginPopupVisible(false);
    } else {
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {loginPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Send Email</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="emailUser">Email User</label>
            <input
              type="text"
              id="emailUser"
              name="emailUser"
              value={formData.emailUser}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="emailPass">Email Password</label>
            <input
              type="password"
              id="emailPass"
              name="emailPass"
              value={formData.emailPass}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="templateId">Select Template</label>
            <select
              id="templateId"
              name="templateId"
              value={formData.templateId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a template</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  Template {template.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="senderName">Your Name</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {selectedTemplate && selectedTemplate.placeholders.map(placeholder => (
            <div key={placeholder} className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor={`placeholder_${placeholder}`}>{placeholder}</label>
              <input
                type="text"
                id={`placeholder_${placeholder}`}
                name={`placeholder_${placeholder}`}
                value={formData.placeholders[placeholder] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="recipientFile">Upload Recipients File</label>
            <input
              type="file"
              id="recipientFile"
              name="recipientFile"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      )}

      {selectedTemplate && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Email Preview:</h2>
          <pre className="whitespace-pre-wrap">{generatePreview()}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
