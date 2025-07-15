import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Star,
  CheckCircle,
  Users,
  Calendar
} from "lucide-react";
import { useSendContact } from "../../hooks/useContactHook";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { mutate: sendContact, isLoading, isSuccess } = useSendContact();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContact(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Call us anytime"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@thrillquest.com",
      subtitle: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "123 Adventure Lane, Mountain View, CA 94041",
      subtitle: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Sun: 8:00 AM - 8:00 PM",
      subtitle: "Always ready for adventure"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Adventurers"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating"
    },
    {
      icon: Calendar,
      value: "365",
      label: "Days of Adventure"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Ready for your next adventure? We're here to help you plan the perfect thrill-seeking experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-teal-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
              <p className="text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="group">Group Bookings</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="Tell us about your adventure plans..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-teal-700 hover:to-purple-700"
                }`}
              >
                <Send className="w-5 h-5" />
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-700 font-medium">{item.details}</p>
                      <p className="text-sm text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-8 border border-teal-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Thrill Quest?</h2>
              <div className="space-y-4">
                {[
                  { title: "Expert Guides", text: "Professional and experienced adventure guides" },
                  { title: "Safety First", text: "Top-notch safety equipment and protocols" },
                  { title: "24/7 Support", text: "Round-the-clock customer support" },
                  { title: "Best Prices", text: "Competitive pricing with no hidden fees" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900">Quick Response</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Need immediate assistance? We typically respond to inquiries within 2 hours during business hours.
              </p>
              <div className="flex items-center gap-2 text-sm text-teal-600">
                <CheckCircle className="w-4 h-4" />
                <span>Average response time: 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
