import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find Your Passion",
      description: "Browse our collection of unique, hand-picked adventures.",
    },
    {
      number: "02",
      title: "Plan Your Journey",
      description: "Customize your trip with our easy-to-use booking tools.",
    },
    {
      number: "03",
      title: "Embark & Explore",
      description: "Connect with expert guides and start your unforgettable journey.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">Your Journey Starts Here</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Three simple steps to your next great story.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {steps.map((step, index) => (
              <div key={index} className="bg-white text-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-sky-500 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
