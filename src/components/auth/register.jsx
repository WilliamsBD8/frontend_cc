import "../../assets/vendor/css/pages/page-auth.css";
import "../../assets/js/pages-auth.js";

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

import { alert, proceso_fetch, base_url } from "../../assets/js/functions.js";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        name: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value, // Actualiza solo el campo específico
        }));
    };

    async function sendRegister(event){
        event.preventDefault();
        const valid = Object.keys(data).filter( i => data[i].trim() === "");
        if(valid.length !== 0){
            return alert('Campo vacio', 'Revisa que todos los campos no esten vacios.', 'warning')
        }

        const url = base_url(['api/users/register']);
        await proceso_fetch(url, data).then(res => {
            console.log(res);
        })
    }

    return (
        <div className="position-relative">
            <div className="authentication-wrapper authentication-basic container-p-y p-4 p-sm-0">
                <div className="authentication-inner py-6">
                    <div className="card p-md-7 p-1">
                        <div className="app-brand justify-content-center mt-5">
                            <a href="index.html" className="app-brand-link gap-2">
                                <span className="app-brand-text demo text-heading fw-semibold">
                                    Materialize
                                </span>
                            </a>
                        </div>

                        <div className="card-body mt-1">
                            <form
                                id="formAuthentication"
                                className="mb-5"
                                onSubmit={sendRegister} // Pass the function reference
                            >
                                <div className="form-floating form-floating-outline mb-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Ingresa tu correo"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="email">Correo</label>
                                </div>
                                <div className="form-floating form-floating-outline mb-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Ingresa tu nombre"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <div className="form-floating form-floating-outline mb-5">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Ingresa tu teléfono"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="phone">Teléfono</label>
                                </div>
                                <div className="mb-5 form-password-toggle">
                                    <div className="input-group input-group-merge">
                                        <div className="form-floating form-floating-outline">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <span className="input-group-text cursor-pointer">
                                            <i className="ri-eye-off-line"></i>
                                        </span>
                                    </div>
                                </div>

                                <button className="btn btn-primary d-grid w-100">
                                    Registrarme
                                </button>
                            </form>

                            <p className="text-center">
                                <span>¿Ya tienes una cuenta?</span>
                                <a href="/login">
                                    <span>Inicia sesión</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    <img
                        alt="mask"
                        src="./src/assets/img/illustrations/auth-basic-register-mask-light.png"
                        className="authentication-image d-none d-lg-block"
                        data-app-light-img="illustrations/auth-basic-register-mask-light.png"
                        data-app-dark-img="illustrations/auth-basic-register-mask-dark.png"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
