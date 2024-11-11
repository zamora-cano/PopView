import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Spinner, Form, Container, Row, Col } from 'react-bootstrap';
import styles from "../styles/Watch.module.css";
import { useGlobal } from '../components/GlobalContext';

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

    const {urlBackend,urlFront} = useGlobal()

    const location = useLocation();

    const handleBackClick = () => {
        window.location.href = `${urlFront}/p?m=${movie.media}`;
    };

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

    const handleResolutionChange = (e) => {
        setResolution(e.target.value);
        if (videoRef.current) {
            // Pause the video before switching resolution
            videoRef.current.pause();

            // Wait for the source to change before playing the video again
            const newVideoSrc = `${urlBackend}/popview/v1/stream/${movie?.id}/?resolution=${e.target.value}`;
            videoRef.current.src = newVideoSrc;

            videoRef.current.load(); // Load the new source

            // Ensure the video plays from the current time
            videoRef.current.currentTime = currentTime;
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const fetchMedia = async () => {
            const queryParams = new URLSearchParams(location.search);
            const capituloID = queryParams.get('c');
            try {
                const response = await fetch(`${urlBackend}/popview/v1/capitulos/${capituloID}`, {
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
    }, [location.search, urlBackend]);

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
                                        src={`${urlBackend}/popview/v1/stream/${movie?.id}/?resolution=${resolution}`}
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
                                <Form.Select value={resolution} onChange={handleResolutionChange}>
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