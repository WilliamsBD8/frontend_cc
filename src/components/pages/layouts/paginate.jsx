const Paginate = ({totalRecords, currentPage, getProducts, limit = 9}) => {
    let totalPages = Math.ceil(totalRecords / limit);

    const pageNumbers = [];

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 10; // Número máximo de páginas visibles

        // Mostrar páginas dependiendo de la posición de la página actual
        let startPage, endPage;
        if (totalPages <= maxVisiblePages) {
            // Si el total de páginas es menor o igual a maxVisiblePages
            startPage = 1;
            endPage = totalPages;
        } else {
            // Si la página actual está cerca del principio
            if (currentPage <= 6) {
                startPage = 1;
                endPage = maxVisiblePages;
            }
            // Si la página actual está cerca del final
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            }
            // Si la página actual está en el medio
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // Asegurarse de que los límites no excedan el total de páginas
        startPage = Math.max(startPage, 1);
        endPage = Math.min(endPage, totalPages);

        if (startPage > 1) {
            pageNumbers.push(
                <li key="ellipsis-start" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }

        // Crear los números de página
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a className="page-link waves-effect" onClick={() => getProducts(i)} >{i}</a>
                </li>
            );
        }

        // Añadir "..." si hay más páginas que no se muestran
        if (endPage < totalPages) {
            pageNumbers.push(
                <li key="ellipsis" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }

        return pageNumbers;
    };
    

    return (
        <nav aria-label="Page navigation" className="d-flex align-items-center justify-content-center">
            <ul className="pagination mb-0">
                <li className={`page-item first ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a 
                        className="page-link waves-effect" 
                        onClick={() => currentPage > 1 && getProducts(1)} 
                        href="javascript:void(0);"
                    >
                        <i className="tf-icon ri-skip-back-mini-line ri-22px"></i>
                    </a>
                </li>
                <li className={`page-item prev ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a 
                        className="page-link waves-effect" 
                        onClick={() => currentPage > 1 && getProducts(currentPage - 1)} 
                        href="javascript:void(0);"
                    >
                        <i className="tf-icon ri-arrow-left-s-line ri-22px"></i>
                    </a>
                </li>
                {renderPageNumbers()}
                <li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a 
                        className="page-link waves-effect" 
                        onClick={() => currentPage < totalPages && getProducts(currentPage + 1)} 
                        href="javascript:void(0);"
                    >
                        <i className="tf-icon ri-arrow-right-s-line ri-22px"></i>
                    </a>
                </li>
                <li className={`page-item last ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a 
                        className="page-link waves-effect" 
                        onClick={() => currentPage < totalPages && getProducts(totalPages)} 
                        href="javascript:void(0);"
                    >
                        <i className="tf-icon ri-skip-forward-mini-line ri-22px"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );

}

export default Paginate;