import "./../../../assets/vendor/css/pages/front-page.css";
import "./../../../assets/vendor/css/pages/front-page-landing.css";

import React, { forwardRef, useImperativeHandle, useState } from 'react';

const NavEcomerce = forwardRef((props, ref) => {

    const [shopping, setShopping] = useState(localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : []);

    const updatedShopping = () => {
        setShopping(localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : [])
    }

    useImperativeHandle(ref, () => ({
        updatedShopping,
    }));

    return (
        <>
            <nav className="layout-navbar container shadow-none py-0">
                <div className="navbar navbar-expand-lg landing-navbar border-top-0 px-4 px-md-8">
                    <div className="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-6">
                        <button className="navbar-toggler border-0 px-0 me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="tf-icons ri-menu-fill ri-24px align-middle"></i>
                        </button>
                        <a href="landing-page.html" className="app-brand-link">
                            <span className="app-brand-text demo menu-text fw-semibold ms-2 ps-1">Materialize</span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
                        <button className="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="tf-icons ri-close-fill"></i>
                        </button>
                        <ul className="navbar-nav me-auto p-4 p-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-medium" aria-current="page" href="landing-page.html#landingHero">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/shoppingCar">Compras
                                    {
                                        shopping.length > 0 &&(
                                            <div className="text-nowrap d-inline-flex position-relative me-4">
                                                <span className="tf-icons ri-shopping-cart-2-line"></span>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white badge-notifications">{shopping.length}</span>
                                            </div>

                                        )
                                    }
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium text-nowrap" href="landing-page.html#landingContact">Contactenos</a>
                            </li>
                        </ul>
                    </div>
                    <div className="landing-menu-overlay d-lg-none"></div>
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                    
                        <li>
                            <a href="../vertical-menu-template/auth-login-cover.html" className="btn btn-primary px-2 px-sm-4 px-lg-2 px-xl-4 waves-effect waves-light" target="_blank"><span className="tf-icons ri-user-line me-md-1"></span><span className="d-none d-md-block">Login</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
})

export default NavEcomerce;