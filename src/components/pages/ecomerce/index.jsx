import { useEffect, useRef, useState } from "react";
import NavEcomerce from "../layouts/nav.jsx";
import Paginate from "../layouts/paginate.jsx";

import { base_url, proceso_fetch, formatPrice } from "../../../assets/js/functions.js";

const Index = () => {
    const sliderTapRef = useRef(null);
    const navRef = useRef();
    const [productsValues, setProductsValues] = useState([10, 30000]);
    const [products, setProducts] = useState([]);
    const [totalPaginate, setTotalPaginate] = useState(0);
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(9);


    useEffect(() => {
        const sliderTap = sliderTapRef.current;
        if (sliderTap) {
            noUiSlider.create(sliderTap, {
                start: productsValues,
                behaviour: 'tap',
                direction: isRtl ? 'rtl' : 'ltr',
                tooltips: true,
                connect: true,
                range: {
                    min: 0,
                    max: 100000
                }
            });

            sliderTap.noUiSlider.on('update', (values) => {
                setProductsValues(values.map(Number)); // Actualiza los valores en el estado
            });
        }

        return () => {
            if (sliderTap && sliderTap.noUiSlider) {
                sliderTap.noUiSlider.destroy();
            }
        };
    }, [isRtl]);

    const getProducts = async (paginate = 1) => {
        setPage(paginate);
        let url = base_url(['api/products/paginate']);
        let data = {
            paginate,
            length
        } 
        let products = await proceso_fetch(url, data);

        setProducts(products.data);
        setTotalPaginate(products.recordsTotal);
    }

    const addProduct = (_id) => {
        let product = products.find(p => p._id == _id);
        if (product) {
            let shoppingCart = localStorage.getItem('shopping') ? JSON.parse(localStorage.getItem('shopping')) : [];
            const existingProduct = shoppingCart.find(p => p._id === product._id);

            if (existingProduct) {
                shoppingCart = shoppingCart.map(item => 
                    item._id === product._id 
                        ? { ...item, quantity: item.quantity == item.stock ? item.stock : item.quantity + 1 }
                        : item
                );
            } else {
                shoppingCart.push({
                    quantity: 1,
                    ...product
                })
            }
            localStorage.setItem('shopping', JSON.stringify(shoppingCart));
            navRef.current.updatedShopping();
        } else {
            console.log("Producto no encontrado");
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <NavEcomerce ref={navRef}/>

            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div data-bs-spy="scroll" className="scrollspy-example">
                        <div className="col-12">
                            <div className="card mb-6">
                                <h5 className="card-header">Filtro por precios: </h5>
                                <div className="card-body">
                                <div id="slider-tap" ref={sliderTapRef} className="mt-6 mb-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-body mt-1">
                        <div className="row gy-6 mb-6">
                            {
                                products.map( (p, i) => (
                                    <div key={i} className="col-sm-6 col-lg-4">
                                        <div className="card p-2 h-100 shadow-none border rounded-3">
                                            <div className="rounded-4 text-center mb-5">
                                                <a href="app-academy-course-details.html"><img className="img-fluid" src="../../assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1"/></a>
                                            </div>
                                            <div className="card-body p-3 pt-0">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <span className="badge rounded-pill bg-label-primary">{p.name}</span>
                                                    <p className="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                                                        {formatPrice(parseFloat(p.value.$numberDecimal))}
                                                    </p>
                                                </div>
                                                <p className="mt-1">{p.description}</p>
                                                <p className="d-flex align-items-center mb-1">
                                                    <i className="ri-time-line ri-20px me-1"></i>{p.stock}
                                                </p>
                                                <div className="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                                                    <a className="w-100 btn btn-outline-secondary d-flex align-items-center waves-effect" href="app-academy-course-details.html">
                                                        <i className="ri-refresh-line ri-16px align-middle me-2"></i><span>Start Over</span>
                                                    </a>
                                                    <a className="w-100 btn btn-outline-primary d-flex align-items-center waves-effect" onClick={() => addProduct(p._id)}>
                                                        <span className="me-2">Añadir al carrito</span><i className="ri-arrow-right-line ri-16px lh-1 scaleX-n1-rtl"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <Paginate totalRecords={totalPaginate} currentPage={page} getProducts={getProducts} limit={length} />
                        
                    </div>
                        

                </div>
            </div>


        </>
    )
}

export default Index