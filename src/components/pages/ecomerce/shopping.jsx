import '../../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css';
import '../../../assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css';
import '../../../assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-rowgroup-bs5/rowgroup.bootstrap5.css';

import '../../../assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js';

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import NavEcomerce from "../layouts/nav.jsx";
import Paginate from "../layouts/paginate.jsx";

import { base_url, formatPrice, updateFormattedValue, alert, proceso_fetch, separador_miles, formatDate, proceso_fetch_direct } from "../../../assets/js/functions.js";

const ShoppingCar = () => {
    const navRef = useRef();
    const tableRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null));
    const [shopping, setShopping] = useState(localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : []);
    const [columns, setColumns] = useState([
        {title: "Producto", data:"name"},
        {title: "Descripción", data: "description"},
        {title: "Valor", data:"value", render: (v) => formatPrice(parseFloat(v.$numberDecimal))},
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
                    table.rows.add(shopping);
                    table.draw(true);
                    let costs = shopping.reduce((a, b) => {
                        const costValue = b.cost && b.cost.$numberDecimal ? parseFloat(b.cost.$numberDecimal) : 0; // Manejo de errores
                        return a + (parseInt(b.quantity) * costValue);
                    }, 0);
                    $("#totalEntrada").html(formatPrice(parseFloat(costs)))
                } 
            }else{
                $(tableRef.current).DataTable({
                    data: shopping,
                    columns,
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                        paginate: {
                            next: '<i class="ri-arrow-right-s-line"></i>',
                            previous: '<i class="ri-arrow-left-s-line"></i>',
                        }
                    },
                    displayLength: 5,
                    dom: `<"card-header flex-column flex-md-row border-bottom"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row">t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>`,
                    responsive: false,
                    buttons: []
                });
            }
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
                ? { ...p, [campo]: campo == 'cost' || campo == 'value' ? { $numberDecimal: value} : (campo != 'quantity' ? value : (p.stock < value ? p.stock : value)) } 
                : p
        );
        setShopping(productsFilter);
    }

    const deleteProduct = (_id) => {
        const table = $(tableRef.current).DataTable();
        const data = table.rows().data().toArray();
        let productFiltered = data.filter(p => p._id != _id);
        setShopping(productFiltered);
    }

    const saveInvoice = async () => {
        try {

            if(user == null){
                Swal.fire({
                    icon: "warning",
                    html: `Para mayor seguridad, le sugerimos que se registre o inicie sesion en nuestro sistema`,
                    confirmButtonText: "Iniciar sesión",
                    denyButtonText: "Registrarme",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate("/login")
                    }else if(result.isDenied){
                        navigate("/register")
                    }
                });
            }else{
                let value = shopping.reduce((a, b) => {
                    const costValue = b.cost && b.cost.$numberDecimal ? parseFloat(b.cost.$numberDecimal) : 0; // Manejo de errores
                    return a + (parseInt(b.quantity) * costValue);
                }, 0);
                let data = {
                    user_id: user._id,
                    products: shopping,
                    type: 2,
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
            }

            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            loadTable()
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            loadTable();
            localStorage.setItem('shopping', JSON.stringify(shopping));
            navRef.current.updatedShopping();
        }, 0);
        return () => clearTimeout(timer);
    }, [shopping]);

    return (
        <>
            <NavEcomerce ref={navRef}/>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="card">
                        <div className="d-flex align-items-end row mb-2">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Carrito de compras</h4>
                                    
                                    <div className="demo-inline-spacing">
                                        <button onClick={() => navigate("/")} type="button" className="btn rounded-pill btn-label-primary waves-effect">Seguir comprando</button>
                                        <button onClick={() => saveInvoice()} disabled={shopping.length == 0 ? true : false} type="button" className="btn rounded-pill btn-label-success waves-effect">Guardar</button>
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
                                        <th colSpan="3">Total</th>
                                        <th colSpan="3" id="totalEntrada">$ 0.00</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShoppingCar;