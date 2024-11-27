import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import style from "../styles/Busqueda.module.css";
import { useGlobal } from "../components/GlobalContext";

const Busqueda = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { urlBackend, urlFront } = useGlobal();

    // Función memorizada para realizar la búsqueda
    const fetchResults = useCallback(async (searchTerm) => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${urlBackend}/popview/v1/medias/search/`, {
                params: { q: searchTerm },
            });
            setResults(response.data);
        } catch (err) {
            setError("No se pudieron cargar los resultados.");
        } finally {
            setLoading(false);
        }
    }, [urlBackend]);

    // Usar debouncing para realizar la búsqueda
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchResults(query);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, fetchResults]); // fetchResults ahora está en las dependencias

    return (
        <div className={style.container}>
            <button onClick={() => (window.location = "/")}>Regresar</button>
            <h1 className={style.title}>Buscar Películas</h1>
            <input
                type="text"
                placeholder="Busca películas o series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={style.searchInput}
            />
            {loading && <p>Cargando...</p>}
            {error && <p className={style.error}>{error}</p>}
            {!loading && !error && results.length > 0 && (
                <div className={style.resultsContainer}>
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className={style.resultItem}
                            onClick={() => (window.location = urlFront + "/p?m=" + result.id)}
                        >
                            <img src={result?.poster_url} alt={result.nombre} className={style.resultImage} />
                            <div className={style.resultInfo}>
                                <h4>{result.nombre}</h4>
                                <p>{result.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && !error && query && results.length === 0 && (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
};

export default Busqueda;
