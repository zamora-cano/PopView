import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Spinner, Form, Container, Row, Col } from 'react-bootstrap';
import styles from "../styles/Watch.module.css";

const Watch = () => {
    const [resolutions, setResolutions] = useState({});
    const [resolution, setResolution] = useState('1080p');
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const videoRef = useRef(null);

    const location = useLocation();

    const handleBackClick = () => {
        window.location.href = `http://localhost:3000/p?m=${movie.media}`;
    };

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

    useEffect(() => {
        fetchMedia();
    }, [location.search]);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        videoRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    return (
        <Container className={`${styles.container} mt-4`}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Button variant="secondary" className="mb-3" onClick={handleBackClick}>
                        Regresar
                    </Button>
                    <h2 className="text-center">{movie?.nombre}</h2>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <div className={styles.videoContainer}>
                                <div className={styles.videoBackground}>
                                    <video
                                        ref={videoRef}
                                        src={`http://127.0.0.1:8000/popview/v1/stream/${movie?.id}/?resolution=${resolution}`}
                                        className={styles.video}
                                        autoPlay
                                        loop
                                        muted
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                    />
                                </div>
                                <div className={styles.customControls}>
                                    <button onClick={handlePlayPause}>
                                        {isPlaying ? 'Pausa' : 'Reproducir'}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={(currentTime / duration) * 100}
                                        onChange={handleSeek}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col md={4}>
                            <Form.Group controlId="resolutionSelect">
                                <Form.Label>Calidad de Video</Form.Label>
                                <Form.Select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                    {Object.keys(resolutions).map((res) => (
                                        <option key={res} value={res} disabled={!resolutions[res]}>
                                            {res} {resolutions[res] ? '' : '(no disponible)'}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Watch;
