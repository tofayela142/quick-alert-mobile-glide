
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "/lovable-uploads/259f17a1-5aed-44fc-b912-575d908ad6c0.png",
      title: "Water Quality Monitoring",
      description: "Real-time aquaculture system monitoring"
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Advanced Sensors",
      description: "Multi-parameter water analysis"
    },
    {
      id: 3,
      image: "/placeholder.svg", 
      title: "Smart Aquaculture",
      description: "Intelligent fish farming solutions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl overflow-hidden shadow-lg mb-6">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full bg-gradient-to-br from-blue-400 via-teal-500 to-cyan-600 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                <p className="text-blue-100 text-sm">{slide.description}</p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
