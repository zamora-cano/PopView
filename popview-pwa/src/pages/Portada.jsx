import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../styles/Portada.module.css";
import { Button } from 'react-bootstrap'; // Importamos el botón de Bootstrap

const Portada = () => {
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchMedia = async () => {
            const queryParams = new URLSearchParams(location.search);
            const mediaId = queryParams.get('m');

            try {
                const response = await fetch(`http://127.0.0.1:8000/popview/v1/media/${mediaId}`, {
                    mode: 'cors',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setMedia(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching media:', error);
                setLoading(false); // Asegúrate de actualizar el estado de carga si hay un error
            }
        };
        fetchMedia();
    }, [location.search]);

    if (loading) {
        return <div style={{ color: "white" }}>Cargando...</div>;
    }

    return (
        <div style={{ color: "white" }}>
            <img src={media.banner_url} alt={media.nombre} className={styles.banner} />
            <div className={styles.degradado} />

            {/* Botón para regresar al menú */}
            <Button 
                variant="light" 
                className={styles.backButton} 
                onClick={() => window.location = 'http://localhost:3000'}>
                Regresar al menú
            </Button>

            <div className={styles.titleContainter}>
                <div className={styles.title}>{media.nombre}</div>
                <div>{media.descripcion}</div>
                <div className={styles.puntuacion}>{media.ibm}/10</div>
            </div>

            {Object.entries(media.capitulos).map(([temporada, capitulos]) => (
                <div key={temporada} className={styles.temporadaContainer}>
                    {capitulos.length > 1 && (
                        <>
                            <div className={styles.temporada}>
                                <h3>{temporada}</h3>
                            </div>
                            <div className={styles.capitulosContainer}>
                                {capitulos.map((capitulo) => (
                                    <div key={capitulo.id} className={styles.capitulo} onClick={() => window.location = `./watch?c=${capitulo.id}`}>
                                        <div className={styles.imageContainer}>
                                            <img className={styles.covers} src={capitulo.cover_url} alt={capitulo.nombre} />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <div className={styles.capituloNombre}>{capitulo.nombre}</div>
                                            <div className={styles.capituloDescripcion}>{capitulo.descripcion}</div>
                                            <div className={styles.capituloIbm}>{capitulo.ibm}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {capitulos.length === 1 && (
                        <button
                            className={styles.OnlyButton}
                            onClick={() => window.location = `./watch?c=${capitulos[0].id}`}
                        >
                            Ver película
                        </button>
                    )}
                </div>
            ))}

        </div>
    );
}

export default Portada;
