import axios from "axios";
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_BY_FEATURE = 'ORDER_BY_FEATURE';
export const ORDER_ASC_DESC = 'ORDER_ASC_DESC';
export const FILTER_TOGETHER = 'FILTER TOGETHER';
export const CREATE_DOG = 'CREATE_DOG';
export const CLEAR_CREATED = 'CLEAR_CREATED';
export const DOG_DETAIL = 'DOG_DETAIL';
export const CLEAR_DOGGY = 'CLEAR_DOGGY';
export const LOADING_AGAIN = 'LOADING_AGAIN';
export const DELETE_DOG = 'DELETE_DOG';
const URL_LOCAL = 'http://localhost:3001';
const URL_HEROKU = 'https://ledoggy.herokuapp.com/';

export const getDogs = () => dispatch => {
    return fetch(`${URL_HEROKU}dogs`)
        .then(d => d.json())
        .then(data => {
            dispatch({ type: GET_ALL_DOGS, payload: data })
        })
        .catch(e => console.log(e))

};

export const getTemperaments = () => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`${URL_HEROKU}temperament`)
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)
        }
    }
};
export const filterTogether = (payload, payload2, payload3) => {
    return {
        type: FILTER_TOGETHER,
        payload,
        payload2,
        payload3
    }
}

export const orderByFeature = (payload, payload2) => {
    return {
        type: ORDER_BY_FEATURE,
        payload,
        payload2

    }
};

export const orderAscDesc = (payload, payload2) => {
    return {
        type: ORDER_ASC_DESC,
        payload,
        payload2
    }
};

export const createDog = (args) => {
    
    return async function (dispatch) {
        try {
            var json = await axios.post(`${URL_HEROKU}dog`, args)
            return dispatch({
                type: CREATE_DOG,
                payload: [json.data.msg, json.data.Dog, json.data.temperaments]
            })

        } catch (e) {
            if (e.response.status === 417) {alert(json.data.msg)}
            else alert('Server error') 

        }
    }
};

export const clearCreted = () => {
    return {
        type: CLEAR_CREATED
    }
};

export const dogDetail = (id) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`${URL_HEROKU}dogs/${id}`)
            return dispatch({
                type: DOG_DETAIL,
                payload: json.data
            })
        } catch (e) {
            if(e.response?.status === 404) {alert(e.response.data)}
            else alert('Server error')
        }
    }
}

export const clearDoggy = () => {
    return {
        type: CLEAR_DOGGY
    }
}

export const loadingAgain = () => {
    return{
        type: LOADING_AGAIN,
    }
}

export const deleteDog = (id) => {
    return async function (dispatch) {
        try {
            var json = await axios.delete(`${URL_HEROKU}dogs/${id}`)
            return dispatch({
                type: DELETE_DOG,
                payload:json.data
            })
        }catch(e) {
            if(e.response?.status===404 || e.response?.status===417) {
                return dispatch({
                type: DELETE_DOG,
                payload: json.data
            })}
            else alert('Server error')
        }
    }
}