import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      avatar: "https://placehold.co/100x100/F1F5F9/334155?text=AR",
      quote:
        "An absolutely unforgettable experience. The attention to detail was impeccable.",
    },
    {
      name: "Samantha Bee",
      avatar: "https://placehold.co/100x100/F1F5F9/334155?text=SB",
      quote:
        "Pushed me out of my comfort zone in the best way possible. The guides were knowledgeable.",
    },
    {
      name: "David Chen",
      avatar: "https://placehold.co/100x100/F1F5F9/334155?text=DC",
      quote:
        "The perfect blend of adventure and relaxation. Everything was seamless.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () =>
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Stories from the Edge
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from fellow explorers who have journeyed with us.
          </p>
        </div>

        <div className="relative overflow-hidden w-full max-w-3xl mx-auto">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div className="bg-gray-100 p-8 rounded-lg text-center flex flex-col items-center shadow-md">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mb-4 border-2 border-teal-500"
                  />
                  <div className="flex text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                  <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute top-1/2 left-0 md:-left-12 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-teal-100 text-teal-700 rounded-full p-2 transition-all shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-0 md:-right-12 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-teal-100 text-teal-700 rounded-full p-2 transition-all shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
