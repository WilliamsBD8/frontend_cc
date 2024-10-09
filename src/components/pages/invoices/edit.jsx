import NavVertical from "../../layouts/nav_vertical.jsx";
import NavHorizontal from "../../layouts/nav_horizontal.jsx";
import '../../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css';
import '../../../assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-rowgroup-bs5/rowgroup.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js';

import React, { useState, useRef, useEffect, useMemo} from 'react'
import  ReactDOM  from 'react-dom/client';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';

import { base_url, formatPrice, updateFormattedValue, alert, proceso_fetch, separador_miles, formatDate, proceso_fetch_direct, proceso_fetch_get } from "../../../assets/js/functions.js";

import DataTable from 'datatables.net-react'
import DT from 'datatables.net';

DataTable.use(DT);

const InvoicesEdit = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null));
    const { id } = useParams();
    const navigate = useNavigate();
    const tableRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [productsUpdated, setProductsUpdated] = useState([])

    const getInvoice = async () => {
        setInvoice(null);
        let url = base_url([`api/invoices/edit/${id}`]);
        const res = await proceso_fetch_get(url);
        const productsInvoices = res.invoice.lines.map(p => {
            return {
                _id: p._id,
                product_id: p.product_id._id,
                name: p.product_id.name,
                description: p.product_id.description,
                cost: p.cost.$numberDecimal,
                value: p.value.$numberDecimal,
                quantity: p.quantity,
                quantity_edit: p.quantity,
                invoice: true,
                isDelete: false
            }
        });
        await setInvoice(res.invoice);
        await setProductsUpdated(productsInvoices);
    }

    const getProducts = async () => {
        try {
            let url = base_url([`api/products/all`]);
            let data = {
                type: invoice.type_invoice
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
            setProductsUpdated(prevInvoices => {
                
                const existingProduct = prevInvoices.find(item => item.product_id === product._id);
    
                if (existingProduct) {
                    return prevInvoices.map(item => 
                        item.product_id === product._id 
                            ? { ...item, isDelete: false, quantity_edit: invoice.type_invoice == 2 && item.quantity_edit >= product.stock ? product.stock : (item.isDelete ? 1 : item.quantity_edit + 1) }
                            : item
                    );
                } else {
                    return [
                        ...prevInvoices,
                        {
                            product_id: product._id,
                            name: product.name,
                            description: product.description,
                            cost: product.cost.$numberDecimal,
                            value: product.value.$numberDecimal,
                            quantity: 0,
                            quantity_edit: 1,
                            invoice: false,
                            isDelete: false
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
            alert("Campo obligatorio", "", "warning");
        
        if(value <= 0)
            alert("El campo no puede ser menor a 1.", "", "warning");
        
        setProductsUpdated(data => {
            return data.map(p => {
                if(p.product_id == _id && (value != "" && value > 0)){
                    let product = products.find(p => p._id == _id);
                    return { 
                            ...p, 
                            [campo]:
                                campo != 'quantity_edit' ? value : 
                                    (invoice.type_invoice == 2 && product.stock < value ? product.stock : value) } 
                }
                return p;
            })
        })
    }

    const deleteProduct = (_id) => {
        setProductsUpdated(data => {
            return data
                .map(p => {
                    // Si el producto tiene invoices: true, actualizamos isDelete a true
                    if (p.product_id === _id && p.invoice === true) {
                        return {
                            ...p, // Mantenemos las demás propiedades del producto
                            isDelete: true // Actualizamos isDelete a true
                        };
                    }
                    return p;
                })
                .filter(p => !(p.product_id === _id && p.invoice === false));
        })
    }

    const saveInvoice = async () => {
        try {
            let url = base_url(['api/invoices/updated']);
            let data = {
                invoice_id: id,
                details: productsUpdated,
                user_id: user._id
            }

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


    const loadTable = () => {
        if (tableRef.current) {
            if (!$.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable({
                    data: productsUpdated,
                    columns: [
                        {title: "Producto", data:"name"},
                        {title: "Descripción", data: "description"},
                        {title: "Costo", data:"cost", createdCell: (td, cost, product) => {
                            const container = document.createElement('div');
                            container.className = "form-floating form-floating-outline";
                            const input = document.createElement('input');
                            input.type = "text"; // Cambia el tipo según sea necesario
                            input.className = "form-control";
                            input.id = `cost-${product.product_id}`; // Asegúrate de que el id sea único
                            input.placeholder = "Ingrese el costo";
                            input.value = separador_miles(cost); // Asigna el costo existente si es necesario
                            input.min = 1;
                            input.onkeyup = (e) => updateFormattedValue(e.target);
                            input.onblur = (e) => updatedProduct(product.product_id, e.target.value, "cost")
                            container.appendChild(input);
                            $(td).empty().append(container);
                        }},
                        {title: "Valor", data:"value", createdCell: (td, value, product) => {
                            if (invoice) {
                                const container = document.createElement('div');
                                container.className = "form-floating form-floating-outline";
                                const input = document.createElement('input');
                                input.type = "text";
                                input.className = "form-control";
                                input.id = `value-${product.product_id}`;
                                input.value = separador_miles(value);
                                input.min = 1;
                                input.onkeyup = (e) => updateFormattedValue(e.target);
                                input.onblur = (e) => updatedProduct(product.product_id, e.target.value, "value");
                                container.appendChild(input);
                                $(td).empty().append(container);
                            } else {
                                $(td).empty().text('Cargando...');
                            }
                        }},
                        {title: "Cantidad", data:"quantity_edit", createdCell: (td, quantity, product) => {
                            const container = document.createElement('div');
                            container.className = "form-floating form-floating-outline";
                            const input = document.createElement('input');
                            input.type = "number"; // Cambia el tipo según sea necesario
                            input.className = "form-control";
                            input.min = 1;
                            input.id = `quantity-${product.product_id}`; // Asegúrate de que el id sea único
                            input.value = separador_miles(quantity); // Asigna el costo existente si es necesario
                            input.onkeyup = (e) => updateFormattedValue(e.target);
                            input.onblur = (e) => updatedProduct(product.product_id, e.target.value, "quantity_edit")
                            container.appendChild(input);
                            $(td).empty().append(container);
                        }},
                        {title: "Total Costo", data:"_id", render: (_,__,p) => formatPrice(parseFloat(p.cost) * parseInt(p.quantity_edit))},
                        {
                            title: 'Acciones',
                            data: 'product_id',
                            createdCell: (td, product_id) => {
                                const button = document.createElement('button');
                                button.innerHTML = `<i class="ri-delete-bin-5-line"></i>`;
                                button.className = "btn btn-sm btn-text-danger rounded-pill btn-icon item-edit";
                                button.onclick = () => deleteProduct(product_id); // Usar la función handleEdit
                                $(td).empty().append(button);
                            }
                        },
                    ],
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                        paginate: {
                            next: '<i class="ri-arrow-right-s-line"></i>',
                            previous: '<i class="ri-arrow-left-s-line"></i>',
                        }
                    },
                    dom: `<"card-header flex-column flex-md-row border-bottom"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row">t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>`,
                    responsive: false,
                    buttons: [],
                    drawCallback: () => {
                        // console.log(productsUpdated);
                        // console.log(products);
                    },
                    footerCallback: function () {
                        var api = this.api();
                        let costs = productsUpdated.reduce((a,b) => {
                            return a + (parseInt(b.quantity_edit) * parseFloat(b.cost))
                        }, 0)
                        console.log(costs);
            
                        $(api.column(4).footer()).html(formatPrice(costs));
                    },
                });
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            await getInvoice();
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        if(invoice){
            const timer = setTimeout(async () => {
                await getProducts();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [invoice])

    useEffect(() => {
        if(invoice && products.length != 0){
            loadTable()
            $("#productsForm").val("");
        }
    }, [products])

    useEffect(() => {
        if(productsUpdated.length > 0 && $.fn.dataTable.isDataTable(tableRef.current)){
            $("#productsForm").val("");
            const data = productsUpdated.filter(p => !p.isDelete);
            console.log(data);
            const table = $(tableRef.current).DataTable();
            table.clear();
            table.rows.add(data);
            table.draw(true);

            let costs = data.reduce((a, b) => {
                const costValue = b.cost && b.cost ? parseFloat(b.cost) : 0; // Manejo de errores
                return a + (parseInt(b.quantity_edit) * costValue);
            }, 0);
            $("#totalEntrada").html(formatPrice(parseFloat(costs)))
        }
    }, [productsUpdated])

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
                                                <h4 className="card-title mb-4">Editar</h4>
                                                
                                                <div className="form-floating form-floating-outline mb-6">
                                                    <select className="form-select" onChange={(e) => addProduct(e.target.value)} id="productsForm" aria-label="Default select example">
                                                        <option value="" disabled> Seleccionar producto </option>
                                                        {
                                                            products.map((p, i) => (
                                                                <option disabled={invoice ? (invoice.type_invoice == 2 && p.stock <= 0 ? true : false) : false} key={i} value={p._id}>{p.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <label htmlFor="productsForm">Productos</label>
                                                </div>
                                                
                                                <div className="demo-inline-spacing">
                                                    <button onClick={() => navigate("/invoices")} type="button" className="btn rounded-pill btn-label-primary waves-effect">Regresar</button>
                                                    <button onClick={() => saveInvoice()} type="button" className="btn rounded-pill btn-label-success waves-effect">Actualizar</button>
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
                                                    <th colSpan="3">Total Entrada</th>
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

export default InvoicesEdit;