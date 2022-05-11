import { CLEAR_CREATED, CLEAR_DOGGY, CREATE_DOG, DELETE_DOG, DOG_DETAIL, FILTER_TOGETHER, GET_ALL_DOGS, LOADING_AGAIN, ORDER_BY_FEATURE } from "../actions";
import { GET_TEMPERAMENTS } from "../actions";


const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    created: [],
    doggy: {},
    deleted: {},
    loading: true,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                loading: false,

            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        case FILTER_TOGETHER:
            let filteredBreeds = [...state.allDogs];
            const dogsTemps = action.payload;
            const bringMe = action.payload2
            const breedName = action.payload3

            if (breedName !== '') filteredBreeds = filteredBreeds.filter(dog => dog.name.toLowerCase().includes(breedName))

            // filter breeds from created o predefined
            if (bringMe !== 'all') {
                filteredBreeds = bringMe === 'mine' ? filteredBreeds.filter((dog) => dog.hasOwnProperty('fromDb') === true)
                    : filteredBreeds.filter((dog) => dog.hasOwnProperty('fromDb') === false);
            }
            // filter breeds by temperaments
            if (dogsTemps && dogsTemps.length) {
                dogsTemps.forEach(temp => {
                    filteredBreeds = filteredBreeds.filter(d => d.temperaments?.includes(temp))
                })
            }
            return {
                ...state,
                dogs: filteredBreeds
            }

        case ORDER_BY_FEATURE:
            let dogsOrdered = state.dogs;
            let feature = action.payload;
            let order = action.payload2

            if (feature !== 'feature') {
                if (feature === 'breeds') {
                    dogsOrdered.sort((a, b) => (a.name.toLowerCase() >= b.name.toLowerCase()) ? 1 : -1)
                }
                if (feature === 'weight') {
                    let notWeight = dogsOrdered.filter(d => d.weight === 'no info');
                    dogsOrdered = dogsOrdered.filter(d => d.weight !== 'no info');
                    dogsOrdered.map(dw => dw.weight = dw.weight.split(' - '));

                    dogsOrdered.sort(function (a, b) {
                        if (Number(a.weight[0]) !== Number(b.weight[0])) {
                            return Number(a.weight[0]) > Number(b.weight[0]) ? 1 : -1;
                        } else if (a.weight.length > 1 && b.weight.length > 1) {
                            return Number(a.weight[1]) >= Number(b.weight[1]) ? 1 : -1;
                        } else return 0;
                    })
                    dogsOrdered.map(dw => dw.weight = dw.weight.join(' - '));
                    dogsOrdered = dogsOrdered.concat(notWeight);
                }
            }

            if (order === 'desc') dogsOrdered.reverse()
            return {
                ...state,
                dogs: dogsOrdered
            }
        case CREATE_DOG:

            return {
                ...state,
                created: action.payload
            }
        case CLEAR_CREATED:
            return {
                ...state,
                created: []
            }
        case DOG_DETAIL:
            return {
                ...state,
                doggy: action.payload,
                loading: false,
            }
        case CLEAR_DOGGY:
            return {
                ...state,
                doggy: {},
                deleted: {},
            }
        case LOADING_AGAIN:
            return {
                ...state,
                loading: true
            }
        case DELETE_DOG:
            return {
                ...state,
                deleted: action.payload
            }


        default: return { ...state }
    }
}