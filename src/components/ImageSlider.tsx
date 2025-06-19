
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const slides = [
    {
      id: 1,
      image: "/lovable-uploads/259f17a1-5aed-44fc-b912-575d908ad6c0.png",
      title: "Smart Aquaculture Monitoring",
      subtitle: "CSTE Department - NSTU",
      description: "Real-time water quality monitoring system for sustainable fish farming in Noakhali",
      gradient: "from-blue-600 via-teal-600 to-cyan-600"
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Advanced IoT Sensors",
      subtitle: "Multi-Parameter Analysis",
      description: "pH, DO, Turbidity, Temperature monitoring with Firebase integration",
      gradient: "from-green-600 via-emerald-600 to-teal-600"
    },
    {
      id: 3,
      image: "/placeholder.svg", 
      title: "Research Innovation",
      subtitle: "NSTU Excellence",
      description: "Computer Science & Telecommunication Engineering solutions for agriculture",
      gradient: "from-purple-600 via-indigo-600 to-blue-600"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-2xl mb-6 group">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-0 transform scale-105'
            }`}
          >
            <div className={`relative h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              <div className="relative z-10 text-center text-white px-6 max-w-sm">
                <div className="mb-2">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{slide.title}</h3>
                  <p className="text-sm text-blue-100 font-medium mb-3 drop-shadow">{slide.subtitle}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="text-sm text-white/90 leading-relaxed">{slide.description}</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Auto-play control */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
        >
          {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Enhanced slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full border border-white/30 ${
              index === currentSlide 
                ? 'bg-white w-8 h-2' 
                : 'bg-white/50 hover:bg-white/70 w-2 h-2 hover:scale-125'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
