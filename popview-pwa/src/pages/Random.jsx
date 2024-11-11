import { useEffect, useState } from "react";
import styles from '../styles/Random.module.css'
import Cover from "../components/Cover"
import { useGlobal } from "../components/GlobalContext";

const Random = () => {
    const [medias, setMedias] = useState([])

    const {urlBackend,urlFront} = useGlobal()


    useEffect(() => {
        async function fetchMediasDescubrir() {
            try {
              const response = await fetch(urlBackend+'/popview/v1/medias/random/?cantidad=3');
              
              // Verifica si la respuesta tiene el tipo de contenido 'application/json'
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              // Verifica si la respuesta es JSON
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setMedias(data); // Aquí trabajas con los datos obtenidos
              } else {
                // Si no es JSON, muestra el contenido para depuración
                const text = await response.text();
                console.error("Respuesta no JSON:", text);
              }
            } catch (error) {
              console.error('Error al obtener generos:', error);
            }
          }

        fetchMediasDescubrir();
    }, [urlBackend]);

    return (
        <>
            <button onClick={() => window.location = urlFront}>Salir</button>
            <div className={styles.cardsContainer}>
                {medias.slice(0, 3).map((media, index) => (
                    <Cover key={index} portada={media.poster_url} portada2={media.cover_url} onclick={() => window.location = urlFront+"/p?m=" + media.id} />
                ))}
            </div>
        </>
    );
}

export default Random;
