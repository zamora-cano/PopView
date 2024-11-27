import { useEffect, useState, useCallback } from "react";
import styles from '../styles/Random.module.css';
import Cover from "../components/Cover";
import { useGlobal } from "../components/GlobalContext";

const Random = () => {
  const [medias, setMedias] = useState([]);
  const { urlBackend, urlFront } = useGlobal();

  // Memoizar la función para evitar recrearla en cada render
  const fetchMediasDescubrir = useCallback(async () => {
    try {
      const response = await fetch(urlBackend + '/popview/v1/medias/random/?cantidad=3');

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMedias(data);
      } else {
        const text = await response.text();
        console.error("Respuesta no JSON:", text);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }, [urlBackend]); // urlBackend es una dependencia

  // Ejecutar la función al montar el componente
  useEffect(() => {
    fetchMediasDescubrir();
  }, [fetchMediasDescubrir]); // fetchMediasDescubrir como dependencia

  return (
    <>
      <button onClick={() => (window.location = urlFront)}>Salir</button>
      <div className={styles.cardsContainer}>
        {medias.slice(0, 3).map((media, index) => (
          <Cover 
            key={index} 
            portada={media.poster_url} 
            portada2={media.cover_url} 
            onclick={() => (window.location = urlFront + "/p?m=" + media.id)} 
          />
        ))}
      </div>
      <button onClick={fetchMediasDescubrir}>Recargar</button>
    </>
  );
};

export default Random;
