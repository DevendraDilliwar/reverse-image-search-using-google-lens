'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Mail, FileText, HelpCircle } from 'lucide-react';

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: "What is this service and how does it work?",
      answer: "Our reverse image search service allows you to upload any image and find similar images, identify objects, or discover the source of an image across the web. Simply upload your image, and our AI-powered technology will analyze it and provide relevant results within seconds."
    },
    {
      id: 2,
      question: "How does reverse image search work?",
      answer: "Our system uses advanced computer vision and machine learning algorithms to analyze the visual features of your uploaded image. It then compares these features against our extensive database and web crawling results to find visually similar images, identify objects, text, or provide contextual information about the image content."
    },
    {
      id: 3,
      question: "How are credits calculated or consumed?",
      answer: "Credits are consumed based on the type of search you perform. Basic image searches consume 1 credit, detailed analysis with object detection uses 2 credits, and premium searches with extensive web crawling use 3 credits. You can see your remaining credits in your dashboard at any time."
    },
    {
      id: 4,
      question: "How can I buy more credits?",
      answer: "You can purchase additional credits through your account dashboard. We offer various packages: Starter (100 credits - $9.99), Professional (500 credits - $39.99), and Enterprise (1500 credits - $99.99). All payments are processed securely through Stripe."
    },
    {
      id: 5,
      question: "How do I cancel or delete my account?",
      answer: "To delete your account, go to Settings > Account Management > Delete Account. Please note that this action is irreversible and will permanently remove all your data, search history, and remaining credits. If you just want to cancel your subscription, you can do so in the Billing section."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.subject && contactForm.message) {
      console.log('Form submitted:', contactForm);
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <HelpCircle className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Help & Support</h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Find answers to common questions or get in touch with our support team for assistance.
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* FAQs Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-3" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-3 lg:space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                    >
                      <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{faq.question}</span>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-6 lg:p-8 lg:sticky lg:top-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Support</h2>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Live Chat</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Get instant help</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email Support</h3>
                    <p className="text-xs sm:text-sm text-gray-600">support@yourapp.com</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Billing Question">Billing Question</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Account Help">Account Help</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  Send Message
                </button>
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  We typically respond within <span className="font-semibold text-blue-600">24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;