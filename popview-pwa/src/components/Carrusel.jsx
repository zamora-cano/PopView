import { useState, useEffect } from 'react';
import style from '../styles/Carrusel.module.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Carrusel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Actualiza `itemsPerPage` según el ancho de pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerPage(6); // Pantallas grandes
      } else if (width >= 992) {
        setItemsPerPage(4); // Pantallas medianas
      } else if (width >= 768) {
        setItemsPerPage(3); // Pantallas pequeñas
      } else {
        setItemsPerPage(2); // Pantallas muy pequeñas
      }
    };

    updateItemsPerPage(); // Inicializa con el valor correcto
    window.addEventListener('resize', updateItemsPerPage); // Escucha cambios en el tamaño de pantalla

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalItems = children.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalItems - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalItems - 1
    );
  };

  return (
    <Container className={style['carrusel-container']} fluid>
      <Button className={style['control-prev']} onClick={handlePrev}>&#9664;</Button>

      <Row className={`${style.components} mx-0`} style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
        {children.map((child, index) => (
          <Col key={index} className={style['carrusel-item']} style={{ flex: `0 0 ${100 / itemsPerPage}%` }}>
            {child}
          </Col>
        ))}
      </Row>

      <Button className={style['control-next']} onClick={handleNext}>&#9654;</Button>
    </Container>
  );
};

export default Carrusel;
