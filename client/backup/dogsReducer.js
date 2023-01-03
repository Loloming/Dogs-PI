const initialState = {
    dogs: [],
    filteredDogs: [],
    orderedDogs: [],
    orderedFilterDogs: [],
    unorderedDogs: [],
    unorderedFilteredDogs: [],
    weight: 'Cualquiera',
    order: 'Cualquiera',
    db: 'Cualquiera'
}

export const dogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {...state, dogs: action.payload, unorderedDogs: action.payload, filteredDogs: []}
        case 'SEARCH_DOGS':
            return {...state, dogs: action.payload}
        case 'FILTER_BY_TEMP':
            if (action.payload === 'Cualquiera') {
                return {...state, filteredDogs: [], dogs: [...state.unorderedDogs]}
            }
            else {
                return {...state, filteredDogs: state.dogs.filter(dog => dog.temperament ? dog.temperament.includes(action.payload) : false), unorderedFilteredDogs: action.payload} 
            }
        case 'FILTER_BY_DB':
            if (action.payload === 'db') {
                if (state.filteredDogs[0]) {
                    if (state.unorderedFilteredDogs[0]) {
                        if (state.order === 'Cualquiera' && state.weight === 'Cualquiera') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Cualquiera') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Cualquiera') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), db: action.payload}
                        }
                    }
                        else {
                            return {...state, filteredDogs: [...state.filteredDogs].filter(dog => dog.id.toString().includes('db')), dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')), unorderedFilteredDogs: {...state.filteredDogs}, db: action.payload}
                        }
                        
                    }
                else if (state.dogs[0]) {
                    if (state.unorderedDogs[0]) {
                        if (state.order === 'Cualquiera' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => dog.id.toString().includes('db')), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), db: action.payload}
                        }
                        else {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => dog.id.toString().includes('db')), db: action.payload}
                        }    
                    }
                    else {
                        return {...state, dogs: [...state.dogs].filter(dog => dog.id.toString().includes('db')), db: action.payload}
                    }
                }
            }
            else if (action.payload === 'api') {
                if (state.unorderedFilteredDogs !== 'Cualquiera') {
                    if (state.unorderedFilteredDogs[0]) {
                        if (state.order === 'Cualquiera' && state.weight === 'Cualquiera') {
                            console.log('sexapi')
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')), dogs: [...state.unorderedDogs].filter(dog => !dog.id.toString().includes('db')), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Cualquiera') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Mayor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Menor') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Cualquiera') {
                            return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false).filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), db: action.payload}
                        }
                    }
                    else {
                        return {...state, filteredDogs: [...state.filteredDogs].filter(dog => !dog.id.toString().includes('db')), dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')), db: action.payload}
                    }
                }
                else if (state.dogs[0]) {
                    if (state.unorderedDogs[0]) {
                        if (state.order === 'Cualquiera' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => !dog.id.toString().includes('db')), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'A - Z' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Cualquiera' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Mayor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Menor') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse().sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), db: action.payload}
                        }
                        else if (state.order === 'Z - A' && state.weight === 'Cualquiera') {
                            return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')).sort((x, y) => x.name.localeCompare(y.name)).reverse(), db: action.payload}
                        }
                        else {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => !dog.id.toString().includes('db')), db: action.payload}
                        }
                    }
                    else {
                        return {...state, dogs: [...state.dogs].filter(dog => !dog.id.toString().includes('db')), db: action.payload}
                    }
                }
            }
            else if (action.payload === 'Cualquiera') {
                if (state.unorderedFilteredDogs !== 'Cualquiera') {
                    return {...state, filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false), dogs: [...state.unorderedDogs], db: 'Cualquiera'}
                }
                else if (state.dogs[0]) {
                    return {...state, dogs: [...state.unorderedDogs], db: 'Cualquiera'}
                }
            }
            break;
        case 'ORDER':
            if (state.filteredDogs[0]) {
                if (action.payload === 'A - Z') {
                    return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)), filteredDogs: state.filteredDogs.sort((x, y) => x.name.localeCompare(y.name)), orderedFilterDogs: action.payload, order: 'A - Z'}
                }
                else if (action.payload === 'Z - A') {
                    return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)).reverse(), filteredDogs: state.filteredDogs.sort((x, y) => x.name.localeCompare(y.name)).reverse(), orderedFilterDogs:  action.payload, order: 'Z - A'}
                }
                else if (action.payload === 'Cualquiera') {
                    if (state.weight !== 'Cualquiera') {
                        if (state.weight === 'Mayor') {
                            return {...state, dogs: state.dogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), filteredDogs: state.filteredDogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), weight: 'Mayor'}
                        }
                        else if (state.weight === 'Menor') {
                            return {...state, dogs: state.dogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), filteredDogs: state.filteredDogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), weight: 'Menor'}
                        }
                    }
                    else {
                        return {...state, dogs: [...state.unorderedDogs], filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false), orderedFilterDogs: action.payload, order: 'Cualquiera'}
                    }
                }
            }
            else if (state.dogs) {
                if (action.payload === 'A - Z') {
                    return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)), orderedDogs: action.payload, order: 'A - Z'}
                }
                else if (action.payload === 'Z - A') {
                    return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)).reverse(), orderedDogs: action.payload, order: 'Z - A'}
                }
                else if (action.payload === 'Cualquiera') {
                    if (state.weight !== 'Cualquiera') {
                        if (state.weight === 'Mayor') {
                            return {...state, dogs: state.dogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), filteredDogs: state.filteredDogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }).reverse(), weight: 'Mayor'}
                        }
                        else if (state.weight === 'Menor') {
                            return {...state, dogs: state.dogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), filteredDogs: state.filteredDogs.sort(function (a, b) {
                                return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                             }), weight: 'Menor'}
                        }
                    }
                    else if (state.db !== 'Cualquiera') {
                        if (state.db === 'db') {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => dog.id.toString().includes('db')), orderedDogs: action.payload, order: 'Cualquiera'}
                        }
                        else if (state.db === 'api') {
                            return {...state, dogs: [...state.unorderedDogs].filter(dog => !dog.id.toString().includes('db')), orderedDogs: action.payload, order: 'Cualquiera'}
                        }
                    } 
                    else if (state.unorderedDogs) {
                        return {...state, dogs: [...state.unorderedDogs], orderedDogs: action.payload, order: 'Cualquiera'}
                    }
                }
            }
            break;
        case 'ORDER_BY_WEIGHT':
            if (state.filteredDogs[0]) {
                if (action.payload === 'Mayor') {
                    return {...state, dogs: state.dogs.sort(function (a, b) {
                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                     }).reverse(), filteredDogs: state.filteredDogs.sort(function (a, b) {
                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                     }).reverse(), weight: 'Mayor'}
                }
                else if (action.payload === 'Menor') {
                    return {...state, dogs: state.dogs.sort(function (a, b) {
                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                     }), filteredDogs: state.filteredDogs.sort(function (a, b) {
                        return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                     }), weight: 'Menor'}
                }
                else if (action.payload === 'Cualquiera') {
                    if (state.orderedFilterDogs[0]) {
                        if (state.orderedFilterDogs === 'A - Z') {
                            return {...state, dogs: [...state.unorderedDogs], filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false)
                            .sort((x, y) => x.name.localeCompare(y.name)), weight: 'Cualquiera'}
                        }
                        else if (state.orderedFilterDogs === 'Z - A') {
                            return {...state, dogs: [...state.unorderedDogs], filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false)
                                .sort((x, y) => x.name.localeCompare(y.name)).reverse(), weight: 'Cualquiera'}
                        }
                        else {
                            return {...state, dogs: [...state.unorderedDogs], filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false), weight: 'Cualquiera'}
                        }
                    }
                    else {
                        return {...state, dogs: [...state.unorderedDogs], filteredDogs: [...state.unorderedDogs].filter(dog => dog.temperament ? dog.temperament.includes(state.unorderedFilteredDogs) : false), weight: 'Cualquiera'}
                    }
                }
            }
            else if (state.dogs) {
                let mayor = [...state.dogs].filter(dog => {
                    var dogo = dog.weight.metric.slice(0, 2)
                    if (dogo === 'Na') {
                        dog.weight.metric = '10 - 40'
                    }
                    return dog
                }).sort(function (a, b) {
                                    return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                                 }).reverse();
                let menor = [...state.dogs].filter(dog => {
                    var dogo = dog.weight.metric.slice(0, 2)
                    if (dogo === 'Na') {
                        dog.weight.metric = '10 - 40'
                    }
                    return dog
                }).sort(function (a, b) {
                                    return a.weight.metric.slice(0, 2) * 1 - b.weight.metric.slice(0, 2) * 1;
                                 });
                if (action.payload === 'Mayor') {
                    return {...state, dogs: mayor, weight: 'Mayor'}
                }
                else if (action.payload === 'Menor') {
                    return {...state, dogs: menor, weight: 'Menor'}
                }
                else if (action.payload === 'Cualquiera') {
                    if (state.orderedDogs[0]) {
                        if (state.orderedDogs === 'A - Z') {
                            return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)), weight: 'Cualquiera'}
                        }
                        else if (state.orderedDogs === 'Z - A') {
                            return {...state, dogs: state.dogs.sort((x, y) => x.name.localeCompare(y.name)).reverse(), weight: 'Cualquiera'}
                        }
                        else {
                            return {...state, dogs: [...state.unorderedDogs], weight: 'Cualquiera'}
                        }
                    }
                    else {
                        return {...state, dogs: state.unorderedDogs, weight: 'Cualquiera'}
                    }
                }
            }
            break;
        default:
            break;
    }
}