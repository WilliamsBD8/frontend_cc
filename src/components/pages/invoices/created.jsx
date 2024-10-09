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
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';

import { base_url, formatPrice, updateFormattedValue, alert, proceso_fetch, separador_miles, formatDate, proceso_fetch_direct } from "../../../assets/js/functions.js";

import DataTable from 'datatables.net-react'
import DT from 'datatables.net';

DataTable.use(DT);

const InvoicesCreated = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null));
    const { type } = useParams();
    const navigate = useNavigate();
    const tableRef = useRef(null);
    const [productsInvoices , setProductsInvoices] = useState([]);
    const [products, setProducts] = useState([]);
    const [columns, setColumns] = useState([
        {title: "Producto", data:"name"},
        {title: "Descripción", data: "description"},
        {title: "Costo", data:"cost", createdCell: (td, cost, product) => {
            const container = document.createElement('div');
            container.className = "form-floating form-floating-outline";
            const input = document.createElement('input');
            input.type = "text"; // Cambia el tipo según sea necesario
            input.className = "form-control";
            input.id = `costInput-${product._id}`; // Asegúrate de que el id sea único
            input.placeholder = "Ingrese el costo";
            input.value = separador_miles(cost.$numberDecimal); // Asigna el costo existente si es necesario
            input.onkeyup = (e) => updateFormattedValue(e.target);
            input.onblur = (e) => updatedProduct(product._id, e.target.value, "cost")
            container.appendChild(input);
            $(td).empty().append(container);
        }},
        {title: "Valor", data:"value", createdCell: (td, value, product) => {
            const container = document.createElement('div');
            container.className = "form-floating form-floating-outline";
            const input = document.createElement('input');
            input.type = "text"; // Cambia el tipo según sea necesario
            input.className = "form-control";
            input.id = `valueInput-${product._id}`; // Asegúrate de que el id sea único
            input.value = separador_miles(value.$numberDecimal); // Asigna el costo existente si es necesario
            input.onkeyup = (e) => updateFormattedValue(e.target);
            input.onblur = (e) => updatedProduct(product._id, e.target.value, "value")
            container.appendChild(input);
            $(td).empty().append(container);
        }},
        {title: "Cantidad", data:"quantity", createdCell: (td, quantity, product) => {
            const container = document.createElement('div');
            container.className = "form-floating form-floating-outline";
            const input = document.createElement('input');
            input.type = "number"; // Cambia el tipo según sea necesario
            input.className = "form-control";
            input.id = `quantityInput-${product._id}`; // Asegúrate de que el id sea único
            input.value = separador_miles(quantity); // Asigna el costo existente si es necesario
            input.onkeyup = (e) => updateFormattedValue(e.target);
            input.onblur = (e) => updatedProduct(product._id, e.target.value, "quantity")
            container.appendChild(input);
            $(td).empty().append(container);
        }},
        {title: "Total Costo", data:"_id", render: (_,__,p) => formatPrice(parseFloat(p.cost.$numberDecimal) * parseInt(p.quantity))},
        
        {
            title: 'Acciones',
            data: '_id',
            createdCell: (td, _id) => {
                const button = document.createElement('button');
                button.innerHTML = `<i class="ri-delete-bin-5-line"></i>`;
                button.className = "btn btn-sm btn-text-danger rounded-pill btn-icon item-edit";
                button.onclick = () => deleteProduct(_id); // Usar la función handleEdit
                $(td).empty().append(button);
            },
        },
    ]);

    const loadTable = () => {
        if (tableRef.current) {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                if($.fn.dataTable.isDataTable(tableRef.current)){
                    const table = $(tableRef.current).DataTable();
                    table.clear();
                    table.rows.add(productsInvoices);
                    table.draw(true);
                    let costs = productsInvoices.reduce((a, b) => {
                        const costValue = b.cost && b.cost.$numberDecimal ? parseFloat(b.cost.$numberDecimal) : 0; // Manejo de errores
                        return a + (parseInt(b.quantity) * costValue);
                    }, 0);
                    $("#totalEntrada").html(formatPrice(parseFloat(costs)))
                } 
                $("#productsForm").val("");
            }else{
                $(tableRef.current).DataTable({
                    data: productsInvoices,
                    columns,
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                        paginate: {
                            next: '<i class="ri-arrow-right-s-line"></i>',
                            previous: '<i class="ri-arrow-left-s-line"></i>',
                        }
                    },
                    dom: `<"card-header flex-column flex-md-row border-bottom"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row">t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>`,
                    responsive: false,
                    buttons: []
                });
            }
        }
    }

    const getProducts = async () => {
        try {
            let url = base_url([`api/products/all`]);
            let data = {
                type: type
            }
            const res = await proceso_fetch_direct(url, data);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addProduct = (_id) => {
        $("#productsForm").val("");
        let product = products.find(p => p._id == _id);
        if (product) {
            setProductsInvoices(prevInvoices => {
                const existingProduct = productsInvoices.find(item => item._id === product._id);
    
                if (existingProduct) {
                    return productsInvoices.map(item => 
                        item._id === product._id 
                            ? { ...item, quantity: type == 2 && item.quantity == item.stock ? item.stock : item.quantity + 1 }
                            : item
                    );
                } else {
                    return [
                        ...productsInvoices,
                        {
                            quantity: 1,
                            ...product
                        }
                    ];
                }
            });
        } else {
            console.log("Producto no encontrado");
        }
    }

    const updatedProduct = (_id, value, campo) => {
        value = campo == 'cost' || campo == 'value' ? value.replace(/,/g, '') : value;
        if(!value)
            return alert("Campo obligatorio", "", "warning")
        const table = $(tableRef.current).DataTable();
        const data = table.rows().data().toArray();
        let productsFilter = data.map(p => 
            p._id == _id 
                ? { ...p, [campo]: campo == 'cost' || campo == 'value' ? { $numberDecimal: value} : (campo != 'quantity' ? value : (type == 2 && p.stock < value ? p.stock : value)) } 
                : p
        );
        setProductsInvoices(productsFilter);
    }

    const deleteProduct = (_id) => {
        const table = $(tableRef.current).DataTable();
        const data = table.rows().data().toArray();
        let productFiltered = data.filter(p => p._id != _id);
        setProductsInvoices(productFiltered);
    }

    const saveInvoice = async () => {
        try {

            let value = productsInvoices.reduce((a, b) => {
                const costValue = b.cost && b.cost.$numberDecimal ? parseFloat(b.cost.$numberDecimal) : 0; // Manejo de errores
                return a + (parseInt(b.quantity) * costValue);
            }, 0);
            let data = {
                user_id: user._id,
                products: productsInvoices,
                type,
                value
            }

            let url = base_url([`api/invoices`]);

            const res = await proceso_fetch(url, data)
            Swal.fire({
                icon: "success",
                title: res.msg,
                showConfirmButton: false,
                timer: 5000,
            });
            navigate("/invoices")
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (type) {
                getProducts();
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            loadTable()
        }, 0);
        return () => clearTimeout(timer);
    }, [products]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            loadTable()
        }, 0);
        return () => clearTimeout(timer);
    }, [productsInvoices]);

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
                                                <h4 className="card-title mb-4">{ type == 1 ? 'Generar entrada de mercancia' : 'Salida de mercancia' }</h4>
                                                
                                                <div className="form-floating form-floating-outline mb-6">
                                                    <select className="form-select" onChange={(e) => addProduct(e.target.value)} id="productsForm" aria-label="Default select example">
                                                        <option value="" disabled> Seleccionar producto </option>
                                                        {
                                                            products.map((p, i) => (
                                                                <option disabled={type == 2 && p.stock <= 0 ? true : false} key={i} value={p._id}>{p.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <label htmlFor="productsForm">Productos</label>
                                                </div>
                                                
                                                <div className="demo-inline-spacing">
                                                    <button onClick={() => navigate("/invoices")} type="button" className="btn rounded-pill btn-label-primary waves-effect">Regresar</button>
                                                    <button onClick={() => saveInvoice()} disabled={productsInvoices.length == 0 ? true : false} type="button" className="btn rounded-pill btn-label-success waves-effect">Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="card">
                                    <div className="card-datatable pt-0">
                                        <table ref={tableRef} className="display table table-bordered" style={{ width: '100%' }}>
                                            <tfoot>
                                                <tr>
                                                    <th colSpan="3">Total { type == 1 ? 'Entrada' : 'Salida' }</th>
                                                    <th colSpan="3" id="totalEntrada">$ 0.00</th>
                                                </tr>
                                            </tfoot>
                                        </table>
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

export default InvoicesCreated;