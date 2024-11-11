import { useState } from "react"
import style from "../styles/iniciosesion.module.css"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const InicioSesion = () => {
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")


    return <>
        <div className={style.container}>

            <div className={style.inputsContainer}>
                <div>
                    Iniciar sesión
                </div>

                <Form.Floating>
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                        onChange={e=>setCorreo(e.target.value)}
                        value={correo}
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="password"
                        placeholder="Password"
                        onChange={e=>setContrasena(e.target.value)}
                        value={contrasena}

                    />
                    <label htmlFor="floatingPasswordCustom">Password</label>
                </Form.Floating>
                <Button>Iniciar sesion</Button>
            </div>
        </div>
    </>
}

export default InicioSesion