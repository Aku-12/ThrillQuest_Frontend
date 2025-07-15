import React from "react";
import { Compass, Map, Zap, ArrowRight } from "lucide-react";

export default function FeaturedAdventures() {
  const adventures = [
    {
      icon: <Compass className="w-10 h-10 text-pink-400" />,
      title: "Coastal Kayaking",
      description: "Explore hidden coves and serene coastlines at your own pace.",
    },
    {
      icon: <Map className="w-10 h-10 text-teal-400" />,
      title: "Jungle Trekking",
      description: "Journey through lush, untamed wilderness and discover exotic wildlife.",
    },
    {
      icon: <Zap className="w-10 h-10 text-sky-400" />,
      title: "Urban Exploration",
      description: "Experience the vibrant pulse of iconic cities from a unique perspective.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">Curated Experiences</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Each adventure is crafted to perfection, blending thrill with comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adventures.map((adv, index) => (
            <div key={index} className="group bg-white rounded-xl p-8 border border-slate-200 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="mb-6">{adv.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{adv.title}</h3>
              <p className="text-slate-500 mb-6">{adv.description}</p>
              <a href="#" className="font-bold text-teal-600 flex items-center group-hover:text-pink-600 transition-colors">
                Learn More <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
