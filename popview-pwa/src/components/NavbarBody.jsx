import { useState } from 'react';

/* Estilos */
import style from '../styles/NavbarBody.module.css'
import {Image} from 'react-bootstrap/';


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
                    <Image src='https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg' roundedCircle></Image>
                    <div>Nombre Usuario</div>
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