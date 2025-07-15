import React, { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, Send
} from "lucide-react";
import { useSendContact } from "../../../hooks/useContactHook";

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const { mutate, isLoading } = useSendContact();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <button onClick={onClose} className="float-right">✕</button>
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["name", Mail, "Name"],
            ["email", Mail, "Email"],
            ["phone", Phone, "Phone"],
            ["subject", null, "Subject"]
          ].map(([key, Icon, placeholder]) => (
            <div key={key} className="relative">
              {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              {key === "subject" ? (
                <select
                  name={key} required
                  className="w-full px-3 py-2 border rounded"
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                >
                  <option value="">Subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              ) : (
                <input
                  required
                  name={key}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-3 py-2 border rounded"
                />
              )}
            </div>
          ))}
          <div className="relative">
            <textarea
              name="message" rows="4" required
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Your message..."
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" disabled={isLoading}
            className={`w-full py-2 bg-teal-600 text-white rounded ${isLoading ? "opacity-50" : ""}`}>
            <Send className="inline-block mr-2" /> {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
