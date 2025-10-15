import React, { useState } from "react";
import "./FAQs.css";

const faqs = [
  {
    question: "What is HoverHouse?",
    answer:
      "HoverHouse is a next-generation real estate platform where users can explore, book, and experience homes through immersive virtual tours and real-time booking options.",
  },
  {
    question: "Do I need to create an account to book a home tour?",
    answer:
      "Yes. Signing up allows us to securely manage your bookings, show times, and personalized property suggestions.",
  },
  {
    question: "How do I schedule a showing?",
    answer:
      "Once logged in, visit a property page and click 'Book Tour'. You’ll be able to select a date, time, and provide additional details.",
  },
  {
    question: "Is HoverHouse available globally?",
    answer:
      "We’re currently focused on South African real estate, but global expansion plans are underway — stay tuned for new cities coming soon.",
  },
  {
    question: "Can I list my property on HoverHouse?",
    answer:
      "Absolutely! Verified sellers and agents can upload property details, add images, and connect directly with potential buyers through their dashboards.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <p>Your most common HoverHouse questions, answered.</p>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? "open" : ""}`}
            onClick={() => toggleFAQ(i)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span>{openIndex === i ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
