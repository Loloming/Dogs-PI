import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filter } from "../actions/actionCreators";
import styles from './Filtrado.module.css';

export default function Filtrado({ setData, setEmpty, empty, setCurrentPage}) {

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
                else { // De lo contrario, mostramos todos los perros sin filtro de temperamento.
                    setData(state.dogs)
                }
            }
            else { // Esta condición es por si filteredDogs todavía no existe
                setData(state.dogs)
            }
        }
    }, [setData, state, setEmpty, empty])

    useEffect(() => {
        if (!temps[0]) {
            fetch('http://localhost:3001/temperaments')
                .then(r => r.json())
                .then(r => setTemps(r))
        } // Si no hay lista de temperamentos, hace un fetch.
        checking();
    }, [raza, orden, peso, checking, temps]) // Las dependencias son para hacer un re-render.

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(filter({temperamento, raza, orden, peso}))
        setCurrentPage(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <select className={styles.temperamento} onChange={(e) => {
                    setTemperamento(e.target.value)
            }}>
                <option value={'Cualquiera'}>Cualquier temperamento</option>
                {temps[0] ? temps.map(a => {
                    return (
                        <option value={a.name} key={a.name}>{a.name}</option>
                    )
                }) : <option>Cargando...</option>}
            </select>
            <select className={styles.raza} onChange={(e) => {
                setRaza(e.target.value)
            }}>
                <option value={'Cualquiera'}>Cualquier raza</option>
                <option value={'api'}>De la API</option>
                <option value={'db'}>Creadas por usuarios</option>
            </select>
            <select className={styles.orden} onChange={(e) => {
                    setOrden(e.target.value)     
            }}>
                <option>Orden alfabético</option>
                <option value={'Cualquiera'}>Cualquier orden</option>
                <option value={'A - Z'}>A - Z</option>
                <option value={'Z - A'}>Z - A</option>
            </select>
            <select className={styles.peso} onChange={(e) => {
                setPeso(e.target.value)
            }}>
                <option>Orden por peso</option>
                <option value={'Cualquiera'}>Sin ordenar por peso</option>
                <option value={'Mayor'}>Mayor antes</option>
                <option value={'Menor'}>Menor antes</option>
            </select>
            <button className={styles.button}>Filtrar</button>
        </form>
    )
}