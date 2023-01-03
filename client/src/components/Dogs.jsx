import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../actions/actionCreators";
import { Link } from 'react-router-dom'
import Buscador from "./Buscador";
import Dog from "./Dog.jsx";
import Filtrado from "./Filtrado";
import Paginado from "./Paginado";
import styles from './Dog.module.css'
import fstyles from './Paginado.module.css';

export default function Dogs() {

    const ITEMS_PER_PAGE = 8;

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [dogs, setDogs] = useState([]);
    const [empty, setEmpty] = useState(false);
    
    const fetching = useCallback(() => {
        if (!dogs[0]) {
            dispatch(getAllDogs());
            fetch('https://api.thedogapi.com/v1/breeds')
                .then(data => data.json())
                .then(data => {
                    setData(data)
                    setDogs([...data].splice(0, ITEMS_PER_PAGE))
                })
        }      
    }, [dispatch, dogs])

    useEffect(() => {
        fetching()
    }, [fetching])

    useEffect(() => {
        if (state) {
            if (state.empty === true) {
                setEmpty(true);
            }
            else if (state.filteredDogs) {
                if (state.filteredDogs[0]) {
                    setDogs([...data].splice(0, ITEMS_PER_PAGE))
                }
                else {
                    setDogs([...state.dogs].splice(0, ITEMS_PER_PAGE))
                    setCurrentPage(0);
                }
            }
            else if (state.dogs) {
                setDogs([...state.dogs].splice(0, ITEMS_PER_PAGE))
                setCurrentPage(0)
            }
            else {
                setDogs([...data].splice(0, ITEMS_PER_PAGE))
                setCurrentPage(0)
            }
        }
        else {
            setDogs([...data].splice(0, ITEMS_PER_PAGE))
            setCurrentPage(0)
        }
        
    }, [state, data])

    return (
        dogs[0] !== undefined || empty === true ?
        <>
            <h3 className={styles.lista}>Lista de razas</h3>
            <Buscador setData={setData} data={data} setDogs={setDogs} setCurrentPage={setCurrentPage}/>
            <Filtrado setData={setData} setEmpty={setEmpty} empty={empty} setCurrentPage={setCurrentPage}/>
            <div className={styles.container}>
                {empty !== true
                ? dogs.map(d => {
                    return <Link className={styles.name} to={`/${d.id}`} key={d.id}><Dog img={d.image ? d.image.url : undefined} name={d.name} temperament={d.temperament} weight={d.weight.metric} reference={d.reference_image_id} key={d.id}/></Link>
                })
                : <h4 className={styles.notFound}>No se encontró ninguna raza</h4>}
            </div>
            <Paginado currentPage={currentPage} setDogs={setDogs} setCurrentPage={setCurrentPage} setData={setData} data={data} empty={empty}/>
        </>
        : 
        <>
            <h4 className={styles.notFound}>Cargando...</h4>
            <footer className={fstyles.container}></footer>
        </>
    )
}