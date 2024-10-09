import { Link, useLocation  } from 'react-router-dom';

import React, { useState, useRef, useEffect} from 'react'

import { infoMenu } from '../../helpers/menu.jsx';

const NavVertical = () => {

    const location = useLocation();

    const [dataMenu, setDataMenu] = useState([]);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null));

    const isActive = (path) => {
        // Verifica si la ruta actual contiene la ruta base
        return location.pathname.includes(path);
    };

    useEffect(() => {
        let data = infoMenu();
        if(!user.isAdmin)
            setDataMenu(data.filter(d => !d.admin));
        else
            setDataMenu(data);
    }, [])

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <a href="/dashboard" className="app-brand-link">
                    <span className="app-brand-text demo menu-text fw-semibold ms-2">Materialize</span>
                </a>

                {/* <a href="" className="layout-menu-toggle menu-link text-large ms-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.47365 11.7183C8.11707 12.0749 8.11707 12.6531 8.47365 13.0097L12.071 16.607C12.4615 16.9975 12.4615 17.6305 12.071 18.021C11.6805 18.4115 11.0475 18.4115 10.657 18.021L5.83009 13.1941C5.37164 12.7356 5.37164 11.9924 5.83009 11.5339L10.657 6.707C11.0475 6.31653 11.6805 6.31653 12.071 6.707C12.4615 7.09747 12.4615 7.73053 12.071 8.121L8.47365 11.7183Z"
                            fillOpacity="0.9" />
                        <path
                            d="M14.3584 11.8336C14.0654 12.1266 14.0654 12.6014 14.3584 12.8944L18.071 16.607C18.4615 16.9975 18.4615 17.6305 18.071 18.021C17.6805 18.4115 17.0475 18.4115 16.657 18.021L11.6819 13.0459C11.3053 12.6693 11.3053 12.0587 11.6819 11.6821L16.657 6.707C17.0475 6.31653 17.6805 6.31653 18.071 6.707C18.4615 7.09747 18.4615 7.73053 18.071 8.121L14.3584 11.8336Z"
                            fillOpacity="0.4" />
                    </svg>
                </a> */}
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">

                {/* <!-- Apps & Pages --> */}
                <li className="menu-header mt-5">
                    <span className="menu-header-text" data-i18n="Menú">Menú</span>
                </li>

                {dataMenu.map((item, index) => (
                    <li key={index} className={`menu-item ${isActive(item.path) ? 'active' : ''}`}>
                        <Link to={item.path} className="menu-link">
                            <i className={`menu-icon tf-icons ${item.icon}`}></i>
                            <div data-i18n={item.name}>{item.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default NavVertical;