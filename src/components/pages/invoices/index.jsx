import NavVertical from "../../layouts/nav_vertical.jsx";
import NavHorizontal from "../../layouts/nav_horizontal.jsx";
import '../../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css';
import '../../../assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-rowgroup-bs5/rowgroup.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js';

import React, { useState, useRef, useEffect} from 'react'
import  ReactDOM  from 'react-dom/client';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { base_url, formatPrice, updateFormattedValue, alert, proceso_fetch, separador_miles, formatDate, proceso_fetch_get } from "../../../assets/js/functions.js";

import DataTable from 'datatables.net-react'
import DT from 'datatables.net';

const Invoices = () => {

    const navigate = useNavigate();
    const tableRef = useRef(null);

    const  [columns, setColumns] = useState([
        {title: "Tipo de factura", data:"type_invoice", render: (type) => {
            let type_name = "Tipo no definido"
            switch (type) {
                case 1:
                    type_name = "Entrada de mercancia"
                    break;
                case 2:
                    type_name = "Salida de mercancia"
            
                default:
                    break;
            }
            return type_name
        }},
        {title: "Generado por", data:"user_id.name"},
        {title: "Estado", data:"status", render: (status) => {
            var status_class = [
                { title: 'Pagado', class: ' bg-label-success' },
                { title: 'Rechazado', class: ' bg-label-danger' },
                { title: 'Pendiente', class: ' bg-label-warning' },
            ];
            let st = status_class.find(s => s.title == status)
            return (
                `<span class="badge rounded-pill ${st.class}">${st.title}</span>`
            );
        }},
        {title: "Valor", data:"value.$numberDecimal", render:(value) => formatPrice(parseFloat(value))},
        {
            title: 'Acciones',
            data: '_id',
            createdCell: (td, _id) => {
                const button = document.createElement('button');
                button.innerHTML = `<i class="ri-edit-box-line"></i>`;
                button.className = "btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit";
                button.onclick = () => navigate(`/invoices/edit/${_id}`); // Usar la función handleEdit
                $(td).empty().append(button);
            },
        },
    ]);

    const loadTable = () => {
        if (tableRef.current) {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().ajax.reload(null, false);
            }else{
                $(tableRef.current).DataTable({
                    ajax: {
                        url: base_url(["api/invoices"]),
                        dataSrc: "data"
                    },
                    columns,
                    pageLength: 10,
                    lengthChange: false,
                    paging: true,
                    serverSide:true,
                    processing: true,
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                        paginate: {
                            next: '<i class="ri-arrow-right-s-line"></i>',
                            previous: '<i class="ri-arrow-left-s-line"></i>',
                        },
                        processing: "Cargando..."
                    },
                    dom: `<"card-header flex-column flex-md-row border-bottom"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row">t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>`,
                    responsive: false,
                    buttons: []
                });
            }
            
        }
    }

    useEffect(() => {
        loadTable();
    }, []);

    return (
        <>
        
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <NavVertical/>

                    <div className="layout-page">
                        <NavHorizontal/>
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="card">
                                    <div className="d-flex align-items-end row mb-2">
                                        <div className="col-md-12">
                                            <div className="card-body">
                                                <h4 className="card-title mb-4">Facturas</h4>
                                                <p className="mb-0">Crear, Editar o Eliminar facturas</p>
                                                <div className="demo-inline-spacing">
                                                    <button onClick={() => navigate("/invoices/created/1")} type="button" className="btn rounded-pill btn-label-primary waves-effect">Generar Entrada</button>
                                                    <button onClick={() => navigate("/invoices/created/2")} type="button" className="btn rounded-pill btn-label-warning waves-effect">Generar Salida</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="card">
                                    <div className="card-datatable pt-0">
                                        <table ref={tableRef} className="display table table-bordered" style={{ width: '100%' }}></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Invoices;