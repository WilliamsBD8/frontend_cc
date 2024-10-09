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

import { base_url, formatPrice, updateFormattedValue, alert, proceso_fetch, separador_miles, formatDate } from "../../../assets/js/functions.js";

import DataTable from 'datatables.net-react'
import DT from 'datatables.net';

DataTable.use(DT);


const Products = () => {
    const [dataCreated, setDataCreated] = useState({
        name: "",
        description: "",
        value: "",
        cost: ""
    });

    const tableRef = useRef(null);

    const [dataUpdated, setDataUpdates] = useState(null);

    const [columns, setColumns] = useState([
        { title: 'Nombre', data: 'name' },
        { title: 'Descripción', data: 'description' },
        {
            title: 'Valor',
            data: 'value',
            render: (value) => formatPrice(parseFloat(value.$numberDecimal)),
        },
        {
            title: 'Costo',
            data: 'cost',
            render: (value) => formatPrice(parseFloat(value.$numberDecimal)),
        },
        {
            title:"Cantidad",
            data:"stock"
        },
        {
            title: 'Fecha de creación',
            data: 'createdAt',
            render: (date) => formatDate(date)
        },
        {
            title: 'Fecha de actualización',
            data: 'updatedAt',
            render: (date) => formatDate(date)
        },
        {
            title: 'Acciones',
            data: '_id',
            createdCell: (td, _id) => {
                const button = document.createElement('button');
                button.innerHTML = `<i class="ri-edit-box-line"></i>`;
                button.className = "btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit";
                button.onclick = () => editProduct(_id); // Usar la función handleEdit
                $(td).empty().append(button);
            },
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataCreated((prevData) => ({
            ...prevData,
            [name]: name == 'value' || name == 'cost' ? parseFloat(value.replace(/,/g, '')) : value, // Actualiza solo el campo específico
        }));
    };

    const changeUpdated = (e) => {
        const { name, value } = e.target;
        setDataUpdates((prevData) => ({
            ...prevData,
            [name]: name == 'value' || name == 'cost' ? parseFloat(value.replace(/,/g, '')) : value, // Actualiza solo el campo específico
        }));
    };

    const refreshFormAdd = () => {
        setDataCreated({
            name: "",
            description: "",
            value: "",
            cost: ""
        });
        const offCanvasElement = document.querySelector('#add-new-record');
        (offCanvasElement.querySelector('#name').value = ''),
        (offCanvasElement.querySelector('#description').value = ''),
        (offCanvasElement.querySelector('#cost').value = ''),
        (offCanvasElement.querySelector('#value').value = '');
    }

    const reloadTable = () => {
        $(tableRef.current).DataTable().ajax.reload(null, false); // Recarga la tabla
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const valid = Object.keys(dataCreated).filter( i => dataCreated[i] === "");
        if(valid.length !== 0){
            return alert('Campo vacio', 'Revisa que todos los campos no esten vacios.', 'warning')
        }
        const url = base_url(['api/products']);

        try {
            await proceso_fetch(url, dataCreated);
            refreshFormAdd()
            await reloadTable();
        } catch (error) {
            console.log(error);
        }
    }

    const updatedProduct = async (e) => {
        e.preventDefault();
        console.log(dataUpdated);
        const valid = Object.keys(dataUpdated).filter( i => dataUpdated[i] === "");
        if(valid.length !== 0){
            return alert('Campo vacio', 'Revisa que todos los campos no esten vacios.', 'warning')
        }
        let url = base_url(['api/products/updated']);

        try {
            await proceso_fetch(url, dataUpdated);
            // editProduct(dataUpdated._id)
            await reloadTable();
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = async (id) => {
        setDataUpdates(null);
        const table = $(tableRef.current).DataTable();
        const data = table.rows().data().toArray();
        const productToEdit = data.find(product => product._id === id);
        if (!productToEdit) {
            console.error(`No se encontró el producto con ID: ${id}`);
            return;
        }

        await setTimeout(() => {
            setDataUpdates(productToEdit);
        }, 0);

        await setTimeout(() => {
            const offCanvasElement = document.querySelector('#updated-record');
            (offCanvasElement.querySelector('#name').value = productToEdit.name),
            (offCanvasElement.querySelector('#description').value = productToEdit.description),
            (offCanvasElement.querySelector('#cost').value = separador_miles(parseFloat(productToEdit.cost.$numberDecimal))),
            (offCanvasElement.querySelector('#value').value = separador_miles(parseFloat(productToEdit.value.$numberDecimal)));
    
            let offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
            offCanvasEl.show();
        }, 0)

    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (tableRef.current) {
                if ($.fn.dataTable.isDataTable(tableRef.current)) {
                    $(tableRef.current).DataTable().destroy(); // Destruir la instancia existente
                }
                const table = $(tableRef.current).DataTable({
                    ajax: {
                        url: base_url([`api/products`]),
                        dataSrc: "data",
                    }, // Debe contener tus datos reales
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
                    dom: `<"card-header  flex-column flex-md-row border-bottom"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row">t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>`,
                    buttons: [
                        {
                            text: '<i class="ri-add-line ri-16px me-sm-2"></i> <span class="d-sm-inline-block">Nueva Entrada</span>',
                            className: 'btn btn-primary waves-effect waves-light',
                            action: () => {
                                const offCanvasElement = document.querySelector('#add-new-record');
                                let offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
                                refreshFormAdd();
                                offCanvasEl.show();
                                
                            },
                        },
                    ],
                    responsive: false,
                });
            }
        }, 0);
        return () => clearTimeout(timer);

    }, []);

    return (
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
                                            <h4 className="card-title mb-4">Productos</h4>
                                            <p className="mb-0">Crear, Editar o Eliminar productos</p>
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

                            <div className="offcanvas offcanvas-end" id="add-new-record">
                                <div className="offcanvas-header border-bottom">
                                <h5 className="offcanvas-title" id="exampleModalLabel">Nuevo Producto</h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body flex-grow-1">
                                    <form className="add-new-record pt-0 row g-3" id="form-add-new-record" onSubmit={saveProduct}>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        className="form-control dt-full-name"
                                                        name="name"
                                                        placeholder=""
                                                        onChange={handleChange}/>
                                                    <label htmlFor="name">Nombre</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        className="form-control dt-post h-px-100"
                                                        placeholder=""
                                                        onChange={handleChange}></textarea>
                                                    <label htmlFor="description">Descripción</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                <input
                                                    type="text"
                                                    className="form-control dt-date"
                                                    id="cost"
                                                    name="cost"
                                                    placeholder=""
                                                    onKeyUp={(e) => updateFormattedValue(e.target)}
                                                    onChange={handleChange}/>
                                                <label htmlFor="cost">Costo</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                <input
                                                    type="text"
                                                    id="value"
                                                    name="value"
                                                    className="form-control dt-email"
                                                    placeholder=""
                                                    onKeyUp={(e) => updateFormattedValue(e.target)}
                                                    onChange={handleChange}/>
                                                <label htmlFor="value">Valor</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary data-submit me-sm-4 me-1">Guardar</button>
                                            <button type="reset" className="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="offcanvas offcanvas-end" id="updated-record">
                                <div className="offcanvas-header border-bottom">
                                <h5 className="offcanvas-title" id="exampleModalLabel">Actualizar Producto</h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body flex-grow-1">
                                    <form className="updated-record pt-0 row g-3" id="form-updated-record" onSubmit={updatedProduct}>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        className="form-control dt-full-name"
                                                        name="name"
                                                        placeholder=""
                                                        onChange={changeUpdated}/>
                                                    <label htmlFor="name">Nombre</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        className="form-control dt-post h-px-100"
                                                        placeholder=""
                                                        onChange={changeUpdated}></textarea>
                                                    <label htmlFor="description">Descripción</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                <input
                                                    type="text"
                                                    className="form-control dt-date"
                                                    id="cost"
                                                    name="cost"
                                                    placeholder=""
                                                    onKeyUp={(e) => updateFormattedValue(e.target)}
                                                    onChange={changeUpdated}/>
                                                <label htmlFor="cost">Costo</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="input-group input-group-merge">
                                                <div className="form-floating form-floating-outline">
                                                <input
                                                    type="text"
                                                    id="value"
                                                    name="value"
                                                    className="form-control dt-email"
                                                    placeholder=""
                                                    onKeyUp={(e) => updateFormattedValue(e.target)}
                                                    onChange={changeUpdated}/>
                                                <label htmlFor="value">Valor</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary data-submit me-sm-4 me-1">Actualizar</button>
                                            <button type="reset" className="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Products