import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../styles/Watch.module.css";

const Watch = () => {
    const [resolutions, setResolutions] = useState({});
    const [resolution, setResolution] = useState('1080p');
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const location = useLocation();

    const handleBackClick = () => {
        window.location.href = `http://localhost:3000/p?m=${movie.media}`;
    };

    useEffect(() => {
        const fetchMedia = async () => {
            const queryParams = new URLSearchParams(location.search);
            const capituloID = queryParams.get('c');

            try {
                const response = await fetch(`http://127.0.0.1:8000/popview/v1/capitulos/${capituloID}`, {
                    mode: 'cors',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovie(data);
                setResolutions({
                    '1080p': data.video_1080p,
                    '720p': data.video_720p,
                    '480p': data.video_480p,
                    '360p': data.video_360p,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching media:', error);
                setLoading(false);
            }
        };
        fetchMedia();
    }, [location.search]);

    return (
        <div className={styles.container}>
            {loading ? (
                "Cargando..."
            ) : (
                <>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Regresar
                    </button>
                    <h2 className={styles.title}>{movie.nombre}</h2>
                    <div className={styles.iframeContainer}>
                        <iframe
                            src={resolutions[resolution]}
                            className={styles.iframe}
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; encrypted-media" // Permite autoplay y medios encriptados
                            title="Video"
                            width="1080"
                            height="720"
                        />
                    </div>
                    <div className={styles.controls}>
                        <select
                            value={resolution}
                            onChange={(event) => setResolution(event.target.value)}
                            className={styles.resolutions}
                        >
                            {Object.keys(resolutions).map((res) => (
                                <option key={res} value={res} disabled={!resolutions[res]}>
                                    {res} {resolutions[res] ? '' : '(no disponible)'}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    );
};

export default Watch;
