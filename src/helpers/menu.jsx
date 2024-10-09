const infoMenu = () => {
    const data = [
        {
            name: "Home",
            icon: "ri-home-4-fill",
            path: "/dashboard",
            admin: false 
        },

        {
            name: "Productos",
            icon: "ri-bubble-chart-fill",
            path: "/products",
            admin: true 
        },
        {
            name: "Facturas",
            icon: "ri-bubble-chart-fill",
            path: "/invoices",
            admin: false 
        }
    ];

    return data
}

export { infoMenu }