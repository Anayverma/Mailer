// Form.js
"use client";
import React, { useState } from "react";

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
  }
];

const Form = () => {
  const [formData, setFormData] = useState({
    emailUser: "",
    emailPass: "",
    recipientEmail: "",
    subject: "",
    templateId: "",
    senderName: "",
    placeholders: {}
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
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

  return (
    <div className="max-w-md mx-auto my-8 p-4 border border-gray-300 rounded">
      <form onSubmit={handleSubmit}>
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
          <label className="block mb-2" htmlFor="recipientEmail">Recipient Email(s)</label>
          <input
            type="text"
            id="recipientEmail"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <small className="block text-gray-600">Separate multiple emails with commas or whitespace.</small>
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
          <label className="block mb-2" htmlFor="templateId">Select Template</label>
          <select
            id="templateId"
            name="templateId"
            value={formData.templateId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
          <label className="block mb-2" htmlFor="senderName">Your Name</label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {selectedTemplate && selectedTemplate.placeholders.map(placeholder => (
          <div key={placeholder} className="mb-4">
            <label className="block mb-2" htmlFor={`placeholder_${placeholder}`}>{placeholder}</label>
            <input
              type="text"
              id={`placeholder_${placeholder}`}
              name={`placeholder_${placeholder}`}
              value={formData.placeholders[placeholder] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </form>

      {selectedTemplate && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold mb-2">Email Preview:</h2>
          <pre className="whitespace-pre-wrap">{generatePreview()}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
