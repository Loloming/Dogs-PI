export const getAllDogs = () => {
    return async (dispatch) => {
        const getAll = await fetch('https://api.thedogapi.com/v1/breeds');
        const data = await getAll.json()
        const getAllApi = await fetch('http://localhost:3001/dogs', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        const dataApi = await getAllApi.json()
        const result = data.concat(dataApi)
        dispatch({
            type: 'GET_ALL_DOGS',
            payload: result
        })
    }
}

export const searchDogs = (resultado) => {
    return {
        type: 'SEARCH_DOGS',
        payload: resultado
    }
}

export const filterByTemp = (value) => {
    return {
        type: 'FILTER_BY_TEMP',
        payload: value
    }
}

export const filterByDB = (value) => {
    return {
        type: 'FILTER_BY_DB',
        payload: value
    }
}

export const orderByWeight = (value) => {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload: value
    }
}

export const orderByRace = (value) => {
    return {
        type: 'ORDER_BY_RACE',
        payload: value
    }
}

export const order = (value) => {
    return {
        type: 'ORDER',
        payload: value
    }
}