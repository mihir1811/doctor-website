import React from 'react';

const Features = () => {
  const featuresList = [
    {
      title: 'Feature One',
      description: 'Description of feature one.',
    },
    {
      title: 'Feature Two',
      description: 'Description of feature two.',
    },
    {
      title: 'Feature Three',
      description: 'Description of feature three.',
    },
  ];

  return (
    <section className="features">
      <h2>Key Features</h2>
      <div className="features-list">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;