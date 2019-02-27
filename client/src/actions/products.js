import axios from 'axios';




export const init = (callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:8080/api/products/init`, config)
            .then((response) => {
                callback(response);
            }
            ).catch((err) => console.log(err))
    }
}
export const get_all_products = (callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:8080/api/products/`, config)
            .then((response) => {
                callback(response.data);
            }
            ).catch((err) => console.log(err))
    }
}
export const get_product = (productId,callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:8080/api/products/${productId}`, config)
            .then((response) => {
                callback(response.data);
            }
            ).catch((err) => console.log(err))
    }
}
export const remove = (productId,callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.delete(`http://localhost:8080/api/products/remove/${productId}`, config)
            .then((response) => {
                callback(response);
            }
            ).catch((err) => console.log(err))
    }
}
export const update_product = (product,callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.put(`http://localhost:8080/api/products/update/${product.id}`,product, config)
            .then((response) => {
                callback(response);
            }
            ).catch((err) => console.log(err))
    }
}
export const add_product = (product,callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.post(`http://localhost:8080/api/products/add/`,product, config)
            .then((response) => {
                callback(response);
            }
            ).catch((err) => console.log(err))
    }
}
