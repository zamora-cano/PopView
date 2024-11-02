import { useState } from 'react';
import style from '../styles/NavbarBody.module.css'

const NavbarBody = ({ children }) => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };

    return (
        <>
            <button className={`${style.buttonCloseOpen} ${!isNavbarVisible ? "" : style.openNavbar}`} onClick={toggleNavbar}>
                {isNavbarVisible ? 'Cerrar' : 'Abrir'}
            </button>

                <div className={`${style.navbar} ${!isNavbarVisible ? style.hidden : ""}`}>
                    <div>Imagen</div>
                    <div>Usuario</div>
                    <div><input type='search' /></div>
                    <div>Inicio</div>
                    <div>Ver más tarde</div>
                    <div>Configuración</div>
                </div>


            <div className={`${style.content} ${!isNavbarVisible ? "" : style.openNavbar}`}>
                {children}
            </div>
        </>
    );
}

export default NavbarBody