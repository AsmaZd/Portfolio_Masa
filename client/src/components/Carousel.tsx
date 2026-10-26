import React, { useState, type ReactNode } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle  } from "react-icons/io";

interface CarouselProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  style?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  // autoSlide = false,
  // autoSlideInterval = 3000,
  style = "bg-purple-100 py-10",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => 
    setCurrentIndex((curr) => (curr === 0 ? children.length - 1 : curr - 1));

  const next = () =>
    setCurrentIndex((curr) => (curr === children.length - 1 ? 0 : curr + 1));

  return(
    <div className={`relative overflow-hidden ${style}`}>

      {/* slides */}
      <div style={{ transform: `translateX(-${currentIndex * 100}%)` }} className='flex'>
        {children.map((child, index) => (
          <div key={index} className='w-full flex-shrink-0'>
            {child}
          </div>
        ))}
      </div>

      {/* previous button */}
      <button
        onClick={prev}
        aria-label='précédent'
        className='absolute left-1 top-4/10 text-white/70 hover:text-white'>
          <IoMdArrowDropleftCircle />
      </button>

      {/*  next button */}
      <button
        onClick={next}
        aria-label='suivant'
        className='absolute right-1 top-4/10 text-white/70 hover:text-white'>
          <IoMdArrowDroprightCircle />
      </button>

      {/* indicators */}
      <div className='absolute bottom-1 left-0 right-0 flex items-center justify-center gap-2'>
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`bg-white w-2 h-1.5 rounded-full ${currentIndex === index ? 'p-1 w-4' : 'bg-white/70 hover:bg-white/90'}`}>
              {/* {index} */}
          </button>
        ))}
      </div>
    </div>

      

  );
};