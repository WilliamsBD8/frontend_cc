import '../../assets/vendor/css/pages/page-auth.css';
import '../../assets/js/pages-auth.js';

import React, { useEffect, useState } from 'react';

import { proceso_fetch, base_url, alert } from '../../assets/js/functions.js';

import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function sendLogin(event){
      event.preventDefault();
      const data = {
        email: username, password
      }

      if(data.email == '' || data.password == '')
        return alert('Campo vacio', 'Revisa que todos los campos no esten vacios.', 'warning')

      const url = base_url(['api/users/login']);

      try {
        const res = await proceso_fetch(url, data);
    
        // Guardar los datos del usuario en el localStorage
        localStorage.setItem("user", JSON.stringify(res));
    
        // Redirigir al dashboard
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }


    return (
      <div className="position-relative">
        <div className="authentication-wrapper authentication-basic container-p-y p-4 p-sm-0">
          <div className="authentication-inner py-6">
            <div className="card p-md-7 p-1">
              <div className="app-brand justify-content-center mt-5">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-text demo text-heading fw-semibold">Materialize</span>
                </a>
              </div>

              <div className="card-body mt-1">

              <form
                id="formAuthentication"
                className="mb-5"
                onSubmit={sendLogin} // Pass the function reference
              >
                  <div className="form-floating form-floating-outline mb-5">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Ingrese su correo"
                      onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="mb-5">
                    <div className="form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-describedby="password" />
                          <label htmlFor="password">Contraseña</label>
                        </div>
                        <span className="input-group-text cursor-pointer"><i className="ri-eye-off-line"></i></span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5 d-flex justify-content-between mt-5">
                    <a href="/forgot_password" className="float-end mb-1 mt-2">
                      <span>Forgot Password?</span>
                    </a>
                  </div>

                  <div className="mb-5">
                    <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                  </div>
                </form>

                <p className="text-center">
                  <span>New on our platform?</span>
                  <a href="/register">
                    <span>Create an account</span>
                  </a>
                </p>

              </div>
            </div>
            <img
              alt="mask"
              src="./src/assets/img/illustrations/auth-basic-login-mask-light.png"
              className="authentication-image d-none d-lg-block"
              data-app-light-img="illustrations/auth-basic-login-mask-light.png"
              data-app-dark-img="illustrations/auth-basic-login-mask-dark.png" />
          </div>
        </div>
      </div>
    )
}

export default Login;