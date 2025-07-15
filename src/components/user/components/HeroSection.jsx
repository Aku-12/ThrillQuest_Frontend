import React, { useState, useEffect } from "react";
import { ArrowRight, Award, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Dynamic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-600 to-teal-400 animate-pulse" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-purple-500 via-teal-500 to-purple-400 animate-pulse delay-75" 
             style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Advanced animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-teal-400/20 to-purple-400/20 rounded-full mix-blend-screen filter blur-3xl animate-blob-spin"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-teal-400/20 rounded-full mix-blend-screen filter blur-3xl animate-blob-spin-reverse"></div>
        <div className="absolute top-1/2 -left-32 w-56 h-56 bg-gradient-to-r from-teal-300/15 to-purple-300/15 rounded-full mix-blend-screen filter blur-3xl animate-blob-float"></div>
        <div className="absolute top-1/4 -right-32 w-60 h-60 bg-gradient-to-r from-purple-300/15 to-teal-300/15 rounded-full mix-blend-screen filter blur-3xl animate-blob-float-delayed"></div>
      </div>

      <div className="container mx-auto px-6 text-center h-screen min-h-[600px] flex flex-col justify-center items-center relative z-10">
        
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Award className="absolute top-20 left-20 w-6 h-6 text-teal-300 opacity-30 animate-pulse" />
          <Award className="absolute top-32 right-32 w-4 h-4 text-purple-300 opacity-25 animate-ping" />
          <Award className="absolute bottom-40 left-16 w-5 h-5 text-teal-400 opacity-20 animate-bounce" />
          <Award className="absolute bottom-20 right-20 w-6 h-6 text-purple-400 opacity-30 animate-pulse delay-100" />
        </div>

        {/* Main Content */}
        <div className={`transform transition-all duration-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Badge */}
          <div className={`inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 text-sm font-medium mb-8 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
            <Award className="w-4 h-4 mr-2 text-teal-400" />
            Premium Adventure Experiences
          </div>

          {/* Main heading with staggered animation */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-slate-200 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Unleash
            </span>
            <br />
            <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-purple-200 to-slate-200 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Your Spirit
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            We curate extraordinary journeys for the modern explorer. Find your edge, 
            discover the unknown, and create stories that last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center text-base">
                Discover Tours
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            
            <button className="group inline-flex items-center justify-center px-8 py-4 border border-slate-400/30 text-slate-300 font-semibold rounded-lg backdrop-blur-sm hover:bg-white/5 hover:border-slate-300/50 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
              <span className="text-base">Watch Preview</span>
              <div className="ml-3 w-2 h-2 bg-teal-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <div className="flex flex-col items-center text-slate-400">
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border border-slate-500/30 rounded-full flex justify-center">
              <ChevronDown className="w-4 h-4 mt-2 animate-bounce text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-spin {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        
        @keyframes blob-spin-reverse {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(1.2); }
        }
        
        @keyframes blob-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes blob-float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-blob-spin {
          animation: blob-spin 20s infinite ease-in-out;
        }
        
        .animate-blob-spin-reverse {
          animation: blob-spin-reverse 25s infinite ease-in-out;
        }
        
        .animate-blob-float {
          animation: blob-float 15s infinite ease-in-out;
        }
        
        .animate-blob-float-delayed {
          animation: blob-float-delayed 18s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}