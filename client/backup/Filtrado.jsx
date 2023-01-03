import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filterByDB, filterByTemp, order, orderByWeight } from "../actions/actionCreators";

export default function Filtrado({ setData, setEmpty, empty }) {

    const [temps, setTemps] = useState([]);

    const [temperamento, setTemperamento] = useState('');
    const [raza, setRaza] = useState('');
    const [orden, setOrden] = useState('');
    const [peso, setPeso] = useState('');

    const dispatch = useDispatch();

    const state = useSelector(state => state)

    const checking = useCallback(() => {
        if (state) {
            if (state.filteredDogs) {
                if (state.filteredDogs[0]) { // Chequea que filteredDogs tenga algo, si tiene es porque hay un filtro de temperamento activado.
                    setData(state.filteredDogs)
                    if (empty) {
                        setEmpty(false)
                    }
                }
                else if (temperamento !== 'Cualquiera' && temperamento !== '' && !state.filteredDogs[0]) {
                    setEmpty(true)
                }
                else { // De lo contrario, mostramos todos los perros sin filtro de temperamento.
                    setData(state.dogs)
                    setEmpty(false)
                }
            }
            else { // Esta condición es por si filteredDogs todavía no existe
                setData(state.dogs)
            }
        }
    }, [setData, state, setEmpty, empty, temperamento])

    useEffect(() => {
        if (!temps[0]) {
            fetch('http://localhost:3001/temperaments')
                .then(r => r.json())
                .then(r => setTemps(r))
        } // Si no hay lista de temperamentos, hace un fetch.
        checking();
    }, [temperamento, raza, orden, peso, checking, temps]) // Las dependencias son para hacer un re-render.

    return (
        <form>
            <select onChange={(e) => {
                if (e.target.value === 'Cualquiera') {
                    setData(state.dogs)
                    setTemperamento(e.target.value)
                    dispatch(filterByTemp(e.target.value))
                }
                else {
                    setTemperamento(e.target.value)
                    dispatch(filterByTemp(e.target.value))
                }
                
            }}>
                <option value={'Cualquiera'}>Cualquier temperamento</option>
                {temps[0] ? temps.map(a => {
                    return (
                        <option value={a.name} key={a.name}>{a.name}</option>
                    )
                }) : <option>Cargando...</option>}
            </select>
            <select onChange={(e) => {
                setRaza(e.target.value)
                dispatch(filterByDB(e.target.value))
            }}>
                <option value={'Cualquiera'}>Cualquier raza</option>
                <option value={'api'}>De la API</option>
                <option value={'db'}>Creadas por usuarios</option>
            </select>
            <select onChange={(e) => {
                    setOrden(e.target.value)
                    dispatch(order(e.target.value))      
            }}>
                <option>Orden alfabético</option>
                <option value={'Cualquiera'}>Cualquier orden</option>
                <option value={'A - Z'}>A - Z</option>
                <option value={'Z - A'}>Z - A</option>
            </select>
            <select onChange={(e) => {
                setPeso(e.target.value)
                dispatch(orderByWeight(e.target.value))
            }}>
                <option>Orden por peso</option>
                <option value={'Cualquiera'}>Sin ordenar por peso</option>
                <option value={'Mayor'}>Mayor antes</option>
                <option value={'Menor'}>Menor antes</option>
            </select>
        </form>
    )
}