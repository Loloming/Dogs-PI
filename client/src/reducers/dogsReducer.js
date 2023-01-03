const initialState = {
    dogs: [],
    filteredDogs: [],
    unorderedDogs: [],
    empty: false
}

export const dogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {...state, dogs: action.payload, unorderedDogs: action.payload, filteredDogs: []}
        case 'SEARCH_DOGS':
            return {...state, dogs: action.payload}
        case 'FILTER':
            var payload = {...action.payload}
            var result = [...state.dogs]
            
            if (payload.temperamento !== '') {
                if (payload.temperamento === 'Cualquiera') {
                    result = [...state.dogs]
                }
                else {
                    result = [...result].filter(dog => dog.temperament ? dog.temperament.includes(payload.temperamento) : false)
                }
            }
            if (payload.raza !== 'Cualquiera' && payload.raza !== '') {
                if (payload.raza === 'db') {
                    result = [...result].filter(dog => dog.id.toString().includes('db'))
                }
                else if (payload.raza === 'api') {
                    result = [...result].filter(dog => !dog.id.toString().includes('db'))
                }
            }
            if (payload.orden !== 'Cualquiera' && payload.orden !== '') {
                if (payload.orden === 'A - Z') {
                    result = [...result].sort((x, y) => x.name.localeCompare(y.name))
                }
                else if (payload.orden === 'Z - A') {
                    result = [...result].sort((x, y) => x.name.localeCompare(y.name)).reverse()
                }
            }
            if (payload.peso !== 'Cualquiera' && payload.peso !== '') {
                if (payload.peso === 'Mayor') {
                    result = [...result].filter(dog => {
                        var dogo = dog.weight.metric.slice(0, 2)
                        if (dogo === 'Na') {
                            dog.weight.metric = '10 - 40'
                        }
                        return dog
                    }).sort(function (a, b) {
                                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                                     }).reverse()
                }
                else if (payload.peso === 'Menor') {
                    result = [...result].filter(dog => {
                        var dogo = dog.weight.metric.slice(0, 2)
                        if (dogo === 'Na') {
                            dog.weight.metric = '10 - 40'
                        }
                        return dog
                    }).sort(function (a, b) {
                                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                                     })
                }
            }
            if (!result[0]) {
                return {...state, empty: true}
            }
            else {
                return {...state, filteredDogs: result, empty: false}
            }
        default:
            break;
    }
}