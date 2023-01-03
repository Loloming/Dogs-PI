import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../actions/actionCreators";
import styles from './Paginado.module.css';

export default function Paginado({currentPage, setDogs, setCurrentPage, setData, data, empty}) {

    const dispatch = useDispatch();
    const state = useSelector(store => store)

    const ITEMS_PER_PAGE = 8;
    const total = data.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    
    if (empty) {
        return (
            <footer className={styles.container}>
            </footer>
        );
    }
    else if (currentPage === 0 && data.length < 172 && state.filteredDogs.length === 0) {
        return (
            <footer className={styles.container}>
                <button className={styles.button} onClick={() => {
                dispatch(getAllDogs())
            }}>Todas las razas</button>
            </footer>
            
        )
    }
    else if (currentPage === 0 && data.length > 8) {
        return (
            <footer className={styles.container}>
                <button className={styles.button} onClick={() => {
                    const nextPage = currentPage + 1;
                    const firstIndex = nextPage * ITEMS_PER_PAGE;
                    setDogs([...data].splice(firstIndex, ITEMS_PER_PAGE))
                    setCurrentPage(nextPage)
                }}>Next</button>
            </footer>
        )
    }
    else if (firstIndex >= total && data.length > 8) {
        return (
            <footer className={styles.container}>
                <button className={styles.button} onClick={() => {
                    const prevPage = currentPage - 1;
                    const firstIndex = prevPage * ITEMS_PER_PAGE;
                    setDogs([...data].splice(firstIndex, ITEMS_PER_PAGE))
                    setCurrentPage(prevPage)
                }}>Prev</button>
            </footer>
        )
    }
    else if (firstIndex >= total) {
        return (
            <footer className={styles.container}>
            </footer>
        )
    }
    else
    return (
        <footer className={styles.container}>
            <button className={styles.button} onClick={() => {
                const prevPage = currentPage - 1;
                const firstIndex = prevPage * ITEMS_PER_PAGE;
                setDogs([...data].splice(firstIndex, ITEMS_PER_PAGE))
                setCurrentPage(prevPage)
            }}>Prev</button>

            <button className={styles.button} onClick={() => {
                const nextPage = currentPage + 1;
                const firstIndex = nextPage * ITEMS_PER_PAGE;
                setDogs([...data].splice(firstIndex, ITEMS_PER_PAGE))
                setCurrentPage(nextPage)
            }}>Next</button>
        </footer>
    )
}