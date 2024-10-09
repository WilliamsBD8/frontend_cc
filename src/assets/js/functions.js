export async function proceso_fetch(url, data, method = 'POST') {
    Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {},
        willOpen: function () {
            Swal.showLoading();
        }
    });
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify({
                msg: errorData.msg || 'Error desconocido',
                title: errorData.title || 'Error en la consulta',
            }));
        }
        const responseData = await response.json();
        return new Promise(resolve => {
            setTimeout(() => {
                Swal.close();
                resolve(responseData);
            }, 2000);
        });
    }).catch(error => {
        const error_parse = JSON.parse(error.message);
        return new Promise((_, reject) => {
            setTimeout(() => {
                Swal.close();
                alert(error_parse.title, error_parse.msg, 'error');
                reject(error_parse);
            }, 2000);
        });
    });
}

export async function proceso_fetch_direct(url, data, method = 'POST') {
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify({
                msg: errorData.msg || 'Error desconocido',
                title: errorData.title || 'Error en la consulta',
            }));
        }
        const responseData = await response.json();
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(responseData);
            }, 2000);
        });
    }).catch(error => {
        const error_parse = JSON.parse(error.message);
        return new Promise((_, reject) => {
            setTimeout(() => {
                Swal.close();
                alert(error_parse.title, error_parse.msg, 'error');
                reject(error_parse);
            }, 2000);
        });
    });
}
  
export function proceso_fetch_get(url) {
    return fetch(url).then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
    }).catch(error => {
      console.error(error);
      alert('Error en la consulta', error, 'error');
    });
}
  
export function base_url(array = []) {
    var url = localStorage.getItem('url');
    if (array.length == 0) return `${url}`;
    else return `${url}${array.join('/')}`;
}
  
export function formatPrice(price){
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    })
    return formatter.format(price)
}
  
export const separador_miles = (numero) => {
    let partesNumero = numero.toString().split('.');
    partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return partesNumero.join('.')
}
  
export function updateFormattedValue(input) {
    var value = input.value
    value = value.replace(/[a-zA-Z]/g, '').replace(/,/g, '');
    const formattedValue = separador_miles(value);
    input.value = formattedValue;
}
  
  
export function alert(title = 'Alert', msg = 'Alert', icon = 'success'){
    var shortCutFunction = icon,
      prePositionClass = 'toast-top-right';
  
    prePositionClass =
      typeof toastr.options.positionClass === 'undefined' ? 'toast-top-right' : toastr.options.positionClass;
    toastr.options = {
        maxOpened: 10,
        autoDismiss: true,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
        preventDuplicates: true,
        onclick: null,
    };
    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    if (typeof $toast === 'undefined') {
        return;
    }
}

export function formatDate(date) {
    const dateObject = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = dateObject.toLocaleDateString('es-ES', options);
    return formattedDate;
}