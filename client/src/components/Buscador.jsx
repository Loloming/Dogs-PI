import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchDogs } from "../actions/actionCreators";
import styles from './Buscador.module.css';


export default function Buscador({ setData, setCurrentPage, setDogs }) {

    const [raza, setRaza] = useState('')
    const [disabled, setDisabled] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleButton(value) {
        if (value === '') {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/dogs?name=${raza}`, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
                })
                .then(r => r.json())
                .then(r => {
                    if (r !== 'Raza no encontrada') {
                        dispatch(searchDogs(r))
                        setData(r)
                        setDogs([...r].splice(0, 8))
                        setCurrentPage(0)
                        setRaza('')
                    }
                    else {
                        fetch(`https://api.thedogapi.com/v1/breeds/search?q=${raza}`)
                            .then(r => r.json())
                            .then(r => {
                                if (!r[0]) {
                                    dispatch(searchDogs(r))
                                    navigate('/notFound')
                                    setRaza('')
                                }
                                else {
                                    dispatch(searchDogs(r))
                                    setData(r)
                                    setDogs([...r].splice(0, 8))
                                    setCurrentPage(0)
                                    setRaza('')
                                }
                            })
                    }
                })
        
    }

    return (
        <form onSubmit={handleSubmit} className={styles.buscador}>
            <input type={'text'} placeholder='Buscar razas' value={raza} className={styles.buscador_text} onChange={(e) => {
                setRaza(e.target.value)
                handleButton(e.target.value)
            }}></input>
            <button disabled={disabled} className={disabled ? styles.buscador_button_disabled : styles.buscador_button}>Buscar</button>
        </form>
    )
}