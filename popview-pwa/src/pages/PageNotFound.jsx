import React from "react";

const PageNotFound = () => {
    const styles = {
        container: {
            backgroundColor: "#000", // Fondo negro
            color: "#fff", // Texto blanco
            display: "flex", // Alineación centralizada
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Ocupa toda la altura de la ventana
            textAlign: "center",
            flexDirection: "column",
        },
        link: {
            color: "#4caf50", // Verde
            textDecoration: "none",
            marginTop: "20px",
            fontSize: "18px",
        },
        title: {
            fontSize: "48px",
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: "24px",
            marginTop: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <div>
                <h1 style={styles.title}>404</h1>
                <p style={styles.subtitle}>Página no encontrada</p>
                <a href="/" style={styles.link}>
                    Volver a la página principal
                </a>
            </div>
        </div>
    );
};

export default PageNotFound;
