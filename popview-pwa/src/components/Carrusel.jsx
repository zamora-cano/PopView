import { useState } from 'react';
import style from '../styles/Carrusel.module.css';

const Carrusel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Número total de elementos visibles por "página"
  const itemsPerPage = 7;

  // Total de páginas
  const totalItems = children.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    // Si estamos en la última página, volvemos al inicio
    setCurrentIndex((prevIndex) =>
      prevIndex < totalPages - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    // Si estamos en la primera página, volvemos al final
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalPages - 1
    );
  };

  return (
    <div className={style['carrusel-container']}>
      <button className={style['control-prev']} onClick={handlePrev}>
        &#9664; {/* Flecha izquierda */}
      </button>

      <div
        className={style.components}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div className={style['carrusel-item']} key={index}>
            {child}
          </div>
        ))}
      </div>

      <button className={style['control-next']} onClick={handleNext}>
        &#9654; {/* Flecha derecha */}
      </button>
    </div>
  );
};

export default Carrusel;
