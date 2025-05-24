import React from 'react';

const testimonials = [
  {
    name: "John Doe",
    feedback: "This product has changed my life for the better!",
    position: "CEO, Company A"
  },
  {
    name: "Jane Smith",
    feedback: "An amazing experience! Highly recommend to everyone.",
    position: "Marketing Director, Company B"
  },
  {
    name: "Alice Johnson",
    feedback: "Exceptional quality and fantastic customer service.",
    position: "Product Manager, Company C"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <p>"{testimonial.feedback}"</p>
            <h4>- {testimonial.name}, {testimonial.position}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;